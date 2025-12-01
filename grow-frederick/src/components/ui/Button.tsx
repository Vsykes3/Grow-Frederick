import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '/src/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'default', 
  size = 'md', 
  loading = false,
  className = '',
  children,
  disabled,
  ...props 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gc-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    default: 'bg-gc-accent text-white hover:bg-gc-dark shadow-soft hover:shadow-medium',
    outline: 'border-2 border-gc-accent text-gc-accent hover:bg-gc-accent hover:text-white',
    ghost: 'text-gc-accent hover:bg-gc-accent/10',
    secondary: 'bg-gc-cream text-gc-dark hover:bg-gc-light shadow-soft',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      transition={{ duration: 0.15 }}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
}

// Icon button variant
export function IconButton({ 
  children, 
  className = '',
  ...props 
}: Omit<ButtonProps, 'children'> & { children: React.ReactNode }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn('p-2', className)}
      {...props}
    >
      {children}
    </Button>
  );
}

// Floating action button
export function FloatingButton({ 
  children, 
  className = '',
  ...props 
}: Omit<ButtonProps, 'children'> & { children: React.ReactNode }) {
  return (
    <motion.button
      className={cn(
        'fixed bottom-6 right-6 w-14 h-14 bg-gc-accent text-white rounded-full shadow-large',
        'flex items-center justify-center hover:bg-gc-dark transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-gc-accent focus:ring-offset-2',
        className
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

