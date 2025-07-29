import React from 'react'
import './Navbar.css'
import logo from '../assets/Grow Fred Alt Logo.png'

const Navbar = () => {
  return (
    <div className='header'>
        <img src={logo} alt="Logo" className="logo"/>

        <a href="/home" className='nav-text'>Home</a>
        <a href="/news" className='nav-text'>News</a>
        <a href="/map" className='nav-text'>Map</a>
        <a href="/index" className='nav-text'>Plant Index</a>
        <a href="/calendar" className='nav-text'>Calendar</a>
        
        <button className="login-button">Login</button>
    </div>
  )
}

export default Navbar