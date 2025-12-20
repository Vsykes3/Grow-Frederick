'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import PaymentModal from '@/components/PaymentModal'

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function PricingPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string } | null>(null)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const handleCheckout = (planName: string, price: string) => {
    setSelectedPlan({ name: planName, price })
    setShowPaymentModal(true)
    setPaymentSuccess(false)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false)
    setPaymentSuccess(true)
    // Show success message
    setTimeout(() => {
      setPaymentSuccess(false)
    }, 5000)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Start free and upgrade as your garden grows. All plans include our core features optimized for Frederick County (Zone 6b–7a).
        </p>
      </div>

      {/* Success Message */}
      {paymentSuccess && (
        <div className="max-w-2xl mx-auto mb-8 bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-4">
          <p className="text-green-600 dark:text-green-400">
            <strong>✅ Payment Successful!</strong> Your subscription is now active. Welcome to {selectedPlan?.name}!
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* FREE PLAN */}
        <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-8 bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-2">Free</h2>
          <div className="mb-6">
            <span className="text-5xl font-bold">$0</span>
            <span className="text-gray-600 dark:text-gray-400">/forever</span>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Perfect for getting started with basic gardening features
          </p>
          
          <ul className="space-y-3 mb-8 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-lg flex-shrink-0">✓</span>
              <span>Plant Index access</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-lg flex-shrink-0">✓</span>
              <span>Basic pest information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-lg flex-shrink-0">✓</span>
              <span>Weather widget (3-day)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-lg flex-shrink-0">✓</span>
              <span>My Garden (up to 10 plants)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-lg flex-shrink-0">✓</span>
              <span>Basic calendar events</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-lg flex-shrink-0">✓</span>
              <span>Community access</span>
            </li>
          </ul>
          
          <div className="text-sm text-gray-500 mb-4">
            <strong>Limitations:</strong>
            <ul className="mt-2 space-y-1">
              <li>• Limited to 10 garden plants</li>
              <li>• No advanced filters</li>
              <li>• No calendar reminders</li>
              <li>• No data export</li>
            </ul>
          </div>
          
          <Link
            href="/"
            className="block w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 rounded-lg font-semibold text-center hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Current Plan
          </Link>
        </div>

        {/* PRO PLAN - $9.99/forever */}
        <div className="border-2 border-green-600 rounded-lg p-8 relative shadow-xl bg-white dark:bg-gray-800 transform scale-105">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-1 rounded-full text-sm font-bold">
            MOST POPULAR
          </div>
          
          <h2 className="text-2xl font-bold mb-2 text-green-600">Pro</h2>
          <div className="mb-6">
            <span className="text-5xl font-bold">$9.99</span>
            <span className="text-gray-600 dark:text-gray-400">/forever</span>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Everything you need for serious gardening
          </p>
          
          <ul className="space-y-3 mb-8 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-lg flex-shrink-0">✓</span>
              <span><strong>Everything in Free</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-lg flex-shrink-0">✓</span>
              <span>Unlimited garden plants</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-lg flex-shrink-0">✓</span>
              <span>Advanced plant filters</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-lg flex-shrink-0">✓</span>
              <span>Bulk add to garden</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-lg flex-shrink-0">✓</span>
              <span>Calendar reminders</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-lg flex-shrink-0">✓</span>
              <span>Recurring events</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-lg flex-shrink-0">✓</span>
              <span>Data export (CSV/PDF)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-lg flex-shrink-0">✓</span>
              <span>Pro Starter Pack</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-lg flex-shrink-0">✓</span>
              <span>Advanced map layers</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-lg flex-shrink-0">✓</span>
              <span>Pest forecast</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-lg flex-shrink-0">✓</span>
              <span>Daily tips via email</span>
            </li>
          </ul>
          
          <button
            onClick={() => handleCheckout('Pro', '$9.99')}
            className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition transform hover:scale-105"
          >
            Start 7-Day Free Trial
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-3">
            One-time payment • Lifetime access
          </p>
        </div>

        {/* PREMIUM PLAN - $19.99/month */}
        <div className="border-2 border-blue-500 dark:border-blue-600 rounded-lg p-8 bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-2 text-blue-600">Premium</h2>
          <div className="mb-6">
            <span className="text-5xl font-bold">$19.99</span>
            <span className="text-gray-600 dark:text-gray-400">/month</span>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            The ultimate gardening experience with AI and automation
          </p>
          
          <ul className="space-y-3 mb-8 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
              <span><strong>Everything in Pro</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
              <span>Push notifications</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
              <span>Severe weather alerts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
              <span>Personalized AI schedules</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
              <span>Local events curation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
              <span>Multiple garden locations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 text-lg flex-shrink-0">✓</span>
              <span>Priority support</span>
            </li>
          </ul>
          
          <button
            onClick={() => handleCheckout('Premium', '$19.99')}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition"
          >
            Start 7-Day Free Trial
          </button>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center mt-3">
            7-day free trial • Cancel anytime • Billed monthly at $19.99
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-2">💳 What payment methods do you accept?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We accept all major credit cards including Visa, Mastercard, American Express, and Discover. All payments are processed securely.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-2">🔄 Can I change my plan anytime?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-2 border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-2">💰 Is there a money-back guarantee?</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Yes! We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, we'll refund your payment in full, no questions asked.
            </p>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPlan && (
        <PaymentModal
          planName={selectedPlan.name}
          price={selectedPlan.price}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  )
}
