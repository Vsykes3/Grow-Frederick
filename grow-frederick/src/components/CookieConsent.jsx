import React, { useState, useEffect } from 'react';
import './CookieConsent.css';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = localStorage.getItem('cookieConsent');
    if (!hasConsent) {
      setShowConsent(true);
    } else {
      setConsentGiven(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
    setConsentGiven(true);
    
    // Initialize analytics/tracking here
    initializeTracking();
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowConsent(false);
    setConsentGiven(false);
  };

  const initializeTracking = () => {
    // Track page views
    const trackPageView = () => {
      const pageData = {
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}x${screen.height}`,
        language: navigator.language
      };
      
      // Store in localStorage for demo purposes
      // In production, this would send to analytics service
      const analytics = JSON.parse(localStorage.getItem('analytics') || '[]');
      analytics.push(pageData);
      localStorage.setItem('analytics', JSON.stringify(analytics));
    };

    // Track user interactions
    const trackInteraction = (event, element) => {
      const interactionData = {
        event,
        element: element.tagName || element.className || 'unknown',
        timestamp: new Date().toISOString(),
        page: window.location.pathname
      };
      
      const interactions = JSON.parse(localStorage.getItem('interactions') || '[]');
      interactions.push(interactionData);
      localStorage.setItem('interactions', JSON.stringify(interactions));
    };

    // Add event listeners for tracking
    document.addEventListener('click', (e) => {
      if (consentGiven) {
        trackInteraction('click', e.target);
      }
    });

    // Track page views
    if (consentGiven) {
      trackPageView();
    }

    // Track route changes
    const originalPushState = history.pushState;
    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      if (consentGiven) {
        setTimeout(trackPageView, 100);
      }
    };
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="cookie-consent">
      <div className="cookie-content">
        <div className="cookie-icon">ðŸª</div>
        <div className="cookie-text">
          <h3>We Value Your Privacy</h3>
          <p>
            We use cookies and similar technologies to enhance your gardening experience, 
            provide personalized content, and analyze site usage. By continuing to use 
            GrowCommon, you consent to our use of cookies.
          </p>
          <div className="cookie-links">
            <a href="/privacy" className="privacy-link">Privacy Policy</a>
            <a href="/terms" className="terms-link">Terms of Service</a>
          </div>
        </div>
        <div className="cookie-actions">
          <button onClick={handleDecline} className="cookie-decline">
            Decline
          </button>
          <button onClick={handleAccept} className="cookie-accept">
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;

