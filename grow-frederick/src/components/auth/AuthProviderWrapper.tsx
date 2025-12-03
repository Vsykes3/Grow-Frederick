'use client';

import React, { useState, useEffect } from 'react';
import { AuthModal } from './AuthModal';

export function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  useEffect(() => {
    const handleOpenAuth = (event: CustomEvent) => {
      setAuthMode(event.detail.mode || 'signin');
      setAuthModalOpen(true);
    };

    window.addEventListener('openAuth' as any, handleOpenAuth as EventListener);
    return () => {
      window.removeEventListener('openAuth' as any, handleOpenAuth as EventListener);
    };
  }, []);

  return (
    <>
      {children}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
      />
    </>
  );
}






