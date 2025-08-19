import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import "./map.css";

const containerStyle = { width: "100%", height: "600px" };
const libraries = []; // no legacy Places API

export default function MapPage() {
  const [center, setCenter] = useState(null);
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const mapRef = useRef(null);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
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
    }
  }, []);

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
              </div>
            )}
          </div>
        ) : (
          <p>Loading map...</p>
        )}
      </LoadScript>

      <Footer />
    </div>
  );
}
