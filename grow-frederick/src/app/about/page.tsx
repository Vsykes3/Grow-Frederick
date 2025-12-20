import { Leaf, Users, Heart, Target, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & Lead Developer',
    bio: 'Passionate gardener and software engineer with 10+ years of experience in both fields.',
    image: '/api/placeholder/150/150'
  },
  {
    name: 'Mike Chen',
    role: 'Horticulture Specialist',
    bio: 'Master gardener and plant pathologist specializing in Zone 6b-7a growing conditions.',
    image: '/api/placeholder/150/150'
  },
  {
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    bio: 'Designer focused on creating intuitive experiences for gardeners of all skill levels.',
    image: '/api/placeholder/150/150'
  }
]

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
              <Button>Get Started</Button>
              <Button variant="outline">Learn More</Button>
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

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Horticultural Therapy Section */}
      <div className="mb-16 bg-green-50 rounded-2xl p-8">
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
            
            <div className="bg-white rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Personal Note from Our Founder</h3>
              <p className="text-muted-foreground italic">
                "As someone who has personally experienced the challenges of Tourette's Syndrome, 
                I can attest to the profound impact that gardening has had on my life. The focus 
                required for planting, the patience needed for growth, and the satisfaction of 
                harvesting have all contributed to better emotional regulation and overall well-being. 
                This is why we've made accessibility and therapeutic benefits core to GrowCommon's mission."
              </p>
              <p className="text-sm text-muted-foreground mt-2">- Sarah Johnson, Founder</p>
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

      {/* Team Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-foreground text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="text-center">
              <div className="w-32 h-32 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-16 w-16 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
              <p className="text-muted-foreground mb-3">{member.role}</p>
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="mb-16">
        <div className="bg-card rounded-2xl border p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">1,200+</div>
              <div className="text-muted-foreground">Active Gardeners</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-muted-foreground">Plant Varieties</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">12</div>
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
          <Button size="lg" variant="secondary">
            Get Started Free
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-700">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  )
}




