import axios from 'axios'

export const GET_GAMES = 'GET_GAMES'
export const GET_GAME_X_NAME = 'GET_GAME_X_NAME'
export const GET_GENRES = 'GET_GENRES'
export const FILTER_GENRES = 'FILTER_GENRES'
export const CREATE_GAME = 'CREATE_GAME'
export const ORDER_CARDS = 'ORDER_CARDS'
export const FILTER_ORIGIN = 'FILTER_ORIGIN'


export const getGames = () => {
  return async function (dispatch) {
    const apiData = await axios.get('http://localhost:3001/videogames')
    const games = apiData.data;
    // console.log(games);
    dispatch({ type: GET_GAMES, payload: games })
  }
}

export const getGameName = (name) => {
  return async function (dispatch) {
    const apiData = await axios.get(`http://localhost:3001/videogames/name?name=${name}`)
    const games = apiData.data;
    // console.log(games,'Actions get x name');
    dispatch({ type: GET_GAME_X_NAME, payload: games })
  }
}

export const getGenres = () => {
  return async function (dispatch) {
    const apiData = await axios.get(`http://localhost:3001/genres`)
    const genres = apiData.data;
    //  console.log(genres, 'Actions');
    dispatch({ type: GET_GENRES, payload: genres })
  }
}

export const filterGenres = (status) => {
  // console.log(status,'actions');
  return {
      type: FILTER_GENRES,
      payload: status
  }
}


export const orderCards = (id) =>{
  //  console.log(id,'actions');
  return{
      type: ORDER_CARDS,
      payload: id
  }
}

export const filterOrigin = (status) =>{
  // console.log(id,'actions');
 return{
     type: FILTER_ORIGIN,
     payload: status
 }
}
