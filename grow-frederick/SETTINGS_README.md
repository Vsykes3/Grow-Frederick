# Settings & Profile Page - GrowCommon

A beautiful, production-ready Settings & Profile page for GrowCommon, built with React, TypeScript, and modern CSS animations.

## 🌟 Features

### 🎨 Visual Design
- **Animated Garden Background**: Smooth gradient shifts with garden-inspired colors
- **Floating Particles**: 20 animated particles simulating pollen and petals
- **Garden Elements**: Floating leaves with realistic movement
- **Glass Morphism**: Semi-transparent panels with backdrop blur effects
- **Premium Animations**: Smooth transitions, hover effects, and micro-interactions

### 📱 Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Collapsible Sidebar**: Horizontal scroll on mobile devices
- **Touch-Friendly**: Large touch targets and intuitive gestures
- **Accessibility**: ARIA roles, focus states, and keyboard navigation

### ⚙️ Functionality

#### Profile Tab
- **Avatar Upload**: Click-to-upload profile pictures with Firebase Storage
- **Display Name**: Editable user display name
- **Bio Field**: Multi-line textarea for user biography
- **Email Display**: Read-only email address (cannot be changed)

#### Preferences Tab
- **USDA Planting Zones**: Dropdown with all 26 planting zones (1a-13b)
- **Unit Preferences**: Imperial (°F, inches) vs Metric (°C, mm)
- **Weather Alerts**: Daily, severe only, or none

#### Notifications Tab
- **Toggle Switches**: Pest alerts, frost warnings, harvest reminders
- **Delivery Methods**: Email, SMS, or in-app notifications
- **Real-time Updates**: Instant state changes with smooth animations

#### Subscription Tab
- **Plan Display**: Free vs Premium with feature comparison
- **Premium Styling**: Gold accents and shimmer effects
- **Upgrade Button**: Animated premium upgrade button

#### Security Tab
- **Password Reset**: Secure password reset via email
- **Two-Factor Authentication**: Toggle for 2FA enable/disable
- **Security Warnings**: Prominent security notices
- **Account Actions**: Device management and sign out

## 🛠️ Technical Implementation

### File Structure
```
src/pages/
├── SettingsNext.jsx          # Main React component (JavaScript)
├── SettingsNext.tsx          # TypeScript version with full type safety
├── SettingsNext.css          # Comprehensive CSS with animations
└── tailwind.config.js        # Tailwind configuration with custom animations
```

### Key Technologies
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Full type safety with interfaces and type definitions
- **Firebase**: Authentication, storage, and user management
- **CSS Animations**: Custom keyframes and transitions
- **Responsive Design**: CSS Grid and Flexbox layouts

### Animation System
```css
/* Custom animations defined in CSS */
@keyframes gradientShift     /* Background gradient movement */
@keyframes floatParticle     /* Particle floating animation */
@keyframes leafFloat         /* Leaf floating animation */
@keyframes titleGlow         /* Title glow effect */
@keyframes premiumGlow       /* Premium button glow */
@keyframes shimmer           /* Subscription card shimmer */
@keyframes panelSlideIn      /* Panel transition animation */
@keyframes alertSlideIn      /* Alert notification animation */
```

### State Management
```typescript
// TypeScript interfaces for type safety
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
```

## 🎯 Usage

### Accessing the Settings Page
Navigate to `/settings-next` in your application to access the new Settings page.

### Available Routes
- `/settings` - Original settings page
- `/settings-next` - New production-ready settings page

### Integration
The page integrates seamlessly with:
- **Firebase Authentication**: User login/logout and profile management
- **Firebase Storage**: Profile photo uploads
- **Existing Navbar/Footer**: Consistent navigation and branding

## 🎨 Customization

### Colors
The page uses a garden-inspired color palette:
- **Primary Green**: #28a745 (buttons, active states)
- **Secondary Green**: #20c997 (gradients, accents)
- **Garden Colors**: Various greens, earth tones, and natural colors
- **Premium Gold**: #ffd700 (subscription elements)

### Animations
All animations are customizable through CSS variables:
```css
:root {
  --animation-duration: 0.3s;
  --animation-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --particle-count: 20;
  --gradient-speed: 15s;
}
```

### Responsive Breakpoints
- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## 🔧 Development

### Prerequisites
- React 18+
- Firebase SDK
- Modern browser with CSS Grid support

### Installation
1. Copy the files to your project
2. Install required dependencies
3. Configure Firebase (if not already set up)
4. Update routing in your App.jsx

### Dependencies
```json
{
  "react": "^18.0.0",
  "firebase": "^9.0.0",
  "react-router-dom": "^6.0.0"
}
```

## 🚀 Performance

### Optimizations
- **CSS-only animations**: No JavaScript animation libraries
- **Efficient re-renders**: Optimized React state management
- **Lazy loading**: Components load only when needed
- **Minimal bundle size**: No external animation libraries

### Browser Support
- **Modern browsers**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Mobile browsers**: iOS Safari 13+, Chrome Mobile 80+
- **Accessibility**: Screen reader compatible, keyboard navigation

## 🎭 Accessibility Features

### ARIA Support
- **Role attributes**: tablist, tab, tabpanel
- **Aria-selected**: For active tab indication
- **Aria-controls**: For tab-panel relationships
- **Aria-labels**: For form inputs and buttons

### Keyboard Navigation
- **Tab order**: Logical tab sequence
- **Focus indicators**: Visible focus states
- **Keyboard shortcuts**: Enter/Space for button activation

### Screen Reader Support
- **Semantic HTML**: Proper heading hierarchy
- **Alt text**: Descriptive image alt attributes
- **Form labels**: Associated labels for all inputs

## 🔮 Future Enhancements

### Planned Features
- **Dark mode**: Toggle between light and dark themes
- **Language support**: Multi-language interface
- **Advanced preferences**: More granular settings
- **Data export**: Export user data in various formats
- **Two-factor authentication**: Complete 2FA implementation

### Performance Improvements
- **Virtual scrolling**: For large lists
- **Image optimization**: WebP format support
- **Service worker**: Offline functionality
- **Progressive loading**: Skeleton screens

## 📝 License

This component is part of the GrowCommon project and follows the same licensing terms.

## 🤝 Contributing

To contribute to this component:
1. Follow the existing code style
2. Add TypeScript types for new features
3. Include accessibility attributes
4. Test on multiple devices and browsers
5. Update documentation for new features

---

**Built with ❤️ for GrowCommon - Making gardening accessible to everyone.**
