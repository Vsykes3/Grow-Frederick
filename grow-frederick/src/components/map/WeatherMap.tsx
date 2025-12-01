'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, HeatmapLayer } from '@react-google-maps/api';
import { useI18n } from '/src/hooks/useI18n';
import { useTheme } from '/src/hooks/useTheme';
import { weatherService, type WeatherData, type WeatherForecast } from '/src/lib/weather';
import { locationService, type UserLocation } from '/src/lib/location';
import { Button } from '/src/components/ui/Button';
import { ProBadge } from '/src/components/ui/ProBadge';
import { cn } from '/src/lib/utils';

interface WeatherMapProps {
  className?: string;
}

type MapOverlay = 'temperature' | 'humidity' | 'rainfall' | 'pressure' | 'wind';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
};

const defaultCenter = {
  lat: 39.4143, // Frederick, MD
  lng: -77.4105,
};

const mapOptions = {
  disableDefaultUI: false,
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: true,
  fullscreenControl: true,
};

export function WeatherMap({ className }: WeatherMapProps) {
  const { t, mounted } = useI18n();
  const { resolvedTheme } = useTheme();
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<WeatherForecast[]>([]);
  const [activeOverlay, setActiveOverlay] = useState<MapOverlay>('temperature');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<{ lat: number; lng: number; data: WeatherData } | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mounted) return;
    
    initializeLocation();
  }, [mounted]);

  const initializeLocation = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get user's location
      const userLocation = await locationService.getCurrentLocation();
      const currentLocation = userLocation || locationService.getDefaultLocation();
      
      setLocation(currentLocation);

      // Fetch weather data
      await fetchWeatherData(currentLocation);
    } catch (err) {
      setError('Failed to load location and weather data');
      console.error('Location initialization error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherData = async (loc: UserLocation) => {
    try {
      const [currentWeather, forecastData] = await Promise.all([
        weatherService.getCurrentWeather(loc.lat, loc.lon),
        weatherService.getForecast(loc.lat, loc.lon),
      ]);

      setWeatherData(currentWeather);
      setForecast(forecastData);
    } catch (err) {
      console.error('Weather data fetch error:', err);
      setError('Failed to load weather data');
    }
  };

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;
  };

  const handleMarkerClick = (lat: number, lng: number, data: WeatherData) => {
    setSelectedMarker({ lat, lng, data });
  };

  const getOverlayData = (): google.maps.WeightedLocation[] => {
    if (!weatherData || !location) return [];

    // Generate sample data points around the current location
    const dataPoints: google.maps.WeightedLocation[] = [];
    const baseValue = getOverlayValue(weatherData, activeOverlay);

    // Add the main location
    dataPoints.push({
      location: new google.maps.LatLng(location.lat, location.lon),
      weight: baseValue,
    });

    // Add surrounding points for heatmap effect
    for (let i = 0; i < 20; i++) {
      const offsetLat = (Math.random() - 0.5) * 0.1;
      const offsetLng = (Math.random() - 0.5) * 0.1;
      const variation = (Math.random() - 0.5) * 0.3;
      
      dataPoints.push({
        location: new google.maps.LatLng(
          location.lat + offsetLat,
          location.lon + offsetLng
        ),
        weight: Math.max(0, baseValue + variation),
      });
    }

    return dataPoints;
  };

  const getOverlayValue = (data: WeatherData, overlay: MapOverlay): number => {
    switch (overlay) {
      case 'temperature':
        return data.temperature;
      case 'humidity':
        return data.humidity;
      case 'rainfall':
        return data.rainfall * 100; // Convert to percentage
      case 'pressure':
        return data.pressure;
      case 'wind':
        return data.windSpeed;
      default:
        return 0;
    }
  };

  const getOverlayLabel = (overlay: MapOverlay): string => {
    switch (overlay) {
      case 'temperature':
        return 'Temperature (Â°F)';
      case 'humidity':
        return 'Humidity (%)';
      case 'rainfall':
        return 'Rainfall (in)';
      case 'pressure':
        return 'Pressure (hPa)';
      case 'wind':
        return 'Wind Speed (mph)';
      default:
        return '';
    }
  };

  const getOverlayColor = (overlay: MapOverlay): string => {
    switch (overlay) {
      case 'temperature':
        return resolvedTheme === 'dark' ? '#ff6b6b' : '#ff4757';
      case 'humidity':
        return resolvedTheme === 'dark' ? '#3742fa' : '#2f3542';
      case 'rainfall':
        return resolvedTheme === 'dark' ? '#1e90ff' : '#007bff';
      case 'pressure':
        return resolvedTheme === 'dark' ? '#ffa502' : '#ff6348';
      case 'wind':
        return resolvedTheme === 'dark' ? '#2ed573' : '#20bf6b';
      default:
        return '#000000';
    }
  };

  if (!mounted) {
    return (
      <div className={cn('flex items-center justify-center h-96', className)}>
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-gc-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={cn('space-y-6', className)}>
        <div className="flex items-center justify-center h-96 bg-gc-light/10 rounded-2xl">
          <div className="text-center space-y-4">
            <div className="w-8 h-8 border-4 border-gc-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-muted-foreground">Loading weather map...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('space-y-6', className)}>
        <div className="flex items-center justify-center h-96 bg-red-50 dark:bg-red-900/20 rounded-2xl">
          <div className="text-center space-y-4">
            <div className="text-red-500 text-4xl">âš ï¸</div>
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <Button onClick={initializeLocation} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Map Controls */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {(['temperature', 'humidity', 'rainfall', 'pressure', 'wind'] as MapOverlay[]).map((overlay) => (
            <button
              key={overlay}
              onClick={() => setActiveOverlay(overlay)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                'hover:bg-gc-light/20 focus:outline-none focus:ring-2 focus:ring-gc-accent',
                activeOverlay === overlay
                  ? 'bg-gc-accent text-white'
                  : 'bg-background border border-gc-light/30 text-gc-dark hover:border-gc-accent'
              )}
            >
              {getOverlayLabel(overlay)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ProBadge size="sm" />
          <span className="text-sm text-muted-foreground">Pro Feature</span>
        </div>
      </div>

      {/* Weather Map */}
      <div className="relative">
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
          libraries={['visualization']}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={location ? { lat: location.lat, lng: location.lon } : defaultCenter}
            zoom={10}
            options={mapOptions}
            onLoad={handleMapLoad}
          >
            {/* Current Location Marker */}
            {location && weatherData && (
              <Marker
                position={{ lat: location.lat, lng: location.lon }}
                onClick={() => handleMarkerClick(location.lat, location.lon, weatherData)}
                icon={{
                  url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                    <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="16" cy="16" r="12" fill="${getOverlayColor(activeOverlay)}" stroke="white" stroke-width="2"/>
                      <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-weight="bold">
                        ${Math.round(getOverlayValue(weatherData, activeOverlay))}
                      </text>
                    </svg>
                  `)}`,
                  scaledSize: new google.maps.Size(32, 32),
                }}
              />
            )}

            {/* Heatmap Layer */}
            {activeOverlay && (
              <HeatmapLayer
                data={getOverlayData()}
                options={{
                  radius: 50,
                  opacity: 0.6,
                  gradient: [
                    'rgba(0, 255, 255, 0)',
                    'rgba(0, 255, 255, 1)',
                    'rgba(0, 191, 255, 1)',
                    'rgba(0, 127, 255, 1)',
                    'rgba(0, 63, 255, 1)',
                    'rgba(0, 0, 255, 1)',
                    'rgba(0, 0, 223, 1)',
                    'rgba(0, 0, 191, 1)',
                    'rgba(0, 0, 159, 1)',
                    'rgba(0, 0, 127, 1)',
                    'rgba(63, 0, 91, 1)',
                    'rgba(127, 0, 63, 1)',
                    'rgba(191, 0, 31, 1)',
                    'rgba(255, 0, 0, 1)',
                  ],
                }}
              />
            )}

            {/* Info Window */}
            {selectedMarker && (
              <InfoWindow
                position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                onCloseClick={() => setSelectedMarker(null)}
              >
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-gc-dark">
                    {locationService.formatLocation(location!)}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Temperature:</strong> {selectedMarker.data.temperature}Â°F</p>
                    <p><strong>Humidity:</strong> {selectedMarker.data.humidity}%</p>
                    <p><strong>Conditions:</strong> {selectedMarker.data.conditions}</p>
                    <p><strong>Wind:</strong> {selectedMarker.data.windSpeed} mph</p>
                    <p><strong>Pressure:</strong> {selectedMarker.data.pressure} hPa</p>
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </div>

      {/* Weather Summary */}
      {weatherData && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-background border border-gc-light/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gc-accent">{weatherData.temperature}Â°F</div>
            <div className="text-sm text-muted-foreground">Temperature</div>
          </div>
          <div className="bg-background border border-gc-light/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gc-accent">{weatherData.humidity}%</div>
            <div className="text-sm text-muted-foreground">Humidity</div>
          </div>
          <div className="bg-background border border-gc-light/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gc-accent">{weatherData.rainfall}"</div>
            <div className="text-sm text-muted-foreground">Rainfall</div>
          </div>
          <div className="bg-background border border-gc-light/30 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gc-accent">{weatherData.windSpeed} mph</div>
            <div className="text-sm text-muted-foreground">Wind Speed</div>
          </div>
        </div>
      )}
    </div>
  );
}

