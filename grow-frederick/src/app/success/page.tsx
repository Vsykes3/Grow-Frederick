'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold mb-4">Welcome to GrowCommon Pro!</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Your subscription is now active. Start exploring all the premium features!
        </p>
        
        <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">What's Next?</h2>
          <ul className="text-left space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-xl">✓</span>
              <span>Add unlimited plants to your garden</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-xl">✓</span>
              <span>Set up calendar reminders for planting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-xl">✓</span>
              <span>Export your garden data anytime</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 text-xl">✓</span>
              <span>Access advanced pest forecasts</span>
            </li>
          </ul>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/my-garden"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Go to My Garden
          </Link>
          <Link
            href="/plant-index"
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Browse Plants
          </Link>
        </div>

        {sessionId && (
          <p className="text-sm text-gray-500 mt-8">
            Session ID: {sessionId}
          </p>
        )}
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-4xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
