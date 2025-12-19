'use client'

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProBadge } from '@/components/ui/ProBadge';
import { useI18n } from '@/hooks/useI18n';

export default function HomePage() {
  const { t, mounted } = useI18n();
  
  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-gc-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const features = [
    {
      title: 'Weather Intelligence',
      description: 'Get real-time weather data and forecasts tailored to your garden\'s needs.',
      icon: '🌤️',
      pro: false,
    },
    {
      title: 'Plant Database',
      description: 'Access comprehensive information about thousands of plants and their care requirements.',
      icon: '🌱',
      pro: false,
    },
    {
      title: 'Smart Calendar',
      description: 'AI-powered planting calendar with harvest reminders and iCal export.',
      icon: '📅',
      pro: true,
    },
    {
      title: 'Pest Alerts',
      description: 'Early warnings about invasive species and pest outbreaks in your area.',
      icon: '🐛',
      pro: true,
    },
    {
      title: 'Heatmaps',
      description: 'Interactive maps showing temperature, humidity, and soil conditions.',
      icon: '🗺️',
      pro: true,
    },
    {
      title: 'Community',
      description: 'Connect with fellow gardeners and share your growing success.',
      icon: '👥',
      pro: false,
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Maryland',
      text: 'GrowCommon has transformed my gardening. The weather alerts saved my tomatoes last spring!',
      rating: 5,
    },
    {
      name: 'Mike Chen',
      location: 'Virginia',
      text: 'The heatmaps are incredible. I can see exactly where to plant based on microclimates.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      location: 'Pennsylvania',
      text: 'Worth every penny. The pest alerts helped me catch aphids before they spread.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gc-light/20 via-background to-gc-accent/20" />
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Logo Section */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                {/* Main Logo Circle */}
                <div className="w-32 h-32 bg-white rounded-full shadow-2xl border-8 border-gc-dark flex items-center justify-center relative overflow-hidden">
                  {/* Inner Circle - Canopy */}
                  <div className="w-20 h-20 bg-gc-light rounded-full flex items-center justify-center relative">
                    {/* Tree Trunk */}
                    <div className="w-2 h-12 bg-gc-dark rounded-full relative">
                      {/* Orange Fruits/Leaves */}
                      <div className="absolute -left-4 top-2 w-6 h-8 bg-orange-400 rounded-full transform -rotate-12"></div>
                      <div className="absolute -right-4 top-2 w-6 h-8 bg-orange-400 rounded-full transform rotate-12"></div>
                      {/* Small Red Accents */}
                      <div className="absolute -left-3 top-3 w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="absolute -right-3 top-3 w-2 h-2 bg-red-500 rounded-full"></div>
                      {/* Small Leaves */}
                      <div className="absolute -left-2 top-6 w-3 h-3 bg-gc-dark rounded-full transform -rotate-45"></div>
                      <div className="absolute -right-2 top-6 w-3 h-3 bg-gc-dark rounded-full transform rotate-45"></div>
                    </div>
                  </div>
                  
                  {/* Root System */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-16">
                    {/* Main Root */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gc-dark rounded-full"></div>
                    {/* Branching Roots */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-1 h-6 bg-gc-dark rounded-full transform -rotate-30 origin-top"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-1 h-6 bg-gc-dark rounded-full transform rotate-30 origin-top"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 w-1 h-4 bg-gc-dark rounded-full transform -rotate-60 origin-top"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 w-1 h-4 bg-gc-dark rounded-full transform rotate-60 origin-top"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-6 w-1 h-3 bg-gc-dark rounded-full transform -rotate-45 origin-top"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-6 w-1 h-3 bg-gc-dark rounded-full transform rotate-45 origin-top"></div>
                  </div>
                </div>
                
                {/* Brand Text */}
                <div className="mt-6 text-center">
                  <h1 className="text-4xl md:text-5xl font-bold text-gc-dark mb-2">
                    GR<span className="relative inline-block w-8 h-8 bg-gc-dark rounded-full flex items-center justify-center mx-1">
                      <div className="w-3 h-3 bg-gc-light rounded-full flex items-center justify-center">
                        <div className="w-1 h-2 bg-gc-dark rounded-full"></div>
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gc-dark rounded-full"></div>
                        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gc-dark rounded-full rotate-45"></div>
                      </div>
                    </span>W<span className="text-gc-accent">COMMON</span>
                  </h1>
                  <div className="w-24 h-1 bg-gc-dark mx-auto rounded-full"></div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-gc-dark">
                {t('home.title')}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('home.subtitle')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                {t('home.getStarted')}
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <ProBadge size="sm" className="mr-2" />
                {t('home.tryPro')}
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              No credit card required • 7-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gc-dark mb-4">
              Everything you need to grow
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From weather monitoring to pest alerts, we've got your garden covered
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{feature.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-gc-dark">
                        {feature.title}
                      </h3>
                      {feature.pro && <ProBadge size="sm" />}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gc-light/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gc-dark mb-4">
              How it works
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in minutes, see results in weeks
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gc-accent rounded-2xl flex items-center justify-center mx-auto text-2xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-gc-dark">
                Set Your Location
              </h3>
              <p className="text-muted-foreground">
                Enter your ZIP code or allow location access for personalized recommendations.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gc-accent rounded-2xl flex items-center justify-center mx-auto text-2xl">
                2
              </div>
              <h3 className="text-xl font-semibold text-gc-dark">
                Choose Your Plants
              </h3>
              <p className="text-muted-foreground">
                Browse our plant database and add the plants you want to grow to your garden.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gc-accent rounded-2xl flex items-center justify-center mx-auto text-2xl">
                3
              </div>
              <h3 className="text-xl font-semibold text-gc-dark">
                Get Smart Alerts
              </h3>
              <p className="text-muted-foreground">
                Receive personalized notifications for planting, watering, and pest control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gc-dark mb-4">
              Loved by gardeners everywhere
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of successful gardeners
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass rounded-2xl p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gc-light rounded-full flex items-center justify-center">
                    <span className="text-gc-dark font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gc-dark">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gc-dark to-gc-light">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to transform your gardening?
            </h2>
            <p className="text-xl text-white/90">
              Join thousands of gardeners who are already growing smarter with GrowCommon
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Free Today
              </Button>
              <Link href="/pro">
                <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-gc-dark">
                  <ProBadge size="sm" className="mr-2" />
                  Try Pro Free
                </Button>
              </Link>
            </div>
            <p className="text-sm text-white/80">
              No credit card required • 7-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

