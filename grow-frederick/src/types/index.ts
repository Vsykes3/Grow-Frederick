// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  plan: 'free' | 'pro';
  zip: string;
  zone: string;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  units: {
    temperature: 'fahrenheit' | 'celsius';
    distance: 'imperial' | 'metric';
  };
  alerts: {
    weather: boolean;
    pests: boolean;
    severe: boolean;
  };
  notifications: {
    email: boolean;
    push: boolean;
  };
}

// Plant types
export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  type: 'vegetable' | 'herb' | 'flower' | 'fruit' | 'tree' | 'shrub';
  description: string;
  image: string;
  sun: 'full' | 'partial' | 'shade';
  water: 'low' | 'moderate' | 'high';
  frostTolerance: 'tender' | 'half-hardy' | 'hardy';
  season: ('spring' | 'summer' | 'fall' | 'winter')[];
  hardinessZones: string[];
  companionPlants: string[];
  antagonistPlants: string[];
  careInstructions: string;
  pestNotes: string;
  sowWindow: {
    start: string; // Month
    end: string;
  };
  harvestWindow: {
    start: string;
    end: string;
  };
  isPro: boolean;
}

export interface PlantDetail extends Plant {
  care: {
    watering: string;
    fertilizing: string;
    pruning: string;
    harvesting: string;
  };
  pestRiskScore?: number; // 0-100, Pro only
  microclimateRecommendations?: string; // Pro only
}

// Calendar types
export interface Event {
  id: string;
  userId: string;
  plantId?: string;
  type: 'sow' | 'harvest' | 'task' | 'reminder';
  title: string;
  description?: string;
  start: string; // ISO date
  end?: string;
  notes?: string;
  isRecurring: boolean;
  recurrencePattern?: string;
  createdAt: string;
  updatedAt: string;
}

// Alert types
export interface Alert {
  id: string;
  type: 'weather' | 'pest' | 'maintenance';
  severity: 'low' | 'medium' | 'high' | 'severe';
  title: string;
  message: string;
  region: string;
  zip?: string;
  zone?: string;
  plantId?: string;
  actionRequired: boolean;
  actionUrl?: string;
  createdAt: string;
  expiresAt?: string;
}

// Weather types
export interface WeatherPoint {
  time: string; // ISO timestamp
  temperature: number; // Celsius
  humidity: number; // Percentage
  rain: number; // mm
  uv: number; // UV index
  soilMoisture: number; // Percentage (mock)
  windSpeed: number; // km/h
  windDirection: number; // Degrees
  pressure: number; // hPa
  visibility: number; // km
}

export interface WeatherForecast {
  current: WeatherPoint;
  hourly: WeatherPoint[];
  daily: {
    date: string;
    minTemp: number;
    maxTemp: number;
    conditions: string;
    icon: string;
    precipitation: number;
    humidity: number;
  }[];
  frostDates: {
    firstFrost: string;
    lastFrost: string;
  };
}

// Map types
export interface Microzone {
  id: string;
  userId: string;
  name: string;
  polygon: {
    lat: number;
    lng: number;
  }[];
  notes: string;
  conditions: {
    sun: 'full' | 'partial' | 'shade';
    wind: 'low' | 'moderate' | 'high';
    soil: 'clay' | 'loam' | 'sand' | 'mixed';
    drainage: 'poor' | 'moderate' | 'good';
  };
  createdAt: string;
  updatedAt: string;
}

export interface HeatmapData {
  type: 'temperature' | 'humidity' | 'rainfall' | 'frost' | 'sunlight';
  data: {
    lat: number;
    lng: number;
    value: number;
  }[];
  legend: {
    min: number;
    max: number;
    unit: string;
  };
}

// Pest types
export interface PestReport {
  id: string;
  userId: string;
  species: string;
  severity: 'low' | 'medium' | 'high';
  notes: string;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  plantAffected?: string;
  imageUrl?: string;
  reportedAt: string;
  status: 'pending' | 'verified' | 'resolved';
}

export interface PestPressure {
  region: string;
  score: number; // 0-100
  trend: 'increasing' | 'stable' | 'decreasing';
  topPests: {
    species: string;
    severity: 'low' | 'medium' | 'high';
    affectedPlants: string[];
  }[];
  recommendations: string[];
  lastUpdated: string;
}

// Garden plan types
export interface GardenPlan {
  id: string;
  userId: string;
  name: string;
  description?: string;
  location: {
    zip: string;
    zone: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  size: {
    width: number; // feet
    height: number; // feet
  };
  plants: {
    plantId: string;
    quantity: number;
    position: {
      x: number;
      y: number;
    };
    plantedDate?: string;
    notes?: string;
  }[];
  irrigation: {
    type: 'manual' | 'drip' | 'sprinkler';
    frequency: number; // days
    duration: number; // minutes
    estimatedWaterNeed: number; // gallons per week
  };
  createdAt: string;
  updatedAt: string;
}

// Subscription types
export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'pro';
  status: 'active' | 'cancelled' | 'past_due';
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  createdAt: string;
  updatedAt: string;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface FeedbackForm {
  type: 'bug' | 'feature' | 'general';
  subject: string;
  description: string;
  email?: string;
}

// Navigation types
export interface NavItem {
  name: string;
  href: string;
  icon: string;
  pro?: boolean;
  external?: boolean;
}

// Component props types
export interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  pro?: boolean;
  className?: string;
}

export interface ProBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface PaywallGuardProps {
  isPro: boolean;
  feature: string;
  children: React.ReactNode;
  className?: string;
}

// Utility types
export type PlanType = 'free' | 'pro';
export type Season = 'spring' | 'summer' | 'fall' | 'winter';
export type PlantType = Plant['type'];
export type AlertType = Alert['type'];
export type EventType = Event['type'];

