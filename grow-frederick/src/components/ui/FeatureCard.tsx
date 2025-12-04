import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ProBadge } from './ProBadge';
import { cn } from '../../lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  pro?: boolean;
  className?: string;
  index?: number;
}

export function FeatureCard({ 
  title, 
  description, 
  icon, 
  href, 
  pro = false, 
  className = '',
  index = 0
}: FeatureCardProps) {
  return (
    <motion.div
      className={cn(
        'group relative bg-gc-cream rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300',
        'border border-gc-light/20 hover:border-gc-accent/30',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <Link to={href} className="block">
        <div className="space-y-4">
          {/* Icon and Pro Badge */}
          <div className="flex items-start justify-between">
            <div className="text-4xl">{icon}</div>
            {pro && <ProBadge size="sm" />}
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gc-dark group-hover:text-gc-accent transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-gc-accent font-medium group-hover:gap-3 transition-all">
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gc-accent/5 to-gc-light/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}

// Grid of feature cards
export function FeatureGrid({ features, className = '' }: { 
  features: FeatureCardProps[]; 
  className?: string; 
}) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6', className)}>
      {features.map((feature, index) => (
        <FeatureCard
          key={feature.href}
          {...feature}
          index={index}
        />
      ))}
    </div>
  );
}

// Hero feature card (larger)
export function HeroFeatureCard({ 
  title, 
  description, 
  icon, 
  href, 
  pro = false, 
  className = '' 
}: FeatureCardProps) {
  return (
    <motion.div
      className={cn(
        'group relative bg-gradient-to-br from-gc-cream to-gc-light/20 rounded-2xl p-8 shadow-medium hover:shadow-large transition-all duration-300',
        'border border-gc-light/30 hover:border-gc-accent/40',
        className
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      <Link to={href} className="block">
        <div className="space-y-6">
          {/* Icon and Pro Badge */}
          <div className="flex items-start justify-between">
            <div className="text-6xl">{icon}</div>
            {pro && <ProBadge size="md" />}
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-gc-dark group-hover:text-gc-accent transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {description}
            </p>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 text-gc-accent font-semibold text-lg group-hover:gap-3 transition-all">
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gc-accent/10 to-gc-light/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}

