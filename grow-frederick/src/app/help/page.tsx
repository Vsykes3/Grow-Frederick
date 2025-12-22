'use client'

import React from 'react';
import { HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-foreground mb-4">Help Center</h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions and learn how to get the most out of GrowCommon
            </p>
          </div>

          <div className="space-y-8">
            {/* Getting Started */}
            <section className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Getting Started</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-bold mb-2 text-foreground">How do I add plants to My Garden?</h3>
                  <p className="text-muted-foreground">
                    Navigate to Plant Index, find a plant you like, and click "Add to Garden". 
                    If you have multiple gardens, you'll be asked to select which one. If you don't have any gardens yet, a new one will be created automatically.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-bold mb-2 text-foreground">What is my USDA hardiness zone?</h3>
                  <p className="text-muted-foreground">
                    Frederick County, Maryland is in Zone 6b-7a. Check the Map section for more details about your specific location and recommended plants for your zone.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-bold mb-2 text-foreground">How do I create multiple gardens?</h3>
                  <p className="text-muted-foreground">
                    In the My Garden section, click "Create New Garden" to add additional gardens. You can manage multiple garden plots, containers, or growing spaces.
                  </p>
                </div>
              </div>
            </section>

            {/* Account & Billing */}
            <section className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Account & Billing</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-bold mb-2 text-foreground">How do I upgrade to Pro?</h3>
                  <p className="text-muted-foreground">
                    Visit the <Link href="/pricing" className="text-primary hover:underline">Pricing</Link> page and click "Start 7-Day Free Trial" on the Pro plan.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-bold mb-2 text-foreground">Can I cancel anytime?</h3>
                  <p className="text-muted-foreground">
                    Yes! You can cancel your subscription anytime from <Link href="/settings" className="text-primary hover:underline">Settings</Link>. Your subscription will remain active until the end of the current billing period.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-bold mb-2 text-foreground">What payment methods do you accept?</h3>
                  <p className="text-muted-foreground">
                    We accept Visa, Mastercard, American Express, and Discover. All payments are processed securely and encrypted.
                  </p>
                </div>
              </div>
            </section>

            {/* Using Features */}
            <section className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Using Features</h2>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-bold mb-2 text-foreground">How does the Calendar work?</h3>
                  <p className="text-muted-foreground">
                    The Calendar automatically generates harvest dates based on your plants in My Garden. You can also add custom events like planting dates, fertilizing schedules, and more.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-bold mb-2 text-foreground">How do I report a pest sighting?</h3>
                  <p className="text-muted-foreground">
                    Go to the <Link href="/pests" className="text-primary hover:underline">Pests</Link> section and click "Report a Sighting". Fill out the form with details about what you saw, when, and where.
                  </p>
                </div>
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="font-bold mb-2 text-foreground">Can I export my garden data?</h3>
                  <p className="text-muted-foreground">
                    Yes! Go to <Link href="/settings" className="text-primary hover:underline">Settings</Link> and click "Export My Data" to download all your garden information.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Support */}
            <section className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Contact Support</h2>
              <p className="text-muted-foreground mb-4">
                Need more help? Our support team is here for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Contact Form
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
