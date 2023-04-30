import React, { useEffect, useState } from 'react'
import styles from './VideoGames.module.css'
import Cards from '../cards/Cards.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { orderCards, filterGenres, getGameName, getGames, getGenres, filterOrigin, } from '../../redux/actions/index.js'
import SearchBar from '../searchBar/SearchBar.jsx'
import { Footer } from '../footer/Footer';
import spinner from './Spinner.gif'


export default function VideoGames() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getGames());
    dispatch(getGenres());
  }, [dispatch])

  function onSearch(name) {
    dispatch(getGameName(name))
  }

  const stateLoading = useSelector(state => state.loading)

  const genres = useSelector(state => state.genres)

  return (
    <div style={{ position: 'relative' }}>
      <div className={styles.section}>
        <h2>Find or create your favorite game </h2>
        <p>Live the best experience in Game On</p>
        {/* <div className={styles.wave}></div> */}
      </div>

      <div className={styles.wave}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="rgba(2, 4, 74)" d="M0,96L80,128C160,160,320,224,480,240C640,256,800,224,960,208C1120,192,1280,192,1360,192L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </div>

      <div className={styles.containerSearch}>
        <SearchBar onSearch={onSearch} />

        <div className={styles.filter}>
          <label>Genres:</label>
          <select onChange={(e) => dispatch(filterGenres(e.target.value))}>
            <option>Select Option</option>
            {genres.map((e, i) => <option value={e.name} key={i}>{e.name}</option>)}
          </select>
        </div>

        <div className={styles.filter}>
          <label>Origin:</label>
          <select onChange={(e) => dispatch(filterOrigin(e.target.value))}>
            {['Select Option', 'Api', 'Local'].map((e, i) => <option value={e} key={i}>{e}</option>)}
          </select>
        </div>

        <div className={styles.filter}>
          <label>Order By:</label>
          <select onChange={(e) => dispatch(orderCards(e.target.value))} >
            {['Select Option', 'Ascendente', 'Descendente'].map((e, i) => <option value={e} key={i}>{e}</option>)}
          </select>
        </div>

      </div>

      {stateLoading ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <img src={spinner} alt="" />
      </div> : <Cards />
      }

      <Footer />
    </div>
  )
}
