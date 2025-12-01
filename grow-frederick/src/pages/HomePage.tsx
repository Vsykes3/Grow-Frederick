import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, AlertTriangle, BarChart3, Sprout } from 'lucide-react';
import { Button } from '/src/components/ui/Button';
import { FeatureCard } from '/src/components/ui/FeatureCard';
import { ProBadge } from '/src/components/ui/ProBadge';

const features = [
  {
    icon: <MapPin className="w-8 h-8" />,
    title: 'Weather & Conditions Map',
    description: 'Real-time temperature, humidity, rainfall, and frost date overlays for your area.',
    href: '/map',
    pro: true,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <Sprout className="w-8 h-8" />,
    title: 'Plant Index',
    description: 'Comprehensive database of plants with growing guides, season compatibility, and care instructions.',
    href: '/plants',
    pro: false,
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: 'Smart Planting Calendar',
    description: 'Weather-linked planting reminders and harvest scheduling with local frost date integration.',
    href: '/calendar',
    pro: true,
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: <AlertTriangle className="w-8 h-8" />,
    title: 'Pest & Disease Alerts',
    description: 'Local pest reports, disease prevention tips, and natural remedy suggestions.',
    href: '/alerts',
    pro: true,
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: 'Live Conditions',
    description: 'Real-time soil moisture, temperature trends, and microclimate data for your garden.',
    href: '/live',
    pro: true,
    color: 'from-indigo-500 to-blue-500'
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gc-light/20 via-gc-cream to-gc-accent/20">
        <div className="container mx-auto px-4 py-20">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo Section */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-full shadow-2xl border-8 border-gc-dark flex items-center justify-center relative overflow-hidden">
                  <div className="w-20 h-20 bg-gc-light rounded-full flex items-center justify-center relative">
                    <div className="w-2 h-12 bg-gc-dark rounded-full relative">
                      <div className="absolute -left-4 top-2 w-6 h-8 bg-orange-400 rounded-full transform -rotate-12"></div>
                      <div className="absolute -right-4 top-2 w-6 h-8 bg-orange-400 rounded-full transform rotate-12"></div>
                      <div className="absolute -left-3 top-3 w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="absolute -right-3 top-3 w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="absolute -left-2 top-6 w-3 h-3 bg-gc-dark rounded-full transform -rotate-45"></div>
                      <div className="absolute -right-2 top-6 w-3 h-3 bg-gc-dark rounded-full transform rotate-45"></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <h1 className="text-4xl md:text-5xl font-bold text-gc-dark mb-2">
                    GROW<span className="text-gc-accent">COMMON</span>
                  </h1>
                  <div className="w-24 h-1 bg-gc-dark mx-auto rounded-full"></div>
                </div>
              </div>
            </div>

            <motion.h2
              className="text-3xl md:text-4xl font-bold text-gc-dark mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Your Smart Gardening Companion
            </motion.h2>
            
            <motion.p
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Connect with the Frederick gardening community. Get weather-linked planting advice, 
              pest alerts, and personalized growing recommendations for your local climate.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link to="/start">
                <Button size="lg" className="group">
                  Start My Garden
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link to="/pro">
                <Button variant="outline" size="lg" className="group">
                  <ProBadge size="sm" className="mr-2" />
                  Go Pro
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gc-dark mb-4">
              Everything You Need to Grow
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From weather monitoring to pest management, GrowCommon provides all the tools 
              Frederick gardeners need for successful growing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureCard
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  href={feature.href}
                  pro={feature.pro}
                  color={feature.color}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

