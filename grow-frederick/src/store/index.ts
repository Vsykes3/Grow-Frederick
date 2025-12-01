import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro';
  location?: {
    lat: number;
    lng: number;
    city: string;
    state: string;
  };
}

export interface GardenPlot {
  id: string;
  name: string;
  width: number;
  height: number;
  plants: Array<{
    id: string;
    x: number;
    y: number;
    plantedDate: string;
  }>;
}

// Auth Store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        // Mock login - replace with real auth
        setTimeout(() => {
          const mockUser: User = {
            id: '1',
            name: 'Demo User',
            email,
            plan: 'free',
            location: {
              lat: 39.4143,
              lng: -77.4105,
              city: 'Frederick',
              state: 'MD'
            }
          };
          set({ user: mockUser, isAuthenticated: true, isLoading: false });
        }, 1000);
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

// UI Store
interface UIState {
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      sidebarOpen: false,
      setTheme: (theme) => {
        set({ theme });
        // Apply theme to document
        const root = document.documentElement;
        if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      },
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    {
      name: 'ui-storage',
    }
  )
);

// Location Store
interface LocationState {
  currentLocation: {
    lat: number;
    lng: number;
    city: string;
    state: string;
  } | null;
  setLocation: (location: LocationState['currentLocation']) => void;
  requestLocation: () => Promise<void>;
}

export const useLocationStore = create<LocationState>((set, get) => ({
  currentLocation: null,
  setLocation: (currentLocation) => set({ currentLocation }),
  requestLocation: async () => {
    if (!navigator.geolocation) return;
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        // Mock reverse geocoding - replace with real service
        const mockLocation = {
          lat: latitude,
          lng: longitude,
          city: 'Frederick',
          state: 'MD'
        };
        set({ currentLocation: mockLocation });
      },
      (error) => {
        console.error('Location error:', error);
        // Fallback to Frederick, MD
        set({
          currentLocation: {
            lat: 39.4143,
            lng: -77.4105,
            city: 'Frederick',
            state: 'MD'
          }
        });
      }
    );
  },
}));

// Garden Store
interface GardenState {
  plots: GardenPlot[];
  selectedPlot: string | null;
  setPlots: (plots: GardenPlot[]) => void;
  addPlot: (plot: GardenPlot) => void;
  updatePlot: (id: string, updates: Partial<GardenPlot>) => void;
  deletePlot: (id: string) => void;
  setSelectedPlot: (id: string | null) => void;
}

export const useGardenStore = create<GardenState>((set, get) => ({
  plots: [],
  selectedPlot: null,
  setPlots: (plots) => set({ plots }),
  addPlot: (plot) => set((state) => ({ plots: [...state.plots, plot] })),
  updatePlot: (id, updates) => set((state) => ({
    plots: state.plots.map(plot => plot.id === id ? { ...plot, ...updates } : plot)
  })),
  deletePlot: (id) => set((state) => ({
    plots: state.plots.filter(plot => plot.id !== id),
    selectedPlot: state.selectedPlot === id ? null : state.selectedPlot
  })),
  setSelectedPlot: (selectedPlot) => set({ selectedPlot }),
}));

// Plan Store
interface PlanState {
  currentPlan: 'free' | 'pro';
  isLoading: boolean;
  setPlan: (plan: 'free' | 'pro') => void;
  setLoading: (loading: boolean) => void;
  upgradeToPro: () => Promise<void>;
}

export const usePlanStore = create<PlanState>((set, get) => ({
  currentPlan: 'free',
  isLoading: false,
  setPlan: (currentPlan) => set({ currentPlan }),
  setLoading: (isLoading) => set({ isLoading }),
  upgradeToPro: async () => {
    set({ isLoading: true });
    // Mock upgrade - replace with real payment processing
    setTimeout(() => {
      set({ currentPlan: 'pro', isLoading: false });
    }, 2000);
  },
}));

