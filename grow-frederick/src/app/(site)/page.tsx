'use client'

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ProBadge } from '@/components/ui/ProBadge';
import homepageBanner from '@/assets/Homepage Banner.jpg';
export default function HomePage() {

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
      pro: false,
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
      pro: false,
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
      {/* Hero Section with Garden Background */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden" style={{ marginTop: 0, paddingTop: 0 }}>
        {/* Background Image */}
        <Image
          src={homepageBanner}
          alt="Garden background with trees, shrubs, and soil"
          fill
          className="object-cover z-0"
          priority
          quality={90}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 z-[1]"></div>
        {/* Hero Content - NO TEXT BUBBLE ABOVE */}
        <div className="relative z-[2] text-center px-4 py-20 max-w-5xl mx-auto container">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              {/* Main Heading - Starts immediately, NO text bubble/badge above */}
              <h1 
                className="text-5xl md:text-6xl font-bold text-white mb-6" 
                style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
              >
                Grow smarter with GrowCommon
              </h1>
              <p className="hero-description text-white/90 drop-shadow-lg">
                Weather intelligence, planting calendars, pest alerts, and horticultural therapy insights built specifically for our local gardening community.
              </p>
              <p className="text-white/80 drop-shadow-md text-sm mt-2">
                Tools, data, and guidance designed around Frederick's microclimate, growing season, and community.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto px-4">
              <button 
                className="hero-cta-button"
                onClick={() => {
                  const event = new CustomEvent('openAuth', { detail: { mode: 'signup' } });
                  window.dispatchEvent(event);
                }}
              >
                Get Started
              </button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 flex-shrink-0 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                onClick={() => {
                  const event = new CustomEvent('openAuth', { detail: { mode: 'signin' } });
                  window.dispatchEvent(event);
                }}
              >
                <ProBadge size="sm" className="mr-2" />
                Try Pro
              </Button>
            </div>
            
            <p className="text-sm text-white/90 drop-shadow-md">
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
              Join the battle against spotted lanternflies in the Urbana community of gardeners
            </p>
            <p className="text-base text-muted-foreground mt-2">
              Join thousands of households who are already growing smarter with GrowCommon
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

