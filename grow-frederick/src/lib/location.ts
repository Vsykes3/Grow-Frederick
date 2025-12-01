// lib/location.ts
/**
 * Location service for GrowCommon
 * Handles location detection, storage, and management
 */

import { LocationData } from './weather';

export interface UserLocation {
  lat: number;
  lon: number;
  city: string;
  state: string;
  country: string;
  zipCode?: string;
  timezone: string;
  isDefault: boolean;
  lastUpdated: Date;
}

export interface LocationPermission {
  granted: boolean;
  denied: boolean;
  prompt: boolean;
}

class LocationService {
  private readonly COOKIE_NAME = 'growcommon-location';
  private readonly COOKIE_EXPIRY_DAYS = 30;

  /**
   * Get user's current location
   */
  async getCurrentLocation(): Promise<UserLocation | null> {
    try {
      // First, try to get location from cookies
      const savedLocation = this.getSavedLocation();
      if (savedLocation) {
        return savedLocation;
      }

      // If no saved location, try to get from browser geolocation
      const browserLocation = await this.getBrowserLocation();
      if (browserLocation) {
        // Save the location for future use
        this.saveLocation(browserLocation);
        return browserLocation;
      }

      return null;
    } catch (error) {
      console.error('Failed to get current location:', error);
      return null;
    }
  }

  /**
   * Get location from browser geolocation API
   */
  private async getBrowserLocation(): Promise<UserLocation | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const locationData = await this.reverseGeocode(latitude, longitude);
            
            if (locationData) {
              resolve({
                lat: latitude,
                lon: longitude,
                city: locationData.city,
                state: locationData.state,
                country: locationData.country,
                zipCode: locationData.zipCode,
                timezone: locationData.timezone,
                isDefault: false,
                lastUpdated: new Date(),
              });
            } else {
              resolve(null);
            }
          } catch (error) {
            console.error('Failed to reverse geocode location:', error);
            resolve(null);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        }
      );
    });
  }

  /**
   * Reverse geocode coordinates to get location data
   */
  private async reverseGeocode(lat: number, lon: number): Promise<LocationData | null> {
    try {
      // Use a free reverse geocoding service
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );

      if (!response.ok) {
        throw new Error(`Reverse geocoding failed: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        lat,
        lon,
        city: data.city || data.locality || 'Unknown',
        state: data.principalSubdivision || data.administrativeArea || 'Unknown',
        country: data.countryName || 'Unknown',
        zipCode: data.postcode,
        timezone: data.localityInfo?.administrative?.[0]?.name || 'UTC',
      };
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return null;
    }
  }

  /**
   * Save location to cookies
   */
  saveLocation(location: UserLocation): void {
    try {
      const locationData = {
        ...location,
        lastUpdated: new Date().toISOString(),
      };

      const cookieValue = encodeURIComponent(JSON.stringify(locationData));
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + this.COOKIE_EXPIRY_DAYS);

      document.cookie = `${this.COOKIE_NAME}=${cookieValue}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
    } catch (error) {
      console.error('Failed to save location to cookies:', error);
    }
  }

  /**
   * Get saved location from cookies
   */
  getSavedLocation(): UserLocation | null {
    try {
      const cookies = document.cookie.split(';');
      const locationCookie = cookies.find(cookie => 
        cookie.trim().startsWith(`${this.COOKIE_NAME}=`)
      );

      if (!locationCookie) {
        return null;
      }

      const cookieValue = locationCookie.split('=')[1];
      const locationData = JSON.parse(decodeURIComponent(cookieValue));
      
      return {
        ...locationData,
        lastUpdated: new Date(locationData.lastUpdated),
      };
    } catch (error) {
      console.error('Failed to get saved location from cookies:', error);
      return null;
    }
  }

  /**
   * Clear saved location
   */
  clearSavedLocation(): void {
    try {
      document.cookie = `${this.COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    } catch (error) {
      console.error('Failed to clear saved location:', error);
    }
  }

  /**
   * Check if location permission is available
   */
  getLocationPermission(): LocationPermission {
    if (!navigator.geolocation) {
      return {
        granted: false,
        denied: true,
        prompt: false,
      };
    }

    // Check if permission was previously granted
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' as PermissionName }).then((result) => {
        return {
          granted: result.state === 'granted',
          denied: result.state === 'denied',
          prompt: result.state === 'prompt',
        };
      });
    }

    return {
      granted: false,
      denied: false,
      prompt: true,
    };
  }

  /**
   * Request location permission
   */
  async requestLocationPermission(): Promise<boolean> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        () => resolve(true),
        () => resolve(false),
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    });
  }

  /**
   * Get default location (Frederick, MD)
   */
  getDefaultLocation(): UserLocation {
    return {
      lat: 39.4143,
      lon: -77.4105,
      city: 'Frederick',
      state: 'MD',
      country: 'US',
      zipCode: '21701',
      timezone: 'America/New_York',
      isDefault: true,
      lastUpdated: new Date(),
    };
  }

  /**
   * Calculate distance between two coordinates
   */
  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 3959; // Earth's radius in miles
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  /**
   * Convert degrees to radians
   */
  private toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  /**
   * Format location for display
   */
  formatLocation(location: UserLocation): string {
    if (location.zipCode) {
      return `${location.city}, ${location.state} ${location.zipCode}`;
    }
    return `${location.city}, ${location.state}`;
  }

  /**
   * Check if location is recent (within 24 hours)
   */
  isLocationRecent(location: UserLocation): boolean {
    const now = new Date();
    const diffTime = now.getTime() - location.lastUpdated.getTime();
    const diffHours = diffTime / (1000 * 60 * 60);
    return diffHours < 24;
  }
}

export const locationService = new LocationService();

