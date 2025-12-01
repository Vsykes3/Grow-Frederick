// lib/units.ts
/**
 * Utility functions for unit conversions and formatting
 * Used throughout the app for consistent unit handling
 */

export type TemperatureUnit = 'fahrenheit' | 'celsius';
export type DistanceUnit = 'imperial' | 'metric';
export type PressureUnit = 'inHg' | 'hPa';

/**
 * Convert temperature between Fahrenheit and Celsius
 */
export function convertTemperature(
  value: number, 
  from: TemperatureUnit, 
  to: TemperatureUnit
): number {
  if (from === to) return value;
  
  if (from === 'fahrenheit' && to === 'celsius') {
    return (value - 32) * 5/9;
  }
  
  if (from === 'celsius' && to === 'fahrenheit') {
    return (value * 9/5) + 32;
  }
  
  return value;
}

/**
 * Format temperature with unit symbol
 */
export function formatTemperature(
  value: number, 
  unit: TemperatureUnit, 
  decimals: number = 1
): string {
  const symbol = unit === 'fahrenheit' ? 'Â°F' : 'Â°C';
  return `${value.toFixed(decimals)}${symbol}`;
}

/**
 * Convert distance between imperial and metric
 */
export function convertDistance(
  value: number, 
  from: DistanceUnit, 
  to: DistanceUnit
): number {
  if (from === to) return value;
  
  if (from === 'imperial' && to === 'metric') {
    return value * 25.4; // inches to mm
  }
  
  if (from === 'metric' && to === 'imperial') {
    return value / 25.4; // mm to inches
  }
  
  return value;
}

/**
 * Format distance with unit symbol
 */
export function formatDistance(
  value: number, 
  unit: DistanceUnit, 
  decimals: number = 2
): string {
  const symbol = unit === 'imperial' ? 'in' : 'mm';
  return `${value.toFixed(decimals)} ${symbol}`;
}

/**
 * Convert pressure between inHg and hPa
 */
export function convertPressure(
  value: number, 
  from: PressureUnit, 
  to: PressureUnit
): number {
  if (from === to) return value;
  
  if (from === 'inHg' && to === 'hPa') {
    return value * 33.863886666667;
  }
  
  if (from === 'hPa' && to === 'inHg') {
    return value / 33.863886666667;
  }
  
  return value;
}

/**
 * Format pressure with unit symbol
 */
export function formatPressure(
  value: number, 
  unit: PressureUnit, 
  decimals: number = 2
): string {
  return `${value.toFixed(decimals)} ${unit}`;
}

/**
 * Get user's preferred units from localStorage or default
 */
export function getUserUnits(): {
  temperature: TemperatureUnit;
  distance: DistanceUnit;
  pressure: PressureUnit;
} {
  if (typeof window === 'undefined') {
    return {
      temperature: 'fahrenheit',
      distance: 'imperial',
      pressure: 'inHg',
    };
  }

  try {
    const stored = localStorage.getItem('growcommon-units');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to parse stored units:', error);
  }

  return {
    temperature: 'fahrenheit',
    distance: 'imperial',
    pressure: 'inHg',
  };
}

/**
 * Save user's preferred units to localStorage
 */
export function setUserUnits(units: {
  temperature: TemperatureUnit;
  distance: DistanceUnit;
  pressure: PressureUnit;
}): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('growcommon-units', JSON.stringify(units));
  } catch (error) {
    console.warn('Failed to save units:', error);
  }
}

/**
 * Format wind speed with appropriate unit
 */
export function formatWindSpeed(
  value: number, 
  unit: DistanceUnit, 
  decimals: number = 1
): string {
  if (unit === 'imperial') {
    return `${value.toFixed(decimals)} mph`;
  } else {
    return `${value.toFixed(decimals)} km/h`;
  }
}

/**
 * Format humidity percentage
 */
export function formatHumidity(value: number): string {
  return `${Math.round(value)}%`;
}

/**
 * Format UV index with description
 */
export function formatUVIndex(value: number): string {
  const descriptions = [
    'Low',
    'Low',
    'Low',
    'Moderate',
    'Moderate',
    'Moderate',
    'High',
    'High',
    'Very High',
    'Very High',
    'Extreme',
  ];
  
  const index = Math.min(Math.floor(value), 10);
  const description = descriptions[index] || 'Extreme';
  
  return `${value.toFixed(1)} (${description})`;
}

/**
 * Format soil moisture percentage
 */
export function formatSoilMoisture(value: number): string {
  return `${Math.round(value)}%`;
}

/**
 * Format plant hardiness zone
 */
export function formatHardinessZone(zone: number): string {
  return `Zone ${zone}`;
}

/**
 * Format planting depth
 */
export function formatPlantingDepth(
  value: number, 
  unit: DistanceUnit, 
  decimals: number = 1
): string {
  return formatDistance(value, unit, decimals);
}

/**
 * Format plant spacing
 */
export function formatPlantSpacing(
  value: number, 
  unit: DistanceUnit, 
  decimals: number = 1
): string {
  return formatDistance(value, unit, decimals);
}

