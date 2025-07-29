// Footer.jsx
import React from 'react'
import './Footer.css'
import { Link } from "@react-email/components";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container-1"></div>
      <div className="footer-container-2">
        <a href="/privacy" className='foot-text'>Privacy Policy</a>
        <a href="/terms" className='foot-text'>Terms</a>
        <a href="/sitemap" className='foot-text'>Sitemap</a>
      </div>
      <div className="footer-container-3">
        <p className="foot-text">Contact Us!</p>
        <Link href='https://mail.google.com/mail/u/0/#inbox?compose=VpCqJZNHPQHfPqdRBDnNLsSKgsvQLPdnGJwPqsjTKpsRLZHWXkPtRthlwqBKqKvMtRxqnLb' style={{ color: '#f9f0dd', textDecoration: 'none' }} className="foot-text">Email: growfrederick@gmail.com</Link>
      </div>
      <div className="footer-container-4">
        {/* Fourth sixth - your content here */}
        <p>Section 4</p>
      </div>
      <div className="footer-container-5">
        {/* Fifth sixth - your content here */}
        <p>Section 5</p>
      </div>
      <div className="footer-container-6">
        {/* Sixth sixth - empty space */}
      </div>
    </div>
  )
}

export default Footer