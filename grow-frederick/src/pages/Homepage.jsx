import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './Homepage.css'
import banner from '../assets/Homepage Banner.jpg'
import divider from '../assets/border.png'
import calendar from '../assets/calendar.png'
import notification from '../assets/notification.png'
import weather from '../assets/weathermap.png'
import { useAuth } from '../contexts/AuthContext';

const Homepage = () => {

  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="stack">
        <Navbar></Navbar>
        
        {/* Hero Banner Section */}
        <div className="banner-wrapper">
            <img src={banner} alt="banner" className="banner" />
            <div className="banner-content">
                <h1>Gardening Has Never Been This Easy!</h1>
                <p className="banner-motto">Planting the Future, One Backyard at a Time.</p>
                {!currentUser && (
                  <div className="banner-buttons">
                    <button 
                      className="banner-button primary" 
                      onClick={() => navigate('/signup')}
                    >
                      Get Started
                    </button>
                    <button 
                      className="banner-button secondary" 
                      onClick={() => navigate('/index')}
                    >
                      Explore Plants
                    </button>
                  </div>
                )}
            </div>
        </div>

        {/* Get Started Section */}
        <div className="get-started-wrapper">
          <div className="get-started-content">
            <h2>Ready to Start Your Garden Journey?</h2>
            <p>Join thousands of gardeners who are already growing with Grow Common</p>
            {!currentUser && (
              <div className="get-started-buttons">
                <button 
                  className="get-started-button primary" 
                  onClick={() => navigate('/signup')}
                >
                  Get Started Free
                </button>
                <button 
                  className="get-started-button secondary" 
                  onClick={() => navigate('/index')}
                >
                  Explore Plants
                </button>
              </div>
            )}
            {currentUser && (
              <div className="get-started-buttons">
                <button 
                  className="get-started-button primary" 
                  onClick={() => navigate('/garden')}
                >
                  Go to My Garden
                </button>
                <button 
                  className="get-started-button secondary" 
                  onClick={() => navigate('/index')}
                >
                  Browse Plants
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="features-wrapper">
          <p className="title">Features</p>
          <div className="cards-container">
            <a href="/index" className="features-card">
              <img src={notification} alt="Plant Index" className="features-icon" />
              <p className="features-label">Plant Index</p>
              <p className="features-content">Comprehensive database with 50+ local plants, advanced filters by type, sun exposure, water needs, and hardiness zones. Add plants to your personal garden collection.</p>
            </a>
            <a href="/calendar" className="features-card">
              <img src={calendar} alt="Calendar" className="features-icon" />
              <p className="features-label">Smart Calendar</p>
              <p className="features-content">Personalized gardening calendar with task color-coding, click-to-edit functionality, optional reminders, and seasonal planting guides tailored to your location.</p>
            </a>
            <a href="/map" className="features-card">
              <img src={weather} alt="Weather Map" className="features-icon" />
              <p className="features-label">Interactive Weather Map</p>
              <p className="features-content">Real-time weather data, 7-day forecasts, growing recommendations, hardiness zone detection, and location-based gardening insights.</p>
            </a>
            <a href="/news" className="features-card">
              <img src={notification} alt="News & Alerts" className="features-icon" />
              <p className="features-label">News & Alerts</p>
              <p className="features-content">Location-based pest alerts, weather warnings, seasonal gardening tips, and real-time notifications to protect your garden.</p>
            </a>
            <a href="/garden" className="features-card">
              <img src={calendar} alt="Start My Garden" className="features-icon" />
              <p className="features-label">Start My Garden</p>
              <p className="features-content">Personal garden tracking system with plant timeline, visual progress bars, growth milestones, and comprehensive garden management tools.</p>
            </a>
            <a href="/about" className="features-card">
              <img src={weather} alt="Community" className="features-icon" />
              <p className="features-label">Community & Support</p>
              <p className="features-content">Connect with local gardeners, access expert advice, share success stories, and join a thriving community of plant enthusiasts.</p>
            </a>
          </div>
        </div>

        {/* New Start My Garden Section */}
        <div className="garden-section">
          <div className="garden-content">
            <div className="garden-text">
              <h2>Start My Garden</h2>
              <p>User-specific plant tracking, timeline, and visual progress bar</p>
              <div className="garden-features">
                <div className="garden-feature">
                  <span className="feature-icon">ðŸŒ±</span>
                  <span>Track your plants</span>
                </div>
                <div className="garden-feature">
                  <span className="feature-icon">ðŸ“Š</span>
                  <span>Visual progress</span>
                </div>
                <div className="garden-feature">
                  <span className="feature-icon">ðŸ“…</span>
                  <span>Timeline view</span>
                </div>
              </div>
              {!currentUser && (
                <button 
                  className="garden-button" 
                  onClick={() => navigate('/signup')}
                >
                  Start My Garden
                </button>
              )}
            </div>
            <div className="garden-image">
              <img 
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop" 
                alt="Garden Scene" 
                className="garden-hero-image"
              />
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="call-wrapper">
          <div className="call-section">
            <h1 className="call-header">
              {!currentUser ? "Get Started Today!" : "Welcome to Grow Common!"}
            </h1>
          </div>
          <div className="call-section">
            <div className='call-right'>
              {!currentUser ? (
                <>
                  <div 
                    className="call-button" 
                    onClick={() => navigate('/signup')}
                  >
                    Sign Up!
                  </div>
                  <div 
                    className="call-button" 
                    onClick={() => navigate('/login')}
                  >
                    Log In!
                  </div>
                </>
              ) : (
                <>
                  <div 
                    className="call-button" 
                    onClick={() => navigate('/garden')}
                  >
                    My Garden
                  </div>
                  <div 
                    className="call-button" 
                    onClick={() => navigate('/index')}
                  >
                    Browse Plants
                  </div>
                </>
              )}
            </div>
          </div>
          <img src={divider} alt="divider" className="call-divider" />
        </div>

        {/* Pricing Section */}
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
                âœ“ Live Weather & Outlook<br></br>
                âœ“ Full Plant & Pest Index<br></br>
                âœ“ General Planting Calendar<br></br>
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
                âœ“ Personalized Garden Journal<br></br>
                âœ“ CSV Export<br></br>
                âœ“ Location Based Pest Warnings<br></br>
                âœ“ Custom Planting Tips and Tricks<br></br>
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
                âœ“ Printable Guides<br></br>
                âœ“ SMS Local Alerts<br></br>
                âœ“ Priority Support<br></br>
                âœ“ Year-in-Review Stats<br></br>
              </p>
            </div>
          </div>
        </div>
        
        <Footer></Footer>
    </div>
  )
}

export default Homepage

