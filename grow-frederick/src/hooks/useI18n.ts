'use client';

import { useState, useEffect } from 'react';
import { getTranslation, getUserLanguage, setUserLanguage, type SupportedLanguage, type TranslationKey } from '@/lib/i18n';

/**
 * Hook for internationalization
 * Provides translation function and current language state
 */
export function useI18n() {
  const [language, setLanguage] = useState<SupportedLanguage>(getUserLanguage());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLanguage(getUserLanguage());
  }, []);

  useEffect(() => {
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  const t = (key: TranslationKey, fallbackLanguage?: SupportedLanguage): string => {
    return getTranslation(key, fallbackLanguage || language);
  };

  const changeLanguage = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage);
    setUserLanguage(newLanguage);
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: newLanguage } }));
  };

  return {
    t,
    language,
    changeLanguage,
    mounted,
  };
}

