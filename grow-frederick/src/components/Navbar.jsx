import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/Grow Fred Alt Logo.png';
import defaultIcon from '../assets/defaultIcon.png'; // fallback icon
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // reference for detecting outside clicks

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleLogoClick = () => {
    navigate('/home');
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Fallback display name & icon
  const displayName = currentUser?.displayName || 'Guest';
  const photoURL = currentUser?.photoURL || defaultIcon;

  return (
    <div className='header'>
      <div className="logo-container" onClick={handleLogoClick}>
        <img src={logo} alt="GrowCommon Logo" className="logo" />
        <span className="brand-name">GrowCommon</span>
      </div>

      <NavLink to="/home" className="nav-text">Home</NavLink>
      <NavLink to="/about" className="nav-text">About Us</NavLink>
      <NavLink to="/news" className="nav-text">News</NavLink>
      <NavLink to="/map" className="nav-text">Map</NavLink>
      <NavLink to="/index" className="nav-text">Plant Index</NavLink>
      <NavLink to="/calendar" className="nav-text">Calendar</NavLink>
      <NavLink to="/garden" className="nav-text">Start My Garden</NavLink>

      {!currentUser && (
        <NavLink to="/login" className="login-button">Login</NavLink>
      )}

      {currentUser && (
        <div className="profile-container" ref={dropdownRef}>
          <div className="profile-info" onClick={toggleDropdown}>
            <img src={photoURL} alt="User Icon" className="profile-icon" />
            <span className="profile-name">{displayName}</span>
          </div>

          {dropdownOpen && (
            <div className="profile-dropdown">
              <NavLink to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Profile</NavLink>
              <NavLink to="/settings" className="dropdown-item" onClick={() => setDropdownOpen(false)}>Settings</NavLink>
              <button className="dropdown-item-button" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;

