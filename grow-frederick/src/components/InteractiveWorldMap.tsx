'use client'

import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet'

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface ClickedLocation {
  lat: number
  lng: number
  zone: string
}

// USDA Hardiness Zone calculator (simplified version)
function getUSDAZone(lat: number, lng: number): string {
  // This is a SIMPLIFIED approximation
  // Real USDA zones require complex geographic data
  
  // Check if in US (rough bounds)
  if (lng < -125 || lng > -65 || lat < 25 || lat > 50) {
    return 'Outside US'
  }
  
  // Simplified zone calculation based on latitude
  // Real zones vary by elevation, proximity to water, etc.
  if (lat > 48) return '3a-4b' // Northern states
  if (lat > 45) return '4a-5b' // North central
  if (lat > 42) return '5a-6b' // Mid-north
  if (lat > 39) return '6a-7b' // Mid-Atlantic (Frederick, MD is here!)
  if (lat > 36) return '7a-8b' // Southern mid
  if (lat > 33) return '8a-9b' // Deep south
  return '9a-11b' // Far south/subtropical
}

// Get recommended plants based on USDA zone
function getRecommendedPlantsForZone(zone: string): string[] {
  const zoneNum = parseInt(zone.split(/[a-z-]/)[0]) || 6;
  
  if (zoneNum <= 3) {
    // Very cold zones
    return ['Kale', 'Spinach', 'Broccoli', 'Carrots', 'Cabbage', 'Peas', 'Radish', 'Lettuce'];
  } else if (zoneNum === 4) {
    // Cold zones
    return ['Tomatoes', 'Peppers', 'Lettuce', 'Kale', 'Carrots', 'Broccoli', 'Peas', 'Radish'];
  } else if (zoneNum === 5) {
    // Cool zones
    return ['Tomatoes', 'Peppers', 'Lettuce', 'Basil', 'Broccoli', 'Kale', 'Carrots', 'Beans'];
  } else if (zoneNum === 6) {
    // Moderate zones (Frederick, MD)
    return ['Tomatoes', 'Peppers', 'Lettuce', 'Basil', 'Cucumber', 'Zucchini', 'Beans', 'Carrots'];
  } else if (zoneNum === 7) {
    // Warm zones
    return ['Tomatoes', 'Peppers', 'Basil', 'Okra', 'Eggplant', 'Sweet Potatoes', 'Peanuts', 'Cantaloupe'];
  } else if (zoneNum === 8) {
    // Very warm zones
    return ['Tomatoes', 'Peppers', 'Okra', 'Eggplant', 'Sweet Potatoes', 'Collards', 'Mustard Greens', 'Turnips'];
  } else {
    // Hot zones (9+)
    return ['Tomatoes', 'Peppers', 'Okra', 'Sweet Potatoes', 'Collards', 'Mustard Greens', 'Turnips', 'Kale'];
  }
}

function MapClickHandler({ onLocationClick }: { onLocationClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      onLocationClick(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

export default function InteractiveWorldMap() {
  const [clickedLocation, setClickedLocation] = useState<ClickedLocation | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>([39.4143, -77.4105]) // Frederick, MD

  const handleMapClick = (lat: number, lng: number) => {
    const zone = getUSDAZone(lat, lng)
    setClickedLocation({ lat, lng, zone })
  }

  return (
    <div className="w-full">
      <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-lg p-4 mb-4">
        <h3 className="font-bold text-lg mb-2">🌍 Interactive World Map</h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Click anywhere on the map to see the coordinates and USDA hardiness zone for that location.
          Pan and zoom just like Google Maps - completely free, no API key required!
        </p>
      </div>

      {/* Map Container */}
      <div className="rounded-lg overflow-hidden border-4 border-gray-300 dark:border-gray-700 shadow-xl">
        <MapContainer
          center={mapCenter}
          zoom={10}
          style={{ height: '600px', width: '100%' }}
          scrollWheelZoom={true}
        >
          {/* Free tile layer from OpenStreetMap (no API key needed) */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Click handler */}
          <MapClickHandler onLocationClick={handleMapClick} />
          
          {/* Show marker where user clicked */}
          {clickedLocation && (
            <Marker position={[clickedLocation.lat, clickedLocation.lng]}>
              <Popup>
                <div className="text-sm">
                  <strong>Clicked Location:</strong><br />
                  Latitude: {clickedLocation.lat.toFixed(4)}°<br />
                  Longitude: {clickedLocation.lng.toFixed(4)}°<br />
                  <strong>USDA Zone: {clickedLocation.zone}</strong>
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {/* Location Info Display */}
      {clickedLocation && (
        <div className="mt-6 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-4">📍 Selected Location</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-2">Coordinates</h4>
              <p className="text-sm mb-1">
                <strong>Latitude:</strong> {clickedLocation.lat.toFixed(6)}°
              </p>
              <p className="text-sm mb-1">
                <strong>Longitude:</strong> {clickedLocation.lng.toFixed(6)}°
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">USDA Hardiness Zone</h4>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {clickedLocation.zone}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                * Zones are approximations based on latitude. For precise zones, consult official USDA maps.
              </p>
            </div>
          </div>
          
          {clickedLocation.zone !== 'Outside US' && (
            <div className="mt-4 pt-4 border-t border-green-300 dark:border-green-700">
              <h4 className="font-semibold mb-2">🌱 Recommended Plants for Zone {clickedLocation.zone}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                {getRecommendedPlantsForZone(clickedLocation.zone).map((plant, idx) => (
                  <span key={idx} className="bg-white dark:bg-gray-800 px-3 py-2 rounded">
                    {plant}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="font-bold text-lg mb-3">💡 How to Use This Map</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">1.</span>
            <span><strong>Pan:</strong> Click and drag to move around the map</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">2.</span>
            <span><strong>Zoom:</strong> Use scroll wheel or +/- buttons to zoom in/out</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">3.</span>
            <span><strong>Click:</strong> Click any location to see coordinates and USDA zone</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 font-bold">4.</span>
            <span><strong>Plan:</strong> Use zone info to choose appropriate plants for your area</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

