import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./map.css";

const containerStyle = {
  width: "100%",
  height: "600px"
};

function MapPage() {
  const [center, setCenter] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          setCenter({ lat: 39.4143, lng: -77.4105 }); // fallback
        }
      );
    } else {
      setCenter({ lat: 39.4143, lng: -77.4105 }); // fallback
    }
  }, []);

  return (
    <div className="stack">
        <Navbar></Navbar>
        <div className="map-space"></div>
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
        {center ? (
            <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
            >
            {/* Marker at user's location */}
            <Marker position={center} />
            </GoogleMap>
        ) : (
            <p>Loading map...</p>
        )}
        </LoadScript>
        <Footer></Footer>
    </div>
  );
}

export default MapPage;
