import { useState, useEffect, useCallback } from 'react';
import { getUserPlan, isPro, hasFeature, type UserPlan, type PlanType } from '@/lib/plan';

interface UsePlanReturn {
  plan: UserPlan | null;
  isLoading: boolean;
  error: string | null;
  isProUser: boolean;
  hasFeature: (feature: string) => boolean;
  refetch: () => Promise<void>;
}

/**
 * React hook for managing user plan state
 * Provides cached plan data with automatic refetching
 */
export function usePlan(userId?: string): UsePlanReturn {
  const [plan, setPlan] = useState<UserPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlan = useCallback(async () => {
    if (!userId) {
      setPlan(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const userPlan = await getUserPlan(userId);
      setPlan(userPlan);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch plan');
      console.error('Error fetching user plan:', err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchPlan();
  }, [fetchPlan]);

  const hasFeatureAccess = useCallback((feature: string) => {
    if (!plan) return false;
    return hasFeature(plan, feature);
  }, [plan]);

  const isProUser = plan ? isPro(plan) : false;

  return {
    plan,
    isLoading,
    error,
    isProUser,
    hasFeature: hasFeatureAccess,
    refetch: fetchPlan,
  };
}

/**
 * Hook for checking specific feature access
 * Useful for conditional rendering
 */
export function useFeature(feature: string, userId?: string): boolean {
  const { hasFeature: hasFeatureAccess, isLoading } = usePlan(userId);
  
  if (isLoading) return false;
  return hasFeatureAccess(feature);
}

/**
 * Hook for Pro plan status
 * Simplified version for boolean checks
 */
export function useProStatus(userId?: string): boolean {
  const { isProUser, isLoading } = usePlan(userId);
  
  if (isLoading) return false;
  return isProUser;
}

/**
 * Mock hook for development/demo purposes
 * Returns a Pro user for demo purposes
 */
export function useMockPlan(planType: PlanType = 'free'): UsePlanReturn {
  const [plan] = useState<UserPlan>(() => ({
    plan: planType,
    status: 'active',
    features: planType === 'pro' 
      ? [
          'Complete plant database',
          'Advanced weather analytics',
          'Real-time pest monitoring',
          'Smart calendar with iCal export',
          'Severe weather push alerts',
          'Frost-date intelligence',
          'Real-time heatmaps',
          'Pest & invasive alerts by ZIP/zone',
          'Planting calendar with harvest reminders',
          'Priority data refresh',
          'Early-access features',
          'Premium support',
        ]
      : [
          'Basic plant database',
          'Weather forecasts',
          'Basic pest alerts',
          'Manual calendar reminders',
          'Community access',
        ],
  }));

  const hasFeatureAccess = useCallback((feature: string) => {
    return plan.features.includes(feature);
  }, [plan.features]);

  return {
    plan,
    isLoading: false,
    error: null,
    isProUser: planType === 'pro',
    hasFeature: hasFeatureAccess,
    refetch: async () => {},
  };
}

