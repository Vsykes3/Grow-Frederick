// lib/weather.ts
/**
 * Weather API service for GrowCommon
 * Integrates with OpenWeather API for comprehensive weather data
 */

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  conditions: string;
  windSpeed: number;
  pressure: number;
  uvIndex: number;
  visibility: number;
  timestamp: Date;
}

export interface WeatherForecast {
  date: Date;
  temperature: {
    min: number;
    max: number;
    avg: number;
  };
  humidity: number;
  rainfall: number;
  conditions: string;
  windSpeed: number;
  pressure: number;
}

export interface LocationData {
  lat: number;
  lon: number;
  city: string;
  state: string;
  country: string;
  zipCode?: string;
  timezone: string;
}

export interface FrostData {
  lastFrost: Date;
  firstFrost: Date;
  growingDays: number;
  hardinessZone: string;
}

class WeatherService {
  private apiKey: string;
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || '';
    if (!this.apiKey) {
      console.warn('OpenWeather API key not found. Weather features will be limited.');
    }
  }

  /**
   * Get current weather data for a location
   */
  async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    if (!this.apiKey) {
      return this.getMockWeatherData();
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=imperial`
      );

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }

      const data = await response.json();
      return this.transformWeatherData(data);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      return this.getMockWeatherData();
    }
  }

  /**
   * Get 5-day weather forecast
   */
  async getForecast(lat: number, lon: number): Promise<WeatherForecast[]> {
    if (!this.apiKey) {
      return this.getMockForecastData();
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=imperial`
      );

      if (!response.ok) {
        throw new Error(`Forecast API error: ${response.status}`);
      }

      const data = await response.json();
      return this.transformForecastData(data);
    } catch (error) {
      console.error('Failed to fetch forecast data:', error);
      return this.getMockForecastData();
    }
  }

  /**
   * Get location data from coordinates
   */
  async getLocationData(lat: number, lon: number): Promise<LocationData> {
    if (!this.apiKey) {
      return this.getMockLocationData();
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Location API error: ${response.status}`);
      }

      const data = await response.json();
      return this.transformLocationData(data);
    } catch (error) {
      console.error('Failed to fetch location data:', error);
      return this.getMockLocationData();
    }
  }

  /**
   * Get frost dates for a location based on hardiness zone
   */
  getFrostData(lat: number, lon: number, hardinessZone?: string): FrostData {
    // Calculate hardiness zone if not provided
    const zone = hardinessZone || this.calculateHardinessZone(lat, lon);
    
    // Frost date estimates based on hardiness zone
    const frostDates = this.getFrostDatesByZone(zone);
    
    return {
      lastFrost: frostDates.lastFrost,
      firstFrost: frostDates.firstFrost,
      growingDays: this.calculateGrowingDays(frostDates.lastFrost, frostDates.firstFrost),
      hardinessZone: zone,
    };
  }

  /**
   * Transform OpenWeather API response to our format
   */
  private transformWeatherData(data: any): WeatherData {
    return {
      temperature: Math.round(data.main.temp),
      humidity: data.main.humidity,
      rainfall: data.rain?.['1h'] || 0,
      conditions: data.weather[0].description,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      uvIndex: 0, // Would need UV API for this
      visibility: data.visibility / 1000, // Convert to km
      timestamp: new Date(data.dt * 1000),
    };
  }

  /**
   * Transform forecast data
   */
  private transformForecastData(data: any): WeatherForecast[] {
    const forecasts: WeatherForecast[] = [];
    const dailyData: { [key: string]: any[] } = {};

    // Group forecast data by day
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toDateString();
      
      if (!dailyData[dayKey]) {
        dailyData[dayKey] = [];
      }
      dailyData[dayKey].push(item);
    });

    // Process each day
    Object.entries(dailyData).forEach(([dayKey, dayItems]) => {
      const temperatures = dayItems.map(item => item.main.temp);
      const humidities = dayItems.map(item => item.main.humidity);
      const rainfalls = dayItems.map(item => item.rain?.['3h'] || 0);
      const winds = dayItems.map(item => item.wind.speed);
      const pressures = dayItems.map(item => item.main.pressure);

      forecasts.push({
        date: new Date(dayKey),
        temperature: {
          min: Math.round(Math.min(...temperatures)),
          max: Math.round(Math.max(...temperatures)),
          avg: Math.round(temperatures.reduce((a, b) => a + b, 0) / temperatures.length),
        },
        humidity: Math.round(humidities.reduce((a, b) => a + b, 0) / humidities.length),
        rainfall: Math.round(rainfalls.reduce((a, b) => a + b, 0) * 10) / 10,
        conditions: dayItems[0].weather[0].description,
        windSpeed: Math.round(winds.reduce((a, b) => a + b, 0) / winds.length),
        pressure: Math.round(pressures.reduce((a, b) => a + b, 0) / pressures.length),
      });
    });

    return forecasts.slice(0, 5); // Return 5-day forecast
  }

  /**
   * Transform location data
   */
  private transformLocationData(data: any): LocationData {
    return {
      lat: data.coord.lat,
      lon: data.coord.lon,
      city: data.name,
      state: data.sys.country,
      country: data.sys.country,
      timezone: data.timezone,
    };
  }

  /**
   * Calculate hardiness zone based on coordinates
   */
  private calculateHardinessZone(lat: number, lon: number): string {
    // Simplified hardiness zone calculation
    // In a real implementation, you'd use more sophisticated algorithms
    if (lat > 45) return '3a';
    if (lat > 40) return '5b';
    if (lat > 35) return '7a';
    if (lat > 30) return '8b';
    if (lat > 25) return '10a';
    return '11a';
  }

  /**
   * Get frost dates by hardiness zone
   */
  private getFrostDatesByZone(zone: string): { lastFrost: Date; firstFrost: Date } {
    const currentYear = new Date().getFullYear();
    
    // Frost date estimates by zone
    const frostDates: { [key: string]: { last: number; first: number } } = {
      '3a': { last: 90, first: 270 }, // May 1, Sep 30
      '3b': { last: 85, first: 275 }, // Apr 26, Oct 5
      '4a': { last: 80, first: 280 }, // Apr 21, Oct 10
      '4b': { last: 75, first: 285 }, // Apr 16, Oct 15
      '5a': { last: 70, first: 290 }, // Apr 11, Oct 20
      '5b': { last: 65, first: 295 }, // Apr 6, Oct 25
      '6a': { last: 60, first: 300 }, // Apr 1, Oct 30
      '6b': { last: 55, first: 305 }, // Mar 27, Nov 4
      '7a': { last: 50, first: 310 }, // Mar 22, Nov 9
      '7b': { last: 45, first: 315 }, // Mar 17, Nov 14
      '8a': { last: 40, first: 320 }, // Mar 12, Nov 19
      '8b': { last: 35, first: 325 }, // Mar 7, Nov 24
      '9a': { last: 30, first: 330 }, // Mar 2, Nov 29
      '9b': { last: 25, first: 335 }, // Feb 25, Dec 4
      '10a': { last: 20, first: 340 }, // Feb 20, Dec 9
      '10b': { last: 15, first: 345 }, // Feb 15, Dec 14
      '11a': { last: 10, first: 350 }, // Feb 10, Dec 19
    };

    const dates = frostDates[zone] || frostDates['6b']; // Default to 6b
    
    return {
      lastFrost: new Date(currentYear, 0, dates.last),
      firstFrost: new Date(currentYear, 0, dates.first),
    };
  }

  /**
   * Calculate growing days between frost dates
   */
  private calculateGrowingDays(lastFrost: Date, firstFrost: Date): number {
    const diffTime = firstFrost.getTime() - lastFrost.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Mock weather data for development
   */
  private getMockWeatherData(): WeatherData {
    return {
      temperature: 72,
      humidity: 65,
      rainfall: 0.1,
      conditions: 'partly cloudy',
      windSpeed: 8,
      pressure: 1013,
      uvIndex: 6,
      visibility: 10,
      timestamp: new Date(),
    };
  }

  /**
   * Mock forecast data for development
   */
  private getMockForecastData(): WeatherForecast[] {
    const forecasts: WeatherForecast[] = [];
    const today = new Date();

    for (let i = 1; i <= 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      forecasts.push({
        date,
        temperature: {
          min: 55 + Math.random() * 10,
          max: 75 + Math.random() * 10,
          avg: 65 + Math.random() * 10,
        },
        humidity: 60 + Math.random() * 20,
        rainfall: Math.random() * 0.5,
        conditions: ['sunny', 'partly cloudy', 'cloudy', 'rainy'][Math.floor(Math.random() * 4)],
        windSpeed: 5 + Math.random() * 10,
        pressure: 1010 + Math.random() * 10,
      });
    }

    return forecasts;
  }

  /**
   * Mock location data for development
   */
  private getMockLocationData(): LocationData {
    return {
      lat: 39.4143,
      lon: -77.4105,
      city: 'Frederick',
      state: 'MD',
      country: 'US',
      zipCode: '21701',
      timezone: 'America/New_York',
    };
  }
}

export const weatherService = new WeatherService();

