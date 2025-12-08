import React from 'react';
import { Button } from '@/components/ui/Button';
import { ProBadge } from '@/components/ui/ProBadge';
import { PLAN_PRICING } from '@/lib/plan';

export const dynamic = 'force-dynamic';

export default function ProPage() {
  const handleUpgrade = () => {
    // TODO: Integrate with Stripe or payment provider
    console.log('Upgrading to Pro...');
    // For now, just show an alert
    alert('Pro upgrade coming soon! This will integrate with Stripe.');
  };

  const proFeatures = [
    {
      title: 'Severe Weather Alerts',
      description: 'Get push notifications for frost warnings, heat waves, and severe weather that could damage your plants.',
      icon: 'ðŸŒ¡ï¸',
    },
    {
      title: 'Real-Time Heatmaps',
      description: 'Interactive maps showing temperature, humidity, rainfall, and soil conditions across your region.',
      icon: 'ðŸ—ºï¸',
    },
    {
      title: 'Pest & Disease Alerts',
      description: 'Early warnings about invasive species, pest outbreaks, and disease risks in your area.',
      icon: 'ðŸ›',
    },
    {
      title: 'Smart Planting Calendar',
      description: 'AI-powered recommendations for optimal planting times based on your local conditions.',
      icon: 'ðŸ“…',
    },
    {
      title: 'Harvest Reminders',
      description: 'Never miss the perfect harvest time with intelligent reminders and iCal export.',
      icon: 'ðŸŒ¾',
    },
    {
      title: 'Priority Data Refresh',
      description: 'Get the latest weather and pest data faster with priority API access.',
      icon: 'âš¡',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Maryland',
      text: 'GrowCommon Pro has transformed my gardening. The frost alerts saved my tomatoes last spring!',
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
    <div className="min-h-screen bg-gradient-to-br from-gc-light/10 via-background to-gc-accent/10">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gc-dark via-gc-light to-gc-accent opacity-20" />
        <div className="relative container mx-auto px-4 py-16 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-center gap-3">
              <ProBadge size="lg" />
              <h1 className="text-4xl md:text-6xl font-bold text-gc-dark">
                Go Pro!
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Unlock advanced gardening intelligence with GrowCommon Pro
            </p>
            <div className="flex items-center justify-center gap-4 text-3xl font-bold text-gc-dark">
              <span className="text-5xl">$9.99</span>
              <span className="text-lg text-muted-foreground">/month</span>
              <span className="text-sm bg-gc-accent text-gc-dark px-3 py-1 rounded-full">
                7-day free trial
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gc-dark mb-4">
            What you'll unlock today
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to become a master gardener
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proFeatures.map((feature, index) => (
            <div 
              key={index}
              className="glass rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gc-dark mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gc-dark mb-4">
            Choose your plan
          </h2>
          <p className="text-lg text-muted-foreground">
            Start free, upgrade when you're ready
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="glass rounded-2xl p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gc-dark mb-2">Free</h3>
              <div className="text-4xl font-bold text-muted-foreground mb-4">
                $0<span className="text-lg font-normal">/month</span>
              </div>
              <p className="text-muted-foreground">
                Perfect for getting started
              </p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gc-light rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gc-dark">Basic plant database</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gc-light rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gc-dark">7-day weather forecast</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gc-light rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gc-dark">Basic pest alerts</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gc-light rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gc-dark">Manual planting calendar</span>
              </li>
            </ul>
            
            <Button variant="outline" className="w-full" disabled>
              Current Plan
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="glass rounded-2xl p-8 border-2 border-gc-accent relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <ProBadge size="md" />
            </div>
            
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gc-dark mb-2">Pro</h3>
              <div className="text-4xl font-bold text-gc-dark mb-4">
                $9.99<span className="text-lg font-normal text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground">
                Everything you need to succeed
              </p>
            </div>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gc-accent rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gc-dark">Everything in Free</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gc-accent rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gc-dark">Severe weather alerts</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gc-accent rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gc-dark">Real-time heatmaps</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gc-accent rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gc-dark">Smart calendar + iCal</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-gc-accent rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-gc-dark">Priority support</span>
              </li>
            </ul>
            
            <Button onClick={handleUpgrade} className="w-full">
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gc-dark mb-4">
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

      {/* FAQ */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gc-dark mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {[
            {
              question: 'Can I cancel anytime?',
              answer: 'Yes! You can cancel your Pro subscription at any time. You\'ll continue to have access to Pro features until the end of your billing period.',
            },
            {
              question: 'Is there a free trial?',
              answer: 'Yes! We offer a 7-day free trial for all new Pro subscribers. No credit card required to start.',
            },
            {
              question: 'What payment methods do you accept?',
              answer: 'We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely through Stripe.',
            },
            {
              question: 'Do you offer student discounts?',
              answer: 'Yes! Students with a valid .edu email address can get 50% off their Pro subscription. Contact support for verification.',
            },
          ].map((item, index) => (
            <div key={index} className="glass rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gc-dark mb-3">
                {item.question}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="container mx-auto px-4 py-16">
        <div className="glass rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gc-dark mb-4">
            Ready to transform your gardening?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of gardeners who are already growing smarter with Pro
          </p>
          <Button onClick={handleUpgrade} size="lg">
            Start Your Free Trial Today
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required • Cancel anytime • 7-day free trial
          </p>
        </div>
      </div>
    </div>
  );
}

