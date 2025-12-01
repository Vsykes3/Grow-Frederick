import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gc: {
          dark: '#414535',    // Black Olive
          light: '#9EBB8C',   // Olivine
          cream: '#F5F3EE',   // Soft background
          ink: '#0F1A12',     // Text on light
          accent: '#7A9B6B',  // Computed accessible accent
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        gardenGradient: {
          '0%, 100%': { 
            backgroundPosition: '0% 50%',
            backgroundImage: 'linear-gradient(45deg, #414535, #9EBB8C, #7A9B6B)',
          },
          '50%': { 
            backgroundPosition: '100% 50%',
            backgroundImage: 'linear-gradient(45deg, #9EBB8C, #7A9B6B, #414535)',
          },
        },
        pollenFloat: {
          '0%': { 
            transform: 'translateY(0px) translateX(0px) rotate(0deg)',
            opacity: '0.3',
          },
          '25%': { 
            transform: 'translateY(-10px) translateX(5px) rotate(90deg)',
            opacity: '0.6',
          },
          '50%': { 
            transform: 'translateY(-20px) translateX(-5px) rotate(180deg)',
            opacity: '0.4',
          },
          '75%': { 
            transform: 'translateY(-10px) translateX(3px) rotate(270deg)',
            opacity: '0.7',
          },
          '100%': { 
            transform: 'translateY(0px) translateX(0px) rotate(360deg)',
            opacity: '0.3',
          },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        sproutGrow: {
          '0%': { 
            transform: 'scale(0.8) translateY(10px)',
            opacity: '0',
          },
          '30%': { 
            transform: 'scale(0.9) translateY(5px)',
            opacity: '0.7',
          },
          '60%': { 
            transform: 'scale(1.05) translateY(-2px)',
            opacity: '0.9',
          },
          '100%': { 
            transform: 'scale(1) translateY(0px)',
            opacity: '1',
          },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideIn: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
      },
      animation: {
        garden: 'gardenGradient 18s ease-in-out infinite',
        pollen: 'pollenFloat 12s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        sprout: 'sproutGrow 900ms ease-out',
        'fade-in-up': 'fadeInUp 200ms ease-out',
        'slide-in': 'slideIn 150ms ease-out',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '220': '220ms',
      },
      transitionTimingFunction: {
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'medium': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'large': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}

export default config