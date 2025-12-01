import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { auth, storage } from '../firebase';
import { signOut, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './SettingsNext.css';

// TypeScript Interfaces
interface UserProfile {
  displayName: string;
  email: string;
  bio: string;
  photoURL: string;
  plantingZone: string;
  preferredUnits: 'imperial' | 'metric';
  weatherAlerts: 'daily' | 'severe' | 'none';
}

interface NotificationSettings {
  pestAlerts: boolean;
  frostWarnings: boolean;
  harvestReminders: boolean;
  deliveryMethod: 'email' | 'sms' | 'in-app';
}

interface SubscriptionInfo {
  plan: 'free' | 'premium';
  status: 'active' | 'inactive' | 'cancelled';
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  newEmail: string;
  passwordChangeRequested: boolean;
}

interface TabConfig {
  id: string;
  label: string;
  icon: string;
}

const SettingsNext: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  // Profile state
  const [profile, setProfile] = useState<UserProfile>({
    displayName: currentUser?.displayName || '',
    email: currentUser?.email || '',
    bio: '',
    photoURL: currentUser?.photoURL || '',
    plantingZone: '7a',
    preferredUnits: 'imperial',
    weatherAlerts: 'daily'
  });
  
  // Notifications state
  const [notifications, setNotifications] = useState<NotificationSettings>({
    pestAlerts: true,
    frostWarnings: true,
    harvestReminders: true,
    deliveryMethod: 'email'
  });
  
  // Subscription state
  const [subscription, setSubscription] = useState<SubscriptionInfo>({
    plan: 'free',
    status: 'active'
  });
  
  // Security state
  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    newEmail: '',
    passwordChangeRequested: false
  });

  // USDA Planting Zones
  const plantingZones: string[] = [
    '1a', '1b', '2a', '2b', '3a', '3b', '4a', '4b', '5a', '5b',
    '6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b', '10a', '10b',
    '11a', '11b', '12a', '12b', '13a', '13b'
  ];

  // Tab configuration
  const tabs: TabConfig[] = [
    { id: 'profile', label: 'ðŸ‘¤ Profile', icon: 'ðŸ‘¤' },
    { id: 'preferences', label: 'âš™ï¸ Preferences', icon: 'âš™ï¸' },
    { id: 'notifications', label: 'ðŸ”” Notifications', icon: 'ðŸ””' },
    { id: 'subscription', label: 'ðŸ’Ž Subscription', icon: 'ðŸ’Ž' },
    { id: 'security', label: 'ðŸ”’ Security', icon: 'ðŸ”’' }
  ];

  // Handle profile updates
  const handleProfileUpdate = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: profile.displayName,
          photoURL: profile.photoURL
        });
        setMessage('Profile updated successfully!');
      }
    } catch (err: any) {
      setError('Failed to update profile: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle photo upload
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (!file || !currentUser) return;

    setLoading(true);
    try {
      const storageRef = ref(storage, `profile-photos/${currentUser.uid}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      
      setProfile(prev => ({ ...prev, photoURL: downloadURL }));
      setMessage('Photo uploaded successfully!');
    } catch (err: any) {
      setError('Failed to upload photo: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset
  const handlePasswordReset = async (): Promise<void> => {
    if (!currentUser?.email) return;
    
    try {
      await sendPasswordResetEmail(auth, currentUser.email);
      setMessage('Password reset email sent!');
    } catch (err: any) {
      setError('Failed to send password reset email: ' + err.message);
    }
  };

  // Handle logout
  const handleLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error: any) {
      setError('Logout failed: ' + error.message);
    }
  };

  // Handle tab change
  const handleTabChange = (tabId: string): void => {
    setActiveTab(tabId);
    setMessage('');
    setError('');
  };

  // Handle notification toggle
  const handleNotificationToggle = (key: keyof NotificationSettings): void => {
    if (key === 'deliveryMethod') return; // Handle separately
    
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Handle delivery method change
  const handleDeliveryMethodChange = (method: 'email' | 'sms' | 'in-app'): void => {
    setNotifications(prev => ({
      ...prev,
      deliveryMethod: method
    }));
  };

  // Handle preference change
  const handlePreferenceChange = (key: keyof UserProfile, value: string): void => {
    setProfile(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Handle security toggle
  const handleSecurityToggle = (key: keyof SecuritySettings, value: boolean | string): void => {
    setSecurity(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="settings-next-container">
      <Navbar />
      
      {/* Animated Garden Background */}
      <div className="garden-background">
        <div className="gradient-overlay"></div>
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`particle particle-${i + 1}`}></div>
          ))}
        </div>
        <div className="garden-elements">
          <div className="leaf leaf-1"></div>
          <div className="leaf leaf-2"></div>
          <div className="leaf leaf-3"></div>
          <div className="leaf leaf-4"></div>
          <div className="leaf leaf-5"></div>
        </div>
      </div>

      <div className="settings-content">
        <div className="settings-header">
          <h1 className="settings-title">âš™ï¸ Settings & Profile</h1>
          <p className="settings-subtitle">Customize your Grow Common experience</p>
        </div>

        <div className="settings-layout">
          {/* Sidebar Navigation */}
          <div className="settings-sidebar">
            <nav className="sidebar-nav" role="tablist">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`sidebar-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => handleTabChange(tab.id)}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-label">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content Panel */}
          <div className="settings-main">
            {message && (
              <div className="alert alert-success" role="alert">
                âœ… {message}
              </div>
            )}
            {error && (
              <div className="alert alert-error" role="alert">
                âŒ {error}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="settings-panel" id="panel-profile" role="tabpanel">
                <h2 className="panel-title">ðŸ‘¤ Profile Settings</h2>
                <form onSubmit={handleProfileUpdate} className="profile-form">
                  <div className="profile-section">
                    <div className="avatar-section">
                      <div className="avatar-container">
                        <img 
                          src={profile.photoURL || '/default-avatar.png'} 
                          alt="Profile" 
                          className="profile-avatar"
                        />
                        <div className="avatar-overlay">
                          <label htmlFor="photo-upload" className="upload-label">
                            ðŸ“·
                          </label>
                          <input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                        </div>
                      </div>
                      <p className="avatar-help">Click to change photo</p>
                    </div>

                    <div className="form-group">
                      <label htmlFor="displayName" className="form-label">
                        Display Name
                      </label>
                      <input
                        id="displayName"
                        type="text"
                        value={profile.displayName}
                        onChange={(e) => handlePreferenceChange('displayName', e.target.value)}
                        className="form-input"
                        placeholder="Enter your display name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="bio" className="form-label">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => handlePreferenceChange('bio', e.target.value)}
                        className="form-textarea"
                        placeholder="Tell us about your gardening journey..."
                        rows={4}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input
                        type="email"
                        value={currentUser?.email || ''}
                        className="form-input disabled"
                        disabled
                      />
                      <small className="form-help">Email cannot be changed</small>
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? 'â³ Updating...' : 'ðŸ’¾ Save Changes'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="settings-panel" id="panel-preferences" role="tabpanel">
                <h2 className="panel-title">âš™ï¸ Preferences</h2>
                <div className="preferences-form">
                  <div className="form-group">
                    <label htmlFor="plantingZone" className="form-label">
                      USDA Planting Zone
                    </label>
                    <select
                      id="plantingZone"
                      value={profile.plantingZone}
                      onChange={(e) => handlePreferenceChange('plantingZone', e.target.value)}
                      className="form-select"
                    >
                      {plantingZones.map(zone => (
                        <option key={zone} value={zone}>Zone {zone}</option>
                      ))}
                    </select>
                    <small className="form-help">Used for plant recommendations and frost dates</small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="preferredUnits" className="form-label">
                      Preferred Units
                    </label>
                    <select
                      id="preferredUnits"
                      value={profile.preferredUnits}
                      onChange={(e) => handlePreferenceChange('preferredUnits', e.target.value)}
                      className="form-select"
                    >
                      <option value="imperial">Imperial (Â°F, inches)</option>
                      <option value="metric">Metric (Â°C, mm)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="weatherAlerts" className="form-label">
                      Weather Alerts
                    </label>
                    <select
                      id="weatherAlerts"
                      value={profile.weatherAlerts}
                      onChange={(e) => handlePreferenceChange('weatherAlerts', e.target.value)}
                      className="form-select"
                    >
                      <option value="daily">Daily forecasts</option>
                      <option value="severe">Severe weather only</option>
                      <option value="none">No weather alerts</option>
                    </select>
                  </div>

                  <button className="btn btn-primary">
                    ðŸ’¾ Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="settings-panel" id="panel-notifications" role="tabpanel">
                <h2 className="panel-title">ðŸ”” Notification Settings</h2>
                <div className="notifications-form">
                  <div className="notification-group">
                    <h3 className="group-title">Alert Types</h3>
                    
                    <div className="toggle-item">
                      <div className="toggle-info">
                        <label className="toggle-label">Pest Alerts</label>
                        <small className="toggle-description">Get notified about pest outbreaks in your area</small>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={notifications.pestAlerts}
                          onChange={() => handleNotificationToggle('pestAlerts')}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="toggle-item">
                      <div className="toggle-info">
                        <label className="toggle-label">Frost Warnings</label>
                        <small className="toggle-description">Early warnings for frost conditions</small>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={notifications.frostWarnings}
                          onChange={() => handleNotificationToggle('frostWarnings')}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>

                    <div className="toggle-item">
                      <div className="toggle-info">
                        <label className="toggle-label">Harvest Reminders</label>
                        <small className="toggle-description">Reminders when your plants are ready to harvest</small>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={notifications.harvestReminders}
                          onChange={() => handleNotificationToggle('harvestReminders')}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="deliveryMethod" className="form-label">
                      Delivery Method
                    </label>
                    <select
                      id="deliveryMethod"
                      value={notifications.deliveryMethod}
                      onChange={(e) => handleDeliveryMethodChange(e.target.value as 'email' | 'sms' | 'in-app')}
                      className="form-select"
                    >
                      <option value="email">ðŸ“§ Email</option>
                      <option value="sms">ðŸ“± SMS</option>
                      <option value="in-app">ðŸ”” In-app only</option>
                    </select>
                  </div>

                  <button className="btn btn-primary">
                    ðŸ’¾ Save Notification Settings
                  </button>
                </div>
              </div>
            )}

            {/* Subscription Tab */}
            {activeTab === 'subscription' && (
              <div className="settings-panel" id="panel-subscription" role="tabpanel">
                <h2 className="panel-title">ðŸ’Ž Subscription</h2>
                <div className="subscription-content">
                  <div className="subscription-card">
                    <div className="subscription-header">
                      <h3 className="plan-name">
                        {subscription.plan === 'free' ? 'ðŸŒ± Free Plan' : 'ðŸ’Ž Premium Plan'}
                      </h3>
                      <div className={`plan-badge ${subscription.plan}`}>
                        {subscription.plan === 'free' ? 'Free' : 'Premium'}
                      </div>
                    </div>

                    <div className="plan-features">
                      {subscription.plan === 'free' ? (
                        <>
                          <div className="feature">âœ… Basic plant database</div>
                          <div className="feature">âœ… Weather forecasts</div>
                          <div className="feature">âœ… Basic pest alerts</div>
                          <div className="feature">âŒ Advanced analytics</div>
                          <div className="feature">âŒ Premium plant varieties</div>
                          <div className="feature">âŒ Priority support</div>
                        </>
                      ) : (
                        <>
                          <div className="feature">âœ… Complete plant database</div>
                          <div className="feature">âœ… Advanced weather analytics</div>
                          <div className="feature">âœ… Real-time pest monitoring</div>
                          <div className="feature">âœ… Advanced garden analytics</div>
                          <div className="feature">âœ… Premium plant varieties</div>
                          <div className="feature">âœ… Priority support</div>
                        </>
                      )}
                    </div>

                    <div className="subscription-actions">
                      {subscription.plan === 'free' ? (
                        <button className="btn btn-premium">
                          ðŸš€ Upgrade to Premium - $9.99/month
                        </button>
                      ) : (
                        <button className="btn btn-secondary">
                          ðŸ“Š Manage Subscription
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="settings-panel" id="panel-security" role="tabpanel">
                <h2 className="panel-title">ðŸ”’ Account Security</h2>
                <div className="security-content">
                  <div className="security-warning">
                    <div className="warning-icon">âš ï¸</div>
                    <div className="warning-text">
                      <strong>Security Notice:</strong> Changes to your account security settings will require email verification.
                    </div>
                  </div>

                  <div className="security-section">
                    <h3 className="section-title">Password</h3>
                    <div className="security-item">
                      <div className="security-info">
                        <label className="security-label">Change Password</label>
                        <small className="security-description">Last changed: Never</small>
                      </div>
                      <button 
                        onClick={handlePasswordReset}
                        className="btn btn-secondary"
                      >
                        ðŸ”‘ Reset Password
                      </button>
                    </div>
                  </div>

                  <div className="security-section">
                    <h3 className="section-title">Two-Factor Authentication</h3>
                    <div className="security-item">
                      <div className="security-info">
                        <label className="security-label">2FA Status</label>
                        <small className="security-description">
                          {security.twoFactorEnabled ? 'Enabled' : 'Disabled'} - Add an extra layer of security
                        </small>
                      </div>
                      <label className="toggle-switch">
                        <input
                          type="checkbox"
                          checked={security.twoFactorEnabled}
                          onChange={(e) => handleSecurityToggle('twoFactorEnabled', e.target.checked)}
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                  </div>

                  <div className="security-section">
                    <h3 className="section-title">Account Actions</h3>
                    <div className="security-actions">
                      <button className="btn btn-secondary">
                        ðŸ“± Manage Devices
                      </button>
                      <button className="btn btn-danger" onClick={handleLogout}>
                        ðŸšª Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SettingsNext;

