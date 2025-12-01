// lib/theme.ts
/**
 * Theme management system for GrowCommon
 * Handles light/dark mode switching and system theme detection
 */

export type Theme = 'light' | 'dark' | 'system';

export const THEMES: Theme[] = ['light', 'dark', 'system'];

export const THEME_LABELS: Record<Theme, string> = {
  light: 'Light',
  dark: 'Dark',
  system: 'System'
};

export const THEME_ICONS: Record<Theme, string> = {
  light: 'â˜€ï¸',
  dark: 'ðŸŒ™',
  system: 'ðŸ’»'
};

/**
 * Get user's preferred theme from localStorage or system preference
 */
export function getUserTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  
  try {
    const stored = localStorage.getItem('growcommon-theme');
    if (stored && THEMES.includes(stored as Theme)) {
      return stored as Theme;
    }
  } catch (error) {
    console.warn('Failed to get stored theme:', error);
  }
  
  return 'system';
}

/**
 * Save user's theme preference
 */
export function setUserTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('growcommon-theme', theme);
    applyTheme(theme);
  } catch (error) {
    console.warn('Failed to save theme preference:', error);
  }
}

/**
 * Apply theme to the document
 */
export function applyTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  
  const root = document.documentElement;
  const resolvedTheme = getResolvedTheme(theme);
  
  // Remove existing theme classes
  root.classList.remove('light', 'dark');
  
  // Add new theme class
  root.classList.add(resolvedTheme);
  
  // Update meta theme-color for mobile browsers
  updateThemeColor(resolvedTheme);
}

/**
 * Get the resolved theme (light or dark) based on system preference
 */
export function getResolvedTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return theme;
}

/**
 * Update the theme-color meta tag for mobile browsers
 */
function updateThemeColor(theme: 'light' | 'dark'): void {
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    const color = theme === 'dark' ? '#0a0a0a' : '#ffffff';
    metaThemeColor.setAttribute('content', color);
  }
}

/**
 * Listen for system theme changes
 */
export function watchSystemTheme(callback: (theme: 'light' | 'dark') => void): () => void {
  if (typeof window === 'undefined') return () => {};
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handleChange = (e: MediaQueryListEvent) => {
    callback(e.matches ? 'dark' : 'light');
  };
  
  mediaQuery.addEventListener('change', handleChange);
  
  // Return cleanup function
  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
}

/**
 * Initialize theme system
 */
export function initializeTheme(): void {
  if (typeof window === 'undefined') return;
  
  const theme = getUserTheme();
  applyTheme(theme);
  
  // Watch for system theme changes if using system theme
  if (theme === 'system') {
    const cleanup = watchSystemTheme((resolvedTheme) => {
      applyTheme('system');
    });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', cleanup);
  }
}

/**
 * Get theme-aware CSS variables
 */
export function getThemeVariables(theme: 'light' | 'dark') {
  if (theme === 'dark') {
    return {
      '--background': '10 10 10',
      '--foreground': '250 250 250',
      '--primary': '158 187 140',
      '--primary-foreground': '65 69 53',
      '--secondary': '65 69 53',
      '--secondary-foreground': '158 187 140',
      '--accent': '122 155 107',
      '--accent-foreground': '255 255 255',
      '--border': '55 65 81',
      '--input': '31 41 55',
      '--muted': '17 24 39',
      '--muted-foreground': '156 163 175',
    };
  }
  
  return {
    '--background': '255 255 255',
    '--foreground': '26 26 26',
    '--primary': '65 69 53',
    '--primary-foreground': '255 255 255',
    '--secondary': '158 187 140',
    '--secondary-foreground': '65 69 53',
    '--accent': '122 155 107',
    '--accent-foreground': '255 255 255',
    '--border': '229 231 235',
    '--input': '243 244 246',
    '--muted': '249 250 251',
    '--muted-foreground': '107 114 128',
  };
}

/**
 * Apply theme variables to CSS custom properties
 */
export function applyThemeVariables(theme: 'light' | 'dark'): void {
  if (typeof window === 'undefined') return;
  
  const root = document.documentElement;
  const variables = getThemeVariables(theme);
  
  Object.entries(variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

