import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Settings, LogOut, Sun, Moon, Monitor } from 'lucide-react';
import { useAuthStore, useUIStore } from '/src/store';
import { ProBadge, ProBadgeCompact } from './ProBadge';
import { Button } from './Button';
import { cn } from '/src/lib/utils';

const navigation = [
  { name: 'Home', href: '/', icon: '🏠' },
  { name: 'About', href: '/about', icon: '🌱' },
  { name: 'Updates', href: '/updates', icon: '📰' },
  { name: 'Map', href: '/map', icon: '🗺️', pro: true },
  { name: 'Plants', href: '/plants', icon: '🌿' },
  { name: 'Calendar', href: '/calendar', icon: '📅', pro: true },
  { name: 'Alerts', href: '/alerts', icon: '🚨', pro: true },
  { name: 'Live', href: '/live', icon: '📊', pro: true },
  { name: 'Start Garden', href: '/start', icon: '🌻' },
];

export default function Navbar() {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { theme, setTheme, sidebarOpen, setSidebarOpen } = useUIStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location, setSidebarOpen]);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return <Sun className="w-4 h-4" />;
      case 'dark': return <Moon className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const cycleTheme = () => {
    const themes = ['light', 'dark', 'system'] as const;
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <motion.nav
      className={cn(
        'sticky top-0 z-50 transition-all duration-200',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-gc-light/20 shadow-soft' 
          : 'bg-transparent'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-gc-light to-gc-accent rounded-xl flex items-center justify-center shadow-soft"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img 
                src="/growcommon-logo.png" 
                alt="GrowCommon" 
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  // Fallback to emoji if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling!.style.display = 'block';
                }}
              />
              <span className="text-xl hidden">🌿</span>
            </motion.div>
            <span className="text-xl font-bold text-gc-dark group-hover:text-gc-accent transition-colors">
              GrowCommon
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  location.pathname === item.href
                    ? 'bg-gc-accent text-white shadow-soft'
                    : 'text-muted-foreground hover:text-gc-dark hover:bg-gc-light/10'
                )}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
                {item.pro && <ProBadgeCompact />}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={cycleTheme}
              className="p-2"
              title={`Current theme: ${theme}`}
            >
              {getThemeIcon()}
            </Button>

            {/* User menu */}
            {isAuthenticated ? (
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 bg-gc-accent rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden md:block text-sm font-medium">
                    {user?.name || 'User'}
                  </span>
                </Button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-large border border-gc-light/20 py-2 z-50"
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 py-2 border-b border-gc-light/20">
                        <p className="text-sm font-medium text-gc-dark">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                        {user?.plan === 'pro' && (
                          <div className="mt-1">
                            <ProBadge size="sm" />
                          </div>
                        )}
                      </div>
                      
                      <Link
                        to="/account"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gc-dark hover:bg-gc-light/10 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      
                      <Link
                        to="/account?tab=preferences"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gc-dark hover:bg-gc-light/10 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/account">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/pro">
                  <Button size="sm">
                    <ProBadge size="sm" className="mr-2" />
                    Go Pro
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              className="lg:hidden border-t border-gc-light/20 py-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                      location.pathname === item.href
                        ? 'bg-gc-accent text-white'
                        : 'text-muted-foreground hover:text-gc-dark hover:bg-gc-light/10'
                    )}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                    {item.pro && <ProBadgeCompact />}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}