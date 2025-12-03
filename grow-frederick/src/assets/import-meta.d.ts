interface ImportMetaEnv {
    readonly VITE_GOOGLE_MAPS_KEY: string;
    readonly VITE_OPENWEATHER_KEY: string;
    // add more if you use them:
    // readonly VITE_OWM_KEY: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  