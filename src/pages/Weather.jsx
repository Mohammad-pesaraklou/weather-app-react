import React,{ useState } from 'react';
import TextFiled from '@mui/material/TextField';
import { Box, Card, CardContent, CardHeader, CardMedia, Divider, Grid, Typography } from '@mui/material';
import CloudCircleRoundedIcon from '@mui/icons-material/CloudCircleRounded';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SearchIcon from '@mui/icons-material/Search';
import photo from '../assets/sunny.jpg';
import snow from '../assets/snow.jpg';
import cloud from '../assets/cloud.jpg';
import rainy from '../assets/rainy.jpg';

const Weather = () => {

    const[place, setPlace] = useState("")
    const [weatherData, setWeatherData] = useState([])
    
    const handleSearch = () => {
      fetch(`http://api.weatherapi.com/v1/forecast.json?key=957cfaf05b9b496f853185929221908&q=${place}&days=1&aqi=no&alerts=no`)
        .then(response => response.json())
        .then(data => setWeatherData({
            name: data.location.name,
            time: data.location.localtime,
            country: data.location.country,
            farenheit: {
              current: data.current.temp_c,
              high: data.forecast.forecastday[0].day.maxtemp_c ,
              low: data.forecast.forecastday[0].day.mintemp_c
              },
            condition: data.current.condition.text,
            humidity: data.current.humidity ,
            wind: data.current.wind_mph

        }))
    }
  
    console.log(weatherData)
    

    return (
        
        <Grid container spacing={2}  sx={
        weatherData.condition?.toLowerCase() === 'clear' || weatherData.condition?.toLowerCase() === 'sunny' ? 
        { backgroundImage:`url(${cloud})`,minHeight: '100vh',backgroundPosition: 'center',backgroundSize: "cover",position: 'relative'} : weatherData.condition?.toLowerCase() === "rainy" || weatherData.condition?.toLowerCase() === "patchy rain possible" ?
         { backgroundImage:`url(${rainy})`,minHeight: '100vh',backgroundPosition: 'center',backgroundSize: "cover",position: 'relative'} : weatherData.condition?.toLowerCase() === "snow" ? { backgroundImage:`url(${snow})`,minHeight: '100vh',backgroundPosition: 'center',backgroundSize: "cover",position: 'relative'} : { backgroundImage:`url(${photo})`,minHeight: '100vh',backgroundPosition: 'center',backgroundSize: "cover",position: 'relative'}}>
                     <Grid item xs={9}>
                        <Grid item xs={12} >
                            <Typography variant="h4" fontFamily="Montserrat" fontWeight={600} m={"20px 40px"} sx={{color: "honeydew"}}>
                                Wether App.
                            </Typography>
                        </Grid>
                          <Grid item xs={12} >
                            <Box sx={{position: 'absolute',bottom: '14rem',left: "6rem",display: 'flex'}} >
                                <Typography variant="h1" fontFamily='Montserrat' fontWeight="600" sx={{color:"rgb(16, 16, 16)",fontSize:"100px"}}>
                                {weatherData.farenheit?.current}°
                                </Typography>
                            </Box>
                            <Box sx={{position: 'absolute',bottom: '10rem',left: "15rem",display: 'flex',flexDirection: 'column'}}>
                                <Typography variant="h2" fontWeight= "700" sx={{color:"rgb(16, 16, 16)"}}>{weatherData.name}</Typography>
                                <Typography variant="subtitle" sx={{color: 'rgb(16, 16, 16)'}} fontWeight= "700">{weatherData.time}</Typography>

                            </Box>
                            <Box sx={{position: 'absolute',bottom: '7.4rem',left: "35rem",display: 'flex',flexDirection: 'column'}}>
                                {
                                    weatherData.condition?.toLowerCase() === 'partly cloudy' ? <CloudCircleRoundedIcon sx={{fontSize: '40px',color: 'rgb(16, 16, 16)'}}/> : weatherData.condition?.toLowerCase() === "clear" || "sunny" ? <WbSunnyIcon sx={{fontSize: '45px',color: 'yellow'}}/> : null
                                }
                                <Typography variant="p" fontWeight={600} fontFamily="Montserrat">{weatherData.condition}</Typography>
                            </Box>
                        </Grid>   
                    </Grid>
            <Grid item xs={3} p={1} sx={{backgroundColor: "rgba(251, 255, 255, 0.359)"}}>
                 <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center',mt: 4}}>
                    <TextFiled 
                    fullWidth
                    variant='standard'
                    color="primary"
                    sx={{p: "10px 0px"}}
                    label={<Typography variant="h6">
                        Search For The City
                    </Typography>}
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    onKeyPress={handleSearch}         
                    />
                    <SearchIcon  color="primary"/>
               </Grid>
               <Divider sx={{mt: '40px'}}/>
               <Grid item xs={12} sx={{mt: 3}}>
                    <Typography variant="h5" fontWeight={800} fontFamily="Montserrat">Weather Details</Typography>
                    <Box sx={{display: 'flex',justifyContent: 'space-between',mt: 5}}>
                        <Box>
                        <Typography variant="h6" fontWeight={700}>
                         High Temp    
                        </Typography>
                        </Box>
                        <Box>
                        <Typography variant="h6">
                          {weatherData.farenheit?.high}
                        </Typography>
                        </Box>
                    </Box>
               </Grid>
               <Grid item xs={12} mt={3}>
               <Box sx={{display: 'flex',justifyContent: 'space-between'}}>
                        <Box>
                        <Typography variant="h6" fontWeight={700}>
                            Low Temp    
                        </Typography>
                        </Box>
                        <Box>
                        <Typography variant="h6">
                        {weatherData.farenheit?.low}
                        </Typography>
                        </Box>
                    </Box>
               </Grid>
               <Grid item xs={12} mt={3}>
               <Box sx={{display: 'flex',justifyContent: 'space-between'}}>
                        <Box>
                        <Typography variant="h6" fontWeight={700}>
                            Humidity 
                        </Typography>
                        </Box>
                        <Box>
                        <Typography variant="h6">
                        {weatherData?.humidity}
                        </Typography>
                        </Box>
                    </Box>
               </Grid>
               <Grid item xs={12} mt={3}>
               <Box sx={{display: 'flex',justifyContent: 'space-between'}}>
                        <Box>
                        <Typography variant="h6" fontWeight={700}>
                            Wind 
                        </Typography>
                        </Box>
                        <Box>
                        <Typography variant="h6">
                            {weatherData?.wind}
                        </Typography>
                        </Box>
                    </Box>
               </Grid>
            </Grid>
        </Grid>
    );
};

export default Weather;