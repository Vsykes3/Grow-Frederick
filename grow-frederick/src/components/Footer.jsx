// Footer.jsx
import React from 'react'
import './Footer.css'
import { Link } from "@react-email/components";
import insta from "../assets/instagram-logo.png";
import facebook from "../assets/facebook.png";
import logo from "../assets/Grow Fred Alt Logo.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container-1">
        <a href="/home" className="foot-link">
            <img src={logo} alt="Logo" className="foot-logo"/>
        </a>
      </div>
      <div className="footer-container-2">
        <a href="/privacy" className='foot-text'>Privacy Policy</a>
        <a href="/terms" className='foot-text'>Terms</a>
        <a href="/sitemap" className='foot-text'>Sitemap</a>
      </div>
      <div className="footer-container-3">
        <p className="foot-text">Contact Us!</p>
        <Link href='https://mail.google.com/mail/u/0/#inbox?compose=VpCqJZNHPQHfPqdRBDnNLsSKgsvQLPdnGJwPqsjTKpsRLZHWXkPtRthlwqBKqKvMtRxqnLb' style={{ color: '#f9f0dd', textDecoration: 'none'}} className="foot-text">Email: growfrederick@gmail.com</Link>
      </div>
      <div className="footer-container-4">
        <a href="/home" className='foot-text'>Home</a>
        <a href="/about" className='foot-text'>About Us</a>
        <a href="/home" className='foot-text'>Services</a>
        <a href="https://mail.google.com/mail/u/0/#inbox?compose=VpCqJZNHPQHfPqdRBDnNLsSKgsvQLPdnGJwPqsjTKpsRLZHWXkPtRthlwqBKqKvMtRxqnLb" className='foot-text'>Contact Us</a>
        <div className="foot-icont">
            <a href='https://www.instagram.com/growfrederick/?utm_source=ig_web_button_share_sheet' className='foot-iconl'>
                <img src={insta} alt="Instagram" className="foot-icon"/>
            </a>
            <a href='' className='foot-iconl'>
                <img src={facebook} alt="Facebok" className="foot-icon"/>
            </a>
        </div>
      </div>
      <div className="footer-container-5">
        <p className="foot-text">
            USDA Zone: 6b-7a<br></br><br></br>
            Powered by OpenWeatherAPI and GoogleMapsAPI<br></br><br></br>
            2025 GrowFrederick<br></br>
        </p>
      </div>
      <div className="footer-container-6">
        {/* Sixth sixth - empty space */}
      </div>
    </div>
  )
}

export default Footer