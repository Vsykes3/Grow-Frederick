import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="stack">
      <Navbar />
      
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>About GrowCommon</h1>
          <p>Growing together, one garden at a time</p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="about-container">
        <div className="mission-section">
          <h2>Our Mission</h2>
          <p>
            At GrowCommon, we believe that everyone deserves access to the knowledge and tools needed to create thriving gardens. 
            Our mission is to empower gardeners of all skill levels with comprehensive plant information, real-time weather insights, 
            and personalized growing recommendations.
          </p>
        </div>

        {/* Story Section */}
        <div className="story-section">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              Founded in the heart of Maryland, GrowCommon was born from a simple observation: 
              local gardeners needed better access to region-specific growing information. What started as a 
              community project has grown into a comprehensive gardening companion that serves gardeners across 
              the region and beyond.
            </p>
            <p>
              We understand that successful gardening isn't just about having a green thumbâ€”it's about having 
              the right information at the right time. That's why we've built a platform that combines 
              traditional gardening wisdom with modern technology to help you grow with confidence.
            </p>
          </div>
          <div className="story-image">
            <img 
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop" 
              alt="Community Garden" 
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">ðŸŒ±</div>
              <h3>Sustainability</h3>
              <p>Promoting eco-friendly gardening practices that benefit both your garden and the environment.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">ðŸ¤</div>
              <h3>Community</h3>
              <p>Building connections between gardeners and fostering knowledge sharing across our region.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">ðŸ“š</div>
              <h3>Education</h3>
              <p>Providing accessible, accurate information to help gardeners of all levels succeed.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">ðŸŒ</div>
              <h3>Local Focus</h3>
              <p>Tailoring our recommendations to the specific climate and conditions of the Maryland area.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" 
                  alt="Team Member" 
                />
              </div>
              <h3>Alex Chen</h3>
              <p className="member-role">Lead Horticulturist</p>
              <p>15+ years of experience in sustainable gardening and plant science.</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face" 
                  alt="Team Member" 
                />
              </div>
              <h3>Sarah Martinez</h3>
              <p className="member-role">Community Coordinator</p>
              <p>Passionate about connecting gardeners and building local growing communities.</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" 
                  alt="Team Member" 
                />
              </div>
              <h3>David Thompson</h3>
              <p className="member-role">Technology Lead</p>
              <p>Expert in developing user-friendly tools that make gardening information accessible.</p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="contact-section">
          <h2>Get in Touch</h2>
          <p>
            Have questions, suggestions, or just want to share your gardening success stories? 
            We'd love to hear from you!
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">ðŸ“§</span>
              <span>growcommongardening@gmail.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">ðŸ“</span>
              <span>Maryland, USA</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">ðŸŒ</span>
              <span>www.growcommon.com</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;

