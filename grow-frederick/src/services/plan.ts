import type { PlanType, Subscription } from '@/types';

// Mock subscription data
const mockSubscription: Subscription = {
  id: '1',
  userId: '1',
  plan: 'free',
  status: 'active',
  currentPeriodStart: '2024-01-01T00:00:00Z',
  currentPeriodEnd: '2024-12-31T23:59:59Z',
  cancelAtPeriodEnd: false,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

export async function getUserPlan(userId: string): Promise<PlanType> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  // Mock implementation - in real app, this would fetch from Supabase
  return mockSubscription.plan;
}

export async function getSubscription(userId: string): Promise<Subscription | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  return mockSubscription;
}

export async function upgradeToPro(userId: string, paymentMethodId: string): Promise<Subscription> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock Stripe integration
  const updatedSubscription: Subscription = {
    ...mockSubscription,
    plan: 'pro',
    status: 'active',
    currentPeriodStart: new Date().toISOString(),
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    stripeCustomerId: 'cus_mock_customer_id',
    stripeSubscriptionId: 'sub_mock_subscription_id',
    updatedAt: new Date().toISOString(),
  };

  // Update mock data
  Object.assign(mockSubscription, updatedSubscription);

  return updatedSubscription;
}

export async function downgradeToFree(userId: string): Promise<Subscription> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const updatedSubscription: Subscription = {
    ...mockSubscription,
    plan: 'free',
    status: 'active',
    cancelAtPeriodEnd: false,
    updatedAt: new Date().toISOString(),
  };

  // Update mock data
  Object.assign(mockSubscription, updatedSubscription);

  return updatedSubscription;
}

export async function cancelSubscription(userId: string): Promise<Subscription> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const updatedSubscription: Subscription = {
    ...mockSubscription,
    status: 'cancelled',
    cancelAtPeriodEnd: true,
    updatedAt: new Date().toISOString(),
  };

  // Update mock data
  Object.assign(mockSubscription, updatedSubscription);

  return updatedSubscription;
}

export async function getBillingHistory(userId: string): Promise<{
  id: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed';
  date: string;
  description: string;
}[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Mock billing history
  return [
    {
      id: '1',
      amount: 999, // $9.99 in cents
      currency: 'usd',
      status: 'paid',
      date: '2024-01-01T00:00:00Z',
      description: 'GrowCommon Pro - Monthly',
    },
    {
      id: '2',
      amount: 999,
      currency: 'usd',
      status: 'paid',
      date: '2024-02-01T00:00:00Z',
      description: 'GrowCommon Pro - Monthly',
    },
    {
      id: '3',
      amount: 999,
      currency: 'usd',
      status: 'paid',
      date: '2024-03-01T00:00:00Z',
      description: 'GrowCommon Pro - Monthly',
    },
  ];
}

export function getPlanFeatures(plan: PlanType): {
  name: string;
  description: string;
  features: string[];
  limitations: string[];
} {
  const plans = {
    free: {
      name: 'Free Plan',
      description: 'Perfect for getting started with your garden',
      features: [
        'Plant database access',
        'Basic weather information',
        'Manual calendar events',
        'Basic pest alerts',
        'Community access',
        'Mobile app access',
      ],
      limitations: [
        'Limited to 10 calendar events',
        'Basic weather data only',
        'No advanced analytics',
        'No priority support',
      ],
    },
    pro: {
      name: 'Pro Plan',
      description: 'Advanced features for serious gardeners',
      features: [
        'Everything in Free',
        'Unlimited calendar events',
        'Advanced weather forecasts',
        'Smart planting suggestions',
        'Pest pressure analytics',
        'Microclimate mapping',
        'iCal export',
        'Priority support',
        'Early access to new features',
        'Advanced plant recommendations',
        'Companion planting optimizer',
        'Irrigation planning',
        'Seasonal ROI tracking',
      ],
      limitations: [],
    },
  };

  return plans[plan];
}

export function getPricing(): {
  free: {
    price: number;
    currency: string;
    interval: string;
  };
  pro: {
    price: number;
    currency: string;
    interval: string;
    trialDays: number;
  };
} {
  return {
    free: {
      price: 0,
      currency: 'usd',
      interval: 'month',
    },
    pro: {
      price: 9.99,
      currency: 'usd',
      interval: 'month',
      trialDays: 7,
    },
  };
}

export async function createCheckoutSession(userId: string, plan: 'pro'): Promise<{
  sessionId: string;
  url: string;
}> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock Stripe checkout session creation
  return {
    sessionId: 'cs_mock_session_id',
    url: 'https://checkout.stripe.com/mock_checkout_url',
  };
}

export async function createCustomerPortalSession(userId: string): Promise<{
  url: string;
}> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Mock Stripe customer portal session creation
  return {
    url: 'https://billing.stripe.com/mock_portal_url',
  };
}

export function isPro(plan: PlanType): boolean {
  return plan === 'pro';
}

export function getProBenefits(): {
  title: string;
  description: string;
  icon: string;
}[] {
  return [
    {
      title: 'Advanced Weather Intelligence',
      description: 'Get detailed forecasts, frost predictions, and microclimate data',
      icon: 'ðŸŒ¤ï¸',
    },
    {
      title: 'Smart Planting Calendar',
      description: 'AI-powered suggestions that auto-adjust based on weather conditions',
      icon: 'ðŸ“…',
    },
    {
      title: 'Pest Pressure Analytics',
      description: 'Track pest trends and get personalized prevention recommendations',
      icon: 'ðŸ›',
    },
    {
      title: 'Companion Planting Optimizer',
      description: 'Get smart suggestions for plant combinations and spacing',
      icon: 'ðŸŒ±',
    },
    {
      title: 'Microclimate Mapping',
      description: 'Create custom zones in your garden with specific recommendations',
      icon: 'ðŸ—ºï¸',
    },
    {
      title: 'Irrigation Planning',
      description: 'Calculate water needs and create efficient watering schedules',
      icon: 'ðŸ’§',
    },
    {
      title: 'Seasonal ROI Tracking',
      description: 'Track your garden\'s value and optimize your growing strategy',
      icon: 'ðŸ“Š',
    },
    {
      title: 'Priority Support',
      description: 'Get help from our gardening experts when you need it most',
      icon: 'ðŸŽ§',
    },
  ];
}

export function getTestimonials(): {
  name: string;
  location: string;
  text: string;
  rating: number;
  plan: PlanType;
}[] {
  return [
    {
      name: 'Sarah Johnson',
      location: 'Frederick, MD',
      text: 'GrowCommon Pro has transformed my gardening. The weather alerts saved my tomatoes from a surprise frost!',
      rating: 5,
      plan: 'pro',
    },
    {
      name: 'Mike Chen',
      location: 'Baltimore, MD',
      text: 'The companion planting optimizer is incredible. My garden has never been more productive.',
      rating: 5,
      plan: 'pro',
    },
    {
      name: 'Emily Rodriguez',
      location: 'Rockville, MD',
      text: 'Worth every penny. The pest pressure analytics helped me catch aphids before they spread.',
      rating: 5,
      plan: 'pro',
    },
    {
      name: 'David Thompson',
      location: 'Gaithersburg, MD',
      text: 'The free plan got me started, but Pro features like microclimate mapping are game-changers.',
      rating: 5,
      plan: 'pro',
    },
    {
      name: 'Lisa Wang',
      location: 'Silver Spring, MD',
      text: 'Love the smart calendar suggestions. It\'s like having a gardening expert in my pocket.',
      rating: 5,
      plan: 'pro',
    },
  ];
}

