import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuthStore, useUIStore } from '/src/store';

// Pages
import HomePage from '/src/pages/HomePage';
import AboutPage from '/src/pages/AboutPage';
import UpdatesPage from '/src/pages/UpdatesPage';
import MapPage from '/src/pages/MapPage';
import PlantsPage from '/src/pages/PlantsPage';
import PlantDetailPage from '/src/pages/PlantDetailPage';
import CalendarPage from '/src/pages/CalendarPage';
import AlertsPage from '/src/pages/AlertsPage';
import LivePage from '/src/pages/LivePage';
import StartPage from '/src/pages/StartPage';
import AccountPage from '/src/pages/AccountPage';
import ProPage from '/src/pages/ProPage';
import NotFoundPage from '/src/pages/NotFoundPage';

// Components
import Navbar from '/src/components/ui/Navbar';
import Footer from '/src/components/ui/Footer';
import { SproutLoader } from '/src/components/ui/SproutLoader';

function App() {
  const { isAuthenticated } = useAuthStore();
  const { theme, setTheme } = useUIStore();

  // Apply theme on mount
  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  return (
    <Router>
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
    </Router>
  );
}

export default App;