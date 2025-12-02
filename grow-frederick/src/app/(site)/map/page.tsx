'use client'

import dynamic from 'next/dynamic'

// Import map dynamically (client-side only) to avoid SSR issues
const InteractiveWorldMap = dynamic(
  () => import('@/components/InteractiveWorldMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🗺️</div>
          <p className="text-xl">Loading interactive map...</p>
        </div>
      </div>
    )
  }
)

export default function MapPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-2">Garden Map</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Explore the world and find USDA hardiness zones for any location
      </p>

      <InteractiveWorldMap />
    </div>
  )
}
