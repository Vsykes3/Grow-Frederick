import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { ProBadge } from './ProBadge';
import { PLAN_PRICING } from '@/lib/plan';

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  feature?: string;
  className?: string;
}

const PRO_FEATURES = [
  'Severe weather push alerts + frost-date intelligence',
  'Real-time heatmaps (temperature, humidity, rainfall)',
  'Pest & invasive alerts by ZIP/zone with trend projections',
  'Planting calendar w/ harvest reminders + iCal export',
  'Priority data refresh and early-access pilots',
  'Advanced plant database with local recommendations',
  'Premium support and community access',
];

const FAQ_ITEMS = [
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes! You can cancel your Pro subscription at any time. You\'ll continue to have access to Pro features until the end of your billing period.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! We offer a 7-day free trial for all new Pro subscribers. No credit card required to start.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely through Stripe.',
  },
  {
    question: 'Do you offer student discounts?',
    answer: 'Yes! Students with a valid .edu email address can get 50% off their Pro subscription. Contact support for verification.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use enterprise-grade security and never share your personal data. Your garden information is encrypted and stored securely.',
  },
];

export function UpsellModal({
  isOpen,
  onClose,
  onUpgrade,
  feature,
  className,
}: UpsellModalProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={cn(
        'relative glass rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto',
        'animate-scale-in',
        className
      )}>
        {/* Header */}
        <div className="relative p-8 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-gc-light/20 to-gc-accent/20 rounded-t-2xl" />
          <div className="relative space-y-4">
            <div className="flex items-center justify-center gap-3">
              <ProBadge size="lg" />
              <h2 className="text-3xl font-bold text-gc-dark">
                Unlock GrowCommon Pro
              </h2>
            </div>
            
            {feature && (
              <p className="text-lg text-muted-foreground">
                Get access to <strong>{feature}</strong> and much more
              </p>
            )}
            
            <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gc-dark">
              <span className="text-4xl">$9.99</span>
              <span className="text-lg text-muted-foreground">/month</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Features */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gc-dark">
              What you'll unlock today:
            </h3>
            <div className="grid gap-3">
              {PRO_FEATURES.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gc-light/10 rounded-xl animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="w-5 h-5 bg-gc-accent rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gc-dark">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Comparison */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-xl">
              <h4 className="font-semibold text-gc-dark mb-2">Free Plan</h4>
              <div className="text-2xl font-bold text-muted-foreground mb-3">
                $0<span className="text-sm font-normal">/month</span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Basic plant database</li>
                <li>Weather forecasts</li>
                <li>Basic pest alerts</li>
                <li>Manual calendar</li>
              </ul>
            </div>
            
            <div className="p-4 border-2 border-gc-accent rounded-xl bg-gc-light/5">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-semibold text-gc-dark">Pro Plan</h4>
                <ProBadge size="sm" />
              </div>
              <div className="text-2xl font-bold text-gc-dark mb-3">
                $9.99<span className="text-sm font-normal text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-2 text-sm text-gc-dark">
                <li>Everything in Free</li>
                <li>Advanced analytics</li>
                <li>Real-time monitoring</li>
                <li>Smart calendar + iCal</li>
                <li>Priority support</li>
              </ul>
            </div>
          </div>

          {/* FAQ */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gc-dark">
              Frequently Asked Questions
            </h3>
            <div className="space-y-2">
              {FAQ_ITEMS.map((item, index) => (
                <div key={index} className="border border-border rounded-xl">
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-gc-light/5 transition-colors"
                  >
                    <span className="font-medium text-gc-dark">
                      {item.question}
                    </span>
                    <svg 
                      className={cn(
                        'w-5 h-5 text-muted-foreground transition-transform',
                        activeFaq === index && 'rotate-180'
                      )}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeFaq === index && (
                    <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4 pt-4">
            <Button 
              onClick={onUpgrade}
              size="lg"
              className="w-full"
            >
              Start 7-Day Free Trial
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              No credit card required • Cancel anytime • 7-day free trial
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/**
 * Simple upsell modal for quick upgrades
 */
export function QuickUpsellModal({
  isOpen,
  onClose,
  onUpgrade,
  feature,
}: UpsellModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative glass rounded-2xl p-6 max-w-md w-full animate-scale-in">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <ProBadge size="md" />
            <h3 className="text-xl font-semibold text-gc-dark">
              Unlock {feature}
            </h3>
          </div>
          
          <p className="text-muted-foreground">
            This feature is available with GrowCommon Pro. 
            Start your free trial today!
          </p>
          
          <div className="space-y-3">
            <Button onClick={onUpgrade} className="w-full">
              Start Free Trial
            </Button>
            <Button variant="outline" onClick={onClose} className="w-full">
              Maybe Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

