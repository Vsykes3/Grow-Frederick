import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Thermometer, Droplets, Wind, Eye, Cloud, Sun, CloudRain } from 'lucide-react';
import { apiService } from '@/services/api';
import { PaywallGuard } from '@/components/ui/PaywallGuard';
import { Button } from '@/components/ui/button';
import { ProBadge } from '@/components/ui/ProBadge';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
}

interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
  }>;
}

export default function MapPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number; name: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLayer, setSelectedLayer] = useState<'temperature' | 'humidity' | 'precipitation' | 'wind'>('temperature');

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            await loadWeatherData(latitude, longitude);
          },
          async (error) => {
            console.error('Geolocation error:', error);
            // Fallback to Frederick, MD
            await loadWeatherData(39.4143, -77.4105);
          }
        );
      } else {
        // Fallback to Frederick, MD
        await loadWeatherData(39.4143, -77.4105);
      }
    } catch (err) {
      setError('Failed to get location');
      setLoading(false);
    }
  };

  const loadWeatherData = async (lat: number, lng: number) => {
    try {
      const [weatherData, forecastData, locationData] = await Promise.all([
        apiService.weather.getCurrentWeather(lat, lng),
        apiService.weather.getForecast(lat, lng),
        apiService.maps.getLocationFromCoords(lat, lng)
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
      setLocation({
        lat,
        lng,
        name: locationData.results[0]?.formatted_address || 'Unknown Location'
      });
    } catch (err) {
      setError('Failed to load weather data');
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (icon: string) => {
    switch (icon.slice(0, 2)) {
      case '01': return <Sun className="w-8 h-8 text-yellow-500" />;
      case '02': case '03': case '04': return <Cloud className="w-8 h-8 text-gray-500" />;
      case '09': case '10': return <CloudRain className="w-8 h-8 text-blue-500" />;
      default: return <Cloud className="w-8 h-8 text-gray-500" />;
    }
  };

  const getLayerColor = (layer: string) => {
    switch (layer) {
      case 'temperature': return 'from-red-500 to-yellow-500';
      case 'humidity': return 'from-blue-500 to-cyan-500';
      case 'precipitation': return 'from-blue-600 to-indigo-600';
      case 'wind': return 'from-gray-500 to-gray-700';
      default: return 'from-gray-500 to-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gc-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={getCurrentLocation}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gc-light/10 to-gc-accent/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gc-dark mb-4">
            Weather & Conditions Map
            <ProBadge size="sm" className="ml-3" />
          </h1>
          <p className="text-xl text-muted-foreground">
            Real-time weather data and growing conditions for your area
          </p>
        </motion.div>

        {/* Location Info */}
        {location && (
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-soft mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-gc-accent" />
              <div>
                <h2 className="text-xl font-semibold text-gc-dark">{location.name}</h2>
                <p className="text-muted-foreground">
                  {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Map Controls */}
        <PaywallGuard>
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-soft mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-gc-dark mb-4">Map Layers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: 'temperature', label: 'Temperature', icon: Thermometer },
                { id: 'humidity', label: 'Humidity', icon: Droplets },
                { id: 'precipitation', label: 'Rainfall', icon: CloudRain },
                { id: 'wind', label: 'Wind', icon: Wind }
              ].map((layer) => {
                const Icon = layer.icon;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setSelectedLayer(layer.id as any)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedLayer === layer.id
                        ? 'border-gc-accent bg-gc-accent/10'
                        : 'border-gray-200 hover:border-gc-light'
                    }`}
                  >
                    <Icon className="w-6 h-6 mx-auto mb-2 text-gc-dark" />
                    <p className="text-sm font-medium">{layer.label}</p>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </PaywallGuard>

        {/* Weather Map Placeholder */}
        <PaywallGuard>
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-soft mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-gc-dark mb-4">
              {selectedLayer.charAt(0).toUpperCase() + selectedLayer.slice(1)} Heatmap
            </h3>
            <div className={`h-96 rounded-lg bg-gradient-to-br ${getLayerColor(selectedLayer)} flex items-center justify-center`}>
              <div className="text-center text-white">
                <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-semibold">Interactive Map</p>
                <p className="text-sm opacity-75">Google Maps integration with {selectedLayer} overlay</p>
              </div>
            </div>
          </motion.div>
        </PaywallGuard>

        {/* Current Weather */}
        {weather && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                {getWeatherIcon(weather.weather[0]?.icon || '01d')}
                <div>
                  <h3 className="font-semibold text-gc-dark">Temperature</h3>
                  <p className="text-2xl font-bold text-gc-dark">{Math.round(weather.main.temp)}°F</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{weather.weather[0]?.description}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <Droplets className="w-8 h-8 text-blue-500" />
                <div>
                  <h3 className="font-semibold text-gc-dark">Humidity</h3>
                  <p className="text-2xl font-bold text-gc-dark">{weather.main.humidity}%</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Relative humidity</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <Wind className="w-8 h-8 text-gray-500" />
                <div>
                  <h3 className="font-semibold text-gc-dark">Wind</h3>
                  <p className="text-2xl font-bold text-gc-dark">{weather.wind.speed} mph</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Wind speed</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-soft">
              <div className="flex items-center gap-3 mb-3">
                <Cloud className="w-8 h-8 text-gray-500" />
                <div>
                  <h3 className="font-semibold text-gc-dark">Pressure</h3>
                  <p className="text-2xl font-bold text-gc-dark">{weather.main.pressure} hPa</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Atmospheric pressure</p>
            </div>
          </motion.div>
        )}

        {/* 5-Day Forecast */}
        {forecast && (
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-soft"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-lg font-semibold text-gc-dark mb-6">5-Day Forecast</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {forecast.list.slice(0, 5).map((day, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-gc-cream">
                  <p className="text-sm font-medium text-gc-dark mb-2">
                    {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  {getWeatherIcon(day.weather[0]?.icon || '01d')}
                  <p className="text-lg font-bold text-gc-dark mt-2">{Math.round(day.main.temp)}°F</p>
                  <p className="text-xs text-muted-foreground">{day.weather[0]?.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">Humidity: {day.main.humidity}%</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}