const cleanGames = (arr) => {

    // console.log(arr);

    const result = arr.map((e) => {
        return {
            id: e.id,
            name: e.name,
            description: e.description,
            platforms: e.platforms.map(e => e.platform.name),
            genres: e.genres.map(e => e.name),
            image: e.background_image,
            released: e.released,
            rating: e.rating
        }
    })
    return result
}

const cleanDB = (obj) => {
    let arrDB = []
    let valores = Object.values(obj);
    for (let i = 0; i < valores.length; i++) {
        arrDB.push({
            id: valores[i].dataValues.id,
            name: valores[i].dataValues.name,
            description: valores[i].dataValues.description,
            platforms: valores[i].dataValues.platform,
            genres: valores[i].dataValues.Genres.map(genre => genre.dataValues.name),
            image: valores[i].dataValues.image,
            released: valores[i].dataValues.released,
            rating: valores[i].dataValues.rating
        })
    }

    return arrDB; 

}

const cleanAPIGenres = (arr) => {

    const result = arr.map((e) => {
        return {
            id: e.id,
            name: e.name
        }
    })
    return result
}

module.exports = { cleanGames, cleanDB, cleanAPIGenres };