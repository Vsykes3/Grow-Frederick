'use client';

import React, { useState } from 'react';
import { useI18n } from '/src/hooks/useI18n';
import { useTheme } from '/src/hooks/useTheme';
import { LanguageSelector } from '/src/components/ui/LanguageSelector';
import { ThemeSelector } from '/src/components/ui/ThemeSelector';
import { Button } from '@/components/ui/button';
import { ProBadge } from '/src/components/ui/ProBadge';

export default function SettingsPage() {
  const { t, mounted } = useI18n();
  const { theme, resolvedTheme, changeTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'general' | 'appearance' | 'notifications' | 'account'>('general');

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-gc-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'general', label: 'General', icon: 'âš™ï¸' },
    { id: 'appearance', label: 'Appearance', icon: 'ðŸŽ¨' },
    { id: 'notifications', label: 'Notifications', icon: 'ðŸ””' },
    { id: 'account', label: 'Account', icon: 'ðŸ‘¤' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass border-b border-gc-light/20">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gc-dark">
            {t('settings.title')}
          </h1>
          <p className="text-muted-foreground mt-2">
            Customize your GrowCommon experience
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-gc-accent text-white'
                        : 'text-muted-foreground hover:text-gc-dark hover:bg-gc-light/10'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="glass rounded-2xl p-8">
              {activeTab === 'general' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gc-dark mb-6">General Settings</h2>
                    
                    <div className="space-y-6">
                      <LanguageSelector />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gc-dark">Units</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gc-dark mb-2">
                              Temperature
                            </label>
                            <select className="w-full px-3 py-2 border border-gc-light/30 rounded-lg bg-background text-gc-dark focus:outline-none focus:ring-2 focus:ring-gc-accent">
                              <option value="fahrenheit">Fahrenheit (Â°F)</option>
                              <option value="celsius">Celsius (Â°C)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gc-dark mb-2">
                              Distance
                            </label>
                            <select className="w-full px-3 py-2 border border-gc-light/30 rounded-lg bg-background text-gc-dark focus:outline-none focus:ring-2 focus:ring-gc-accent">
                              <option value="imperial">Imperial (inches, feet)</option>
                              <option value="metric">Metric (cm, meters)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gc-dark">Location</h3>
                        <div>
                          <label className="block text-sm font-medium text-gc-dark mb-2">
                            Default Location
                          </label>
                          <input
                            type="text"
                            placeholder="Frederick, MD"
                            className="w-full px-3 py-2 border border-gc-light/30 rounded-lg bg-background text-gc-dark focus:outline-none focus:ring-2 focus:ring-gc-accent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gc-dark mb-6">Appearance</h2>
                    
                    <div className="space-y-6">
                      <ThemeSelector />
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gc-dark">Current Theme</h3>
                        <div className="p-4 bg-gc-light/10 rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            You are currently using <strong>{theme}</strong> theme
                            {theme === 'system' && ` (resolved to ${resolvedTheme})`}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gc-dark">Accessibility</h3>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm text-muted-foreground">High contrast mode</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm text-muted-foreground">Reduce motion</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm text-muted-foreground">Focus indicators</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gc-dark mb-6">Notifications</h2>
                    
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gc-dark">Weather Alerts</h3>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm text-muted-foreground">Frost warnings</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm text-muted-foreground">Heat wave alerts</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm text-muted-foreground">Rainfall predictions</span>
                            <ProBadge size="sm" />
                          </label>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gc-dark">Garden Reminders</h3>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm text-muted-foreground">Planting reminders</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm text-muted-foreground">Harvest alerts</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm text-muted-foreground">Pest monitoring</span>
                            <ProBadge size="sm" />
                          </label>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gc-dark">Notification Methods</h3>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm text-muted-foreground">In-app notifications</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" defaultChecked className="rounded" />
                            <span className="text-sm text-muted-foreground">Email notifications</span>
                          </label>
                          <label className="flex items-center gap-3">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm text-muted-foreground">SMS alerts</span>
                            <ProBadge size="sm" />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'account' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gc-dark mb-6">Account</h2>
                    
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gc-dark">Profile</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gc-dark mb-2">
                              Display Name
                            </label>
                            <input
                              type="text"
                              placeholder="Your name"
                              className="w-full px-3 py-2 border border-gc-light/30 rounded-lg bg-background text-gc-dark focus:outline-none focus:ring-2 focus:ring-gc-accent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gc-dark mb-2">
                              Email
                            </label>
                            <input
                              type="email"
                              placeholder="your@email.com"
                              className="w-full px-3 py-2 border border-gc-light/30 rounded-lg bg-background text-gc-dark focus:outline-none focus:ring-2 focus:ring-gc-accent"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gc-dark">Subscription</h3>
                        <div className="p-4 bg-gc-light/10 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gc-dark">Free Plan</p>
                              <p className="text-sm text-muted-foreground">Basic features included</p>
                            </div>
                            <Button>
                              <ProBadge size="sm" className="mr-2" />
                              Upgrade to Pro
                            </Button>
                          </div>

                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gc-dark">Data & Privacy</h3>
                        <div className="space-y-3">
                          <Button variant="outline" className="w-full justify-start">
                            Export My Data
                          </Button>
                          <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="pt-6 border-t border-gc-light/20">
                <div className="flex justify-end gap-3">
                  <Button variant="outline">
                    {t('common.cancel')}
                  </Button>
                  <Button>
                    {t('common.save')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


