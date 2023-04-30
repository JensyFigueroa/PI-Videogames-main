import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import styles from './Detail.module.css'
import Footer from '../footer/Footer';

export default function Detail() {

  const [game, setGame] = useState({
    name: '',
    description: '',
    platforms: '',
    image: '',
    released: '',
    rating: ''
  })

  const { id } = useParams();
  const navigate = useNavigate();

  // console.log(id);

  useEffect(() => {
    fetch(`http://localhost:3001/videogames/detail/${id}`)
      .then((response) => response.json())
      .then((game) => {
        // console.log(game);
        if (game[0].name) {
          setGame({
            name: game[0].name,
            description: game[0].description.replaceAll(/<("[^"]"|'[^']'|[^'">])*>/g,""), 
            platforms: game[0].platforms,
            image: game[0].image,
            released: game[0].released,
            rating: game[0].rating
          });
        }
      })
      .catch((err) => {
        window.alert("No hay personajes con ese ID");
      });
    return setGame({});
  }, [id]);

  return (
    <div style={{ backgroundImage: `url(${game.image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundColor: 'rgba(0,0,0,.55)', boxShadow: 'inset 0 4px 18.38vw 11vw rgba(0,0,0,.7)' }}>
      <section className={styles.containerDetails}>
        <div className={styles.details}>
          <div className={styles.field}>
            <h1>{game.name}</h1>
            <p>{game.description}</p>
          </div>
          <div className={styles.field}>
            <h3>Platforms: &nbsp;<span className={styles.data}>{game.platforms}</span></h3>
            <h3>Release: &nbsp;<span className={styles.data}>{game.released}</span></h3>
            <h3>Rating: &nbsp;<span className={styles.data}>{game.rating}</span></h3>
          </div>
        </div>
        <div className={styles.containerImage}>
          <img src={game.image} alt={game.name} className={styles.image} />
          <button className={styles.btn} onClick={() => navigate('/videogames')}>Back to Home</button>
        </div>

      </section>
    </div>
  )
}




