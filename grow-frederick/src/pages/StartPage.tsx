import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, MapPin, Sun, Droplets, Thermometer, Leaf } from 'lucide-react';
import { Button } from '/src/components/ui/Button';

interface GardenSetup {
  location: string;
  gardenType: 'container' | 'raised_bed' | 'in_ground' | 'greenhouse';
  experience: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  space: 'small' | 'medium' | 'large';
}

export default function StartPage() {
  const [step, setStep] = useState(1);
  const [setup, setSetup] = useState<GardenSetup>({
    location: '',
    gardenType: 'container',
    experience: 'beginner',
    goals: [],
    space: 'small'
  });

  const gardenGoals = [
    { id: 'vegetables', label: 'Grow Vegetables', icon: '🥕' },
    { id: 'herbs', label: 'Fresh Herbs', icon: '🌿' },
    { id: 'flowers', label: 'Beautiful Flowers', icon: '🌸' },
    { id: 'fruits', label: 'Homegrown Fruits', icon: '🍓' },
    { id: 'composting', label: 'Composting', icon: '♻️' },
    { id: 'sustainability', label: 'Sustainable Living', icon: '🌱' }
  ];

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleGoalToggle = (goalId: string) => {
    setSetup({
      ...setup,
      goals: setup.goals.includes(goalId)
        ? setup.goals.filter(g => g !== goalId)
        : [...setup.goals, goalId]
    });
  };

  const renderStep1 = () => (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-gc-dark mb-4">Welcome to Your Garden Journey!</h2>
      <p className="text-xl text-muted-foreground mb-8">
        Let's create a personalized garden plan just for you
      </p>
      
      <div className="bg-white rounded-2xl shadow-soft p-8 max-w-md mx-auto">
        <div className="w-16 h-16 bg-gc-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <Leaf className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gc-dark mb-2">Let's Get Started</h3>
        <p className="text-muted-foreground mb-6">
          This quick setup will help us recommend the perfect plants and growing schedule for your area.
        </p>
        <Button onClick={nextStep} className="w-full">
          Start Setup
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-gc-dark mb-4">Where are you located?</h2>
      <p className="text-xl text-muted-foreground mb-8">
        This helps us determine your growing zone and local weather patterns
      </p>
      
      <div className="bg-white rounded-2xl shadow-soft p-8">
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="w-6 h-6 text-gc-accent" />
          <h3 className="text-lg font-semibold text-gc-dark">Your Location</h3>
        </div>
        <input
          type="text"
          placeholder="Enter your city, state, or ZIP code"
          value={setup.location}
          onChange={(e) => setSetup({ ...setup, location: e.target.value })}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gc-accent focus:border-transparent mb-6"
        />
        <div className="flex gap-3">
          <Button variant="outline" onClick={prevStep} className="flex-1">
            Back
          </Button>
          <Button onClick={nextStep} className="flex-1" disabled={!setup.location}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-gc-dark mb-4">What's your gardening experience?</h2>
      <p className="text-xl text-muted-foreground mb-8">
        This helps us tailor our recommendations to your skill level
      </p>
      
      <div className="bg-white rounded-2xl shadow-soft p-8">
        <div className="space-y-4">
          {[
            { id: 'beginner', label: 'Beginner', description: 'New to gardening, need guidance' },
            { id: 'intermediate', label: 'Intermediate', description: 'Some experience, ready to learn more' },
            { id: 'advanced', label: 'Advanced', description: 'Experienced gardener, want advanced features' }
          ].map((level) => (
            <button
              key={level.id}
              onClick={() => setSetup({ ...setup, experience: level.id as any })}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                setup.experience === level.id
                  ? 'border-gc-accent bg-gc-accent/10'
                  : 'border-gray-200 hover:border-gc-light'
              }`}
            >
              <h3 className="font-semibold text-gc-dark">{level.label}</h3>
              <p className="text-sm text-muted-foreground">{level.description}</p>
            </button>
          ))}
        </div>
        
        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={prevStep} className="flex-1">
            Back
          </Button>
          <Button onClick={nextStep} className="flex-1">
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-gc-dark mb-4">What are your gardening goals?</h2>
      <p className="text-xl text-muted-foreground mb-8">
        Select all that apply to help us customize your experience
      </p>
      
      <div className="bg-white rounded-2xl shadow-soft p-8">
        <div className="grid grid-cols-2 gap-4">
          {gardenGoals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => handleGoalToggle(goal.id)}
              className={`p-4 rounded-lg border-2 text-center transition-all ${
                setup.goals.includes(goal.id)
                  ? 'border-gc-accent bg-gc-accent/10'
                  : 'border-gray-200 hover:border-gc-light'
              }`}
            >
              <div className="text-2xl mb-2">{goal.icon}</div>
              <p className="font-medium text-gc-dark">{goal.label}</p>
            </button>
          ))}
        </div>
        
        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={prevStep} className="flex-1">
            Back
          </Button>
          <Button onClick={nextStep} className="flex-1" disabled={setup.goals.length === 0}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );

  const renderStep5 = () => (
    <motion.div
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-gc-dark mb-4">What type of garden space do you have?</h2>
      <p className="text-xl text-muted-foreground mb-8">
        This helps us recommend the right plants and growing methods
      </p>
      
      <div className="bg-white rounded-2xl shadow-soft p-8">
        <div className="space-y-4">
          {[
            { id: 'container', label: 'Container Garden', description: 'Pots and planters on patios, balconies, or indoors' },
            { id: 'raised_bed', label: 'Raised Beds', description: 'Elevated garden beds in your yard' },
            { id: 'in_ground', label: 'In-Ground Garden', description: 'Traditional garden plot in the ground' },
            { id: 'greenhouse', label: 'Greenhouse', description: 'Controlled environment for year-round growing' }
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setSetup({ ...setup, gardenType: type.id as any })}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                setup.gardenType === type.id
                  ? 'border-gc-accent bg-gc-accent/10'
                  : 'border-gray-200 hover:border-gc-light'
              }`}
            >
              <h3 className="font-semibold text-gc-dark">{type.label}</h3>
              <p className="text-sm text-muted-foreground">{type.description}</p>
            </button>
          ))}
        </div>
        
        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={prevStep} className="flex-1">
            Back
          </Button>
          <Button onClick={nextStep} className="flex-1">
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );

  const renderStep6 = () => (
    <motion.div
      className="max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-gc-dark mb-4">Perfect! Let's create your garden plan</h2>
      <p className="text-xl text-muted-foreground mb-8">
        Based on your preferences, here's what we recommend
      </p>
      
      <div className="bg-white rounded-2xl shadow-soft p-8">
        <div className="text-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gc-dark">Your Garden Profile</h3>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gc-accent" />
            <span className="text-gc-dark"><strong>Location:</strong> {setup.location}</span>
          </div>
          <div className="flex items-center gap-3">
            <Leaf className="w-5 h-5 text-gc-accent" />
            <span className="text-gc-dark"><strong>Experience:</strong> {setup.experience}</span>
          </div>
          <div className="flex items-center gap-3">
            <Sun className="w-5 h-5 text-gc-accent" />
            <span className="text-gc-dark"><strong>Garden Type:</strong> {setup.gardenType.replace('_', ' ')}</span>
          </div>
          <div className="flex items-center gap-3">
            <Droplets className="w-5 h-5 text-gc-accent" />
            <span className="text-gc-dark"><strong>Goals:</strong> {setup.goals.join(', ')}</span>
          </div>
        </div>
        
        <div className="bg-gc-cream rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gc-dark mb-2">Recommended Next Steps:</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Check your local frost dates</li>
            <li>• Start with easy-to-grow plants like lettuce and herbs</li>
            <li>• Set up your garden calendar with planting reminders</li>
            <li>• Join the Frederick gardening community</li>
          </ul>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={prevStep} className="flex-1">
            Back
          </Button>
          <Button className="flex-1">
            Create My Garden Plan
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gc-light/10 to-gc-accent/10">
      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gc-dark">Step {step} of 6</span>
            <span className="text-sm text-muted-foreground">{Math.round((step / 6) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gc-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
        {step === 5 && renderStep5()}
        {step === 6 && renderStep6()}
      </div>
    </div>
  );
}