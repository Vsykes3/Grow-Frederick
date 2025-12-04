# GrowCommon - Frederick County Gardening App

A production-ready, full-stack gardening web application optimized for Frederick County (USDA Zone 6b–7a). Built with Next.js 14, TypeScript, and modern web technologies.

## 🌱 Features

### Core Features
- **Plant Index**: Comprehensive database of plants with growing guides, season compatibility, and care instructions
- **My Garden**: Track your plants with progress monitoring and notes
- **Smart Calendar**: Garden task scheduling with reminders and recurring events
- **Weather Integration**: Real-time weather data and alerts for your location
- **Pest Management**: Local pest identification and organic control methods
- **News & Events**: Gardening news and local events aggregation

### Plan-Based Features
- **Free Plan**: Basic plant index, limited garden tracking (10 plants), basic calendar
- **Pro Plan**: Unlimited garden, advanced filters, recurring events, Pro Starter Pack
- **Premium Plan**: Push notifications, severe weather alerts, personalized schedules
- **Admin Plan**: Full content management and feature flag control

### Special Features
- **Horticultural Therapy**: Specialized content for mental health benefits
- **Regional Optimization**: Tailored for Frederick County growing conditions
- **Responsive Design**: Mobile-first approach with dark/light mode support
- **Accessibility**: WCAG compliant with screen reader support

## 🛠 Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for components
- **Zustand** for client state management
- **React Hook Form + Zod** for form handling
- **FullCalendar** for calendar functionality
- **React Query** for server state management
- **Heroicons** for icons

### Backend
- **Next.js API Routes** (Edge where possible)
- **PostgreSQL** via Prisma ORM
- **Redis** for caching and rate limiting
- **NextAuth** for authentication
- **Stripe** for payment processing

### External APIs
- **OpenWeather One Call 3.0** for weather data
- **Google Maps** for geocoding and mapping
- **NewsAPI** for news aggregation
- **Resend** for email notifications

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Redis (optional, for caching)
- API keys for external services

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
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/growcommon"
   REDIS_URL="redis://localhost:6379"

   # Authentication
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   # Payments
   STRIPE_SECRET_KEY="sk_test_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   STRIPE_PRO_MONTHLY_PRICE_ID="price_..."
   STRIPE_PRO_YEARLY_PRICE_ID="price_..."
   STRIPE_PREMIUM_MONTHLY_PRICE_ID="price_..."
   STRIPE_PREMIUM_YEARLY_PRICE_ID="price_..."

   # External APIs
   OWM_API_KEY="your-openweather-api-key"
   GOOGLE_MAPS_API_KEY="your-google-maps-api-key"
   NEWSAPI_KEY="your-newsapi-key"
   RESEND_API_KEY="your-resend-api-key"

   # Feature Flags
   DEMO_BYPASS_PAYWALL="true"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npm run db:migrate

   # Seed the database
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
grow-frederick/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   ├── (auth)/            # Authentication pages
│   │   └── *.page.tsx         # Page components
│   ├── components/            # Reusable components
│   │   ├── ui/               # shadcn/ui components
│   │   └── layout/           # Layout components
│   ├── lib/                  # Utility functions
│   └── middleware.ts         # Next.js middleware
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts              # Database seed script
├── public/                   # Static assets
└── docs/                    # Documentation
```

## 🗄 Database Schema

### Core Models
- **User**: User accounts with plan information
- **Plant**: Plant database with growing information
- **UserPlant**: User's garden plants
- **Event**: Calendar events and reminders
- **Pest**: Pest identification and control methods
- **Post**: Blog posts and news articles
- **Subscription**: Stripe subscription management

### Key Relationships
- Users have many UserPlants and Events
- Plants have many UserPlants
- Users have one Subscription
- Events can be linked to UserPlants

## 🔐 Authentication & Authorization

### Authentication Methods
- **Google OAuth**: Social login integration
- **Email**: Magic link authentication

### Plan-Based Access Control
- **Free**: Basic features, 10 plant limit
- **Pro**: Advanced features, unlimited plants
- **Premium**: All features + push notifications
- **Admin**: Full system access

### Feature Gating
- Middleware-based plan checking
- Component-level feature locks
- API route protection
- Demo mode for testing

## 💳 Payment Integration

### Stripe Integration
- **Checkout Sessions**: Secure payment processing
- **Webhooks**: Real-time subscription updates
- **Customer Portal**: Self-service billing management
- **Price Management**: Flexible pricing tiers

### Subscription Management
- Automatic plan updates
- Proration handling
- Cancellation support
- Invoice generation

## 📧 Notifications

### Email Notifications
- **Resend Integration**: Reliable email delivery
- **Templates**: Pre-built email templates
- **Scheduling**: Automated reminder system

### Push Notifications
- **Service Worker**: Background notification handling
- **VAPID Keys**: Secure push notification delivery
- **User Preferences**: Granular notification controls

## 🌐 External API Integration

### Weather Data
- **OpenWeather One Call 3.0**: Comprehensive weather data
- **Caching**: 15-minute cache for performance
- **Alerts**: Severe weather notifications

### Mapping
- **Google Maps**: Geocoding and mapping
- **MapLibre**: Alternative mapping solution
- **Location Services**: ZIP code-based location detection

### News & Events
- **NewsAPI**: News aggregation
- **RSS Feeds**: Local event integration
- **Content Caching**: 6-hour cache for performance

## 🧪 Testing & Development

### Development Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push schema changes
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio
```

### Environment Management
- **Development**: Full feature access with demo mode
- **Staging**: Production-like environment
- **Production**: Full security and optimization

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Database Setup
1. Set up PostgreSQL database (recommended: Supabase, PlanetScale, or Railway)
2. Configure connection string in environment variables
3. Run migrations on deployment

### External Services
1. Set up Stripe account and configure webhooks
2. Obtain API keys for external services
3. Configure domain and CORS settings

## 📊 Performance & Optimization

### Frontend Optimization
- **Next.js 14**: Latest performance improvements
- **Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic code splitting
- **Caching**: Aggressive caching strategies

### Backend Optimization
- **Edge Functions**: Serverless edge computing
- **Database Indexing**: Optimized database queries
- **Redis Caching**: In-memory caching
- **Rate Limiting**: API protection

## 🔒 Security

### Data Protection
- **HTTPS Only**: Secure data transmission
- **Input Validation**: Zod schema validation
- **SQL Injection Prevention**: Prisma ORM protection
- **XSS Protection**: Content Security Policy

### Authentication Security
- **JWT Tokens**: Secure session management
- **CSRF Protection**: Cross-site request forgery prevention
- **Rate Limiting**: Brute force protection
- **Secure Headers**: Security header implementation

## 📱 Mobile Support

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Touch-Friendly**: Large touch targets
- **Progressive Web App**: PWA capabilities
- **Offline Support**: Service worker caching

### Native Features
- **Push Notifications**: Native notification support
- **Geolocation**: Location-based features
- **Camera Integration**: Plant photo capture
- **Share API**: Social sharing capabilities

## 🌍 Accessibility

### WCAG Compliance
- **Screen Reader Support**: ARIA labels and roles
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG AA compliance
- **Focus Management**: Clear focus indicators

### Inclusive Design
- **Multiple Input Methods**: Touch, keyboard, voice
- **Customizable Interface**: Font size, contrast options
- **Clear Language**: Plain language throughout
- **Error Handling**: Clear error messages

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Standards
- **TypeScript**: Strict type checking
- **ESLint**: Code quality enforcement
- **Prettier**: Code formatting
- **Conventional Commits**: Standardized commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Frederick County Master Gardeners** for local gardening expertise
- **USDA Plant Hardiness Zone Map** for climate data
- **OpenWeather** for weather data services
- **Stripe** for payment processing
- **Vercel** for hosting and deployment

## 📞 Support

For support, email support@growcommon.com or visit our [help center](https://growcommon.com/help).

---

**GrowCommon** - Growing together in Frederick County 🌱