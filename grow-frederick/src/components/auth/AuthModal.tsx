'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup';
}

export function AuthModal({ isOpen, onClose, mode }: AuthModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-background border rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          {mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </h2>
        <p className="text-muted-foreground mb-6">
          {mode === 'signin' 
            ? 'Sign in to access your garden and personalized features.'
            : 'Create an account to start tracking your garden.'}
        </p>
        <div className="flex gap-2 justify-end">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={onClose}>
            {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </Button>
        </div>
      </div>
    </div>
  );
}
