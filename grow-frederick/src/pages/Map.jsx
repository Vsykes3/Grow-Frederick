<<<<<<< HEAD
﻿import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow, HeatmapLayer } from "@react-google-maps/api";
import axios from 'axios';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Map.css";
=======
import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import "./map.css";
>>>>>>> e32df789ac980f63bca9a10cc1f7b716b1bfb5de

const containerStyle = { width: "100%", height: "600px" };
const libraries = []; // no legacy Places API

export default function MapPage() {
  const [center, setCenter] = useState(null);
<<<<<<< HEAD
  const [mapError, setMapError] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [weatherOverlay, setWeatherOverlay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [heatmapData, setHeatmapData] = useState([]);
  const [heatmapType, setHeatmapType] = useState('temperature');
  const [mapType, setMapType] = useState('roadmap');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [weatherStations, setWeatherStations] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [rainfallData, setRainfallData] = useState([]);
  const mapRef = useRef(null);

  // API Keys - Using fallback keys for development
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY || "AIzaSyBvOkBw3cJ1I6hI7jK8lM9nO0pQ1rS2tU3v";
  const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "your_openweather_api_key_here";
=======
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const mapRef = useRef(null);
>>>>>>> e32df789ac980f63bca9a10cc1f7b716b1bfb5de

  // Get user location
  useEffect(() => {
    // Always set the API key and initialize
    setApiKey(GOOGLE_MAPS_API_KEY);
    
    // Get user location
    getUserLocation();
    
    // Generate sample weather data for heatmaps
    generateSampleWeatherData();
  }, [GOOGLE_MAPS_API_KEY]);

  // Generate sample weather data for heatmaps
  const generateSampleWeatherData = () => {
    const marylandBounds = {
      north: 39.7,
      south: 37.9,
      east: -75.0,
      west: -79.5
    };
    
    const tempData = [];
    const humidityData = [];
    const rainfallData = [];
    
    // Generate sample data points across Maryland
    for (let i = 0; i < 50; i++) {
      const lat = marylandBounds.south + Math.random() * (marylandBounds.north - marylandBounds.south);
      const lng = marylandBounds.west + Math.random() * (marylandBounds.east - marylandBounds.west);
      
      // Temperature data (60-85Â°F)
      const temp = 60 + Math.random() * 25;
      tempData.push({
        location: new window.google.maps.LatLng(lat, lng),
        weight: (temp - 60) / 25 // Normalize to 0-1
      });
      
      // Humidity data (30-90%)
      const humidity = 30 + Math.random() * 60;
      humidityData.push({
        location: new window.google.maps.LatLng(lat, lng),
        weight: humidity / 100 // Normalize to 0-1
      });
      
      // Rainfall data (0-2 inches)
      const rainfall = Math.random() * 2;
      rainfallData.push({
        location: new window.google.maps.LatLng(lat, lng),
        weight: rainfall / 2 // Normalize to 0-1
      });
    }
    
    setTemperatureData(tempData);
    setHumidityData(humidityData);
    setRainfallData(rainfallData);
  };

  // Get user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
<<<<<<< HEAD
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = { lat: latitude, lng: longitude };
          setCenter(location);
          setSelectedLocation(location);
          getWeatherData(latitude, longitude);
          getForecastData(latitude, longitude);
        },
        (error) => {
          console.warn("Geolocation failed:", error);
          // Use Maryland as fallback
          const fallbackLocation = { lat: 39.4143, lng: -77.4105 };
          setCenter(fallbackLocation);
          setSelectedLocation(fallbackLocation);
          getWeatherData(fallbackLocation.lat, fallbackLocation.lng);
          getForecastData(fallbackLocation.lat, fallbackLocation.lng);
        }
      );
    } else {
      // Fallback if geolocation is not available
      const fallbackLocation = { lat: 39.4143, lng: -77.4105 };
      setCenter(fallbackLocation);
      setSelectedLocation(fallbackLocation);
      getWeatherData(fallbackLocation.lat, fallbackLocation.lng);
      getForecastData(fallbackLocation.lat, fallbackLocation.lng);
=======
        (pos) =>
          setCenter({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        () =>
          setCenter({
            lat: 40.7128,
            lng: -74.006, // fallback NYC
          })
      );
    } else {
      setCenter({
        lat: 40.7128,
        lng: -74.006,
      });
>>>>>>> e32df789ac980f63bca9a10cc1f7b716b1bfb5de
    }
  };

  // Get current weather data
  const getWeatherData = async (lat, lng) => {
    // Use sample data if API key is not available
    if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === "your_openweather_api_key_here") {
      console.warn("OpenWeather API key not configured, using sample data");
      const sampleWeather = {
        main: {
          temp: 72 + Math.random() * 15, // 72-87Â°F
          humidity: 45 + Math.random() * 30, // 45-75%
          pressure: 1013,
          feels_like: 75 + Math.random() * 10
        },
        weather: [{
          main: "Clear",
          description: "clear sky",
          icon: "01d"
        }],
        wind: {
          speed: 5 + Math.random() * 10,
          deg: Math.random() * 360
        },
        name: "Maryland"
      };
      setWeather(sampleWeather);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_API_KEY}&units=imperial`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
      // Fallback to sample data on error
      const sampleWeather = {
        main: {
          temp: 72 + Math.random() * 15,
          humidity: 45 + Math.random() * 30,
          pressure: 1013,
          feels_like: 75 + Math.random() * 10
        },
        weather: [{
          main: "Clear",
          description: "clear sky",
          icon: "01d"
        }],
        wind: {
          speed: 5 + Math.random() * 10,
          deg: Math.random() * 360
        },
        name: "Maryland"
      };
      setWeather(sampleWeather);
    } finally {
      setLoading(false);
    }
  };

  // Get 7-day forecast data
  const getForecastData = async (lat, lng) => {
    // Use sample data if API key is not available
    if (!OPENWEATHER_API_KEY || OPENWEATHER_API_KEY === "your_openweather_api_key_here") {
      console.warn("OpenWeather API key not configured, using sample forecast data");
      const sampleForecast = {
        list: Array.from({ length: 5 }, (_, i) => ({
          dt_txt: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
          main: {
            temp: 70 + Math.random() * 20,
            humidity: 40 + Math.random() * 40
          },
          weather: [{
            main: ["Clear", "Clouds", "Rain"][Math.floor(Math.random() * 3)],
            description: "sample weather",
            icon: "01d"
          }]
        }))
      };
      setForecast(sampleForecast);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${OPENWEATHER_API_KEY}&units=imperial`
      );
      setForecast(response.data);
    } catch (error) {
      console.error("Error fetching forecast:", error);
      // Fallback to sample data
      const sampleForecast = {
        list: Array.from({ length: 5 }, (_, i) => ({
          dt_txt: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString(),
          main: {
            temp: 70 + Math.random() * 20,
            humidity: 40 + Math.random() * 40
          },
          weather: [{
            main: ["Clear", "Clouds", "Rain"][Math.floor(Math.random() * 3)],
            description: "sample weather",
            icon: "01d"
          }]
        }))
      };
      setForecast(sampleForecast);
    }
  };

  // Switch heatmap type
  const switchHeatmapType = (type) => {
    setHeatmapType(type);
    switch (type) {
      case 'temperature':
        setHeatmapData(temperatureData);
        break;
      case 'humidity':
        setHeatmapData(humidityData);
        break;
      case 'rainfall':
        setHeatmapData(rainfallData);
        break;
      default:
        setHeatmapData([]);
    }
  };

  // Toggle heatmap visibility
  const toggleHeatmap = () => {
    setShowHeatmap(!showHeatmap);
    if (!showHeatmap) {
      switchHeatmapType(heatmapType);
    }
  };

  // Handle map click to get weather for new location
  const handleMapClick = (event) => {
    const newLocation = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    setSelectedLocation(newLocation);
    getWeatherData(newLocation.lat, newLocation.lng);
    getForecastData(newLocation.lat, newLocation.lng);
  };

  // Get growing recommendations based on weather
  const getGrowingRecommendations = () => {
    if (!weather) return [];

    const temp = weather.main.temp;
    const humidity = weather.main.humidity;
    const conditions = weather.weather[0].main.toLowerCase();
    const recommendations = [];

    // Temperature-based recommendations
    if (temp < 32) {
      recommendations.push({
        type: 'warning',
        message: 'Frost warning: Protect sensitive plants',
        icon: 'â„ï¸'
      });
    } else if (temp < 50) {
      recommendations.push({
        type: 'info',
        message: 'Cold weather: Focus on cold-hardy vegetables',
        icon: 'ðŸŒ±'
      });
    } else if (temp < 70) {
      recommendations.push({
        type: 'success',
        message: 'Moderate weather: Ideal for most spring crops',
        icon: 'ðŸŒ¿'
      });
    } else if (temp < 85) {
      recommendations.push({
        type: 'success',
        message: 'Warm weather: Great for summer vegetables',
        icon: 'â˜€ï¸'
      });
    } else {
      recommendations.push({
        type: 'warning',
        message: 'Hot weather: Provide shade and extra water',
        icon: 'ðŸ”¥'
      });
    }

    // Humidity-based recommendations
    if (humidity > 80) {
      recommendations.push({
        type: 'warning',
        message: 'High humidity: Monitor for fungal diseases',
        icon: 'ðŸ’§'
      });
    } else if (humidity < 30) {
      recommendations.push({
        type: 'info',
        message: 'Low humidity: Increase watering frequency',
        icon: 'ðŸŒµ'
      });
    }

    // Weather condition recommendations
    if (conditions.includes('rain')) {
      recommendations.push({
        type: 'info',
        message: 'Rainy conditions: Reduce watering',
        icon: 'ðŸŒ§ï¸'
      });
    } else if (conditions.includes('wind')) {
      recommendations.push({
        type: 'warning',
        message: 'Windy conditions: Stake tall plants',
        icon: 'ðŸ’¨'
      });
    }

    return recommendations;
  };

  // Get hardiness zone based on latitude
  const getHardinessZone = (lat) => {
    if (lat >= 40) return '6a-7b';
    else if (lat >= 35) return '7a-8b';
    else return '8a-9b';
  };

  // Format forecast data for display
  const getDailyForecast = () => {
    if (!forecast) return [];

    const dailyData = {};
    forecast.list.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyData[date]) {
        dailyData[date] = {
          date: date,
          temp: item.main.temp,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
          humidity: item.main.humidity
        };
      }
    });

    return Object.values(dailyData).slice(0, 7);
  };

  // Always render the map with fallback functionality

  // Fetch weather for current center
  useEffect(() => {
    if (!center) return;

    const fetchWeather = async () => {
      try {
        const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${center.lat}&lon=${center.lng}&units=metric&appid=${API_KEY}`
        );
        setWeatherData(res.data);
      } catch (err) {
        console.error("Failed to fetch weather:", err);
      }
    };

    fetchWeather();
  }, [center]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) return;

    if (!window.google || !window.google.maps) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: search }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        const newCenter = { lat: location.lat(), lng: location.lng() };
        setCenter(newCenter);
        if (mapRef.current) mapRef.current.panTo(newCenter);
        setSearch(""); // clear input
      } else {
        alert("Address not found.");
      }
    });
  };

  return (
    <div className="stack">
      <Navbar />
      <div className="map-space"></div>
<<<<<<< HEAD
      
      <div className="map-container">
        <div className="map-controls">
          <div className="control-group">
            <button 
              className={`control-btn ${weatherOverlay ? 'active' : ''}`}
              onClick={() => setWeatherOverlay(!weatherOverlay)}
            >
              {weatherOverlay ? 'ðŸŒ¤ï¸ Hide Weather' : 'ðŸŒ¤ï¸ Show Weather'}
            </button>
            <button 
              className="control-btn"
              onClick={getUserLocation}
            >
              ðŸ“ My Location
            </button>
          </div>
          
          <div className="heatmap-controls">
            <button 
              className={`control-btn ${showHeatmap ? 'active' : ''}`}
              onClick={toggleHeatmap}
            >
              {showHeatmap ? 'ðŸ”¥ Hide Heatmap' : 'ðŸ”¥ Show Heatmap'}
            </button>
            
            {showHeatmap && (
              <div className="heatmap-type-selector">
                <button 
                  className={`heatmap-btn ${heatmapType === 'temperature' ? 'active' : ''}`}
                  onClick={() => switchHeatmapType('temperature')}
                >
                  ðŸŒ¡ï¸ Temperature
                </button>
                <button 
                  className={`heatmap-btn ${heatmapType === 'humidity' ? 'active' : ''}`}
                  onClick={() => switchHeatmapType('humidity')}
                >
                  ðŸ’§ Humidity
                </button>
                <button 
                  className={`heatmap-btn ${heatmapType === 'rainfall' ? 'active' : ''}`}
                  onClick={() => switchHeatmapType('rainfall')}
                >
                  ðŸŒ§ï¸ Rainfall
                </button>
              </div>
            )}
          </div>
          
          <div className="map-type-controls">
            <select 
              className="map-type-selector"
              value={mapType}
              onChange={(e) => setMapType(e.target.value)}
            >
              <option value="roadmap">ðŸ—ºï¸ Road Map</option>
              <option value="satellite">ðŸ›°ï¸ Satellite</option>
              <option value="hybrid">ðŸŒ Hybrid</option>
              <option value="terrain">ðŸ”ï¸ Terrain</option>
            </select>
          </div>
        </div>

        <LoadScript googleMapsApiKey={apiKey}>
            {center ? (
              <GoogleMap
                ref={mapRef}
                mapContainerStyle={containerStyle}
                center={center}
                zoom={12}
                mapTypeId={mapType}
                onClick={handleMapClick}
                options={{
                  styles: weatherOverlay ? [
                    {
                      featureType: "all",
                      elementType: "labels.text.fill",
                      stylers: [{ color: "#2c5530" }]
                    },
                    {
                      featureType: "water",
                      elementType: "geometry",
                      stylers: [{ color: "#a2daf2" }]
                    }
                  ] : []
                }}
              >
                {/* Heatmap Layer */}
                {showHeatmap && heatmapData.length > 0 && (
                  <HeatmapLayer
                    data={heatmapData}
                    options={{
                      radius: 50,
                      opacity: 0.6,
                      gradient: heatmapType === 'temperature' 
                        ? ['rgba(0,255,255,0)', 'rgba(0,255,255,1)', 'rgba(0,191,255,1)', 'rgba(0,127,255,1)', 'rgba(0,63,255,1)', 'rgba(0,0,255,1)', 'rgba(0,0,223,1)', 'rgba(0,0,191,1)', 'rgba(0,0,159,1)', 'rgba(0,0,127,1)', 'rgba(63,0,91,1)', 'rgba(127,0,63,1)', 'rgba(191,0,31,1)', 'rgba(255,0,0,1)']
                        : heatmapType === 'humidity'
                        ? ['rgba(255,255,255,0)', 'rgba(255,255,255,1)', 'rgba(255,255,0,1)', 'rgba(255,191,0,1)', 'rgba(255,127,0,1)', 'rgba(255,63,0,1)', 'rgba(255,0,0,1)', 'rgba(191,0,0,1)', 'rgba(127,0,0,1)', 'rgba(63,0,0,1)', 'rgba(0,0,0,1)']
                        : ['rgba(0,255,255,0)', 'rgba(0,255,255,1)', 'rgba(0,191,255,1)', 'rgba(0,127,255,1)', 'rgba(0,63,255,1)', 'rgba(0,0,255,1)', 'rgba(0,0,223,1)', 'rgba(0,0,191,1)', 'rgba(0,0,159,1)', 'rgba(0,0,127,1)', 'rgba(63,0,91,1)', 'rgba(127,0,63,1)', 'rgba(191,0,31,1)', 'rgba(255,0,0,1)']
                    }}
                  />
                )}
                {/* User's current location marker */}
                <Marker 
                  position={center}
                  icon={{
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="8" fill="#28a745" stroke="white" stroke-width="2"/>
                        <circle cx="12" cy="12" r="3" fill="white"/>
                      </svg>
                    `),
                    scaledSize: new window.google.maps.Size(24, 24)
                  }}
                />

                {/* Selected location marker with weather info */}
                {selectedLocation && selectedLocation !== center && (
                  <Marker 
                    position={selectedLocation}
                    icon={{
                      url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="8" fill="#007bff" stroke="white" stroke-width="2"/>
                          <circle cx="12" cy="12" r="3" fill="white"/>
                        </svg>
                      `),
                      scaledSize: new window.google.maps.Size(24, 24)
                    }}
                  >
                    <InfoWindow>
                      <div className="weather-info-window">
                        <h4>Weather Information</h4>
                        {weather && (
                          <div className="weather-details">
                            <p><strong>Temperature:</strong> {Math.round(weather.main.temp)}Â°F</p>
                            <p><strong>Conditions:</strong> {weather.weather[0].description}</p>
                            <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
                            <p><strong>Wind:</strong> {Math.round(weather.wind.speed)} mph</p>
                          </div>
                        )}
                      </div>
                    </InfoWindow>
                  </Marker>
                )}
              </GoogleMap>
            ) : (
              <div className="map-loading">
                <p>Loading map...</p>
              </div>
            )}
          </LoadScript>

        {/* Weather Information Panel */}
        {weather && selectedLocation && (
          <div className="weather-panel">
            <div className="weather-header">
              <h3>ðŸŒ¤ï¸ Weather & Growing Conditions</h3>
              <p className="location-coords">
                ðŸ“ {selectedLocation.lat.toFixed(4)}Â°N, {selectedLocation.lng.toFixed(4)}Â°W
              </p>
              <p className="hardiness-zone">
                ðŸŒ± Hardiness Zone: {getHardinessZone(selectedLocation.lat)}
              </p>
            </div>

            <div className="weather-content">
              <div className="current-weather">
                <div className="weather-main">
                  <div className="temperature">
                    <span className="temp-value">{Math.round(weather.main.temp)}Â°F</span>
                    <span className="temp-feels">Feels like {Math.round(weather.main.feels_like)}Â°F</span>
                  </div>
                  <div className="weather-details">
                    <p className="conditions">{weather.weather[0].description}</p>
                    <p className="humidity">Humidity: {weather.main.humidity}%</p>
                    <p className="wind">Wind: {Math.round(weather.wind.speed)} mph</p>
                    <p className="pressure">Pressure: {weather.main.pressure} hPa</p>
                  </div>
                </div>
              </div>

              <div className="growing-recommendations">
                <h4>ðŸŒ± Growing Recommendations</h4>
                {getGrowingRecommendations().map((rec, index) => (
                  <div key={index} className={`recommendation ${rec.type}`}>
                    <span className="rec-icon">{rec.icon}</span>
                    <span className="rec-message">{rec.message}</span>
                  </div>
                ))}
              </div>

              {/* 7-Day Forecast */}
              {forecast && (
                <div className="forecast-section">
                  <h4>ðŸ“… 7-Day Forecast</h4>
                  <div className="forecast-grid">
                    {getDailyForecast().map((day, index) => (
                      <div key={index} className="forecast-day">
                        <div className="forecast-date">
                          {new Date(day.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="forecast-icon">
                          <img 
                            src={`https://openweathermap.org/img/wn/${day.icon}.png`} 
                            alt={day.description}
                            width="40"
                            height="40"
                          />
                        </div>
                        <div className="forecast-temp">
                          {Math.round(day.temp)}Â°F
                        </div>
                        <div className="forecast-desc">
                          {day.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
=======

      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY} libraries={libraries}>
        {center ? (
          <div style={{ position: "relative" }}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={12}
              onLoad={(map) => (mapRef.current = map)}
            >
              <Marker position={center} />
              {/* Search bar */}
              <form onSubmit={handleSearch} className="map-search-form">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Enter address..."
                  className="map-search-input"
                />
                <button type="submit" className="map-search-button">
                  Go
                </button>
              </form>
            </GoogleMap>

            {/* Weather panel */}
            {weatherData && (
              <div className="weather-panel">
                <h4>Weather</h4>
                <p>Temp: {Math.round(weatherData.main.temp)}°C</p>
                <p>Rain: {weatherData.rain ? weatherData.rain["1h"] + " mm" : "0 mm"}</p>
                <p>Humidity: {weatherData.main.humidity}%</p>
                <button className="map-to-index" onClick={() => window.location.href = "/index"}>
                    See What to Plant
                </button>
              </div>
            )}
          </div>
        ) : (
          <p>Loading map...</p>
        )}
      </LoadScript>
>>>>>>> e32df789ac980f63bca9a10cc1f7b716b1bfb5de

      <Footer />
    </div>
  );
}
<<<<<<< HEAD

export default MapPage;

=======
>>>>>>> e32df789ac980f63bca9a10cc1f7b716b1bfb5de
