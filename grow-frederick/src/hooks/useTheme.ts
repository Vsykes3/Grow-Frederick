'use client';

import { useState, useEffect } from 'react';
import { getUserTheme, setUserTheme, getResolvedTheme, watchSystemTheme, type Theme } from '/src/lib/theme';

/**
 * Hook for theme management
 * Provides theme state and functions to change theme
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getUserTheme());
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const userTheme = getUserTheme();
    setTheme(userTheme);
    setResolvedTheme(getResolvedTheme(userTheme));
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const cleanup = watchSystemTheme((systemTheme) => {
      if (theme === 'system') {
        setResolvedTheme(systemTheme);
      }
    });

    return cleanup;
  }, [theme, mounted]);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    setUserTheme(newTheme);
    setResolvedTheme(getResolvedTheme(newTheme));
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    changeTheme(nextTheme);
  };

  return {
    theme,
    resolvedTheme,
    changeTheme,
    toggleTheme,
    mounted,
  };
}

