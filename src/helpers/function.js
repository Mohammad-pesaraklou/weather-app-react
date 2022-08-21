const shorten = (title) => {
    const name = title.split(" ")
    const newName = `${name[0]}`
    return newName;
}

export {shorten}