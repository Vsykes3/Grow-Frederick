import React from 'react';
import { motion } from 'framer-motion';

interface ProBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  animated?: boolean;
}

export function ProBadge({ size = 'sm', className = '', animated = true }: ProBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const shimmerClasses = animated ? 'shimmer' : '';

  return (
    <motion.span
      className={`
        inline-flex items-center gap-1 font-semibold text-white
        bg-gradient-to-r from-gc-accent to-gc-light
        rounded-full shadow-soft
        ${sizeClasses[size]}
        ${shimmerClasses}
        ${className}
      `}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative">
        PRO
        {animated && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: 'easeInOut',
            }}
          />
        )}
      </span>
    </motion.span>
  );
}

// Compact version for navigation
export function ProBadgeCompact({ className = '' }: { className?: string }) {
  return (
    <motion.span
      className={`
        inline-flex items-center justify-center
        w-4 h-4 text-xs font-bold text-white
        bg-gradient-to-r from-gc-accent to-gc-light
        rounded-full shadow-soft
        ${className}
      `}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      whileHover={{ scale: 1.1 }}
    >
      P
    </motion.span>
  );
}

// Pill version for feature lists
export function ProBadgePill({ className = '' }: { className?: string }) {
  return (
    <motion.span
      className={`
        inline-flex items-center gap-1 px-3 py-1
        text-sm font-medium text-gc-accent
        bg-gc-accent/10 border border-gc-accent/20
        rounded-full
        ${className}
      `}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <span className="w-2 h-2 bg-gc-accent rounded-full animate-pulse" />
      PRO
    </motion.span>
  );
}

