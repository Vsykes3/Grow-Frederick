# GrowCommon 🌱

**Smart gardening made simple.** Weather intelligence, plant care, and pest alerts all in one place. Built for Frederick gardeners and beyond.

## 🚀 Features

### Free Features
- **Plant Database**: Comprehensive plant index with care guides and companion planting tips
- **Basic Weather**: Current weather information and basic forecasts
- **Manual Calendar**: Create and manage planting events manually
- **Community Access**: Connect with fellow gardeners
- **Mobile App**: Full mobile experience

### Pro Features
- **Advanced Weather Intelligence**: Detailed forecasts, frost predictions, and microclimate data
- **Smart Planting Calendar**: AI-powered suggestions that auto-adjust based on weather conditions
- **Pest Pressure Analytics**: Track pest trends and get personalized prevention recommendations
- **Microclimate Mapping**: Create custom zones in your garden with specific recommendations
- **Companion Planting Optimizer**: Get smart suggestions for plant combinations and spacing
- **Irrigation Planning**: Calculate water needs and create efficient watering schedules
- **Seasonal ROI Tracking**: Track your garden's value and optimize your growing strategy
- **Priority Support**: Get help from our gardening experts when you need it most

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4 with custom GrowCommon theme
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React
- **Charts**: Recharts
- **Maps**: Leaflet + React Leaflet
- **HTTP Client**: Axios

## 🎨 Design System

### Brand Colors
- **gc-dark**: `#414535` (Black Olive)
- **gc-light**: `#9EBB8C` (Olivine)
- **gc-cream**: `#F5F3EE` (Soft background)
- **gc-ink**: `#0F1A12` (Text on light)
- **gc-accent**: `#7A9B6B` (Computed accessible accent)

### Typography
- **Font**: Inter (system fallback)
- **Weights**: 300, 400, 500, 600, 700
- **Line Height**: Comfortable (1.6)
- **Letter Spacing**: Slightly tight (-0.025em)

### Motion
- **Duration**: 150-220ms
- **Easing**: ease-out
- **Style**: Subtle, not flashy
- **Accessibility**: Respects `prefers-reduced-motion`

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd grow-frederick
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your API keys (see [API Integration](#api-integration) section)

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🔧 API Integration

GrowCommon integrates with several APIs to provide real-time data. All APIs have free tiers available.

### Required APIs

#### OpenWeatherMap API
- **Purpose**: Weather data and forecasts
- **Free Tier**: 1000 calls/day
- **Setup**: 
  1. Sign up at [openweathermap.org](https://openweathermap.org/api)
  2. Get your API key
  3. Add to `.env`: `VITE_OPENWEATHER_KEY=your_key_here`

#### Visual Crossing API (Alternative)
- **Purpose**: Alternative weather data source
- **Free Tier**: 1000 calls/day
- **Setup**:
  1. Sign up at [visualcrossing.com](https://www.visualcrossing.com/weather-api)
  2. Get your API key
  3. Add to `.env`: `VITE_VISUALCROSSING_KEY=your_key_here`

### Optional APIs

#### Mapbox (Enhanced Maps)
- **Purpose**: Enhanced map styling and features
- **Free Tier**: $200/month
- **Setup**:
  1. Sign up at [mapbox.com](https://www.mapbox.com/)
  2. Get your access token
  3. Add to `.env`: `VITE_MAPBOX_TOKEN=your_token_here`

#### Supabase (User Data)
- **Purpose**: User profiles, subscriptions, and data storage
- **Free Tier**: Available
- **Setup**:
  1. Create project at [supabase.com](https://supabase.com/)
  2. Get your URL and anon key
  3. Add to `.env`:
     ```
     VITE_SUPABASE_URL=your_url_here
     VITE_SUPABASE_ANON_KEY=your_anon_key_here
     ```

#### Stripe (Payments)
- **Purpose**: Subscription payments
- **Free Tier**: Test mode available
- **Setup**:
  1. Create account at [stripe.com](https://stripe.com/)
  2. Get your publishable key
  3. Add to `.env`: `VITE_STRIPE_PUBLISHABLE_KEY=your_key_here`

### Fallback Behavior
- If API keys are not provided, the app will use mock data
- All features work without external APIs
- Real-time data requires valid API keys

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/             # Core UI components
├── pages/              # Route components
├── services/           # API and data services
├── store/              # Zustand state management
├── types/              # TypeScript type definitions
├── lib/                # Utility functions
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles and Tailwind
```

## 🎯 Key Components

### UI Components
- **Navbar**: Responsive navigation with theme toggle
- **Footer**: Links and social media
- **FeatureCard**: Reusable feature display cards
- **ProBadge**: Animated Pro feature indicators
- **PaywallGuard**: Pro feature gating
- **SproutLoader**: Custom loading animation

### Pages
- **HomePage**: Hero section with feature overview
- **AboutPage**: Company information and team
- **PlantsPage**: Plant database and search
- **MapPage**: Interactive weather and conditions map
- **CalendarPage**: Smart planting calendar
- **AlertsPage**: Pest and weather alerts
- **ProPage**: Subscription and pricing

## 🔐 Authentication & Subscriptions

### User Management
- **Free Plan**: Basic features, no account required
- **Pro Plan**: Advanced features, requires account
- **Authentication**: Email/password (Supabase Auth)
- **Subscriptions**: Stripe integration

### Pro Features Gating
```tsx
import { PaywallGuard } from '@/components/ui/PaywallGuard';

<PaywallGuard isPro={user?.plan === 'pro'} feature="Smart Calendar">
  <SmartCalendarComponent />
</PaywallGuard>
```

## 🎨 Customization

### Theme Customization
Edit `src/index.css` to modify:
- Color variables
- Typography settings
- Animation keyframes
- Global styles

### Brand Customization
Update in `tailwind.config.ts`:
- Brand colors
- Custom animations
- Component defaults

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for React and TypeScript
- **Prettier**: Code formatting (recommended)
- **Conventions**: 
  - PascalCase for components
  - camelCase for functions and variables
  - kebab-case for file names

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Add TypeScript types for new features
- Include tests for new functionality
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Plant Data**: USDA Plants Database, Trefle API
- **Weather Data**: OpenWeatherMap, Visual Crossing
- **Icons**: Lucide React
- **Design Inspiration**: Modern gardening apps and nature-inspired design

## 📞 Support

- **Email**: support@growcommon.com
- **Documentation**: [docs.growcommon.com](https://docs.growcommon.com)
- **Community**: [community.growcommon.com](https://community.growcommon.com)

---

**Built with ❤️ for gardeners everywhere**

*GrowCommon - Smart gardening made simple.*