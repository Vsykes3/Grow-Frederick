/**
 * Plan detection and management for GrowCommon
 * Ready to integrate with Supabase row-level security
 */

export type PlanType = 'free' | 'pro';

export interface UserPlan {
  plan: PlanType;
  status: 'active' | 'inactive' | 'cancelled';
  expiresAt?: Date;
  features: string[];
}

export interface PlanFeatures {
  free: string[];
  pro: string[];
}

export const PLAN_FEATURES: PlanFeatures = {
  free: [
    'Basic plant database',
    'Weather forecasts',
    'Basic pest alerts',
    'Manual calendar reminders',
    'Community access',
  ],
  pro: [
    'Complete plant database',
    'Advanced weather analytics',
    'Real-time pest monitoring',
    'Smart calendar with iCal export',
    'Severe weather push alerts',
    'Frost-date intelligence',
    'Real-time heatmaps (temperature, humidity, rainfall)',
    'Pest & invasive alerts by ZIP/zone',
    'Planting calendar with harvest reminders',
    'Priority data refresh',
    'Early-access features',
    'Premium support',
  ],
};

export const PLAN_PRICING = {
  free: {
    price: 0,
    period: 'forever',
    features: PLAN_FEATURES.free,
  },
  pro: {
    price: 9.99,
    period: 'month',
    features: PLAN_FEATURES.pro,
    annualDiscount: 0.2, // 20% off annual
  },
};

/**
 * Mock function - replace with Supabase integration
 * In production, this would query: supabase.from('users').select('plan').eq('id', userId)
 */
export async function getUserPlan(userId: string): Promise<UserPlan> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Mock implementation - replace with actual Supabase call
  const mockPlans: Record<string, UserPlan> = {
    'demo-pro-user': {
      plan: 'pro',
      status: 'active',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      features: PLAN_FEATURES.pro,
    },
    'demo-free-user': {
      plan: 'free',
      status: 'active',
      features: PLAN_FEATURES.free,
    },
  };
  
  return mockPlans[userId] || {
    plan: 'free',
    status: 'active',
    features: PLAN_FEATURES.free,
  };
}

/**
 * Check if user has access to a specific feature
 */
export function hasFeature(plan: UserPlan, feature: string): boolean {
  return plan.features.includes(feature);
}

/**
 * Check if user is on Pro plan
 */
export function isPro(plan: UserPlan): boolean {
  return plan.plan === 'pro' && plan.status === 'active';
}

/**
 * Get feature comparison for upgrade prompts
 */
export function getFeatureComparison(currentPlan: PlanType) {
  const currentFeatures = PLAN_FEATURES[currentPlan];
  const proFeatures = PLAN_FEATURES.pro;
  
  return {
    current: currentFeatures,
    upgrade: proFeatures.filter(feature => !currentFeatures.includes(feature)),
    total: proFeatures.length,
    unlocked: currentFeatures.length,
  };
}

/**
 * Supabase integration example (commented out)
 * 
 * import { createClient } from '@supabase/supabase-js'
 * 
 * const supabase = createClient(
 *   process.env.NEXT_PUBLIC_SUPABASE_URL!,
 *   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
 * )
 * 
 * export async function getUserPlan(userId: string): Promise<UserPlan> {
 *   const { data, error } = await supabase
 *     .from('users')
 *     .select('plan, subscription_status, expires_at')
 *     .eq('id', userId)
 *     .single()
 * 
 *   if (error) {
 *     console.error('Error fetching user plan:', error)
 *     return {
 *       plan: 'free',
 *       status: 'active',
 *       features: PLAN_FEATURES.free,
 *     }
 *   }
 * 
 *   return {
 *     plan: data.plan as PlanType,
 *     status: data.subscription_status as 'active' | 'inactive' | 'cancelled',
 *     expiresAt: data.expires_at ? new Date(data.expires_at) : undefined,
 *     features: PLAN_FEATURES[data.plan as PlanType],
 *   }
 * }
 */

