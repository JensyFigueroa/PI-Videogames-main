import { GET_GAMES, GET_GAME_X_NAME, GET_GENRES, FILTER_GENRES, ORDER_CARDS, FILTER_ORIGIN } from "../actions"

const inicialState = {
    games: [],
    allGames: [],
    genres: [],
    loading: true
}

const rootReducer = (state = inicialState, action) => {
    switch (action.type) {
        case GET_GAMES:

            return {
                ...state,
                games: [...action.payload],
                allGames: [...action.payload],
                loading: false  
            }

        case GET_GAME_X_NAME:
            return {
                ...state,
                games: action.payload
            }

        case GET_GENRES:
            return {
                ...state,
                genres: [...action.payload],
            }

        case FILTER_GENRES:
            let filterGameXGenres;

            if (action.payload === 'Select Option') {
                filterGameXGenres =  state.copyGames
            } else {
                console.log(state.games)
                 filterGameXGenres = state.games.map(game => game.genres && game.genres.includes(action.payload))
            } 

            return {
                ...state,
                games:[...filterGameXGenres],
                allGames: [...filterGameXGenres]
               
            }


        case ORDER_CARDS:
            let orderCards;

            if (action.payload === 'Ascendente') {
                orderCards = state.games.sort((a, b) => a.id < b.id ? 1 : -1)
            }
            if (action.payload === 'Descendente') {
                orderCards = state.games.sort((a, b) => a.id > b.id ? 1 : -1)
            }
            if (action.payload === 'Select Option') {
                orderCards = state.allGames
            }
            return {
                ...state,
                games: [...orderCards]
            }

        case FILTER_ORIGIN:
    
            let filterXorigin;
            if (action.payload === 'Select Option') {
                filterXorigin = state.allGames
            }
            
            if (action.payload === 'Local') {
                filterXorigin = state.games.filter(game => typeof game.id === 'string')
            }
            if (action.payload === 'Api') {
                filterXorigin = state.games.filter(game => typeof game.id === 'number')
            }

            return {
                ...state,
                games: filterXorigin
            }

        default: return {
            ...state,
        }
    }
}

export default rootReducer