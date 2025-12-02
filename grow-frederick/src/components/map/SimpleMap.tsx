'use client'

import React, { useState, useEffect } from 'react';

interface Region {
  id: string;
  name: string;
  coords: string;
  center: { lat: number; lng: number };
  states: string[];
}

const regions: Region[] = [
  {
    id: 'northeast',
    name: 'Northeast',
    coords: '100,50 200,50 200,150 100,150',
    center: { lat: 42.0, lng: -73.0 },
    states: ['ME', 'NH', 'VT', 'MA', 'RI', 'CT', 'NY', 'NJ', 'PA']
  },
  {
    id: 'midatlantic',
    name: 'Mid-Atlantic',
    coords: '200,100 300,100 300,200 200,200',
    center: { lat: 39.0, lng: -77.0 },
    states: ['MD', 'VA', 'WV', 'DE', 'DC', 'NC']
  },
  {
    id: 'southeast',
    name: 'Southeast',
    coords: '250,200 350,200 350,300 250,300',
    center: { lat: 32.0, lng: -84.0 },
    states: ['SC', 'GA', 'FL', 'AL', 'MS', 'TN', 'KY']
  },
  {
    id: 'midwest',
    name: 'Midwest',
    coords: '150,150 300,150 300,250 150,250',
    center: { lat: 41.0, lng: -93.0 },
    states: ['OH', 'MI', 'IN', 'IL', 'WI', 'MN', 'IA', 'MO']
  },
  {
    id: 'south',
    name: 'South',
    coords: '200,250 350,250 350,350 200,350',
    center: { lat: 35.0, lng: -95.0 },
    states: ['AR', 'LA', 'OK', 'TX']
  },
  {
    id: 'west',
    name: 'West',
    coords: '50,100 150,100 150,300 50,300',
    center: { lat: 40.0, lng: -110.0 },
    states: ['MT', 'WY', 'CO', 'NM', 'ID', 'UT', 'NV', 'AZ']
  },
  {
    id: 'pacific',
    name: 'Pacific',
    coords: '0,50 50,50 50,250 0,250',
    center: { lat: 38.0, lng: -122.0 },
    states: ['WA', 'OR', 'CA', 'AK', 'HI']
  }
];

export function SimpleMap({ onRegionSelect }: { onRegionSelect?: (region: Region) => void }) {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          // Default to Frederick, MD
          setUserLocation({ lat: 39.4143, lng: -77.4105 });
        }
      );
    } else {
      setUserLocation({ lat: 39.4143, lng: -77.4105 });
    }
  }, []);

  const handleRegionClick = (region: Region) => {
    setSelectedRegion(region);
    if (onRegionSelect) {
      onRegionSelect(region);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-300 dark:border-gray-600 p-4 mb-4">
        <svg viewBox="0 0 400 400" className="w-full h-auto">
          {/* Background */}
          <rect width="400" height="400" fill="#e8f5e9" className="dark:fill-gray-700" />
          
          {/* Regions */}
          {regions.map((region) => (
            <polygon
              key={region.id}
              points={region.coords}
              fill={selectedRegion?.id === region.id ? '#4caf50' : '#81c784'}
              stroke="#2e7d32"
              strokeWidth="2"
              className="cursor-pointer hover:fill-#66bb6a transition-colors"
              onClick={() => handleRegionClick(region)}
            />
          ))}
          
          {/* User location marker */}
          {userLocation && (
            <circle
              cx={200 + (userLocation.lng + 100) * 1.5}
              cy={200 - (userLocation.lat - 40) * 3}
              r="8"
              fill="#2196f3"
              stroke="#fff"
              strokeWidth="2"
            />
          )}
        </svg>
      </div>

      {selectedRegion && (
        <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-2 text-foreground">{selectedRegion.name} Region</h3>
          <p className="text-sm text-muted-foreground mb-4">
            States: {selectedRegion.states.join(', ')}
          </p>
          <p className="text-sm text-foreground">
            <strong>Center:</strong> {selectedRegion.center.lat.toFixed(2)}°N, {selectedRegion.center.lng.toFixed(2)}°W
          </p>
          {userLocation && (
            <p className="text-sm text-foreground mt-2">
              <strong>Your Location:</strong> {userLocation.lat.toFixed(4)}°N, {userLocation.lng.toFixed(4)}°W
            </p>
          )}
        </div>
      )}

      {!selectedRegion && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 rounded-lg p-6">
          <p className="text-foreground">
            <strong>Click on a region</strong> to view detailed information about that area.
          </p>
          {userLocation && (
            <p className="text-sm text-muted-foreground mt-2">
              Your location: {userLocation.lat.toFixed(4)}°N, {userLocation.lng.toFixed(4)}°W
            </p>
          )}
        </div>
      )}
    </div>
  );
}




