'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { signOut as firebaseSignOut } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Settings, Bell, User, Download, Trash2, Upload } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

export default function SettingsPage() {
  const { user: firebaseUser, loading: firebaseLoading } = useFirebaseAuth();
  const { user: contextUser, updateUser } = useUser(); // Get context user and update function
  const [activeTab, setActiveTab] = useState<'notifications' | 'account'>('notifications');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [temperatureUnit] = useState<'fahrenheit'>('fahrenheit');
  const [distanceUnit] = useState<'imperial'>('imperial');
  const [notifications, setNotifications] = useState({
    frostWarnings: true,
    heatWaveAlerts: true,
    plantingReminders: true,
    harvestAlerts: true,
    inApp: true,
    email: true
  });
  
  // Remove unused notification options
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  useEffect(() => {
    // Priority: Context user > Firebase user > localStorage
    if (contextUser) {
      setDisplayName(contextUser.displayName || '');
      setPhotoPreview(contextUser.profilePicture || null);
    } else if (firebaseUser) {
      setDisplayName(firebaseUser.displayName || '');
      setEmail(firebaseUser.email || '');
      setPhotoPreview(firebaseUser.photoURL || null);
    }
    
    // Load saved display name and photo from localStorage as fallback
    const savedName = localStorage.getItem('userDisplayName');
    const savedPhoto = localStorage.getItem('userPhoto');
    if (savedName && !contextUser?.displayName) setDisplayName(savedName);
    if (savedPhoto && !contextUser?.profilePicture) setPhotoPreview(savedPhoto);
    
    // Load saved notification preferences from localStorage
    const savedNotifications = localStorage.getItem('notificationSettings');
    if (savedNotifications) {
      try {
        setNotifications(JSON.parse(savedNotifications));
      } catch (e) {
        console.error('Error loading notification settings:', e);
      }
    }
  }, [firebaseUser]);

  const handlePhotoChange = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Image must be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoData = reader.result as string;
        setPhotoPreview(photoData);
        // Save to localStorage immediately
        localStorage.setItem('userPhoto', photoData);
        // Trigger event to update navbar
        window.dispatchEvent(new Event('userDataUpdated'));
        alert('Photo updated! Click "Save Changes" to confirm.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem('notificationSettings', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSave = () => {
    localStorage.setItem('temperatureUnit', temperatureUnit);
    localStorage.setItem('distanceUnit', distanceUnit);
    localStorage.setItem('notificationSettings', JSON.stringify(notifications));
    
    // Update user context - this IMMEDIATELY updates the navbar!
    updateUser({
      displayName: displayName || '',
      profilePicture: photoPreview || null
    });
    
    alert('Settings saved successfully!');
  };

  const handleExportData = () => {
    const data = {
      displayName,
      email,
      preferences: {
        temperatureUnit,
        distanceUnit
      },
      notifications,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `growcommon-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('Data exported successfully!');
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      if (confirm('This will permanently delete all your data. Are you absolutely sure?')) {
        // Clear all localStorage data
        localStorage.removeItem('userDisplayName');
        localStorage.removeItem('userPhoto');
        localStorage.removeItem('temperatureUnit');
        localStorage.removeItem('distanceUnit');
        localStorage.removeItem('notificationSettings');
        localStorage.removeItem('myGardens');
        localStorage.removeItem('calendarEvents');
        
        // Clear session storage
        sessionStorage.clear();
        
        // Sign out if logged in
        if (firebaseUser) {
          firebaseSignOut();
        }
        
        // Redirect to home page
        window.location.href = '/';
        alert('Account deleted successfully. All your data has been removed.');
      }
    }
  };

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'account', label: 'Account', icon: User },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">
            Settings
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
            <div className="bg-card rounded-2xl p-6 border border-border">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-2xl p-8 border border-border">

              {activeTab === 'notifications' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-6">Notifications</h2>
                    
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Weather Alerts</h3>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={notifications.frostWarnings}
                              onChange={() => handleNotificationChange('frostWarnings')}
                              className="rounded w-5 h-5" 
                            />
                            <span className="text-sm text-foreground">Frost warnings</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={notifications.heatWaveAlerts}
                              onChange={() => handleNotificationChange('heatWaveAlerts')}
                              className="rounded w-5 h-5" 
                            />
                            <span className="text-sm text-foreground">Heat wave alerts</span>
                          </label>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Garden Reminders</h3>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={notifications.plantingReminders}
                              onChange={() => handleNotificationChange('plantingReminders')}
                              className="rounded w-5 h-5" 
                            />
                            <span className="text-sm text-foreground">Planting reminders</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={notifications.harvestAlerts}
                              onChange={() => handleNotificationChange('harvestAlerts')}
                              className="rounded w-5 h-5" 
                            />
                            <span className="text-sm text-foreground">Harvest alerts</span>
                          </label>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Notification Methods</h3>
                        <div className="space-y-3">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={notifications.inApp}
                              onChange={() => handleNotificationChange('inApp')}
                              className="rounded w-5 h-5" 
                            />
                            <span className="text-sm text-foreground">In-app notifications</span>
                          </label>
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={notifications.email}
                              onChange={() => handleNotificationChange('email')}
                              className="rounded w-5 h-5" 
                            />
                            <span className="text-sm text-foreground">Email notifications</span>
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
                    <h2 className="text-2xl font-bold text-foreground mb-6">Account</h2>
                    
                    <div className="space-y-6">
                      {/* Profile Picture Section */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Profile Picture</h3>
                        <div className="flex items-center space-x-4">
                          {photoPreview ? (
                            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary">
                              <Image
                                src={photoPreview}
                                alt={displayName || 'User'}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-semibold border-2 border-primary">
                              {displayName?.[0]?.toUpperCase() || email?.[0]?.toUpperCase() || 'U'}
                            </div>
                          )}
                          <div>
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleFileSelect}
                              accept="image/*"
                              className="hidden"
                            />
                            <Button variant="outline" size="sm" onClick={handlePhotoChange}>
                              <Upload className="h-4 w-4 mr-2" />
                              Change Photo
                            </Button>
                            <p className="text-xs text-muted-foreground mt-1">
                              Click to upload a new profile picture (max 5MB)
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Profile Information</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Display Name
                            </label>
                            <input
                              type="text"
                              value={displayName}
                              onChange={(e) => setDisplayName(e.target.value)}
                              placeholder="Your name"
                              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Email
                            </label>
                            <input
                              type="email"
                              value={email}
                              disabled
                              placeholder="your@email.com"
                              className="w-full px-3 py-2 border border-border rounded-lg bg-muted text-muted-foreground cursor-not-allowed"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                              Email cannot be changed
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Subscription</h3>
                        <div className="p-4 bg-muted rounded-lg border border-border">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-foreground">Free Plan</p>
                              <p className="text-sm text-muted-foreground">Basic features included</p>
                            </div>
                            <Link href="/pricing">
                              <Button>
                                Upgrade to Pro
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground">Data & Privacy</h3>
                        <div className="space-y-3">
                          <Button 
                            variant="outline" 
                            className="w-full justify-start"
                            onClick={handleExportData}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Export My Data
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={handleDeleteAccount}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Account
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="pt-6 border-t border-border mt-8">
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => window.location.reload()}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    Save Changes
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
