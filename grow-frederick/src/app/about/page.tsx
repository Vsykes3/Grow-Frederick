'use client'

import { Leaf, Users, Heart, Target, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'


const values = [
  {
    icon: Leaf,
    title: 'Sustainable Gardening',
    description: 'We promote organic, sustainable gardening practices that benefit both you and the environment.'
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'Building a supportive community where gardeners can share knowledge and learn from each other.'
  },
  {
    icon: Heart,
    title: 'Accessibility',
    description: 'Making gardening accessible to everyone, regardless of experience level or physical ability.'
  },
  {
    icon: Target,
    title: 'Local Focus',
    description: 'Optimized specifically for Frederick County and surrounding areas with local weather and pest data.'
  }
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">About GrowCommon</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We're on a mission to make gardening smarter, more accessible, and more successful 
          for everyone in Frederick County and beyond.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              GrowCommon was born from a simple observation: gardening should be easier, more 
              successful, and more enjoyable. Too many gardeners struggle with the same challenges 
              year after year, often due to lack of localized information and guidance.
            </p>
            <p className="text-muted-foreground mb-6">
              We believe that with the right tools, data, and community support, anyone can 
              become a successful gardener. That's why we've built GrowCommon specifically 
              for Frederick County's unique growing conditions and climate.
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <a href="/plant-index">Get Started</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/pricing">View Plans</a>
              </Button>
            </div>
          </div>
          <div className="bg-card rounded-lg border p-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-16 w-16 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Optimized for Frederick County</h3>
              <p className="text-muted-foreground">
                Zone 6b-7a • USDA Hardiness • Local Weather • Regional Pests
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Horticultural Therapy Section */}
      <div className="mb-16 bg-green-50 dark:bg-green-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Horticultural Therapy</h2>
            <p className="text-xl text-muted-foreground">
              Gardening as a path to wellness and healing
            </p>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-muted-foreground mb-6">
              At GrowCommon, we believe in the therapeutic power of gardening. Research has shown 
              that gardening can reduce stress, improve mood, and provide a sense of accomplishment 
              and purpose. This is especially important for individuals managing conditions like 
              Tourette's Syndrome, ADHD, anxiety, and depression.
            </p>
            
            <p className="text-muted-foreground mb-6">
              Gardening provides a unique combination of physical activity, sensory stimulation, 
              and mindfulness that can help with focus, emotional regulation, and stress management. 
              The repetitive nature of gardening tasks can be particularly calming, while the 
              responsibility of caring for living things can boost self-esteem and provide structure.
            </p>
            
            <div className="bg-card rounded-lg p-6 mb-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-3">Personal Note from Our Founder</h3>
              <p className="text-muted-foreground italic">
                "As someone who has personally experienced the challenges of Tourette's Syndrome, 
                I can attest to the profound impact that gardening has had on my life. The focus 
                required for planting, the patience needed for growth, and the satisfaction of 
                harvesting have all contributed to better emotional regulation and overall well-being. 
                This is why we've made accessibility and therapeutic benefits core to GrowCommon's mission."
              </p>
              <p className="text-sm text-muted-foreground mt-2">- Maxwell Liu, Founder</p>
            </div>
            
            <p className="text-muted-foreground">
              We're committed to making gardening accessible and beneficial for everyone, regardless 
              of their physical or mental health challenges. Our app includes features designed to 
              support therapeutic gardening practices, from gentle reminders to sensory-friendly 
              plant recommendations.
            </p>
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">Founder</h2>
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg p-0">
              <Image
                src="/Founder.png"
                alt="Maxwell Liu, Founder of GrowCommon"
                fill
                className="object-cover"
                style={{ objectPosition: 'center', padding: 0, margin: 0 }}
                priority
                unoptimized
              />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Maxwell Liu</h3>
          <p className="text-muted-foreground mb-3">Founder & Lead Developer</p>
          <p className="text-sm text-muted-foreground">
            Passionate gardener and software engineer dedicated to making gardening accessible 
            and therapeutic for everyone, especially those managing conditions like Tourette's Syndrome.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-16">
        <div className="bg-card rounded-2xl border p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-muted-foreground">Plant Varieties</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">10</div>
              <div className="text-muted-foreground">Common Pests Tracked</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-muted-foreground">User Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-12 text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Gardening Journey?</h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of gardeners who are already growing smarter with GrowCommon
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" asChild>
            <a href="/plant-index">Get Started Free</a>
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-700" asChild>
            <a href="/pricing">View Plans</a>
          </Button>
        </div>
      </div>
    </div>
  )
}




