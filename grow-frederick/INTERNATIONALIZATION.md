# Internationalization & Theme System - GrowCommon

This document outlines the internationalization (i18n) and theme management system implemented in GrowCommon.

## 🌍 Internationalization (i18n)

### Supported Languages

GrowCommon supports 10 major languages:

| Language | Code | Flag | Native Name |
|----------|------|------|-------------|
| English | `en` | 🇺🇸 | English |
| Spanish | `es` | 🇪🇸 | Español |
| French | `fr` | 🇫🇷 | Français |
| German | `de` | 🇩🇪 | Deutsch |
| Italian | `it` | 🇮🇹 | Italiano |
| Portuguese | `pt` | 🇵🇹 | Português |
| Chinese | `zh` | 🇨🇳 | 中文 |
| Japanese | `ja` | 🇯🇵 | 日本語 |
| Korean | `ko` | 🇰🇷 | 한국어 |
| Arabic | `ar` | 🇸🇦 | العربية |

### Implementation

#### 1. Translation System (`lib/i18n.ts`)

```typescript
// Get translation for current language
const { t } = useI18n();
const title = t('home.title'); // "Smart Gardening Made Simple"

// Get translation for specific language
const spanishTitle = getTranslation('home.title', 'es'); // "Jardinería Inteligente Hecha Simple"
```

#### 2. Language Detection

The system automatically detects user language preference:

1. **localStorage**: User's saved preference
2. **Browser Language**: `navigator.language`
3. **Fallback**: English (`en`)

#### 3. Language Switching

```typescript
// Using the hook
const { changeLanguage } = useI18n();
changeLanguage('es'); // Switch to Spanish

// Direct function call
setUserLanguage('fr'); // Switch to French
```

#### 4. RTL Support

Arabic language automatically enables right-to-left (RTL) layout:

```typescript
const isRTL = isRTL('ar'); // true for Arabic
```

### Adding New Languages

1. **Add to supported languages**:
```typescript
// lib/i18n.ts
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  'en', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja', 'ko', 'ar', 'ru' // Add Russian
];
```

2. **Add language metadata**:
```typescript
export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  // ... existing languages
  ru: 'Русский',
};

export const LANGUAGE_FLAGS: Record<SupportedLanguage, string> = {
  // ... existing languages
  ru: '🇷🇺',
};
```

3. **Add translations**:
```typescript
export const translations = {
  // ... existing languages
  ru: {
    'nav.updates': 'Обновления',
    'nav.map': 'Карта',
    // ... all translation keys
  },
};
```

### Translation Keys

All translation keys follow a hierarchical structure:

```
nav.*          - Navigation items
common.*       - Common UI elements
pro.*          - Pro features
weather.*      - Weather-related content
plants.*       - Plant-related content
calendar.*     - Calendar features
alerts.*       - Alert system
settings.*     - Settings page
home.*         - Homepage content
```

## 🎨 Theme System

### Supported Themes

1. **Light Mode**: Clean, bright interface
2. **Dark Mode**: Easy on the eyes for low-light usage
3. **System**: Automatically follows OS preference

### Implementation

#### 1. Theme Management (`lib/theme.ts`)

```typescript
// Get current theme
const { theme, resolvedTheme } = useTheme();

// Change theme
const { changeTheme } = useTheme();
changeTheme('dark'); // Switch to dark mode
changeTheme('system'); // Follow system preference
```

#### 2. CSS Variables

The theme system uses CSS custom properties for consistent theming:

```css
:root {
  --background: 255 255 255; /* Light mode */
  --foreground: 26 26 26;
  --gc-dark: #414535;
  --gc-light: #9EBB8C;
  --gc-accent: #7A9B6B;
}

.dark {
  --background: 10 10 10; /* Dark mode */
  --foreground: 250 250 250;
  /* ... other dark mode variables */
}
```

#### 3. Automatic Theme Application

The system automatically:
- Applies theme on page load
- Watches for system theme changes
- Updates meta theme-color for mobile browsers
- Persists user preference in localStorage

### Theme Components

#### 1. Theme Selector

```tsx
// Full theme selector with all options
<ThemeSelector />

// Compact version for navigation
<ThemeSelector variant="compact" />

// Simple toggle (light/dark only)
<ThemeSelector variant="toggle" />
```

#### 2. Theme Toggle

```tsx
// Simple toggle button for navigation
<ThemeToggle />
```

### Adding Custom Themes

1. **Define theme variables**:
```typescript
// lib/theme.ts
export const CUSTOM_THEME_VARIABLES = {
  '--background': '255 255 255',
  '--foreground': '26 26 26',
  // ... other variables
};
```

2. **Apply theme**:
```typescript
applyThemeVariables('custom');
```

## 🔧 Usage Examples

### Basic Component with i18n

```tsx
'use client';

import { useI18n } from '@/hooks/useI18n';

export function MyComponent() {
  const { t, mounted } = useI18n();
  
  if (!mounted) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('home.subtitle')}</p>
    </div>
  );
}
```

### Component with Theme Support

```tsx
'use client';

import { useTheme } from '@/hooks/useTheme';

export function MyComponent() {
  const { theme, resolvedTheme, changeTheme } = useTheme();
  
  return (
    <div className="bg-background text-foreground">
      <p>Current theme: {theme}</p>
      <p>Resolved theme: {resolvedTheme}</p>
      <button onClick={() => changeTheme('dark')}>
        Switch to Dark Mode
      </button>
    </div>
  );
}
```

### Settings Page Integration

```tsx
export function SettingsPage() {
  const { t } = useI18n();
  const { theme, changeTheme } = useTheme();
  
  return (
    <div>
      <h1>{t('settings.title')}</h1>
      
      <div>
        <label>{t('settings.language')}</label>
        <LanguageSelector />
      </div>
      
      <div>
        <label>{t('settings.theme')}</label>
        <ThemeSelector />
      </div>
    </div>
  );
}
```

## 🎯 Best Practices

### Internationalization

1. **Always use translation keys** instead of hardcoded text
2. **Provide fallbacks** for missing translations
3. **Test with different languages** to ensure UI doesn't break
4. **Consider text length** - some languages need more space
5. **Use semantic keys** that describe the content, not location

### Theming

1. **Use CSS variables** for all colors
2. **Test both light and dark modes**
3. **Ensure sufficient contrast** in both themes
4. **Use semantic color names** (background, foreground, etc.)
5. **Test with system theme changes**

### Performance

1. **Lazy load translations** for better performance
2. **Cache theme preferences** in localStorage
3. **Minimize re-renders** when theme changes
4. **Use CSS custom properties** for efficient theme switching

## 🧪 Testing

### Language Testing

```typescript
// Test translation function
expect(getTranslation('home.title', 'es')).toBe('Jardinería Inteligente Hecha Simple');

// Test language switching
const { changeLanguage } = useI18n();
changeLanguage('fr');
expect(getUserLanguage()).toBe('fr');
```

### Theme Testing

```typescript
// Test theme switching
const { changeTheme } = useTheme();
changeTheme('dark');
expect(document.documentElement.classList.contains('dark')).toBe(true);

// Test system theme detection
expect(getResolvedTheme('system')).toBe('light'); // or 'dark' based on system
```

## 🚀 Future Enhancements

### Planned Features

1. **Pluralization Support**: Handle singular/plural forms
2. **Date/Time Formatting**: Locale-specific date formats
3. **Number Formatting**: Locale-specific number formats
4. **Currency Support**: Multi-currency display
5. **Advanced RTL**: Better RTL layout support
6. **Theme Customization**: User-defined color schemes
7. **Accessibility Themes**: High contrast, reduced motion
8. **Seasonal Themes**: Automatic theme changes based on season

### Integration Opportunities

1. **CMS Integration**: Dynamic translation management
2. **Analytics**: Track language/theme usage
3. **A/B Testing**: Test different translations
4. **User Preferences**: Advanced customization options
5. **API Integration**: Real-time translation updates

---

**GrowCommon's i18n and theme system provides a solid foundation for global accessibility and user customization! 🌍🎨**
