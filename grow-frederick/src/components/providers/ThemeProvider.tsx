'use client';

import React, { useEffect } from 'react';
import { initializeTheme } from '/src/lib/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    initializeTheme();
  }, []);

  return <>{children}</>;
}

