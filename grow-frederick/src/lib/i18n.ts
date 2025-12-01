// lib/i18n.ts
/**
 * Internationalization system for GrowCommon
 * Supports multiple languages with fallback to English
 */

export type SupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'zh' | 'ja' | 'ko' | 'ar';

export const SUPPORTED_LANGUAGES: SupportedLanguage[] = [
  'en', 'es', 'fr', 'de', 'it', 'pt', 'zh', 'ja', 'ko', 'ar'
];

export const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  es: 'EspaÃ±ol',
  fr: 'FranÃ§ais',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'PortuguÃªs',
  zh: 'ä¸­æ–‡',
  ja: 'æ—¥æœ¬èªž',
  ko: 'í•œêµ­ì–´',
  ar: 'Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©'
};

export const LANGUAGE_FLAGS: Record<SupportedLanguage, string> = {
  en: 'ðŸ‡ºðŸ‡¸',
  es: 'ðŸ‡ªðŸ‡¸',
  fr: 'ðŸ‡«ðŸ‡·',
  de: 'ðŸ‡©ðŸ‡ª',
  it: 'ðŸ‡®ðŸ‡¹',
  pt: 'ðŸ‡µðŸ‡¹',
  zh: 'ðŸ‡¨ðŸ‡³',
  ja: 'ðŸ‡¯ðŸ‡µ',
  ko: 'ðŸ‡°ðŸ‡·',
  ar: 'ðŸ‡¸ðŸ‡¦'
};

// Translation keys and their translations
export const translations = {
  en: {
    // Navigation
    'nav.updates': 'Updates',
    'nav.map': 'Map',
    'nav.plantIndex': 'Plant Index',
    'nav.calendar': 'Calendar',
    'nav.alerts': 'Alerts',
    'nav.conditions': 'Live Conditions',
    'nav.account': 'Account',
    'nav.pro': 'Pro',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.refresh': 'Refresh',
    
    // Pro features
    'pro.badge': 'PRO',
    'pro.upgrade': 'Upgrade to Pro',
    'pro.feature': 'Pro Feature',
    'pro.trial': 'Start Free Trial',
    'pro.pricing': 'Pricing',
    
    // Weather
    'weather.temperature': 'Temperature',
    'weather.humidity': 'Humidity',
    'weather.rainfall': 'Rainfall',
    'weather.conditions': 'Conditions',
    'weather.forecast': 'Forecast',
    'weather.alerts': 'Weather Alerts',
    
    // Plants
    'plants.index': 'Plant Index',
    'plants.search': 'Search Plants',
    'plants.category': 'Category',
    'plants.difficulty': 'Difficulty',
    'plants.hardiness': 'Hardiness Zone',
    'plants.planting': 'Planting Season',
    'plants.harvest': 'Harvest Time',
    
    // Calendar
    'calendar.title': 'Garden Calendar',
    'calendar.addEvent': 'Add Event',
    'calendar.planting': 'Planting',
    'calendar.harvest': 'Harvest',
    'calendar.maintenance': 'Maintenance',
    
    // Alerts
    'alerts.title': 'Garden Alerts',
    'alerts.pest': 'Pest Alert',
    'alerts.weather': 'Weather Alert',
    'alerts.disease': 'Disease Alert',
    'alerts.severity': 'Severity',
    
    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'settings.light': 'Light',
    'settings.dark': 'Dark',
    'settings.system': 'System',
    
    // Homepage
    'home.title': 'Smart Gardening Made Simple',
    'home.subtitle': 'The ultimate gardening companion with weather intelligence, plant care, and pest alerts. Grow smarter with GrowCommon.',
    'home.getStarted': 'Get Started Free',
    'home.tryPro': 'Try Pro Free',
    
    // Pro page
    'pro.title': 'Go Pro!',
    'pro.subtitle': 'Unlock advanced gardening intelligence with GrowCommon Pro',
    'pro.price': '$9.99/month',
    'pro.trialText': '7-day free trial',
    'pro.features': 'What you\'ll unlock today',
    'pro.upgradeNow': 'Upgrade to Pro',
  },
  
  es: {
    // Navigation
    'nav.updates': 'Actualizaciones',
    'nav.map': 'Mapa',
    'nav.plantIndex': 'Ãndice de Plantas',
    'nav.calendar': 'Calendario',
    'nav.alerts': 'Alertas',
    'nav.conditions': 'Condiciones en Vivo',
    'nav.account': 'Cuenta',
    'nav.pro': 'Pro',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Ã‰xito',
    'common.cancel': 'Cancelar',
    'common.save': 'Guardar',
    'common.delete': 'Eliminar',
    'common.edit': 'Editar',
    'common.view': 'Ver',
    'common.close': 'Cerrar',
    'common.back': 'AtrÃ¡s',
    'common.next': 'Siguiente',
    'common.previous': 'Anterior',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.sort': 'Ordenar',
    'common.refresh': 'Actualizar',
    
    // Pro features
    'pro.badge': 'PRO',
    'pro.upgrade': 'Actualizar a Pro',
    'pro.feature': 'FunciÃ³n Pro',
    'pro.trial': 'Iniciar Prueba Gratuita',
    'pro.pricing': 'Precios',
    
    // Weather
    'weather.temperature': 'Temperatura',
    'weather.humidity': 'Humedad',
    'weather.rainfall': 'Lluvia',
    'weather.conditions': 'Condiciones',
    'weather.forecast': 'PronÃ³stico',
    'weather.alerts': 'Alertas del Clima',
    
    // Plants
    'plants.index': 'Ãndice de Plantas',
    'plants.search': 'Buscar Plantas',
    'plants.category': 'CategorÃ­a',
    'plants.difficulty': 'Dificultad',
    'plants.hardiness': 'Zona de Resistencia',
    'plants.planting': 'Temporada de Siembra',
    'plants.harvest': 'Tiempo de Cosecha',
    
    // Calendar
    'calendar.title': 'Calendario del JardÃ­n',
    'calendar.addEvent': 'Agregar Evento',
    'calendar.planting': 'Siembra',
    'calendar.harvest': 'Cosecha',
    'calendar.maintenance': 'Mantenimiento',
    
    // Alerts
    'alerts.title': 'Alertas del JardÃ­n',
    'alerts.pest': 'Alerta de Plagas',
    'alerts.weather': 'Alerta del Clima',
    'alerts.disease': 'Alerta de Enfermedades',
    'alerts.severity': 'Gravedad',
    
    // Settings
    'settings.title': 'ConfiguraciÃ³n',
    'settings.language': 'Idioma',
    'settings.theme': 'Tema',
    'settings.light': 'Claro',
    'settings.dark': 'Oscuro',
    'settings.system': 'Sistema',
    
    // Homepage
    'home.title': 'JardinerÃ­a Inteligente Hecha Simple',
    'home.subtitle': 'El compaÃ±ero de jardinerÃ­a definitivo con inteligencia del clima, cuidado de plantas y alertas de plagas. Cultiva mÃ¡s inteligente con GrowCommon.',
    'home.getStarted': 'Comenzar Gratis',
    'home.tryPro': 'Probar Pro Gratis',
    
    // Pro page
    'pro.title': 'Â¡Hazte Pro!',
    'pro.subtitle': 'Desbloquea inteligencia avanzada de jardinerÃ­a con GrowCommon Pro',
    'pro.price': '$9.99/mes',
    'pro.trialText': 'Prueba gratuita de 7 dÃ­as',
    'pro.features': 'Lo que desbloquearÃ¡s hoy',
    'pro.upgradeNow': 'Actualizar a Pro',
  },
  
  fr: {
    // Navigation
    'nav.updates': 'Mises Ã  jour',
    'nav.map': 'Carte',
    'nav.plantIndex': 'Index des Plantes',
    'nav.calendar': 'Calendrier',
    'nav.alerts': 'Alertes',
    'nav.conditions': 'Conditions en Direct',
    'nav.account': 'Compte',
    'nav.pro': 'Pro',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'SuccÃ¨s',
    'common.cancel': 'Annuler',
    'common.save': 'Enregistrer',
    'common.delete': 'Supprimer',
    'common.edit': 'Modifier',
    'common.view': 'Voir',
    'common.close': 'Fermer',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.previous': 'PrÃ©cÃ©dent',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.sort': 'Trier',
    'common.refresh': 'Actualiser',
    
    // Pro features
    'pro.badge': 'PRO',
    'pro.upgrade': 'Passer Ã  Pro',
    'pro.feature': 'FonctionnalitÃ© Pro',
    'pro.trial': 'Commencer l\'essai gratuit',
    'pro.pricing': 'Tarifs',
    
    // Weather
    'weather.temperature': 'TempÃ©rature',
    'weather.humidity': 'HumiditÃ©',
    'weather.rainfall': 'PrÃ©cipitations',
    'weather.conditions': 'Conditions',
    'weather.forecast': 'PrÃ©visions',
    'weather.alerts': 'Alertes MÃ©tÃ©o',
    
    // Plants
    'plants.index': 'Index des Plantes',
    'plants.search': 'Rechercher des Plantes',
    'plants.category': 'CatÃ©gorie',
    'plants.difficulty': 'DifficultÃ©',
    'plants.hardiness': 'Zone de RusticitÃ©',
    'plants.planting': 'Saison de Plantation',
    'plants.harvest': 'Temps de RÃ©colte',
    
    // Calendar
    'calendar.title': 'Calendrier du Jardin',
    'calendar.addEvent': 'Ajouter un Ã‰vÃ©nement',
    'calendar.planting': 'Plantation',
    'calendar.harvest': 'RÃ©colte',
    'calendar.maintenance': 'Entretien',
    
    // Alerts
    'alerts.title': 'Alertes du Jardin',
    'alerts.pest': 'Alerte Parasites',
    'alerts.weather': 'Alerte MÃ©tÃ©o',
    'alerts.disease': 'Alerte Maladie',
    'alerts.severity': 'GravitÃ©',
    
    // Settings
    'settings.title': 'ParamÃ¨tres',
    'settings.language': 'Langue',
    'settings.theme': 'ThÃ¨me',
    'settings.light': 'Clair',
    'settings.dark': 'Sombre',
    'settings.system': 'SystÃ¨me',
    
    // Homepage
    'home.title': 'Jardinage Intelligent Rendu Simple',
    'home.subtitle': 'Le compagnon de jardinage ultime avec intelligence mÃ©tÃ©o, soins des plantes et alertes de parasites. Cultivez plus intelligemment avec GrowCommon.',
    'home.getStarted': 'Commencer Gratuitement',
    'home.tryPro': 'Essayer Pro Gratuitement',
    
    // Pro page
    'pro.title': 'Passez Pro !',
    'pro.subtitle': 'DÃ©bloquez l\'intelligence avancÃ©e du jardinage avec GrowCommon Pro',
    'pro.price': '9,99 â‚¬/mois',
    'pro.trialText': 'Essai gratuit de 7 jours',
    'pro.features': 'Ce que vous dÃ©bloquerez aujourd\'hui',
    'pro.upgradeNow': 'Passer Ã  Pro',
  },
  
  // Add more languages as needed...
  de: {
    'nav.updates': 'Updates',
    'nav.map': 'Karte',
    'nav.plantIndex': 'Pflanzenindex',
    'nav.calendar': 'Kalender',
    'nav.alerts': 'Warnungen',
    'nav.conditions': 'Live-Bedingungen',
    'nav.account': 'Konto',
    'nav.pro': 'Pro',
    'common.loading': 'Laden...',
    'common.error': 'Fehler',
    'common.success': 'Erfolg',
    'common.cancel': 'Abbrechen',
    'common.save': 'Speichern',
    'common.delete': 'LÃ¶schen',
    'common.edit': 'Bearbeiten',
    'common.view': 'Anzeigen',
    'common.close': 'SchlieÃŸen',
    'common.back': 'ZurÃ¼ck',
    'common.next': 'Weiter',
    'common.previous': 'Vorherige',
    'common.search': 'Suchen',
    'common.filter': 'Filtern',
    'common.sort': 'Sortieren',
    'common.refresh': 'Aktualisieren',
    'pro.badge': 'PRO',
    'pro.upgrade': 'Auf Pro upgraden',
    'pro.feature': 'Pro-Funktion',
    'pro.trial': 'Kostenlose Testversion starten',
    'pro.pricing': 'Preise',
    'weather.temperature': 'Temperatur',
    'weather.humidity': 'Luftfeuchtigkeit',
    'weather.rainfall': 'Niederschlag',
    'weather.conditions': 'Bedingungen',
    'weather.forecast': 'Vorhersage',
    'weather.alerts': 'Wetterwarnungen',
    'plants.index': 'Pflanzenindex',
    'plants.search': 'Pflanzen suchen',
    'plants.category': 'Kategorie',
    'plants.difficulty': 'Schwierigkeit',
    'plants.hardiness': 'WinterhÃ¤rtezone',
    'plants.planting': 'Pflanzsaison',
    'plants.harvest': 'Erntezeit',
    'calendar.title': 'Gartenkalender',
    'calendar.addEvent': 'Ereignis hinzufÃ¼gen',
    'calendar.planting': 'Pflanzung',
    'calendar.harvest': 'Ernte',
    'calendar.maintenance': 'Wartung',
    'alerts.title': 'Gartenwarnungen',
    'alerts.pest': 'SchÃ¤dlingswarnung',
    'alerts.weather': 'Wetterwarnung',
    'alerts.disease': 'Krankheitswarnung',
    'alerts.severity': 'Schweregrad',
    'settings.title': 'Einstellungen',
    'settings.language': 'Sprache',
    'settings.theme': 'Design',
    'settings.light': 'Hell',
    'settings.dark': 'Dunkel',
    'settings.system': 'System',
    'home.title': 'Intelligentes GÃ¤rtnern Einfach Gemacht',
    'home.subtitle': 'Der ultimative Gartenbegleiter mit Wetterintelligenz, Pflanzenpflege und SchÃ¤dlingswarnungen. GÃ¤rtnern Sie intelligenter mit GrowCommon.',
    'home.getStarted': 'Kostenlos starten',
    'home.tryPro': 'Pro kostenlos testen',
    'pro.title': 'Pro werden!',
    'pro.subtitle': 'ErschlieÃŸen Sie fortgeschrittene Gartenintelligenz mit GrowCommon Pro',
    'pro.price': '9,99 â‚¬/Monat',
    'pro.trialText': '7-tÃ¤gige kostenlose Testversion',
    'pro.features': 'Was Sie heute freischalten werden',
    'pro.upgradeNow': 'Auf Pro upgraden',
  }
};

export type TranslationKey = keyof typeof translations.en;

/**
 * Get translation for a key in the specified language
 */
export function getTranslation(key: TranslationKey, language: SupportedLanguage = 'en'): string {
  const langTranslations = translations[language];
  if (!langTranslations) {
    console.warn(`Language ${language} not found, falling back to English`);
    return translations.en[key] || key;
  }
  
  return langTranslations[key] || translations.en[key] || key;
}

/**
 * Get user's preferred language from browser or localStorage
 */
export function getUserLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en';
  
  try {
    // Check localStorage first
    const stored = localStorage.getItem('growcommon-language');
    if (stored && SUPPORTED_LANGUAGES.includes(stored as SupportedLanguage)) {
      return stored as SupportedLanguage;
    }
    
    // Fall back to browser language
    const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
    if (SUPPORTED_LANGUAGES.includes(browserLang)) {
      return browserLang;
    }
  } catch (error) {
    console.warn('Failed to get user language:', error);
  }
  
  return 'en';
}

/**
 * Save user's language preference
 */
export function setUserLanguage(language: SupportedLanguage): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem('growcommon-language', language);
    // Update HTML lang attribute
    document.documentElement.lang = language;
  } catch (error) {
    console.warn('Failed to save language preference:', error);
  }
}

/**
 * Check if text should be right-to-left
 */
export function isRTL(language: SupportedLanguage): boolean {
  return language === 'ar';
}

