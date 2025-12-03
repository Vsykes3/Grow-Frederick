import { Plan, UserRole } from '@prisma/client'

export type FeatureId = 
  | 'advanced_filters'
  | 'bulk_add_garden'
  | 'unlimited_garden'
  | 'calendar_reminders'
  | 'calendar_recurring'
  | 'export_data'
  | 'pro_starter_pack'
  | 'map_layers'
  | 'pest_forecast'
  | 'daily_tips'
  | 'push_notifications'
  | 'severe_weather_alerts'
  | 'personalized_schedule'
  | 'local_events'
  | 'multiple_locations'
  | 'admin_panel'

export interface FeatureGate {
  id: FeatureId
  name: string
  description: string
  requiredPlan: Plan
  requiredRole?: UserRole
}

export const FEATURES: Record<FeatureId, FeatureGate> = {
  advanced_filters: {
    id: 'advanced_filters',
    name: 'Advanced Plant Filters',
    description: 'Filter plants by multiple criteria including tags, soil type, and growing conditions',
    requiredPlan: 'PRO'
  },
  bulk_add_garden: {
    id: 'bulk_add_garden',
    name: 'Bulk Add to Garden',
    description: 'Add multiple plants to your garden at once',
    requiredPlan: 'PRO'
  },
  unlimited_garden: {
    id: 'unlimited_garden',
    name: 'Unlimited Garden Plants',
    description: 'Add unlimited plants to your garden (Free plan limited to 10)',
    requiredPlan: 'PRO'
  },
  calendar_reminders: {
    id: 'calendar_reminders',
    name: 'Calendar Reminders',
    description: 'Email and push notifications for garden tasks',
    requiredPlan: 'PRO'
  },
  calendar_recurring: {
    id: 'calendar_recurring',
    name: 'Recurring Events',
    description: 'Create repeating events for regular garden tasks',
    requiredPlan: 'PRO'
  },
  export_data: {
    id: 'export_data',
    name: 'Export Garden Data',
    description: 'Export your garden data as CSV or PDF',
    requiredPlan: 'PRO'
  },
  pro_starter_pack: {
    id: 'pro_starter_pack',
    name: 'Pro Starter Pack',
    description: 'Regional planting guides and seasonal tips',
    requiredPlan: 'PRO'
  },
  map_layers: {
    id: 'map_layers',
    name: 'Advanced Map Layers',
    description: 'Temperature, rainfall, and radar overlays on the map',
    requiredPlan: 'PRO'
  },
  pest_forecast: {
    id: 'pest_forecast',
    name: 'Pest Forecast',
    description: 'Predictive pest alerts based on weather and season',
    requiredPlan: 'PRO'
  },
  daily_tips: {
    id: 'daily_tips',
    name: 'Daily Advanced Tips',
    description: 'Personalized daily gardening tips via email',
    requiredPlan: 'PRO'
  },
  push_notifications: {
    id: 'push_notifications',
    name: 'Push Notifications',
    description: 'Real-time notifications for garden alerts and reminders',
    requiredPlan: 'PREMIUM'
  },
  severe_weather_alerts: {
    id: 'severe_weather_alerts',
    name: 'Severe Weather Alerts',
    description: 'Immediate alerts for frost, storms, and extreme weather',
    requiredPlan: 'PREMIUM'
  },
  personalized_schedule: {
    id: 'personalized_schedule',
    name: 'Personalized Schedule',
    description: 'AI-generated planting and care schedules based on your garden',
    requiredPlan: 'PREMIUM'
  },
  local_events: {
    id: 'local_events',
    name: 'Local Events Curation',
    description: 'Curated local gardening events and workshops',
    requiredPlan: 'PREMIUM'
  },
  multiple_locations: {
    id: 'multiple_locations',
    name: 'Multiple Garden Locations',
    description: 'Manage gardens in multiple locations',
    requiredPlan: 'PREMIUM'
  },
  admin_panel: {
    id: 'admin_panel',
    name: 'Admin Panel',
    description: 'Full administrative access to manage content and users',
    requiredPlan: 'ADMIN',
    requiredRole: 'ADMIN'
  }
}

export function hasFeatureAccess(
  userPlan: Plan,
  userRole: UserRole,
  featureId: FeatureId,
  demoBypass: boolean = false
): boolean {
  if (demoBypass) return true
  
  const feature = FEATURES[featureId]
  if (!feature) return false
  
  // Check role requirement first
  if (feature.requiredRole && userRole !== feature.requiredRole) {
    return false
  }
  
  // Check plan requirement
  const planHierarchy: Record<Plan, number> = {
    FREE: 0,
    PRO: 1,
    PREMIUM: 2,
    ADMIN: 3
  }
  
  return planHierarchy[userPlan] >= planHierarchy[feature.requiredPlan]
}

export function getFeatureGate(
  userPlan: Plan,
  userRole: UserRole,
  featureId: FeatureId,
  demoBypass: boolean = false
): { hasAccess: boolean; feature: FeatureGate; upgradeRequired?: Plan } {
  const feature = FEATURES[featureId]
  const hasAccess = hasFeatureAccess(userPlan, userRole, featureId, demoBypass)
  
  return {
    hasAccess,
    feature,
    upgradeRequired: hasAccess ? undefined : feature.requiredPlan
  }
}

export function getPlanFeatures(plan: Plan): FeatureId[] {
  return Object.values(FEATURES)
    .filter(feature => hasFeatureAccess(plan, 'FREE', feature.id as FeatureId))
    .map(feature => feature.id as FeatureId)
}

export function getUpgradeFeatures(currentPlan: Plan): FeatureId[] {
  return Object.values(FEATURES)
    .filter(feature => !hasFeatureAccess(currentPlan, 'FREE', feature.id as FeatureId))
    .map(feature => feature.id as FeatureId)
}

