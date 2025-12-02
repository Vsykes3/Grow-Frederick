'use client';

import React, { useState, useRef, useEffect } from 'react';
import { getTranslation, getUserLanguage, setUserLanguage, SUPPORTED_LANGUAGES, LANGUAGE_NAMES, LANGUAGE_FLAGS, type SupportedLanguage } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface LanguageSelectorProps {
  className?: string;
  showLabel?: boolean;
}

export function LanguageSelector({ className, showLabel = true }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(getUserLanguage());
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (language: SupportedLanguage) => {
    setSelectedLanguage(language);
    setUserLanguage(language);
    setIsOpen(false);
    
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language } }));
  };

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      {showLabel && (
        <label className="block text-sm font-medium text-gc-dark mb-2">
          {getTranslation('settings.language', selectedLanguage)}
        </label>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-3 w-full px-4 py-3 bg-background border border-gc-light/30 rounded-xl',
          'hover:border-gc-accent focus:outline-none focus:ring-2 focus:ring-gc-accent focus:ring-offset-2',
          'transition-all duration-200'
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-lg">{LANGUAGE_FLAGS[selectedLanguage]}</span>
        <span className="flex-1 text-left text-gc-dark font-medium">
          {LANGUAGE_NAMES[selectedLanguage]}
        </span>
        <svg
          className={cn(
            'w-5 h-5 text-muted-foreground transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-gc-light/30 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
          <div role="listbox" className="py-2">
            {SUPPORTED_LANGUAGES.map((language) => (
              <button
                key={language}
                onClick={() => handleLanguageChange(language)}
                className={cn(
                  'flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gc-light/10',
                  'focus:outline-none focus:bg-gc-light/10 transition-colors duration-150',
                  selectedLanguage === language && 'bg-gc-accent/10 text-gc-dark'
                )}
                role="option"
                aria-selected={selectedLanguage === language}
              >
                <span className="text-lg">{LANGUAGE_FLAGS[language]}</span>
                <span className="flex-1 text-gc-dark font-medium">
                  {LANGUAGE_NAMES[language]}
                </span>
                {selectedLanguage === language && (
                  <svg className="w-5 h-5 text-gc-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Compact language selector for navigation
 */
export function LanguageSelectorCompact({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(getUserLanguage());
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (language: SupportedLanguage) => {
    setSelectedLanguage(language);
    setUserLanguage(language);
    setIsOpen(false);
    
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language } }));
  };

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 bg-background/80 border border-gc-light/30 rounded-lg',
          'hover:border-gc-accent focus:outline-none focus:ring-2 focus:ring-gc-accent focus:ring-offset-2',
          'transition-all duration-200 backdrop-blur-sm'
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title={LANGUAGE_NAMES[selectedLanguage]}
      >
        <span className="text-lg">{LANGUAGE_FLAGS[selectedLanguage]}</span>
        <svg
          className={cn(
            'w-4 h-4 text-muted-foreground transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-background border border-gc-light/30 rounded-xl shadow-lg z-50 min-w-48">
          <div role="listbox" className="py-2">
            {SUPPORTED_LANGUAGES.map((language) => (
              <button
                key={language}
                onClick={() => handleLanguageChange(language)}
                className={cn(
                  'flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gc-light/10',
                  'focus:outline-none focus:bg-gc-light/10 transition-colors duration-150',
                  selectedLanguage === language && 'bg-gc-accent/10 text-gc-dark'
                )}
                role="option"
                aria-selected={selectedLanguage === language}
              >
                <span className="text-lg">{LANGUAGE_FLAGS[language]}</span>
                <span className="flex-1 text-gc-dark font-medium text-sm">
                  {LANGUAGE_NAMES[language]}
                </span>
                {selectedLanguage === language && (
                  <svg className="w-4 h-4 text-gc-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

