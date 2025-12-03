import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { auth, db } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import Navbar from '@/components/ui/Navbar';
import Footer from '../components/Footer';
import './Settings.css';

const Settings = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weather: true,
    reminders: true
  });
  const [privacy, setPrivacy] = useState({
    profile: 'public',
    garden: 'private',
    location: false
  });
  const [exportFormat, setExportFormat] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  // Handle theme change
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Handle notification settings
  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Handle privacy settings
  const handlePrivacyChange = (type, value) => {
    setPrivacy(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // Export user data
  const handleDataExport = async () => {
    setIsExporting(true);
    try {
      // Simulate data export
      const userData = {
        profile: {
          name: currentUser?.displayName || 'User',
          email: currentUser?.email || '',
          joinDate: currentUser?.metadata?.creationTime || new Date().toISOString()
        },
        settings: {
          theme,
          notifications,
          privacy
        },
        garden: {
          plants: [], // This would come from your garden data
          notes: [],
          calendar: []
        },
        exportDate: new Date().toISOString()
      };

      const dataStr = JSON.stringify(userData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `grow-common-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="settings-container">
      <Navbar />
      
      {/* Animated Forest Background */}
      <div className="animated-background">
        <div className="forest-layer layer-1">
          <div className="tree tree-1"></div>
          <div className="tree tree-2"></div>
          <div className="tree tree-3"></div>
          <div className="tree tree-4"></div>
          <div className="tree tree-5"></div>
        </div>
        <div className="forest-layer layer-2">
          <div className="tree tree-6"></div>
          <div className="tree tree-7"></div>
          <div className="tree tree-8"></div>
          <div className="tree tree-9"></div>
          <div className="tree tree-10"></div>
        </div>
        <div className="forest-layer layer-3">
          <div className="tree tree-11"></div>
          <div className="tree tree-12"></div>
          <div className="tree tree-13"></div>
          <div className="tree tree-14"></div>
          <div className="tree tree-15"></div>
        </div>
        <div className="floating-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
          <div className="particle particle-6"></div>
        </div>
      </div>

      <div className="settings-content">
        <div className="settings-header">
          <h1>âš™ï¸ Settings</h1>
          <p>Customize your Grow Common experience</p>
        </div>

        <div className="settings-layout">
          {/* Settings Sidebar */}
          <div className="settings-sidebar">
            <div className="sidebar-section">
              <h3>Account</h3>
              <button 
                className={`sidebar-btn ${activeTab === 'account' ? 'active' : ''}`}
                onClick={() => setActiveTab('account')}
              >
                ðŸ‘¤ Profile Settings
              </button>
              <button 
                className={`sidebar-btn ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                ðŸ”’ Security
              </button>
            </div>

            <div className="sidebar-section">
              <h3>Preferences</h3>
              <button 
                className={`sidebar-btn ${activeTab === 'appearance' ? 'active' : ''}`}
                onClick={() => setActiveTab('appearance')}
              >
                ðŸŽ¨ Appearance
              </button>
              <button 
                className={`sidebar-btn ${activeTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('notifications')}
              >
                ðŸ”” Notifications
              </button>
            </div>

            <div className="sidebar-section">
              <h3>Data & Privacy</h3>
              <button 
                className={`sidebar-btn ${activeTab === 'privacy' ? 'active' : ''}`}
                onClick={() => setActiveTab('privacy')}
              >
                ðŸ›¡ï¸ Privacy
              </button>
              <button 
                className={`sidebar-btn ${activeTab === 'data' ? 'active' : ''}`}
                onClick={() => setActiveTab('data')}
              >
                ðŸ“Š Data Management
              </button>
            </div>

            <div className="sidebar-section">
              <h3>Support</h3>
              <button 
                className={`sidebar-btn ${activeTab === 'help' ? 'active' : ''}`}
                onClick={() => setActiveTab('help')}
              >
                â“ Help & Support
              </button>
              <button 
                className={`sidebar-btn ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => setActiveTab('about')}
              >
                â„¹ï¸ About
              </button>
            </div>
          </div>

          {/* Settings Main Content */}
          <div className="settings-main">
            {activeTab === 'account' && (
              <div className="settings-panel">
                <h2>ðŸ‘¤ Profile Settings</h2>
                <div className="settings-group">
                  <div className="setting-item">
                    <label>Display Name</label>
                    <input 
                      type="text" 
                      defaultValue={currentUser?.displayName || ''}
                      placeholder="Enter your display name"
                    />
                  </div>
                  <div className="setting-item">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      value={currentUser?.email || ''}
                      disabled
                    />
                    <small>Email cannot be changed</small>
                  </div>
                  <div className="setting-item">
                    <label>Profile Picture</label>
                    <div className="profile-picture-upload">
                      <div className="current-avatar">
                        <img 
                          src={currentUser?.photoURL || '/default-avatar.png'} 
                          alt="Profile"
                        />
                      </div>
                      <button className="upload-btn">ðŸ“· Change Photo</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="settings-panel">
                <h2>ðŸ”’ Security Settings</h2>
                <div className="settings-group">
                  <div className="setting-item">
                    <label>Change Password</label>
                    <button className="action-btn">ðŸ”‘ Change Password</button>
                    <small>We'll send you a secure link to reset your password</small>
                  </div>
                  <div className="setting-item">
                    <label>Two-Factor Authentication</label>
                    <div className="toggle-container">
                      <label className="toggle">
                        <input type="checkbox" />
                        <span className="slider"></span>
                      </label>
                      <span>Enable 2FA for extra security</span>
                    </div>
                  </div>
                  <div className="setting-item">
                    <label>Login Sessions</label>
                    <button className="action-btn">ðŸ“± Manage Sessions</button>
                    <small>View and manage your active login sessions</small>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="settings-panel">
                <h2>ðŸŽ¨ Appearance Settings</h2>
                <div className="settings-group">
                  <div className="setting-item">
                    <label>Theme</label>
                    <div className="theme-selector">
                      <button 
                        className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                        onClick={() => handleThemeChange('light')}
                      >
                        â˜€ï¸ Light Mode
                      </button>
                      <button 
                        className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                        onClick={() => handleThemeChange('dark')}
                      >
                        ðŸŒ™ Dark Mode
                      </button>
                      <button 
                        className={`theme-btn ${theme === 'auto' ? 'active' : ''}`}
                        onClick={() => handleThemeChange('auto')}
                      >
                        ðŸ”„ Auto
                      </button>
                    </div>
                  </div>
                  <div className="setting-item">
                    <label>Language</label>
                    <select className="select-input">
                      <option value="en">English</option>
                      <option value="es">EspaÃ±ol</option>
                      <option value="fr">FranÃ§ais</option>
                    </select>
                  </div>
                  <div className="setting-item">
                    <label>Font Size</label>
                    <div className="font-size-selector">
                      <button className="font-btn">A</button>
                      <button className="font-btn active">A</button>
                      <button className="font-btn">A</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="settings-panel">
                <h2>ðŸ”” Notification Settings</h2>
                <div className="settings-group">
                  <div className="setting-item">
                    <label>Email Notifications</label>
                    <div className="toggle-container">
                      <label className="toggle">
                        <input 
                          type="checkbox" 
                          checked={notifications.email}
                          onChange={() => handleNotificationChange('email')}
                        />
                        <span className="slider"></span>
                      </label>
                      <span>Receive email updates</span>
                    </div>
                  </div>
                  <div className="setting-item">
                    <label>Push Notifications</label>
                    <div className="toggle-container">
                      <label className="toggle">
                        <input 
                          type="checkbox" 
                          checked={notifications.push}
                          onChange={() => handleNotificationChange('push')}
                        />
                        <span className="slider"></span>
                      </label>
                      <span>Browser push notifications</span>
                    </div>
                  </div>
                  <div className="setting-item">
                    <label>Weather Alerts</label>
                    <div className="toggle-container">
                      <label className="toggle">
                        <input 
                          type="checkbox" 
                          checked={notifications.weather}
                          onChange={() => handleNotificationChange('weather')}
                        />
                        <span className="slider"></span>
                      </label>
                      <span>Weather and growing alerts</span>
                    </div>
                  </div>
                  <div className="setting-item">
                    <label>Garden Reminders</label>
                    <div className="toggle-container">
                      <label className="toggle">
                        <input 
                          type="checkbox" 
                          checked={notifications.reminders}
                          onChange={() => handleNotificationChange('reminders')}
                        />
                        <span className="slider"></span>
                      </label>
                      <span>Planting and care reminders</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div className="settings-panel">
                <h2>ðŸ›¡ï¸ Privacy Settings</h2>
                <div className="settings-group">
                  <div className="setting-item">
                    <label>Profile Visibility</label>
                    <select 
                      className="select-input"
                      value={privacy.profile}
                      onChange={(e) => handlePrivacyChange('profile', e.target.value)}
                    >
                      <option value="public">Public</option>
                      <option value="friends">Friends Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                  <div className="setting-item">
                    <label>Garden Visibility</label>
                    <select 
                      className="select-input"
                      value={privacy.garden}
                      onChange={(e) => handlePrivacyChange('garden', e.target.value)}
                    >
                      <option value="public">Public</option>
                      <option value="friends">Friends Only</option>
                      <option value="private">Private</option>
                    </select>
                  </div>
                  <div className="setting-item">
                    <label>Location Sharing</label>
                    <div className="toggle-container">
                      <label className="toggle">
                        <input 
                          type="checkbox" 
                          checked={privacy.location}
                          onChange={() => handlePrivacyChange('location', !privacy.location)}
                        />
                        <span className="slider"></span>
                      </label>
                      <span>Share location for weather data</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="settings-panel">
                <h2>ðŸ“Š Data Management</h2>
                <div className="settings-group">
                  <div className="setting-item">
                    <label>Export Your Data</label>
                    <div className="export-section">
                      <select 
                        className="select-input"
                        value={exportFormat}
                        onChange={(e) => setExportFormat(e.target.value)}
                      >
                        <option value="json">JSON Format</option>
                        <option value="csv">CSV Format</option>
                        <option value="pdf">PDF Report</option>
                      </select>
                      <button 
                        className="export-btn"
                        onClick={handleDataExport}
                        disabled={isExporting}
                      >
                        {isExporting ? 'â³ Exporting...' : 'ðŸ“¥ Export Data'}
                      </button>
                    </div>
                    <small>Download all your garden data, settings, and preferences</small>
                  </div>
                  <div className="setting-item">
                    <label>Data Storage</label>
                    <div className="storage-info">
                      <div className="storage-item">
                        <span>Garden Data:</span>
                        <span>2.3 MB</span>
                      </div>
                      <div className="storage-item">
                        <span>Photos:</span>
                        <span>15.7 MB</span>
                      </div>
                      <div className="storage-item">
                        <span>Settings:</span>
                        <span>0.1 MB</span>
                      </div>
                    </div>
                  </div>
                  <div className="setting-item">
                    <label>Delete Account</label>
                    <button className="danger-btn">ðŸ—‘ï¸ Delete Account</button>
                    <small>This action cannot be undone</small>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'help' && (
              <div className="settings-panel">
                <h2>â“ Help & Support</h2>
                <div className="settings-group">
                  <div className="setting-item">
                    <label>Documentation</label>
                    <button className="action-btn">ðŸ“š View Documentation</button>
                  </div>
                  <div className="setting-item">
                    <label>Contact Support</label>
                    <button className="action-btn">ðŸ’¬ Contact Us</button>
                  </div>
                  <div className="setting-item">
                    <label>Report Bug</label>
                    <button className="action-btn">ðŸ› Report Issue</button>
                  </div>
                  <div className="setting-item">
                    <label>Feature Request</label>
                    <button className="action-btn">ðŸ’¡ Suggest Feature</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="settings-panel">
                <h2>â„¹ï¸ About Grow Common</h2>
                <div className="settings-group">
                  <div className="about-section">
                    <h3>Version Information</h3>
                    <div className="version-info">
                      <div className="version-item">
                        <span>App Version:</span>
                        <span>1.0.0</span>
                      </div>
                      <div className="version-item">
                        <span>Build Date:</span>
                        <span>January 2025</span>
                      </div>
                      <div className="version-item">
                        <span>Last Updated:</span>
                        <span>Today</span>
                      </div>
                    </div>
                  </div>
                  <div className="about-section">
                    <h3>Legal</h3>
                    <div className="legal-links">
                      <button className="link-btn">ðŸ“„ Terms of Service</button>
                      <button className="link-btn">ðŸ”’ Privacy Policy</button>
                      <button className="link-btn">ðŸ“‹ Cookie Policy</button>
                    </div>
                  </div>
                  <div className="about-section">
                    <h3>Account Actions</h3>
                    <button className="logout-btn" onClick={handleLogout}>
                      ðŸšª Sign Out
                    </button>
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

export default Settings;

