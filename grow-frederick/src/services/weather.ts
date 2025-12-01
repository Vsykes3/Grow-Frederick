import axios from 'axios';
import type { WeatherForecast, WeatherPoint } from '/src/types';

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;
const VISUALCROSSING_API_KEY = import.meta.env.VITE_VISUALCROSSING_KEY;

// Mock weather data for development
const mockWeatherData: WeatherForecast = {
  current: {
    time: new Date().toISOString(),
    temperature: 22,
    humidity: 65,
    rain: 0,
    uv: 6,
    soilMoisture: 45,
    windSpeed: 12,
    windDirection: 180,
    pressure: 1013,
    visibility: 10,
  },
  hourly: Array.from({ length: 24 }, (_, i) => ({
    time: new Date(Date.now() + i * 60 * 60 * 1000).toISOString(),
    temperature: 22 + Math.sin(i / 4) * 5,
    humidity: 65 + Math.sin(i / 6) * 10,
    rain: Math.random() > 0.8 ? Math.random() * 2 : 0,
    uv: Math.max(0, 6 + Math.sin(i / 8) * 3),
    soilMoisture: 45 + Math.sin(i / 12) * 15,
    windSpeed: 12 + Math.random() * 8,
    windDirection: (180 + Math.random() * 180) % 360,
    pressure: 1013 + Math.random() * 20 - 10,
    visibility: 10 - Math.random() * 2,
  })),
  daily: Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    minTemp: 15 + Math.random() * 5,
    maxTemp: 25 + Math.random() * 5,
    conditions: ['sunny', 'partly-cloudy', 'cloudy', 'rainy'][Math.floor(Math.random() * 4)],
    icon: ['01d', '02d', '03d', '10d'][Math.floor(Math.random() * 4)],
    precipitation: Math.random() * 5,
    humidity: 60 + Math.random() * 20,
  })),
  frostDates: {
    firstFrost: '2024-10-20',
    lastFrost: '2024-04-15',
  },
};

export async function getCurrentWeather(zip: string): Promise<WeatherPoint> {
  if (!OPENWEATHER_API_KEY) {
    console.warn('OpenWeather API key not found, using mock data');
    return mockWeatherData.current;
  }

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        zip,
        appid: OPENWEATHER_API_KEY,
        units: 'metric',
      },
    });

    const data = response.data;
    return {
      time: new Date().toISOString(),
      temperature: data.main.temp,
      humidity: data.main.humidity,
      rain: data.rain?.['1h'] || 0,
      uv: 0, // UV data requires separate API call
      soilMoisture: 45, // Mock data
      windSpeed: data.wind.speed * 3.6, // Convert m/s to km/h
      windDirection: data.wind.deg,
      pressure: data.main.pressure,
      visibility: data.visibility / 1000, // Convert m to km
    };
  } catch (error) {
    console.error('Error fetching current weather:', error);
    return mockWeatherData.current;
  }
}

export async function getWeatherForecast(zip: string): Promise<WeatherForecast> {
  if (!OPENWEATHER_API_KEY) {
    console.warn('OpenWeather API key not found, using mock data');
    return mockWeatherData;
  }

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
      params: {
        zip,
        appid: OPENWEATHER_API_KEY,
        units: 'metric',
      },
    });

    const data = response.data;
    const hourly: WeatherPoint[] = data.list.slice(0, 24).map((item: any) => ({
      time: new Date(item.dt * 1000).toISOString(),
      temperature: item.main.temp,
      humidity: item.main.humidity,
      rain: item.rain?.['3h'] || 0,
      uv: 0,
      soilMoisture: 45,
      windSpeed: item.wind.speed * 3.6,
      windDirection: item.wind.deg,
      pressure: item.main.pressure,
      visibility: item.visibility / 1000,
    }));

    // Mock daily forecast (OpenWeather free tier doesn't include daily)
    const daily = Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      minTemp: 15 + Math.random() * 5,
      maxTemp: 25 + Math.random() * 5,
      conditions: ['sunny', 'partly-cloudy', 'cloudy', 'rainy'][Math.floor(Math.random() * 4)],
      icon: ['01d', '02d', '03d', '10d'][Math.floor(Math.random() * 4)],
      precipitation: Math.random() * 5,
      humidity: 60 + Math.random() * 20,
    }));

    return {
      current: hourly[0],
      hourly,
      daily,
      frostDates: {
        firstFrost: '2024-10-20',
        lastFrost: '2024-04-15',
      },
    };
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    return mockWeatherData;
  }
}

export async function getFrostDates(zip: string): Promise<{ firstFrost: string; lastFrost: string }> {
  // Mock frost dates based on USDA hardiness zones
  // In a real implementation, this would use a more sophisticated API
  const zoneMap: Record<string, { firstFrost: string; lastFrost: string }> = {
    '21701': { firstFrost: '2024-10-20', lastFrost: '2024-04-15' }, // Frederick, MD - Zone 7a
    '21702': { firstFrost: '2024-10-20', lastFrost: '2024-04-15' },
    '21703': { firstFrost: '2024-10-20', lastFrost: '2024-04-15' },
    '21704': { firstFrost: '2024-10-20', lastFrost: '2024-04-15' },
    '21705': { firstFrost: '2024-10-20', lastFrost: '2024-04-15' },
  };

  return zoneMap[zip] || { firstFrost: '2024-10-20', lastFrost: '2024-04-15' };
}

export function getWeatherRecommendations(weather: WeatherPoint): string[] {
  const recommendations: string[] = [];

  if (weather.temperature < 5) {
    recommendations.push('Protect tender plants from frost');
  }

  if (weather.humidity > 80) {
    recommendations.push('High humidity - watch for fungal diseases');
  }

  if (weather.rain > 5) {
    recommendations.push('Heavy rain expected - check drainage');
  }

  if (weather.uv > 8) {
    recommendations.push('High UV - provide shade for sensitive plants');
  }

  if (weather.windSpeed > 20) {
    recommendations.push('Strong winds - secure tall plants and structures');
  }

  if (weather.soilMoisture < 30) {
    recommendations.push('Low soil moisture - consider watering');
  }

  return recommendations;
}

export function getSeasonalAdvice(month: number): string[] {
  const advice: Record<number, string[]> = {
    1: ['Plan your garden layout', 'Order seeds for spring planting', 'Check stored bulbs and tubers'],
    2: ['Start seeds indoors for early crops', 'Prune dormant trees and shrubs', 'Prepare garden beds'],
    3: ['Plant cool-season vegetables', 'Divide perennials', 'Apply compost to garden beds'],
    4: ['Plant warm-season vegetables', 'Start hardening off seedlings', 'Watch for early pests'],
    5: ['Plant summer annuals', 'Mulch around plants', 'Set up irrigation systems'],
    6: ['Harvest early crops', 'Plant succession crops', 'Monitor for pests and diseases'],
    7: ['Harvest summer vegetables', 'Water deeply during dry spells', 'Deadhead flowers'],
    8: ['Harvest peak summer crops', 'Plant fall vegetables', 'Collect seeds from annuals'],
    9: ['Harvest fall crops', 'Plant cover crops', 'Divide and transplant perennials'],
    10: ['Harvest remaining crops', 'Clean up garden beds', 'Plant spring bulbs'],
    11: ['Protect tender plants', 'Clean and store tools', 'Plan next year\'s garden'],
    12: ['Review garden journal', 'Order seeds for next year', 'Enjoy indoor gardening'],
  };

  return advice[month] || [];
}

