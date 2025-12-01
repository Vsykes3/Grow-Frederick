import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Bell, Shield, CreditCard, LogOut, Edit3, Save } from 'lucide-react';
import { Button } from '/src/components/ui/Button';
import { ProBadge } from '/src/components/ui/ProBadge';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'billing' | 'notifications'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Demo User',
    email: 'demo@growcommon.com',
    location: 'Frederick, MD',
    plan: 'free' as 'free' | 'pro',
    joinDate: '2024-01-15'
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save the profile data
  };

  const renderProfile = () => (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gc-dark">Profile Information</h2>
        <Button
          variant="outline"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-soft p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-20 h-20 bg-gc-accent rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {profile.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gc-dark">{profile.name}</h3>
            <p className="text-muted-foreground">{profile.email}</p>
            <div className="flex items-center gap-2 mt-2">
              {profile.plan === 'pro' ? (
                <ProBadge size="sm" />
              ) : (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                  Free Plan
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gc-dark mb-2">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gc-accent disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gc-dark mb-2">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gc-accent disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gc-dark mb-2">Location</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gc-accent disabled:bg-gray-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gc-dark mb-2">Member Since</label>
            <input
              type="text"
              value={new Date(profile.joinDate).toLocaleDateString()}
              disabled
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderPreferences = () => (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-semibold text-gc-dark">Preferences</h2>

      <div className="bg-white rounded-2xl shadow-soft p-6">
        <h3 className="text-lg font-semibold text-gc-dark mb-4">Theme Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gc-dark">Dark Mode</h4>
              <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gc-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gc-accent"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-soft p-6">
        <h3 className="text-lg font-semibold text-gc-dark mb-4">Units</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gc-dark mb-2">Temperature</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gc-accent">
              <option value="fahrenheit">Fahrenheit (°F)</option>
              <option value="celsius">Celsius (°C)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gc-dark mb-2">Distance</label>
            <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gc-accent">
              <option value="imperial">Imperial (inches, feet)</option>
              <option value="metric">Metric (cm, meters)</option>
            </select>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderBilling = () => (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-semibold text-gc-dark">Billing & Subscription</h2>

      <div className="bg-white rounded-2xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gc-dark">Current Plan</h3>
          {profile.plan === 'pro' ? (
            <ProBadge size="sm" />
          ) : (
            <Button size="sm">Upgrade to Pro</Button>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gc-cream rounded-lg">
            <div>
              <h4 className="font-medium text-gc-dark">
                {profile.plan === 'pro' ? 'Pro Plan' : 'Free Plan'}
              </h4>
              <p className="text-sm text-muted-foreground">
                {profile.plan === 'pro' ? '$9.99/month' : 'Free forever'}
              </p>
            </div>
            <span className="text-sm text-muted-foreground">
              {profile.plan === 'pro' ? 'Active' : 'Limited features'}
            </span>
          </div>
        </div>
      </div>

      {profile.plan === 'pro' && (
        <div className="bg-white rounded-2xl shadow-soft p-6">
          <h3 className="text-lg font-semibold text-gc-dark mb-4">Payment Method</h3>
          <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg">
            <CreditCard className="w-5 h-5 text-muted-foreground" />
            <span className="text-gc-dark">•••• •••• •••• 1234</span>
            <Button variant="outline" size="sm" className="ml-auto">
              Update
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );

  const renderNotifications = () => (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-semibold text-gc-dark">Notification Settings</h2>

      <div className="bg-white rounded-2xl shadow-soft p-6">
        <h3 className="text-lg font-semibold text-gc-dark mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {[
            { id: 'weather', label: 'Weather Alerts', description: 'Frost warnings and severe weather' },
            { id: 'planting', label: 'Planting Reminders', description: 'When to plant and harvest' },
            { id: 'pests', label: 'Pest Alerts', description: 'Local pest and disease reports' },
            { id: 'tips', label: 'Gardening Tips', description: 'Weekly tips and advice' }
          ].map((notification) => (
            <div key={notification.id} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gc-dark">{notification.label}</h4>
                <p className="text-sm text-muted-foreground">{notification.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gc-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gc-accent"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gc-light/10 to-gc-accent/10">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gc-dark mb-4">Account Settings</h1>
          <p className="text-xl text-muted-foreground">
            Manage your profile, preferences, and subscription
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-soft p-4">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${
                          activeTab === tab.id
                            ? 'bg-gc-accent text-white'
                            : 'text-muted-foreground hover:bg-gc-light/10'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {activeTab === 'profile' && renderProfile()}
              {activeTab === 'preferences' && renderPreferences()}
              {activeTab === 'billing' && renderBilling()}
              {activeTab === 'notifications' && renderNotifications()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}