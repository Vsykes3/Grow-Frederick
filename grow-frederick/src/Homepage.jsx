import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './Homepage.css'
import banner from './assets/Homepage Banner.jpg'

const Homepage = () => {
  return (
    <div className="stack">
        <Navbar></Navbar>
        <div className="banner-wrapper">
            <img src={banner} alt="banner" className="banner" />
            <div className="banner-content">
                <h1>Gardening Has Never Been This Easy!</h1>
                <button className="banner-button">Get Started</button>
            </div>
        </div>
        <div className="features-wrapper">
          <p className="title">Features</p>
          <div className="cards-container">
            <div className="features-card">
              <p className="features-label">Personalized Calendar</p>
              <p className="features-content">Easily schedule and plan gardening timings with a handy calendar.</p>
            </div>
            <div className="features-card">
              <p className="features-label">Real Time Pest and Weather Alerts</p>
            </div>
            <div className="features-card">
              <p className="features-label">Interactive Weather Map</p>
            </div>
          </div>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default Homepage