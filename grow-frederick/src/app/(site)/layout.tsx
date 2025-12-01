'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '/src/components/ui/Button';
import { ProBadge } from '/src/components/ui/ProBadge';
import { LanguageSelectorCompact } from '/src/components/ui/LanguageSelector';
import { ThemeToggle } from '/src/components/ui/ThemeSelector';
import { cn } from '/src/lib/utils';

const navigation = [
  { name: 'Home', href: '/', icon: 'ðŸ ' },
  { name: 'Map', href: '/map', icon: 'ðŸ—ºï¸', pro: true },
  { name: 'Plant Index', href: '/plant-index', icon: 'ðŸŒ±' },
  { name: 'Calendar', href: '/calendar', icon: 'ðŸ“…', pro: true },
  { name: 'Alerts', href: '/alerts', icon: 'ðŸš¨', pro: true },
  { name: 'Settings', href: '/settings', icon: 'âš™ï¸' },
  { name: 'Account', href: '/account', icon: 'ðŸ‘¤' },
];

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass border-b border-gc-light/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gc-light to-gc-accent rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-xl">ðŸŒ¿</span>
              </div>
              <span className="text-xl font-bold text-gc-dark">GrowCommon</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    pathname === item.href
                      ? 'bg-gc-accent text-gc-dark shadow-sm'
                      : 'text-muted-foreground hover:text-gc-dark hover:bg-gc-light/10'
                  )}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                  {item.pro && (
                    <ProBadge size="sm" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right side actions */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageSelectorCompact />
              <ThemeToggle />
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Button size="sm">
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-gc-dark transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gc-light/20">
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                      pathname === item.href
                        ? 'bg-gc-accent text-gc-dark'
                        : 'text-muted-foreground hover:text-gc-dark hover:bg-gc-light/10'
                    )}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                    {item.pro && (
                      <ProBadge size="sm" />
                    )}
                  </Link>
                ))}
                <div className="pt-4 space-y-3">
                  <div className="flex gap-2">
                    <LanguageSelectorCompact className="flex-1" />
                    <ThemeToggle />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Sign In
                  </Button>
                  <Button size="sm" className="w-full">
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="glass border-t border-gc-light/20 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-gc-light to-gc-accent rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-lg">ðŸŒ¿</span>
                </div>
                <span className="text-lg font-bold text-gc-dark">GrowCommon</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Smart gardening made simple. Weather intelligence, plant care, and pest alerts all in one place.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gc-dark">Quick Links</h3>
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gc-dark transition-colors"
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                    {item.pro && <ProBadge size="sm" />}
                  </Link>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gc-dark">Resources</h3>
              <div className="space-y-2">
                <Link href="/about" className="block text-sm text-muted-foreground hover:text-gc-dark transition-colors">
                  About Us
                </Link>
                <Link href="/help" className="block text-sm text-muted-foreground hover:text-gc-dark transition-colors">
                  Help Center
                </Link>
                <Link href="/pro" className="block text-sm text-muted-foreground hover:text-gc-dark transition-colors">
                  Go Pro
                </Link>
                <Link href="/contact" className="block text-sm text-muted-foreground hover:text-gc-dark transition-colors">
                  Contact
                </Link>
              </div>
            </div>

            {/* Social */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gc-dark">Follow Us</h3>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/growcommon/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gc-light/10 rounded-lg text-muted-foreground hover:text-gc-dark hover:bg-gc-light/20 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281H7.721c-.49 0-.875.385-.875.875s.385.875.875.875h8.558c.49 0 .875-.385.875-.875s-.385-.875-.875-.875zm0 3.5H7.721c-.49 0-.875.385-.875.875s.385.875.875.875h8.558c.49 0 .875-.385.875-.875s-.385-.875-.875-.875z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/growcommon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gc-light/10 rounded-lg text-muted-foreground hover:text-gc-dark hover:bg-gc-light/20 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gc-light/20 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Â© 2025 GrowCommon. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-gc-dark transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-gc-dark transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

