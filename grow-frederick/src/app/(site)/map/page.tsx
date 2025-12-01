'use client';

import React, { useState, useEffect } from 'react';
import { PaywallGuard } from '/src/components/ui/PaywallGuard';
import { ProBadge } from '/src/components/ui/ProBadge';
import { Button } from '/src/components/ui/Button';
import { WeatherMap } from '/src/components/map/WeatherMap';
import { usePlan } from '/src/hooks/usePlan';

export default function MapPage() {
  const [mapType, setMapType] = useState<'satellite' | 'terrain' | 'roadmap'>('satellite');
  const [heatmapType, setHeatmapType] = useState<'temperature' | 'humidity' | 'rainfall' | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [weatherData, setWeatherData] = useState<any>(null);
  
  // Mock user ID - in real app, get from auth context
  const userId = 'demo-user';
  const { plan, isLoading: planLoading } = usePlan(userId);
  const isPro = plan === 'pro';

  useEffect(() => {
    // Simulate loading weather data
    const timer = setTimeout(() => {
      setWeatherData({
        temperature: 72,
        humidity: 65,
        rainfall: 0.2,
        conditions: 'Partly Cloudy',
        location: 'Maryland, USA'
      });
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const heatmapData = {
    temperature: [
      { lat: 39.4143, lng: -77.4105, weight: 0.8 },
      { lat: 39.4243, lng: -77.4205, weight: 0.6 },
      { lat: 39.4043, lng: -77.4005, weight: 0.9 },
    ],
    humidity: [
      { lat: 39.4143, lng: -77.4105, weight: 0.7 },
      { lat: 39.4243, lng: -77.4205, weight: 0.5 },
      { lat: 39.4043, lng: -77.4005, weight: 0.8 },
    ],
    rainfall: [
      { lat: 39.4143, lng: -77.4105, weight: 0.3 },
      { lat: 39.4243, lng: -77.4205, weight: 0.1 },
      { lat: 39.4043, lng: -77.4005, weight: 0.2 },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass border-b border-gc-light/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gc-dark flex items-center gap-3">
                Weather Map
                <ProBadge size="md" />
              </h1>
              <p className="text-muted-foreground mt-2">
                Real-time weather conditions and environmental data
              </p>
            </div>
            <div className="flex items-center gap-4">
              {weatherData && (
                <div className="text-right">
                  <div className="text-2xl font-bold text-gc-dark">
                    {weatherData.temperature}Â°F
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {weatherData.conditions}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Map Type Selector */}
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gc-dark">Map Type:</label>
            <select
              value={mapType}
              onChange={(e) => setMapType(e.target.value as any)}
              className="px-3 py-2 border border-gc-light/30 rounded-lg bg-background text-gc-dark focus:outline-none focus:ring-2 focus:ring-gc-accent"
            >
              <option value="satellite">Satellite</option>
              <option value="terrain">Terrain</option>
              <option value="roadmap">Road Map</option>
            </select>
          </div>

          {/* Heatmap Controls */}
          <PaywallGuard
            isPro={isPro}
            feature="Real-time Heatmaps"
            className="flex items-center gap-2"
          >
            <label className="text-sm font-medium text-gc-dark">Heatmap:</label>
            <div className="flex gap-2">
              {(['temperature', 'humidity', 'rainfall'] as const).map((type) => (
                <Button
                  key={type}
                  variant={heatmapType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setHeatmapType(heatmapType === type ? null : type)}
                  className="capitalize"
                >
                  {type}
                </Button>
              ))}
            </div>
          </PaywallGuard>
        </div>

        {/* Map Container */}
        <PaywallGuard
          isPro={isPro}
          feature="Advanced Weather Maps"
          className="relative"
        >
          <WeatherMap />
        </PaywallGuard>

        {/* Weather Stats */}
        {weatherData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="text-2xl">ðŸŒ¡ï¸</div>
                <div>
                  <h3 className="font-semibold text-gc-dark">Temperature</h3>
                  <p className="text-2xl font-bold text-gc-dark">
                    {weatherData.temperature}Â°F
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="text-2xl">ðŸ’§</div>
                <div>
                  <h3 className="font-semibold text-gc-dark">Humidity</h3>
                  <p className="text-2xl font-bold text-gc-dark">
                    {weatherData.humidity}%
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="text-2xl">ðŸŒ§ï¸</div>
                <div>
                  <h3 className="font-semibold text-gc-dark">Rainfall</h3>
                  <p className="text-2xl font-bold text-gc-dark">
                    {weatherData.rainfall}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pro Features Preview */}
        {!isPro && (
          <div className="mt-8 glass rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gc-dark mb-4">
              Unlock Advanced Weather Intelligence
            </h3>
            <p className="text-muted-foreground mb-6">
              Get real-time heatmaps, severe weather alerts, and microclimate analysis
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-gc-light/10 rounded-lg">
                <div className="text-2xl mb-2">ðŸ”¥</div>
                <h4 className="font-semibold text-gc-dark">Heat Maps</h4>
                <p className="text-sm text-muted-foreground">Temperature, humidity, rainfall overlays</p>
              </div>
              <div className="p-4 bg-gc-light/10 rounded-lg">
                <div className="text-2xl mb-2">âš¡</div>
                <h4 className="font-semibold text-gc-dark">Severe Alerts</h4>
                <p className="text-sm text-muted-foreground">Frost warnings, heat waves, storms</p>
              </div>
              <div className="p-4 bg-gc-light/10 rounded-lg">
                <div className="text-2xl mb-2">ðŸŽ¯</div>
                <h4 className="font-semibold text-gc-dark">Microclimates</h4>
                <p className="text-sm text-muted-foreground">Zone-specific weather patterns</p>
              </div>
            </div>
            <Button size="lg">
              <ProBadge size="sm" className="mr-2" />
              Upgrade to Pro
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

