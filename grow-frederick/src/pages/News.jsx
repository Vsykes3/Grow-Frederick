import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './News.css';

const News = () => {
  // State management
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [pestAlerts, setPestAlerts] = useState([]);
  const [gardeningNews, setGardeningNews] = useState([]);
  const [activeTab, setActiveTab] = useState('pest-alerts');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API Keys
  const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  // Pest alert database based on location and season
  const pestAlertDatabase = {
    '6a-7b': { // Frederick, MD area
      'Spring': [
        {
          id: 1,
          pest: 'Aphids',
          severity: 'High',
          crops: ['Tomatoes', 'Peppers', 'Lettuce'],
          description: 'Aphids are appearing early this spring due to mild temperatures. Monitor new growth closely.',
          symptoms: 'Curled leaves, sticky residue, stunted growth',
          solutions: ['Spray with water', 'Introduce ladybugs', 'Use neem oil'],
          affectedAreas: ['Frederick', 'Baltimore', 'Washington DC'],
          date: '2024-03-15'
        },
        {
          id: 2,
          pest: 'Slugs',
          severity: 'Medium',
          crops: ['Lettuce', 'Spinach', 'Cabbage'],
          description: 'Wet spring conditions are creating ideal slug habitats in garden beds.',
          symptoms: 'Irregular holes in leaves, slimy trails',
          solutions: ['Remove hiding places', 'Use copper barriers', 'Hand pick at night'],
          affectedAreas: ['Frederick', 'Baltimore'],
          date: '2024-03-12'
        },
        {
          id: 3,
          pest: 'Cutworms',
          severity: 'High',
          crops: ['Tomatoes', 'Peppers', 'Corn'],
          description: 'Cutworms are active and cutting off young seedlings at soil level.',
          symptoms: 'Seedlings cut off at base, wilting plants',
          solutions: ['Use collars around stems', 'Till soil before planting', 'Remove debris'],
          affectedAreas: ['Frederick', 'Baltimore', 'Washington DC'],
          date: '2024-03-10'
        }
      ],
      'Summer': [
        {
          id: 4,
          pest: 'Tomato Hornworms',
          severity: 'High',
          crops: ['Tomatoes', 'Peppers', 'Eggplant'],
          description: 'Large green caterpillars are defoliating tomato plants rapidly.',
          symptoms: 'Large holes in leaves, stripped branches, green droppings',
          solutions: ['Hand pick caterpillars', 'Use Bt spray', 'Introduce parasitic wasps'],
          affectedAreas: ['Frederick', 'Baltimore', 'Washington DC'],
          date: '2024-06-20'
        },
        {
          id: 5,
          pest: 'Spider Mites',
          severity: 'Medium',
          crops: ['Cucumbers', 'Beans', 'Strawberries'],
          description: 'Hot, dry conditions are causing spider mite outbreaks in vegetable gardens.',
          symptoms: 'Yellow stippling on leaves, fine webbing, leaf drop',
          solutions: ['Increase humidity', 'Spray with water', 'Use insecticidal soap'],
          affectedAreas: ['Frederick', 'Baltimore'],
          date: '2024-06-15'
        }
      ],
      'Fall': [
        {
          id: 6,
          pest: 'Cabbage Loopers',
          severity: 'Medium',
          crops: ['Cabbage', 'Broccoli', 'Cauliflower'],
          description: 'Fall brassica crops are being attacked by cabbage loopers.',
          symptoms: 'Holes in leaves, green caterpillars, skeletonized plants',
          solutions: ['Use row covers', 'Hand pick larvae', 'Apply Bt spray'],
          affectedAreas: ['Frederick', 'Baltimore'],
          date: '2024-09-10'
        }
      ]
    },
    '7a-8b': { // Southern Maryland
      'Spring': [
        {
          id: 7,
          pest: 'Fire Ants',
          severity: 'High',
          crops: ['All crops'],
          description: 'Fire ant mounds are appearing in gardens and fields.',
          symptoms: 'Painful stings, raised mounds, aggressive behavior',
          solutions: ['Use bait treatments', 'Boil water on mounds', 'Professional treatment'],
          affectedAreas: ['Southern MD', 'Eastern Shore'],
          date: '2024-03-20'
        }
      ]
    }
  };

  // Gardening news database
  const gardeningNewsDatabase = [
    {
      id: 1,
      title: 'New USDA Hardiness Zone Map Released for 2024',
      summary: 'The USDA has updated plant hardiness zones, with many areas seeing zone shifts due to climate change.',
      content: 'The new map shows that many regions have shifted to warmer zones, affecting planting recommendations for gardeners. Maryland has moved from zone 6b to 7a, allowing for longer growing seasons and new plant possibilities.',
      category: 'Climate & Zones',
      date: '2024-03-20',
      author: 'USDA Research',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
      tags: ['USDA', 'Hardiness Zones', 'Climate Change']
    },
    {
      id: 2,
      title: 'Organic Pest Control Methods Gaining Popularity',
      summary: 'More gardeners are turning to natural pest control methods to protect beneficial insects and reduce chemical use.',
      content: 'Integrated Pest Management (IPM) techniques are becoming the standard for home gardeners. Methods include companion planting, beneficial insect introduction, and organic sprays. Local garden centers are reporting increased demand for organic pest control products.',
      category: 'Pest Management',
      date: '2024-03-18',
      author: 'Garden Research Institute',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      tags: ['Organic Gardening', 'Pest Control', 'IPM']
    },
    {
      id: 3,
      title: 'Community Gardens Flourishing in Maryland',
      summary: 'Local community gardens are seeing record participation and harvests, fostering community connections and food security.',
      content: 'Maryland now has 15 active community gardens with over 200 participants. These gardens not only provide fresh produce but also serve as educational spaces for sustainable gardening practices. Many gardens are implementing rainwater harvesting and composting systems.',
      category: 'Community',
      date: '2024-03-15',
      author: 'Maryland Extension',
      image: 'https://images.unsplash.com/photo-1574943320219-553eb213f65f?w=400',
      tags: ['Community Gardens', 'Maryland', 'Sustainability']
    },
    {
      id: 4,
      title: 'Native Plant Sales Surge as Pollinator Gardens Grow',
      summary: 'Demand for native plants is increasing as gardeners create pollinator-friendly habitats.',
      content: 'Local nurseries are reporting a 40% increase in native plant sales. Gardeners are creating pollinator corridors and reducing lawn areas to support declining bee and butterfly populations. The Maryland Native Plant Society is hosting workshops on native plant selection and care.',
      category: 'Pollinators',
      date: '2024-03-12',
      author: 'Maryland Native Plant Society',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      tags: ['Native Plants', 'Pollinators', 'Biodiversity']
    },
    {
      id: 5,
      title: 'Weather Patterns Affecting Planting Schedules',
      summary: 'Unusual weather patterns are causing gardeners to adjust traditional planting calendars.',
      content: 'Early spring temperatures and late frosts are challenging traditional planting schedules. Extension agents recommend monitoring soil temperatures and using frost protection methods. Many gardeners are experimenting with succession planting to extend harvests.',
      category: 'Weather & Timing',
      date: '2024-03-10',
      author: 'Maryland Extension Service',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
      tags: ['Weather', 'Planting Schedule', 'Frost Protection']
    }
  ];

  useEffect(() => {
    // Get user location on component mount
    getUserLocation();
  }, []);

  // Get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          getWeatherData(latitude, longitude);
          getPestAlerts(latitude, longitude);
        },
        (error) => {
          console.warn('Geolocation failed:', error);
          // Use Maryland as fallback
          const fallbackLocation = { lat: 39.4143, lng: -77.4105 };
          setLocation(fallbackLocation);
          getWeatherData(fallbackLocation.lat, fallbackLocation.lng);
          getPestAlerts(fallbackLocation.lat, fallbackLocation.lng);
        }
      );
    }
  };

  // Get weather data from OpenWeatherMap API
  const getWeatherData = async (lat, lng) => {
    if (!OPENWEATHER_API_KEY) {
      console.warn('OpenWeather API key not configured');
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_API_KEY}&units=imperial`
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  // Get pest alerts based on location and current season
  const getPestAlerts = (lat, lng) => {
    // Determine hardiness zone based on latitude
    let hardinessZone = '6a-7b'; // Default to Maryland area
    if (lat >= 40) hardinessZone = '6a-7b';
    else if (lat >= 35) hardinessZone = '7a-8b';
    else hardinessZone = '8a-9b';

    // Determine current season
    const month = new Date().getMonth();
    let currentSeason = 'Spring';
    if (month >= 5 && month <= 7) currentSeason = 'Summer';
    else if (month >= 8 && month <= 10) currentSeason = 'Fall';
    else if (month >= 11 || month <= 1) currentSeason = 'Winter';

    // Get pest alerts for current zone and season
    const zoneAlerts = pestAlertDatabase[hardinessZone];
    if (zoneAlerts && zoneAlerts[currentSeason]) {
      setPestAlerts(zoneAlerts[currentSeason]);
    } else {
      setPestAlerts([]);
    }
  };

  // Get current season name
  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    if (month >= 8 && month <= 10) return 'Fall';
    return 'Winter';
  };

  // Get weather-based gardening recommendations
  const getWeatherRecommendations = () => {
    if (!weather) return [];

    const temp = weather.main.temp;
    const humidity = weather.main.humidity;
    const conditions = weather.weather[0].main.toLowerCase();
    const recommendations = [];

    // Temperature-based recommendations
    if (temp < 32) {
      recommendations.push({
        type: 'warning',
        message: 'Frost warning: Protect sensitive plants and bring containers indoors',
        icon: 'â„ï¸'
      });
    } else if (temp < 50) {
      recommendations.push({
        type: 'info',
        message: 'Cold weather: Focus on cold-hardy vegetables and early spring crops',
        icon: 'ðŸŒ±'
      });
    } else if (temp < 70) {
      recommendations.push({
        type: 'success',
        message: 'Moderate weather: Ideal conditions for most spring and fall crops',
        icon: 'ðŸŒ¿'
      });
    } else if (temp < 85) {
      recommendations.push({
        type: 'success',
        message: 'Warm weather: Great for summer vegetables and heat-loving plants',
        icon: 'â˜€ï¸'
      });
    } else {
      recommendations.push({
        type: 'warning',
        message: 'Hot weather: Provide shade, extra water, and protect from heat stress',
        icon: 'ðŸ”¥'
      });
    }

    // Humidity-based recommendations
    if (humidity > 80) {
      recommendations.push({
        type: 'warning',
        message: 'High humidity: Monitor for fungal diseases and improve air circulation',
        icon: 'ðŸ’§'
      });
    } else if (humidity < 30) {
      recommendations.push({
        type: 'info',
        message: 'Low humidity: Increase watering frequency and consider misting',
        icon: 'ðŸŒµ'
      });
    }

    // Weather condition recommendations
    if (conditions.includes('rain')) {
      recommendations.push({
        type: 'info',
        message: 'Rainy conditions: Reduce watering, check for drainage issues',
        icon: 'ðŸŒ§ï¸'
      });
    } else if (conditions.includes('wind')) {
      recommendations.push({
        type: 'warning',
        message: 'Windy conditions: Stake tall plants and protect from wind damage',
        icon: 'ðŸ’¨'
      });
    }

    return recommendations;
  };

  return (
    <div className="stack">
      <Navbar />
      
      <div className="news-container">
        <h1>ðŸ“° Garden News & Alerts</h1>
        
        {/* Weather Summary */}
        {location && weather && (
          <div className="weather-summary">
            <div className="weather-header">
              <h3>ðŸŒ¤ï¸ Current Weather in Your Area</h3>
              <p className="location-info">
                ðŸ“ {location.lat.toFixed(4)}Â°N, {location.lng.toFixed(4)}Â°W
              </p>
            </div>
            
            <div className="weather-details">
              <div className="weather-main">
                <div className="temperature">
                  <span className="temp-value">{Math.round(weather.main.temp)}Â°F</span>
                  <span className="temp-feels">Feels like {Math.round(weather.main.feels_like)}Â°F</span>
                </div>
                <div className="weather-info">
                  <p className="conditions">{weather.weather[0].description}</p>
                  <p className="humidity">Humidity: {weather.main.humidity}%</p>
                  <p className="wind">Wind: {Math.round(weather.wind.speed)} mph</p>
                </div>
              </div>
              
              <div className="weather-recommendations">
                <h4>ðŸŒ± Gardening Recommendations</h4>
                {getWeatherRecommendations().map((rec, index) => (
                  <div key={index} className={`recommendation ${rec.type}`}>
                    <span className="rec-icon">{rec.icon}</span>
                    <span className="rec-message">{rec.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="news-tabs">
          <button 
            className={`news-tab ${activeTab === 'pest-alerts' ? 'active' : ''}`}
            onClick={() => setActiveTab('pest-alerts')}
          >
            ðŸ› Pest Alerts
          </button>
          <button 
            className={`news-tab ${activeTab === 'gardening-news' ? 'active' : ''}`}
            onClick={() => setActiveTab('gardening-news')}
          >
            ðŸ“° Gardening News
          </button>
          <button 
            className={`news-tab ${activeTab === 'seasonal-tips' ? 'active' : ''}`}
            onClick={() => setActiveTab('seasonal-tips')}
          >
            ðŸŒ¿ Seasonal Tips
          </button>
        </div>

        {/* Pest Alerts Tab */}
        {activeTab === 'pest-alerts' && (
          <div className="pest-alerts-tab">
            <div className="alerts-header">
              <h3>ðŸ› Pest Alerts for {getCurrentSeason()} 2024</h3>
              <p className="alerts-subtitle">
                Based on your location and current season. Monitor your garden for these pests.
              </p>
            </div>

            {pestAlerts.length > 0 ? (
              <div className="alerts-grid">
                {pestAlerts.map((alert) => (
                  <div key={alert.id} className={`alert-card severity-${alert.severity.toLowerCase()}`}>
                    <div className="alert-header">
                      <h4>{alert.pest}</h4>
                      <span className={`severity-badge ${alert.severity.toLowerCase()}`}>
                        {alert.severity}
                      </span>
                    </div>
                    
                    <p className="alert-description">{alert.description}</p>
                    
                    <div className="alert-details">
                      <div className="detail-section">
                        <h5>ðŸŒ¾ Affected Crops</h5>
                        <div className="crops-list">
                          {alert.crops.map((crop, index) => (
                            <span key={index} className="crop-tag">{crop}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="detail-section">
                        <h5>ðŸ” Symptoms</h5>
                        <p>{alert.symptoms}</p>
                      </div>
                      
                      <div className="detail-section">
                        <h5>ðŸ’¡ Solutions</h5>
                        <ul className="solutions-list">
                          {alert.solutions.map((solution, index) => (
                            <li key={index}>{solution}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="detail-section">
                        <h5>ðŸ“ Affected Areas</h5>
                        <div className="areas-list">
                          {alert.affectedAreas.map((area, index) => (
                            <span key={index} className="area-tag">{area}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="alert-footer">
                      <span className="alert-date">Alert Date: {alert.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-alerts">
                <h4>âœ… No Current Pest Alerts</h4>
                <p>Great news! There are no active pest alerts for your area and current season.</p>
                <p>Continue monitoring your garden and practice good preventive measures:</p>
                <ul>
                  <li>Inspect plants regularly for early signs of pests</li>
                  <li>Use companion planting to deter pests naturally</li>
                  <li>Maintain healthy soil and proper plant spacing</li>
                  <li>Remove plant debris and weeds regularly</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Gardening News Tab */}
        {activeTab === 'gardening-news' && (
          <div className="gardening-news-tab">
            <h3>ðŸ“° Latest Gardening News & Updates</h3>
            
            <div className="news-grid">
              {gardeningNewsDatabase.map((article) => (
                <div key={article.id} className="news-card">
                  <div className="news-image">
                    <img src={article.image} alt={article.title} />
                  </div>
                  
                  <div className="news-content">
                    <div className="news-meta">
                      <span className="news-category">{article.category}</span>
                      <span className="news-date">{article.date}</span>
                    </div>
                    
                    <h4 className="news-title">{article.title}</h4>
                    <p className="news-summary">{article.summary}</p>
                    
                    <div className="news-tags">
                      {article.tags.map((tag, index) => (
                        <span key={index} className="news-tag">{tag}</span>
                      ))}
                    </div>
                    
                    <div className="news-author">
                      By {article.author}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Seasonal Tips Tab */}
        {activeTab === 'seasonal-tips' && (
          <div className="seasonal-tips-tab">
            <h3>ðŸŒ¿ {getCurrentSeason()} Gardening Tips</h3>
            
            <div className="seasonal-content">
              {getCurrentSeason() === 'Spring' && (
                <div className="season-tips">
                  <h4>ðŸŒ± Spring Gardening Checklist</h4>
                  <ul>
                    <li>Test soil pH and amend as needed</li>
                    <li>Start seeds indoors for warm-season crops</li>
                    <li>Clean and sharpen garden tools</li>
                    <li>Prune fruit trees and berry bushes</li>
                    <li>Prepare garden beds with compost</li>
                    <li>Plant cool-season vegetables (peas, lettuce, spinach)</li>
                    <li>Monitor for early spring pests</li>
                    <li>Set up trellises and supports</li>
                  </ul>
                  
                  <h4>ðŸŒ¡ï¸ Spring Weather Considerations</h4>
                  <p>Spring weather can be unpredictable. Be prepared for late frosts and protect tender seedlings with row covers or cloches. Monitor soil temperatures before planting warm-season crops.</p>
                </div>
              )}
              
              {getCurrentSeason() === 'Summer' && (
                <div className="season-tips">
                  <h4>â˜€ï¸ Summer Garden Maintenance</h4>
                  <ul>
                    <li>Water deeply and consistently (early morning is best)</li>
                    <li>Mulch to retain soil moisture</li>
                    <li>Harvest vegetables regularly to encourage production</li>
                    <li>Monitor for summer pests (aphids, hornworms, spider mites)</li>
                    <li>Provide shade for heat-sensitive plants</li>
                    <li>Fertilize heavy feeders like tomatoes and corn</li>
                    <li>Start fall crop seeds indoors</li>
                    <li>Check for signs of disease and treat promptly</li>
                  </ul>
                  
                  <h4>ðŸ’§ Summer Watering Tips</h4>
                  <p>Water deeply but less frequently to encourage deep root growth. Use soaker hoses or drip irrigation to minimize water waste and prevent fungal diseases.</p>
                </div>
              )}
              
              {getCurrentSeason() === 'Fall' && (
                <div className="season-tips">
                  <h4>ðŸ‚ Fall Garden Preparation</h4>
                  <ul>
                    <li>Plant cool-season crops for fall harvest</li>
                    <li>Harvest and preserve summer vegetables</li>
                    <li>Clean up garden debris to reduce pest overwintering</li>
                    <li>Plant cover crops to improve soil</li>
                    <li>Divide and transplant perennials</li>
                    <li>Plant spring-flowering bulbs</li>
                    <li>Test and amend soil for next season</li>
                    <li>Protect tender plants from early frosts</li>
                  </ul>
                  
                  <h4>ðŸ Fall Planting Guide</h4>
                  <p>Fall is an excellent time to plant many vegetables. Cool temperatures and consistent moisture create ideal growing conditions for crops like kale, broccoli, and garlic.</p>
                </div>
              )}
              
              {getCurrentSeason() === 'Winter' && (
                <div className="season-tips">
                  <h4>â„ï¸ Winter Garden Planning</h4>
                  <ul>
                    <li>Plan next year's garden layout</li>
                    <li>Order seeds and supplies early</li>
                    <li>Start seeds indoors for early spring planting</li>
                    <li>Maintain indoor herb gardens</li>
                    <li>Protect overwintering plants</li>
                    <li>Clean and organize garden tools</li>
                    <li>Read gardening books and plan crop rotations</li>
                    <li>Attend gardening workshops and classes</li>
                  </ul>
                  
                  <h4>ðŸ  Indoor Gardening</h4>
                  <p>Winter doesn't mean gardening stops! Grow herbs, microgreens, and sprouts indoors. Use grow lights to supplement natural light and maintain consistent temperatures.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default News;

