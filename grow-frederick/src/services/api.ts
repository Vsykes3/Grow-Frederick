import axios from 'axios';

// API Configuration
const API_CONFIG = {
  OPENWEATHER: {
    baseURL: 'https://api.openweathermap.org/data/2.5',
    key: process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY || 'demo_key'
  },
  TREFLE: {
    baseURL: 'https://trefle.io/api/v1',
    key: process.env.NEXT_PUBLIC_TREFLE_API_KEY || 'vLfyzVxaSLfWRIOyLX_GOZBH6OC1z6SF61F17nQAsiI'
  },
  PLANT_ID: {
    baseURL: 'https://api.plant.id/v3',
    key: process.env.NEXT_PUBLIC_PLANT_ID_API_KEY || 'demo_key'
  },
  VISUAL_CROSSING: {
    baseURL: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services',
    key: process.env.NEXT_PUBLIC_VISUALCROSSING_KEY || 'demo_key'
  },
  GOOGLE_MAPS: {
    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || 'demo_key'
  }
};

// Weather API Service
export const weatherAPI = {
  async getCurrentWeather(lat: number, lng: number) {
    try {
      const response = await axios.get(`${API_CONFIG.OPENWEATHER.baseURL}/weather`, {
        params: {
          lat,
          lon: lng,
          appid: API_CONFIG.OPENWEATHER.key,
          units: 'imperial'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Weather API Error:', error);
      // Return mock data for demo
      return {
        main: { temp: 72, humidity: 65, pressure: 1013 },
        weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }],
        wind: { speed: 5, deg: 180 },
        name: 'Frederick'
      };
    }
  },

  async getForecast(lat: number, lng: number) {
    try {
      const response = await axios.get(`${API_CONFIG.OPENWEATHER.baseURL}/forecast`, {
        params: {
          lat,
          lon: lng,
          appid: API_CONFIG.OPENWEATHER.key,
          units: 'imperial'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Forecast API Error:', error);
      // Return mock data
      return {
        list: Array.from({ length: 5 }, (_, i) => ({
          dt: Date.now() + (i * 24 * 60 * 60 * 1000),
          main: { temp: 70 + i * 2, humidity: 60 + i * 2 },
          weather: [{ main: 'Clear', description: 'clear sky', icon: '01d' }]
        }))
      };
    }
  }
};

// Plant Database API Service
export const plantAPI = {
  async searchPlants(query: string, page = 1) {
    try {
      const response = await axios.get(`${API_CONFIG.TREFLE.baseURL}/plants`, {
        params: {
          q: query,
          page,
          token: API_CONFIG.TREFLE.key
        }
      });
      return response.data;
    } catch (error) {
      console.error('Plant Search API Error:', error);
      // Return mock data
      return {
        data: [
          {
            id: 1,
            common_name: 'Tomato',
            scientific_name: 'Solanum lycopersicum',
            image_url: '/api/placeholder/300/200',
            family: 'Solanaceae',
            genus: 'Solanum'
          },
          {
            id: 2,
            common_name: 'Lettuce',
            scientific_name: 'Lactuca sativa',
            image_url: '/api/placeholder/300/200',
            family: 'Asteraceae',
            genus: 'Lactuca'
          }
        ]
      };
    }
  },

  async getPlantDetails(id: string) {
    try {
      const response = await axios.get(`${API_CONFIG.TREFLE.baseURL}/plants/${id}`, {
        params: {
          token: API_CONFIG.TREFLE.key
        }
      });
      return response.data;
    } catch (error) {
      console.error('Plant Details API Error:', error);
      // Return mock data
      return {
        id,
        common_name: 'Tomato',
        scientific_name: 'Solanum lycopersicum',
        family: 'Solanaceae',
        genus: 'Solanum',
        image_url: '/api/placeholder/400/300',
        edible: true,
        edible_part: ['fruit'],
        propagation: ['seeds'],
        watering: 'regular',
        sunlight: 'full_sun',
        hardiness: {
          min: 2,
          max: 11
        }
      };
    }
  }
};

// Plant Identification API Service
export const plantIdAPI = {
  async identifyPlant(imageBase64: string) {
    try {
      const response = await axios.post(`${API_CONFIG.PLANT_ID.baseURL}/identification`, {
        images: [imageBase64],
        modifiers: ['crops_fast', 'similar_images', 'plant_net'],
        plant_language: 'en',
        plant_details: ['common_names', 'url', 'description', 'taxonomy', 'rank', 'gbif_id', 'inaturalist_id', 'image', 'synonyms', 'edible_parts', 'watering']
      }, {
        headers: {
          'Api-Key': API_CONFIG.PLANT_ID.key,
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Plant ID API Error:', error);
      // Return mock data
      return {
        id: 'mock_id',
        suggestions: [
          {
            id: 'suggestion_1',
            plant_name: 'Tomato',
            plant_details: {
              common_names: ['Tomato', 'Garden Tomato'],
              url: 'https://en.wikipedia.org/wiki/Tomato',
              description: 'The tomato is the edible berry of the plant Solanum lycopersicum.',
              taxonomy: {
                class: 'Magnoliopsida',
                genus: 'Solanum',
                family: 'Solanaceae',
                order: 'Solanales',
                phylum: 'Magnoliophyta',
                kingdom: 'Plantae'
              }
            },
            probability: 0.95
          }
        ]
      };
    }
  }
};

// Google Maps API Service
export const mapsAPI = {
  async getLocationFromCoords(lat: number, lng: number) {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          latlng: `${lat},${lng}`,
          key: API_CONFIG.GOOGLE_MAPS.key
        }
      });
      return response.data;
    } catch (error) {
      console.error('Maps API Error:', error);
      // Return mock data
      return {
        results: [{
          formatted_address: 'Frederick, MD, USA',
          address_components: [
            { long_name: 'Frederick', short_name: 'Frederick', types: ['locality', 'political'] },
            { long_name: 'Maryland', short_name: 'MD', types: ['administrative_area_level_1', 'political'] },
            { long_name: 'United States', short_name: 'US', types: ['country', 'political'] }
          ]
        }]
      };
    }
  },

  async getCoordsFromAddress(address: string) {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address,
          key: API_CONFIG.GOOGLE_MAPS.key
        }
      });
      return response.data;
    } catch (error) {
      console.error('Maps Geocoding API Error:', error);
      // Return mock data for Frederick, MD
      return {
        results: [{
          geometry: {
            location: {
              lat: 39.4143,
              lng: -77.4105
            }
          },
          formatted_address: 'Frederick, MD, USA'
        }]
      };
    }
  }
};

// USDA Hardiness Zone API (Mock implementation)
export const hardinessAPI = {
  async getHardinessZone(lat: number, lng: number) {
    // Mock hardiness zone data for Frederick, MD area
    return {
      zone: '7a',
      min_temp: '0°F to 5°F',
      description: 'Moderate climate suitable for many plants'
    };
  }
};

// Combined API service
export const apiService = {
  weather: weatherAPI,
  plants: plantAPI,
  plantId: plantIdAPI,
  maps: mapsAPI,
  hardiness: hardinessAPI,
  // Placeholder API service methods
  get: async (url: string) => {
    return fetch(url).then(res => res.json())
  },
  post: async (url: string, data: any) => {
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => res.json())
  }
};
