import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'
import img from './icono.jpg'

export default function Navbar() {
  return (
    <div className={styles.navBarGrid}>
      <Link to='/'><img src={img} alt=""  className={styles.img}/></Link>
      <div className={styles.gridItemMenu}>
        <NavLink to='/videogames' className={({ isActive }) => (isActive ? 'active' : 'link')}>Home</NavLink>
        <NavLink to='/createGame' className={({ isActive }) => (isActive ? 'active' : 'link')}>Create Game</NavLink>
        <NavLink to='/about' className={({ isActive }) => (isActive ? 'active' : 'link')}>About</NavLink>
      </div>
    </div>
  )
}
