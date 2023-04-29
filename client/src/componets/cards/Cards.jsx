import React from 'react'
import Card from '../card/Card.jsx'
import styles from './Cards.module.css'

export default function Cards(props) {

    // console.log(props.numGamesXpage, 'cards')
    let i = 1

    return (
    <div key={i++} className={styles.containerCards}>
        {props.numGamesXpage.map((game, i) => 
            <Card
            key={i}
            id= {game.id}
            name={game.name}
            image={game.image}
            genres={game.genres}
            rating={game.rating}/>
        
        )}

    </div>
  )
}
