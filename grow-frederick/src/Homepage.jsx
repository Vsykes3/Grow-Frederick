import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './Homepage.css'
import banner from './assets/Homepage Banner.jpg'
import divider from './assets/border.png'

const Homepage = () => {
  return (
    <div className="stack">
        <Navbar></Navbar>
        <div className="banner-wrapper">
            <img src={banner} alt="banner" className="banner" />
            <div className="banner-content">
                <h1>Gardening Has Never Been This Easy!</h1>
                <a href="/signup" className="container-link">
                  <button className="banner-button">Get Started</button>
                </a>
            </div>
        </div>
        <div className="features-wrapper">
          <p className="title">Features</p>
          <div className="cards-container">
            <a href="/calendar" className="features-card">
              <p className="features-label">Personalized Calendar</p>
              <p className="features-content">Easily schedule and plan gardening timings with a handy calendar.</p>
            </a>
            <a href="/news" className="features-card">
              <p className="features-label">Real Time Pest and Weather Alerts</p>
              <p className="features-content">Easily schedule and plan gardening timings with a handy calendar.</p>
            </a>
            <a href="/map" className="features-card">
              <p className="features-label">Interactive Weather Map</p>
              <p className="features-content">Easily schedule and plan gardening timings with a handy calendar.</p>
            </a>
          </div>
        </div>
        <div className="call-wrapper">
          <div className="call-section">
            <h1 className="call-header">Get Started Today!</h1>
          </div>
          <div className="call-section">
            <div className='call-right'>
              <a href="/signup" className="container-link">
                <div className="call-button">Sign Up!</div>
              </a>
              <a href="/login" className="container-link">
                <div className="call-button">Log In!</div>
              </a>
            </div>
          </div>
          <img src={divider} alt="divider" className="call-divider" />
        </div>
        <div className="pricing-wrapper">
          <p className="title">Pricing</p>
          <div className="cards-container">
            <div className="pricing-card">
              <div className="pricing-name">Free</div>
              <div className="pricing-container">
                <p className="pricing-price">$0</p>
                <p className="pricing-subs">/forever</p>
              </div>
              <div className="line"></div>
              <p className='pricing-contents'>
                ✓ Live Weather & Outlook<br></br>
                ✓ Full Plant & Pest Index<br></br>
                ✓ General Planting Calendar<br></br>
              </p>
            </div>
            <div className="pricing-card">
              <div className="pricing-name">Pro</div>
              <div className="pricing-container">
                <p className="pricing-price">$6</p>
                <p className="pricing-subs">.99/once</p>
              </div>
              <div className="line"></div>
              <p className='pricing-contents'>
                All Free Features PLUS:<br></br><br></br>
                ✓ Personalized Garden Journal<br></br>
                ✓ CSV Export<br></br>
                ✓ Location Based Pest Warnings<br></br>
                ✓ Custom Planting Tips and Tricks<br></br>
              </p>
            </div>
            <div className="pricing-card">
              <div className="pricing-name">Premium</div>
              <div className="pricing-container">
                <p className="pricing-price">$10</p>
                <p className="pricing-subs">/month</p>
              </div>
              <div className="line"></div>
              <p className='pricing-contents'>
                All Pro Features PLUS:<br></br><br></br>
                ✓ Printable Guides<br></br>
                ✓ SMS Local Alerts<br></br>
                ✓ Priority Support<br></br>
                ✓ Year-in-Review Stats<br></br>
              </p>
            </div>
          </div>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default Homepage