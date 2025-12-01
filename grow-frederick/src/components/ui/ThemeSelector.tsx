'use client';

import React, { useState, useEffect } from 'react';
import { getUserTheme, setUserTheme, THEMES, THEME_LABELS, THEME_ICONS, type Theme } from '/src/lib/theme';
import { getTranslation, getUserLanguage } from '/src/lib/i18n';
import { cn } from '/src/lib/utils';

interface ThemeSelectorProps {
  className?: string;
  showLabel?: boolean;
  variant?: 'default' | 'compact' | 'toggle';
}

export function ThemeSelector({ className, showLabel = true, variant = 'default' }: ThemeSelectorProps) {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(getUserTheme());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSelectedTheme(getUserTheme());
  }, []);

  const handleThemeChange = (theme: Theme) => {
    setSelectedTheme(theme);
    setUserTheme(theme);
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  if (variant === 'toggle') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        {showLabel && (
          <span className="text-sm font-medium text-gc-dark">
            {getTranslation('settings.theme', getUserLanguage())}
          </span>
        )}
        <button
          onClick={() => handleThemeChange(selectedTheme === 'light' ? 'dark' : 'light')}
          className={cn(
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-gc-accent focus:ring-offset-2',
            selectedTheme === 'dark' ? 'bg-gc-accent' : 'bg-gc-light/30'
          )}
          role="switch"
          aria-checked={selectedTheme === 'dark'}
          aria-label={`Switch to ${selectedTheme === 'light' ? 'dark' : 'light'} mode`}
        >
          <span
            className={cn(
              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
              selectedTheme === 'dark' ? 'translate-x-6' : 'translate-x-1'
            )}
          />
        </button>
        <span className="text-sm text-muted-foreground">
          {selectedTheme === 'dark' ? 'ðŸŒ™' : 'â˜€ï¸'}
        </span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-2', className)}>
        <button
          onClick={() => {
            const nextTheme = selectedTheme === 'light' ? 'dark' : selectedTheme === 'dark' ? 'system' : 'light';
            handleThemeChange(nextTheme);
          }}
          className={cn(
            'flex items-center gap-2 px-3 py-2 bg-background/80 border border-gc-light/30 rounded-lg',
            'hover:border-gc-accent focus:outline-none focus:ring-2 focus:ring-gc-accent focus:ring-offset-2',
            'transition-all duration-200 backdrop-blur-sm'
          )}
          title={`Current theme: ${THEME_LABELS[selectedTheme]}`}
        >
          <span className="text-lg">{THEME_ICONS[selectedTheme]}</span>
          <span className="text-sm font-medium text-gc-dark">
            {THEME_LABELS[selectedTheme]}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className={cn('space-y-3', className)}>
      {showLabel && (
        <label className="block text-sm font-medium text-gc-dark">
          {getTranslation('settings.theme', getUserLanguage())}
        </label>
      )}
      
      <div className="grid grid-cols-3 gap-2">
        {THEMES.map((theme) => (
          <button
            key={theme}
            onClick={() => handleThemeChange(theme)}
            className={cn(
              'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200',
              'hover:border-gc-accent focus:outline-none focus:ring-2 focus:ring-gc-accent focus:ring-offset-2',
              selectedTheme === theme
                ? 'border-gc-accent bg-gc-accent/10'
                : 'border-gc-light/30 bg-background hover:bg-gc-light/5'
            )}
            aria-pressed={selectedTheme === theme}
          >
            <span className="text-2xl">{THEME_ICONS[theme]}</span>
            <span className="text-sm font-medium text-gc-dark">
              {getTranslation(`settings.${theme}`, getUserLanguage())}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Theme toggle button for navigation
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(getUserTheme());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentTheme(getUserTheme());
  }, []);

  const toggleTheme = () => {
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(nextTheme);
    setUserTheme(nextTheme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'p-2 rounded-lg bg-background/80 border border-gc-light/30',
        'hover:border-gc-accent focus:outline-none focus:ring-2 focus:ring-gc-accent focus:ring-offset-2',
        'transition-all duration-200 backdrop-blur-sm',
        className
      )}
      aria-label={`Switch to ${currentTheme === 'light' ? 'dark' : 'light'} mode`}
      title={`Current theme: ${THEME_LABELS[currentTheme]}`}
    >
      <span className="text-lg">
        {currentTheme === 'light' ? 'ðŸŒ™' : 'â˜€ï¸'}
      </span>
    </button>
  );
}

