import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/Grow Fred Alt Logo.png';

const Navbar = () => {
  return (
    <div className='header'>
      <img src={logo} alt="Logo" className="logo" />

      <NavLink to="/home" className="nav-text">Home</NavLink>
      <NavLink to="/news" className="nav-text">News</NavLink>
      <NavLink to="/map" className="nav-text">Map</NavLink>
      <NavLink to="/index" className="nav-text">Plant Index</NavLink>
      <NavLink to="/calendar" className="nav-text">Calendar</NavLink>

      <NavLink to="/login" className="login-button">Login</NavLink>
    </div>
  );
}

export default Navbar;
