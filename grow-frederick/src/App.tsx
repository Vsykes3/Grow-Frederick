import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuthStore, useUIStore } from './store';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import UpdatesPage from './pages/UpdatesPage';
import MapPage from './pages/MapPage';
import PlantsPage from './pages/PlantsPage';
import PlantDetailPage from './pages/PlantDetailPage';
import CalendarPage from './pages/CalendarPage';
import AlertsPage from './pages/AlertsPage';
import LivePage from './pages/LivePage';
import StartPage from './pages/StartPage';
import AccountPage from './pages/AccountPage';
import ProPage from './pages/ProPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import { SproutLoader } from './components/ui/SproutLoader';

function App() {
  const { isAuthenticated } = useAuthStore();
  const { theme, setTheme } = useUIStore();

  // Apply theme on mount
  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/updates" element={<UpdatesPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/plants" element={<PlantsPage />} />
            <Route path="/plants/:id" element={<PlantDetailPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/live" element={<LivePage />} />
            <Route path="/start" element={<StartPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/pro" element={<ProPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;