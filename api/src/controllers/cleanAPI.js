const cleanAPIGames = (arr) => {
     
    const result = arr.map((e) =>{
        return  {id: e.id,
            name : e.name, 
            description: e.description, 
            platforms: e.platforms.map(e => e.platform.name),
            genres: e.genres.map(e => e.name), 
            image: e.background_image, 
            released: e.released, 
            rating: e.rating }
    })
    return result
}

const cleanAPIGenres = (arr) => {
     
    const result = arr.map((e) =>{
        return  {id: e.id,
            name : e.name}
    })
    return result
}

module.exports = {cleanAPIGames, cleanAPIGenres};