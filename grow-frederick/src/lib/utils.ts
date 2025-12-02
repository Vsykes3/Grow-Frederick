import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function formatTemperature(temp: number, unit: 'celsius' | 'fahrenheit' = 'fahrenheit'): string {
  if (unit === 'fahrenheit') {
    return `${Math.round(temp * 9/5 + 32)}°F`;
  }
  return `${Math.round(temp)}°C`;
}

export function getSeason(date: Date = new Date()): 'spring' | 'summer' | 'fall' | 'winter' {
  const month = date.getMonth() + 1;
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'fall';
  return 'winter';
}

export function getSeasonEmoji(season: string): string {
  const emojis = {
    spring: '🌸',
    summer: '☀️',
    fall: '🍂',
    winter: '❄️',
  };
  return emojis[season as keyof typeof emojis] || '🌱';
}

export function getPlantTypeEmoji(type: string): string {
  const emojis = {
    vegetable: '🥕',
    herb: '🌿',
    flower: '🌸',
    fruit: '🍓',
    tree: '🌳',
    shrub: '🌿',
  };
  return emojis[type as keyof typeof emojis] || '🌱';
}

export function getSunEmoji(sun: string): string {
  const emojis = {
    full: '☀️',
    partial: '⛅',
    shade: '🌥️',
  };
  return emojis[sun as keyof typeof emojis] || '☀️';
}

export function getWaterEmoji(water: string): string {
  const emojis = {
    low: '💧',
    moderate: '💧💧',
    high: '💧💧💧',
  };
  return emojis[water as keyof typeof emojis] || '💧';
}

export function getFrostToleranceEmoji(tolerance: string): string {
  const emojis = {
    tender: '🌱',
    'half-hardy': '🌿',
    hardy: '🌳',
  };
  return emojis[tolerance as keyof typeof emojis] || '🌱';
}

export function getSeverityColor(severity: string): string {
  const colors = {
    low: 'text-green-600 bg-green-100',
    medium: 'text-yellow-600 bg-yellow-100',
    high: 'text-orange-600 bg-orange-100',
    severe: 'text-red-600 bg-red-100',
  };
  return colors[severity as keyof typeof colors] || 'text-gray-600 bg-gray-100';
}

export function getSeverityEmoji(severity: string): string {
  const emojis = {
    low: '🟢',
    medium: '🟡',
    high: '🟠',
    severe: '🔴',
  };
  return emojis[severity as keyof typeof emojis] || '⚪';
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.substr(0, length) + '...';
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidZipCode(zip: string): boolean {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zip);
}

export function getHardinessZone(lat: number, lng: number): string {
  // Simplified hardiness zone calculation for Frederick County area
  if (lat >= 39.5) return '7a';
  if (lat >= 39.0) return '6b';
  if (lat >= 38.5) return '7a';
  return '7b';
}

export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export function getRandomColor(): string {
  const colors = [
    '#9EBB8C', // gc-light
    '#7A9B6B', // gc-accent
    '#414535', // gc-dark
    '#F5F3EE', // gc-cream
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function getContrastColor(hexColor: string): string {
  // Convert hex to RGB
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return Promise.resolve();
  }
}

export function downloadFile(content: string, filename: string, type: string = 'text/plain'): void {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}