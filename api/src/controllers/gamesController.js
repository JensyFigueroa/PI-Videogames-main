const { Videogame, Op } = require('../db.js');
const axios = require('axios');

require('dotenv').config();
const { API_KEY } = process.env;

const {cleanAPIGames} = require('./cleanAPI.js')

const gamesArrObj = async (req, res) => {
    try {
        /* ***************CONSULTANDO A LA API************************ */
        const gameDB = await Videogame.findAll();

        /* ***************CONSULTANDO A LA API************************ */
        let dataAPI = [];

        for (let i = 0; i < 5; i++) {
            if (i===0) {
                dataAPI.push ((await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)).data.results); 
            }else{
                dataAPI.push ((await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)).data.results);     

            }  
        }
        console.log(dataAPI);

        const gameAPI = cleanAPIGames(dataAPI.flat())

        const result = [...gameDB, ...gameAPI]  
        
        

    // console.log(result.length);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
    // res.send('NIY: ESTA RUTA VA A TRAER UN ARREGLO DE OBJETOS DE LOS VIDEOS GAMES')
}

const gameXId = async (req, res) => {
    const { idVideogame } = req.params

    try {
        if (!isNaN(idVideogame)) {
            const gameApi = (await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)).data;


            console.log(gameApi);

            res.status(200).json(cleanAPIGames([gameApi]))
        } else {
            const gameDB = await Videogame.findByPk(idVideogame)
            res.status(200).json(gameDB)
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

const gameXname = async (req, res) => {
    const { name } = req.query

    try {
        // if(!nameGame) res.status(400).json({message: 'You must enter a game name.'})

        /* ***************CONSULTANDO A LA DB************************ */

        const gameDB = await Videogame.findAll({where:{name:{
            // [Op.like]:'Mario%'}}})
            [Op.notLike]:`${name}%`}}})

        /* ***************OBTENIENDO INFO A LA API************************ */
        const dataAPI = (await axios.get(`https://api.rawg.io/api/games?search=${name.toLowerCase()}&key=${API_KEY}`)).data.results;

        const gameAPI = cleanAPIGames(dataAPI)

        const result = [...gameDB, ...gameAPI]  

        let top15 = [];

        if (result.length >= 15) {
            for (let i = 0; i < 15; i++) {
                top15.push(result[i]);
           }
        } else {
            for (let i = 0; i < result.length; i++) {
                top15.push(result[i]);
           }
        }

    //    console.log(top15.length);
        res.status(200).json(top15);

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const gameCreate = async (req, res) => {
    const { name, description, platforms, image, released, rating } = req.body;
    // console.log(name, description, plataformas, imagen, released, rating);

    try {
        if (!name || !description || !platforms || !image || !released || !rating) res.status(400).json({ message: 'Faltan datos' })


        /* ************VERIFICANDO LA DB SI EXISTE SINO CREAMOS EL GAME EN DB******************** */
        const [newGame, created] = await Videogame.findOrCreate({ where: { name, description, platforms, image, released, rating } })

        res.status(200).json(newGame)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


module.exports = { gamesArrObj, gameXId, gameXname, gameCreate }