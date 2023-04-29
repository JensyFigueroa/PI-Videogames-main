import React from 'react'
import styles from './Landing.module.css'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div>
      <main className={styles.main}>
        <h1>Landing Page</h1>
        <Link to='/videogames' className={styles.btn}>Ingresa ahora</Link>
      </main>
    </div>
  )
}
