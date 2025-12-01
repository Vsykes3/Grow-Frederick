import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CookieConsent from './components/CookieConsent';

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import PlantIndex from './pages/PlantIndex';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import SettingsNext from './pages/SettingsNext';
import MapPage from './pages/map';
import News from './pages/News';
import AboutUs from './pages/AboutUs';
import Calendar from './pages/Calendar';
import StartMyGarden from './pages/StartMyGarden';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/index' element={<PlantIndex />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings-next" element={<SettingsNext />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/garden" element={<StartMyGarden />} />
      </Routes>
      <CookieConsent />
    </>
  );
};

export default App;

