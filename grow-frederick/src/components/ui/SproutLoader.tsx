import React from 'react';
import { motion } from 'framer-motion';

interface SproutLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function SproutLoader({ size = 'md', className = '' }: SproutLoaderProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} relative`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Seed */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gc-dark rounded-full"
          initial={{ scale: 0.8, y: 0 }}
          animate={{ 
            scale: [0.8, 1, 0.8],
            y: [0, -2, 0]
          }}
          transition={{ 
            duration: 0.9,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Stem */}
        <motion.div
          className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gc-accent origin-bottom"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ 
            scaleY: [0, 1, 1],
            opacity: [0, 1, 1]
          }}
          transition={{ 
            duration: 0.9,
            delay: 0.3,
            ease: "easeOut"
          }}
        />
        
        {/* Left Leaf */}
        <motion.div
          className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-gc-light rounded-full origin-bottom-left"
          initial={{ scale: 0, rotate: -45, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 1],
            rotate: [-45, -30, -30],
            opacity: [0, 1, 1]
          }}
          transition={{ 
            duration: 0.9,
            delay: 0.6,
            ease: "easeOut"
          }}
        />
        
        {/* Right Leaf */}
        <motion.div
          className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-gc-light rounded-full origin-bottom-right"
          initial={{ scale: 0, rotate: 45, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 1],
            rotate: [45, 30, 30],
            opacity: [0, 1, 1]
          }}
          transition={{ 
            duration: 0.9,
            delay: 0.6,
            ease: "easeOut"
          }}
        />
        
        {/* Pollen particles */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-300 rounded-full opacity-60"
          initial={{ scale: 0, y: 0 }}
          animate={{ 
            scale: [0, 1, 0],
            y: [0, -8, -16],
            opacity: [0, 0.6, 0]
          }}
          transition={{ 
            duration: 1.2,
            delay: 0.8,
            repeat: Infinity,
            repeatDelay: 2,
            ease: "easeOut"
          }}
        />
        
        <motion.div
          className="absolute top-1 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-yellow-300 rounded-full opacity-40"
          initial={{ scale: 0, y: 0 }}
          animate={{ 
            scale: [0, 1, 0],
            y: [0, -6, -12],
            opacity: [0, 0.4, 0]
          }}
          transition={{ 
            duration: 1.4,
            delay: 1.2,
            repeat: Infinity,
            repeatDelay: 2.5,
            ease: "easeOut"
          }}
        />
      </motion.div>
    </div>
  );
}

// Alternative CSS-based loader for reduced motion
export function SproutLoaderCSS({ size = 'md', className = '' }: SproutLoaderProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} relative animate-sprout`}>
        {/* Seed */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gc-dark rounded-full" />
        
        {/* Stem */}
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gc-accent origin-bottom" />
        
        {/* Left Leaf */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-gc-light rounded-full origin-bottom-left -rotate-30" />
        
        {/* Right Leaf */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-2 bg-gc-light rounded-full origin-bottom-right rotate-30" />
      </div>
    </div>
  );
}

// Loading text component
export function LoadingText({ text = 'Loading...', className = '' }: { text?: string; className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <SproutLoader />
      <p className="text-muted-foreground text-sm animate-pulse">{text}</p>
    </div>
  );
}

