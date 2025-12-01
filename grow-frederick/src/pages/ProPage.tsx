import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, ArrowRight, Zap, Shield, Globe, BarChart3, Users } from 'lucide-react';
import { Button } from '/src/components/ui/Button';
import { ProBadge } from '/src/components/ui/ProBadge';

const features = [
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Advanced Weather Maps',
    description: 'Multi-layer heatmaps for temperature, humidity, rainfall, and frost predictions',
    pro: true
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Smart Calendar',
    description: 'Weather-linked planting reminders with iCal export and zone-aware suggestions',
    pro: true
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Pest Pressure Score',
    description: 'Real-time pest risk assessment with trend analysis and prevention tips',
    pro: true
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'AI Plant Identification',
    description: 'Upload photos to identify plants and get instant care instructions',
    pro: true
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Community Access',
    description: 'Connect with local gardeners and share tips and experiences',
    pro: true
  }
];

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Basic plant database',
      'Simple weather data',
      'Manual calendar',
      'Community access'
    ],
    limitations: [
      'Limited weather maps',
      'No AI features',
      'Basic alerts only'
    ],
    popular: false
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: 'per month',
    description: 'Everything you need to grow successfully',
    features: [
      'Advanced weather maps',
      'Smart planting calendar',
      'AI plant identification',
      'Pest pressure monitoring',
      'Priority support',
      'Export capabilities'
    ],
    limitations: [],
    popular: true
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'Frederick, MD',
    text: 'GrowCommon Pro has transformed my gardening. The weather integration is incredible!',
    rating: 5
  },
  {
    name: 'Mike Chen',
    location: 'Urbana, MD',
    text: 'The pest alerts saved my tomatoes from early blight. Worth every penny!',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    location: 'Walkersville, MD',
    text: 'Finally, a gardening app that understands Maryland weather patterns.',
    rating: 5
  }
];

const faqs = [
  {
    question: 'What\'s included in the Pro plan?',
    answer: 'Pro includes advanced weather maps, smart calendar with weather integration, AI plant identification, pest pressure monitoring, priority support, and export capabilities.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, you can cancel your subscription at any time. You\'ll continue to have Pro access until the end of your billing period.'
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! New users get a 14-day free trial of Pro features. No credit card required to start.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied, contact us for a full refund.'
  }
];

export default function ProPage() {
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [showFAQ, setShowFAQ] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gc-light/10 to-gc-accent/10">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-gc-accent/10 text-gc-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <ProBadge size="sm" />
            Upgrade to Pro
          </div>
          
          <h1 className="text-5xl font-bold text-gc-dark mb-6">
            Grow Smarter with
            <span className="text-gc-accent"> Pro</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Unlock advanced weather intelligence, AI-powered plant identification, 
            and smart growing recommendations tailored to your local climate.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg">
              View Features
            </Button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-gc-dark text-center mb-12">
            Everything You Need to Grow Successfully
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white rounded-2xl shadow-soft p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gc-accent/10 rounded-lg flex items-center justify-center text-gc-accent">
                    {feature.icon}
                  </div>
                  {feature.pro && <ProBadge size="sm" />}
                </div>
                <h3 className="text-lg font-semibold text-gc-dark mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gc-dark text-center mb-12">
            Choose Your Plan
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan) => (
              <motion.div
                key={plan.name}
                className={`relative bg-white rounded-2xl shadow-soft p-8 ${
                  plan.popular ? 'ring-2 ring-gc-accent' : ''
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gc-accent text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gc-dark mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gc-dark">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gc-dark">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-5 h-5 flex-shrink-0"></div>
                      <span className="text-muted-foreground line-through">{limitation}</span>
                    </div>
                  ))}
                </div>
                
                <Button
                  className={`w-full ${
                    plan.popular ? 'bg-gc-accent hover:bg-gc-accent/90' : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.name === 'Free' ? 'Current Plan' : 'Start Free Trial'}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gc-dark text-center mb-12">
            Loved by Frederick Gardeners
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-white rounded-2xl shadow-soft p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gc-dark">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gc-dark text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl shadow-soft overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gc-light/5 transition-colors"
                  onClick={() => setShowFAQ(showFAQ === index ? null : index)}
                >
                  <h3 className="font-semibold text-gc-dark">{faq.question}</h3>
                  <ArrowRight
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      showFAQ === index ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {showFAQ === index && (
                  <motion.div
                    className="px-6 pb-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center bg-gradient-to-r from-gc-dark to-gc-accent rounded-2xl p-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Better?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of gardeners who trust GrowCommon Pro for their growing success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-gc-dark hover:bg-gray-100">
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gc-dark">
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}