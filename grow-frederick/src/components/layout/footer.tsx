'use client';

'use client';

import Link from "next/link"
import { 
  Instagram, 
  Facebook,
  Leaf
} from "lucide-react"

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/growcommon' },
  { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61576548990435' },
]

const footerLinks = {
  product: [
    { name: 'Plant Index', href: '/plant-index' },
    { name: 'My Garden', href: '/my-garden' },
    { name: 'Calendar', href: '/calendar' },
    { name: 'Weather', href: '/weather' },
    { name: 'Map', href: '/map' },
    { name: 'Pests', href: '/pests' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'News', href: '/news' },
    { name: 'Pro Starter Pack', href: '/pro-starter-pack' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Account', href: '/settings' },
    { name: 'Settings', href: '/settings' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ]
}

export function Footer() {
  return (
    <footer 
      className="border-t transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border)',
        color: 'var(--text-primary)',
      }}
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>GrowCommon</span>
            </div>
            <p className="mb-4 max-w-md transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>
              Your smart gardening companion optimized for Frederick County (Zone 6b–7a). 
              Grow smarter with weather intelligence, plant care, and pest alerts.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-link transition-colors duration-300"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{link.name}</span>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover-link transition-colors duration-300"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold mb-4 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover-link transition-colors duration-300"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover-link transition-colors duration-300"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-8 pt-8 transition-colors duration-300" style={{ borderColor: 'var(--border)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-center md:text-left transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>
              <p>&copy; {new Date().getFullYear()} GrowCommon. All rights reserved.</p>
              <p className="mt-1">
                Optimized for Frederick County (Zone 6b–7a) · Powered by OpenWeatherAPI · Powered by GoogleMapsAPI
              </p>
            </div>
            
            <div className="flex space-x-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

