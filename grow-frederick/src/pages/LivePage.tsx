import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Droplets, Wind, Sun, Cloud, Activity, TrendingUp } from 'lucide-react';
import { apiService } from '/src/services/api';
import { Button } from '/src/components/ui/Button';
import { ProBadge } from '/src/components/ui/ProBadge';
import { PaywallGuard } from '/src/components/ui/PaywallGuard';

interface LiveData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  uvIndex: number;
  soilMoisture: number;
  soilTemperature: number;
  lightLevel: number;
  timestamp: string;
}

export default function LivePage() {
  const [liveData, setLiveData] = useState<LiveData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    loadLiveData();
    const interval = setInterval(loadLiveData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadLiveData = async () => {
    try {
      const weatherData = await apiService.weather.getCurrentWeather(39.4143, -77.4105);
      
      // Mock additional sensor data
      const mockLiveData: LiveData = {
        temperature: Math.round(weatherData.main.temp),
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        pressure: weatherData.main.pressure,
        uvIndex: Math.floor(Math.random() * 11), // 0-10
        soilMoisture: Math.floor(Math.random() * 100), // 0-100%
        soilTemperature: Math.round(weatherData.main.temp - 5), // Usually cooler than air
        lightLevel: Math.floor(Math.random() * 100), // 0-100%
        timestamp: new Date().toISOString()
      };
      
      setLiveData(mockLiveData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load live data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUvIndexColor = (index: number) => {
    if (index <= 2) return 'text-green-500';
    if (index <= 5) return 'text-yellow-500';
    if (index <= 7) return 'text-orange-500';
    if (index <= 10) return 'text-red-500';
    return 'text-purple-500';
  };

  const getUvIndexLabel = (index: number) => {
    if (index <= 2) return 'Low';
    if (index <= 5) return 'Moderate';
    if (index <= 7) return 'High';
    if (index <= 10) return 'Very High';
    return 'Extreme';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gc-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading live data...</p>
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
            Live Weather & Soil Conditions
            <ProBadge size="sm" className="ml-3" />
          </h1>
          <p className="text-xl text-muted-foreground">
            Real-time monitoring of your garden's environment
          </p>
          {lastUpdated && (
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </motion.div>

        {liveData && (
          <>
            {/* Main Weather Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                className="bg-white rounded-2xl shadow-soft p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Thermometer className="w-8 h-8 text-red-500" />
                  <div>
                    <h3 className="font-semibold text-gc-dark">Temperature</h3>
                    <p className="text-3xl font-bold text-gc-dark">{liveData.temperature}°F</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Air temperature</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl shadow-soft p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Droplets className="w-8 h-8 text-blue-500" />
                  <div>
                    <h3 className="font-semibold text-gc-dark">Humidity</h3>
                    <p className="text-3xl font-bold text-gc-dark">{liveData.humidity}%</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Relative humidity</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl shadow-soft p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Wind className="w-8 h-8 text-gray-500" />
                  <div>
                    <h3 className="font-semibold text-gc-dark">Wind Speed</h3>
                    <p className="text-3xl font-bold text-gc-dark">{liveData.windSpeed} mph</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Wind speed</p>
              </motion.div>

              <motion.div
                className="bg-white rounded-2xl shadow-soft p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Activity className="w-8 h-8 text-purple-500" />
                  <div>
                    <h3 className="font-semibold text-gc-dark">Pressure</h3>
                    <p className="text-3xl font-bold text-gc-dark">{liveData.pressure} hPa</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Atmospheric pressure</p>
              </motion.div>
            </div>

            {/* Soil Conditions */}
            <PaywallGuard>
              <motion.div
                className="bg-white rounded-2xl shadow-soft p-6 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="text-xl font-semibold text-gc-dark mb-6">Soil Conditions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Droplets className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gc-dark">Soil Moisture</h4>
                    <p className="text-2xl font-bold text-gc-dark">{liveData.soilMoisture}%</p>
                    <p className="text-sm text-muted-foreground">Optimal: 40-60%</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Thermometer className="w-8 h-8 text-orange-600" />
                    </div>
                    <h4 className="font-semibold text-gc-dark">Soil Temperature</h4>
                    <p className="text-2xl font-bold text-gc-dark">{liveData.soilTemperature}°F</p>
                    <p className="text-sm text-muted-foreground">Ideal: 65-75°F</p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Sun className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h4 className="font-semibold text-gc-dark">Light Level</h4>
                    <p className="text-2xl font-bold text-gc-dark">{liveData.lightLevel}%</p>
                    <p className="text-sm text-muted-foreground">Sunlight intensity</p>
                  </div>
                </div>
              </motion.div>
            </PaywallGuard>

            {/* UV Index */}
            <motion.div
              className="bg-white rounded-2xl shadow-soft p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-gc-dark mb-4">UV Index</h3>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className={`text-4xl font-bold ${getUvIndexColor(liveData.uvIndex)}`}>
                    {liveData.uvIndex}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {getUvIndexLabel(liveData.uvIndex)}
                  </p>
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${
                        liveData.uvIndex <= 2 ? 'bg-green-500' :
                        liveData.uvIndex <= 5 ? 'bg-yellow-500' :
                        liveData.uvIndex <= 7 ? 'bg-orange-500' :
                        liveData.uvIndex <= 10 ? 'bg-red-500' : 'bg-purple-500'
                      }`}
                      style={{ width: `${(liveData.uvIndex / 11) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {liveData.uvIndex <= 2 ? 'Safe for outdoor activities' :
                     liveData.uvIndex <= 5 ? 'Some protection needed' :
                     liveData.uvIndex <= 7 ? 'Protection required' :
                     liveData.uvIndex <= 10 ? 'Extra protection needed' : 'Avoid sun exposure'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Trends Chart Placeholder */}
            <PaywallGuard>
              <motion.div
                className="bg-white rounded-2xl shadow-soft p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <h3 className="text-xl font-semibold text-gc-dark mb-4">24-Hour Trends</h3>
                <div className="h-64 bg-gradient-to-r from-gc-light/20 to-gc-accent/20 rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                    <p>Interactive charts showing temperature, humidity, and soil conditions over time</p>
                  </div>
                </div>
              </motion.div>
            </PaywallGuard>
          </>
        )}
      </div>
    </div>
  );
}