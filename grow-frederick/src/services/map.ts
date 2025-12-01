import type { HeatmapData } from '/src/types';

export async function getTemperatureHeatmap(zip: string): Promise<HeatmapData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock temperature data for Frederick, MD area
  const baseLat = 39.4143;
  const baseLng = -77.4105;
  const data = [];

  // Generate mock temperature data points
  for (let i = 0; i < 50; i++) {
    const lat = baseLat + (Math.random() - 0.5) * 0.1; // ~5 mile radius
    const lng = baseLng + (Math.random() - 0.5) * 0.1;
    const temperature = 20 + Math.random() * 15; // 20-35Â°C range

    data.push({
      lat,
      lng,
      value: temperature,
    });
  }

  return {
    type: 'temperature',
    data,
    legend: {
      min: 15,
      max: 35,
      unit: 'Â°C',
    },
  };
}

export async function getHumidityHeatmap(zip: string): Promise<HeatmapData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const baseLat = 39.4143;
  const baseLng = -77.4105;
  const data = [];

  for (let i = 0; i < 50; i++) {
    const lat = baseLat + (Math.random() - 0.5) * 0.1;
    const lng = baseLng + (Math.random() - 0.5) * 0.1;
    const humidity = 40 + Math.random() * 40; // 40-80% range

    data.push({
      lat,
      lng,
      value: humidity,
    });
  }

  return {
    type: 'humidity',
    data,
    legend: {
      min: 30,
      max: 90,
      unit: '%',
    },
  };
}

export async function getRainfallHeatmap(zip: string): Promise<HeatmapData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const baseLat = 39.4143;
  const baseLng = -77.4105;
  const data = [];

  for (let i = 0; i < 50; i++) {
    const lat = baseLat + (Math.random() - 0.5) * 0.1;
    const lng = baseLng + (Math.random() - 0.5) * 0.1;
    const rainfall = Math.random() * 20; // 0-20mm range

    data.push({
      lat,
      lng,
      value: rainfall,
    });
  }

  return {
    type: 'rainfall',
    data,
    legend: {
      min: 0,
      max: 25,
      unit: 'mm',
    },
  };
}

export async function getFrostHeatmap(zip: string): Promise<HeatmapData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const baseLat = 39.4143;
  const baseLng = -77.4105;
  const data = [];

  for (let i = 0; i < 50; i++) {
    const lat = baseLat + (Math.random() - 0.5) * 0.1;
    const lng = baseLng + (Math.random() - 0.5) * 0.1;
    // Frost risk: 0-100 scale
    const frostRisk = Math.random() * 100;

    data.push({
      lat,
      lng,
      value: frostRisk,
    });
  }

  return {
    type: 'frost',
    data,
    legend: {
      min: 0,
      max: 100,
      unit: '%',
    },
  };
}

export async function getSunlightHeatmap(zip: string): Promise<HeatmapData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const baseLat = 39.4143;
  const baseLng = -77.4105;
  const data = [];

  for (let i = 0; i < 50; i++) {
    const lat = baseLat + (Math.random() - 0.5) * 0.1;
    const lng = baseLng + (Math.random() - 0.5) * 0.1;
    // Sunlight hours per day
    const sunlight = 6 + Math.random() * 6; // 6-12 hours range

    data.push({
      lat,
      lng,
      value: sunlight,
    });
  }

  return {
    type: 'sunlight',
    data,
    legend: {
      min: 4,
      max: 14,
      unit: 'hrs',
    },
  };
}

export async function getHeatmapData(type: 'temperature' | 'humidity' | 'rainfall' | 'frost' | 'sunlight', zip: string): Promise<HeatmapData> {
  switch (type) {
    case 'temperature':
      return getTemperatureHeatmap(zip);
    case 'humidity':
      return getHumidityHeatmap(zip);
    case 'rainfall':
      return getRainfallHeatmap(zip);
    case 'frost':
      return getFrostHeatmap(zip);
    case 'sunlight':
      return getSunlightHeatmap(zip);
    default:
      throw new Error(`Unknown heatmap type: ${type}`);
  }
}

export function getHeatmapColors(type: string): string[] {
  const colorMaps = {
    temperature: [
      '#000080', // Blue (cold)
      '#0000FF',
      '#00FFFF',
      '#00FF00',
      '#FFFF00',
      '#FF8000',
      '#FF0000', // Red (hot)
    ],
    humidity: [
      '#8B4513', // Brown (dry)
      '#DEB887',
      '#F0E68C',
      '#90EE90',
      '#00FF00',
      '#00CED1',
      '#0000FF', // Blue (humid)
    ],
    rainfall: [
      '#FFFFFF', // White (no rain)
      '#E6E6FA',
      '#ADD8E6',
      '#87CEEB',
      '#4169E1',
      '#0000FF',
      '#000080', // Dark blue (heavy rain)
    ],
    frost: [
      '#FFFFFF', // White (no frost risk)
      '#F0F8FF',
      '#E6E6FA',
      '#DDA0DD',
      '#DA70D6',
      '#FF1493',
      '#8B0000', // Dark red (high frost risk)
    ],
    sunlight: [
      '#000000', // Black (no sun)
      '#2F4F4F',
      '#696969',
      '#A9A9A9',
      '#D3D3D3',
      '#FFFF00',
      '#FFD700', // Gold (full sun)
    ],
  };

  return colorMaps[type as keyof typeof colorMaps] || colorMaps.temperature;
}

export function getHeatmapGradient(type: string): string {
  const gradients = {
    temperature: 'linear-gradient(to right, #000080, #0000FF, #00FFFF, #00FF00, #FFFF00, #FF8000, #FF0000)',
    humidity: 'linear-gradient(to right, #8B4513, #DEB887, #F0E68C, #90EE90, #00FF00, #00CED1, #0000FF)',
    rainfall: 'linear-gradient(to right, #FFFFFF, #E6E6FA, #ADD8E6, #87CEEB, #4169E1, #0000FF, #000080)',
    frost: 'linear-gradient(to right, #FFFFFF, #F0F8FF, #E6E6FA, #DDA0DD, #DA70D6, #FF1493, #8B0000)',
    sunlight: 'linear-gradient(to right, #000000, #2F4F4F, #696969, #A9A9A9, #D3D3D3, #FFFF00, #FFD700)',
  };

  return gradients[type as keyof typeof gradients] || gradients.temperature;
}

export function formatHeatmapValue(value: number, type: string): string {
  const formatters = {
    temperature: (v: number) => `${Math.round(v)}Â°C`,
    humidity: (v: number) => `${Math.round(v)}%`,
    rainfall: (v: number) => `${v.toFixed(1)}mm`,
    frost: (v: number) => `${Math.round(v)}%`,
    sunlight: (v: number) => `${v.toFixed(1)}hrs`,
  };

  const formatter = formatters[type as keyof typeof formatters];
  return formatter ? formatter(value) : value.toString();
}

export function getHeatmapDescription(type: string): string {
  const descriptions = {
    temperature: 'Surface temperature data helps identify microclimates and optimal planting zones',
    humidity: 'Humidity levels affect plant health and disease susceptibility',
    rainfall: 'Precipitation patterns help plan irrigation and drainage',
    frost: 'Frost risk assessment for protecting tender plants',
    sunlight: 'Sun exposure mapping for optimal plant placement',
  };

  return descriptions[type as keyof typeof descriptions] || 'Environmental data for garden planning';
}

