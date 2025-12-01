import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProBadge } from './ProBadge';
import { Button } from './Button';
import { Lock, CheckCircle, Star } from 'lucide-react';

interface PaywallGuardProps {
  isPro: boolean;
  feature: string;
  children: React.ReactNode;
  className?: string;
  compact?: boolean;
  onUpgrade?: () => void;
}

export function PaywallGuard({ 
  isPro, 
  feature, 
  children, 
  className = '', 
  compact = false,
  onUpgrade 
}: PaywallGuardProps) {
  const [showUpgrade, setShowUpgrade] = useState(false);

  if (isPro) {
    return <>{children}</>;
  }

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      // Default behavior - navigate to pro page
      window.location.href = '/pro';
    }
  };

  if (compact) {
    return (
      <div className={`relative ${className}`}>
        <div className="blur-sm pointer-events-none">
          {children}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gc-accent/20"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-gc-accent" />
              <span className="text-sm font-medium text-gc-dark">Pro Feature</span>
            </div>
            <Button
              size="sm"
              onClick={handleUpgrade}
              className="mt-2 w-full"
            >
              Upgrade to Pro
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div className="blur-sm pointer-events-none">
        {children}
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <motion.div
          className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-large border border-gc-accent/20 max-w-md w-full"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="text-center space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <Lock className="w-6 h-6 text-gc-accent" />
                <ProBadge />
              </div>
              <h3 className="text-xl font-bold text-gc-dark">
                Unlock {feature}
              </h3>
              <p className="text-muted-foreground">
                This feature is available with GrowCommon Pro
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Advanced weather intelligence</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Smart planting suggestions</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Pest pressure analytics</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>Microclimate mapping</span>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-3">
              <Button
                onClick={handleUpgrade}
                className="w-full"
                size="lg"
              >
                <Star className="w-4 h-4 mr-2" />
                Upgrade to Pro
              </Button>
              <p className="text-xs text-muted-foreground">
                7-day free trial â€¢ Cancel anytime
              </p>
            </div>

            {/* Testimonial */}
            <div className="bg-gc-cream/50 rounded-lg p-4">
              <p className="text-sm italic text-gc-dark">
                "The Pro features have transformed my gardening. Worth every penny!"
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                - Sarah J., Frederick, MD
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Modal version for more detailed upgrade flow
export function PaywallModal({ 
  isOpen, 
  onClose, 
  feature, 
  onUpgrade 
}: {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
  onUpgrade?: () => void;
}) {
  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      window.location.href = '/pro';
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-2xl p-8 shadow-large border border-gc-accent/20 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="text-center space-y-6">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <Lock className="w-8 h-8 text-gc-accent" />
                  <ProBadge size="lg" />
                </div>
                <h2 className="text-2xl font-bold text-gc-dark">
                  Unlock {feature}
                </h2>
                <p className="text-muted-foreground">
                  Get access to advanced gardening features with GrowCommon Pro
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Advanced Weather Intelligence',
                  'Smart Planting Calendar',
                  'Pest Pressure Analytics',
                  'Microclimate Mapping',
                  'Companion Planting Optimizer',
                  'Irrigation Planning',
                  'Seasonal ROI Tracking',
                  'Priority Support',
                ].map((feature, index) => (
                  <motion.div
                    key={feature}
                    className="flex items-center gap-2 p-3 bg-gc-cream/50 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-gc-dark">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Pricing */}
              <div className="bg-gc-accent/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-gc-dark">$9.99</div>
                <div className="text-sm text-muted-foreground">per month</div>
                <div className="text-xs text-gc-accent mt-1">7-day free trial</div>
              </div>

              {/* CTA */}
              <div className="space-y-3">
                <Button
                  onClick={handleUpgrade}
                  className="w-full"
                  size="lg"
                >
                  <Star className="w-5 h-5 mr-2" />
                  Start Free Trial
                </Button>
                <p className="text-xs text-muted-foreground">
                  No credit card required â€¢ Cancel anytime
                </p>
              </div>

              {/* Close button */}
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full"
              >
                Maybe Later
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

