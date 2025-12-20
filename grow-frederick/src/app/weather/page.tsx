'use client'

import React, { useState, useEffect } from 'react'

export const dynamic = 'force-dynamic';

interface WeatherData {
  temperature: number
  feelsLike: number
  humidity: number
  windSpeed: number
  weatherCode: number
  description: string
  icon: string
}

interface ForecastDay {
  date: string
  tempMax: number
  tempMin: number
  weatherCode: number
  description: string
  icon: string
}

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastDay[]>([])
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [locationName, setLocationName] = useState('Frederick, MD')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    initializeWeather()
  }, [])

  const initializeWeather = async () => {
    setLoading(true)
    setError('')
    
    try {
      // Get user location
      const coords = await getUserLocation()
      setLocation(coords)
      
      // Get location name
      await getLocationName(coords.lat, coords.lon)
      
      // Fetch weather from Open-Meteo (FREE, no API key)
      await fetchWeatherData(coords.lat, coords.lon)
    } catch (err: any) {
      console.error('Weather error:', err)
      setError(err.message || 'Unable to load weather')
      setLoading(false)
    }
  }

  const getUserLocation = (): Promise<{ lat: number; lon: number }> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        // Default to Frederick, MD
        resolve({ lat: 39.4143, lon: -77.4105 })
        return
      }

      const timeoutId = setTimeout(() => {
        // Timeout - use Frederick, MD
        resolve({ lat: 39.4143, lon: -77.4105 })
      }, 5000)

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(timeoutId)
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          })
        },
        () => {
          clearTimeout(timeoutId)
          resolve({ lat: 39.4143, lon: -77.4105 })
        },
        { timeout: 5000 }
      )
    })
  }

  const getLocationName = async (lat: number, lon: number) => {
    try {
      // Use OpenStreetMap Nominatim (FREE reverse geocoding, no API key)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      )
      
      if (response.ok) {
        const data = await response.json()
        const city = data.address.city || data.address.town || data.address.county || 'Unknown'
        const state = data.address.state || ''
        setLocationName(`${city}${state ? ', ' + state : ''}`)
      }
    } catch (err) {
      console.error('Geocoding error:', err)
      // Keep default location name
    }
  }

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      // Open-Meteo API (COMPLETELY FREE, NO API KEY NEEDED)
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto&forecast_days=6`
      
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error('Weather API request failed')
      }
      
      const data = await response.json()
      
      // Parse current weather
      const currentWeather: WeatherData = {
        temperature: Math.round(data.current.temperature_2m),
        feelsLike: Math.round(data.current.apparent_temperature),
        humidity: data.current.relative_humidity_2m,
        windSpeed: Math.round(data.current.wind_speed_10m),
        weatherCode: data.current.weather_code,
        description: getWeatherDescription(data.current.weather_code),
        icon: getWeatherIcon(data.current.weather_code)
      }
      
      setWeather(currentWeather)
      
      // Parse 5-day forecast (skip today, show next 5 days)
      const forecastDays: ForecastDay[] = []
      for (let i = 1; i <= 5; i++) {
        forecastDays.push({
          date: data.daily.time[i],
          tempMax: Math.round(data.daily.temperature_2m_max[i]),
          tempMin: Math.round(data.daily.temperature_2m_min[i]),
          weatherCode: data.daily.weather_code[i],
          description: getWeatherDescription(data.daily.weather_code[i]),
          icon: getWeatherIcon(data.daily.weather_code[i])
        })
      }
      
      setForecast(forecastDays)
      setLoading(false)
    } catch (err: any) {
      console.error('Weather fetch error:', err)
      throw new Error('Failed to fetch weather data')
    }
  }

  // Convert WMO weather codes to descriptions
  const getWeatherDescription = (code: number): string => {
    const descriptions: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail'
    }
    return descriptions[code] || 'Unknown'
  }

  // Convert weather codes to emoji icons
  const getWeatherIcon = (code: number): string => {
    if (code === 0 || code === 1) return '☀️'
    if (code === 2) return '⛅'
    if (code === 3) return '☁️'
    if (code >= 45 && code <= 48) return '🌫️'
    if (code >= 51 && code <= 55) return '🌦️'
    if (code >= 61 && code <= 65) return '🌧️'
    if (code >= 71 && code <= 77) return '❄️'
    if (code >= 80 && code <= 82) return '🌧️'
    if (code >= 85 && code <= 86) return '🌨️'
    if (code >= 95 && code <= 99) return '⛈️'
    return '🌤️'
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="text-6xl mb-4 animate-pulse">🌤️</div>
          <p className="text-xl">Loading weather data...</p>
          <p className="text-sm text-gray-500 mt-2">Using Open-Meteo (free weather API)</p>
        </div>
      </div>
    )
  }

  if (error || !weather) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16 bg-red-50 dark:bg-red-900/20 rounded-lg p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-xl text-red-600 dark:text-red-400 mb-4">
            {error || 'Unable to load weather data'}
          </p>
          <button
            onClick={initializeWeather}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-4xl font-bold">Weather</h1>
        <button
          onClick={initializeWeather}
          className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
        >
          <span>🔄</span> Refresh
        </button>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        📍 {locationName}
      </p>

      {/* Current Weather Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-lg p-8 mb-8 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-7xl font-bold mb-2">
              {weather.temperature}°F
            </div>
            <div className="text-2xl capitalize mb-2">
              {weather.description}
            </div>
            <div className="text-lg mb-2">
              Feels like {weather.feelsLike}°F
            </div>
          </div>
          <div className="text-8xl">
            {weather.icon}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/20">
          <div>
            <div className="text-sm opacity-80">Humidity</div>
            <div className="text-2xl font-semibold">{weather.humidity}%</div>
          </div>
          <div>
            <div className="text-sm opacity-80">Wind Speed</div>
            <div className="text-2xl font-semibold">{weather.windSpeed} mph</div>
          </div>
        </div>

        <div className="mt-4 text-xs opacity-70">
          Last updated: {new Date().toLocaleTimeString()} • Powered by Open-Meteo
        </div>
      </div>

      {/* 5-Day Forecast */}
      {forecast.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {forecast.map((day, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 transition"
              >
                <div className="font-semibold mb-2">
                  {new Date(day.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="text-5xl mb-2">
                  {day.icon}
                </div>
                <div className="text-xl font-bold mb-1">
                  {day.tempMax}°F
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 capitalize mb-2">
                  {day.description}
                </div>
                <div className="text-xs text-gray-500">
                  Low: {day.tempMin}°F
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Gardening Tips Based on Actual Weather */}
      <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-3">🌱 Gardening Tips for Today</h3>
        <ul className="space-y-3">
          {weather.temperature > 85 && (
            <li className="flex items-start gap-2">
              <span className="text-xl">🌡️</span>
              <div>
                <strong>High temperature ({weather.temperature}°F)</strong> - Water plants early morning or evening to prevent evaporation. Mulch to retain moisture.
              </div>
            </li>
          )}
          {weather.temperature < 40 && weather.temperature >= 32 && (
            <li className="flex items-start gap-2">
              <span className="text-xl">❄️</span>
              <div>
                <strong>Cold weather ({weather.temperature}°F)</strong> - Cover sensitive plants tonight. Harvest remaining cool-season crops.
              </div>
            </li>
          )}
          {weather.temperature < 32 && (
            <li className="flex items-start gap-2">
              <span className="text-xl">🧊</span>
              <div>
                <strong>FREEZING ({weather.temperature}°F)</strong> - Bring containers indoors immediately. Cover garden beds with frost cloth. Drain hoses.
              </div>
            </li>
          )}
          {weather.humidity > 70 && (
            <li className="flex items-start gap-2">
              <span className="text-xl">💧</span>
              <div>
                <strong>High humidity ({weather.humidity}%)</strong> - Watch for fungal diseases like powdery mildew. Ensure good air circulation around plants.
              </div>
            </li>
          )}
          {weather.windSpeed > 15 && (
            <li className="flex items-start gap-2">
              <span className="text-xl">💨</span>
              <div>
                <strong>Windy conditions ({weather.windSpeed} mph)</strong> - Stake tall plants. Secure loose items in the garden.
              </div>
            </li>
          )}
          {weather.weatherCode >= 61 && weather.weatherCode <= 82 && (
            <li className="flex items-start gap-2">
              <span className="text-xl">🌧️</span>
              <div>
                <strong>Rain expected</strong> - Skip watering today. Check drainage in low spots. Good time to plan indoor gardening tasks.
              </div>
            </li>
          )}
          {weather.weatherCode <= 2 && weather.temperature >= 60 && weather.temperature <= 80 && (
            <li className="flex items-start gap-2">
              <span className="text-xl">☀️</span>
              <div>
                <strong>Perfect gardening weather!</strong> - Ideal conditions for planting, pruning, and general garden maintenance.
              </div>
            </li>
          )}
          {forecast.length > 0 && forecast[0].tempMin < 32 && (
            <li className="flex items-start gap-2">
              <span className="text-xl">⚠️</span>
              <div>
                <strong>Frost warning tomorrow</strong> - Low of {forecast[0].tempMin}°F expected. Protect tender plants tonight.
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
