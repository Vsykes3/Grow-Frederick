'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LockBadge } from '@/components/ui/lock-badge';

export default function ProStarterPackPage() {
  const [selectedRegion, setSelectedRegion] = useState('mid-atlantic');

  const regions = [
    { id: 'northeast', name: 'Northeast', states: ['ME', 'NH', 'VT', 'MA', 'RI', 'CT', 'NY', 'NJ', 'PA'] },
    { id: 'mid-atlantic', name: 'Mid-Atlantic', states: ['MD', 'DE', 'VA', 'WV', 'DC'] },
    { id: 'southeast', name: 'Southeast', states: ['NC', 'SC', 'GA', 'FL', 'AL', 'MS', 'TN', 'KY'] },
    { id: 'midwest', name: 'Midwest', states: ['OH', 'IN', 'IL', 'MI', 'WI', 'MN', 'IA', 'MO'] },
    { id: 'southwest', name: 'Southwest', states: ['TX', 'OK', 'AR', 'LA', 'NM', 'AZ'] },
    { id: 'mountain', name: 'Mountain', states: ['CO', 'UT', 'NV', 'WY', 'MT', 'ID'] },
    { id: 'pacific-northwest', name: 'Pacific Northwest', states: ['WA', 'OR', 'AK'] },
    { id: 'california', name: 'California', states: ['CA'] }
  ];

  const seasonalTips = {
    'mid-atlantic': {
      spring: [
        'Start seeds indoors 6-8 weeks before last frost (mid-March for Frederick County)',
        'Plant cool-season crops like lettuce, spinach, and peas in early April',
        'Prepare garden beds by adding compost and testing soil pH',
        'Set up trellises for vining crops before planting',
        'Begin hardening off seedlings in late April'
      ],
      summer: [
        'Plant warm-season crops after last frost (mid-May for Frederick County)',
        'Mulch around plants to retain moisture and suppress weeds',
        'Water deeply and consistently, especially during dry spells',
        'Harvest regularly to encourage continued production',
        'Watch for common pests like tomato hornworm and squash vine borer'
      ],
      fall: [
        'Plant fall crops like kale, spinach, and radishes in late August',
        'Harvest remaining summer crops before first frost',
        'Add compost and cover crops to improve soil for next year',
        'Save seeds from your best performing plants',
        'Clean and store garden tools properly'
      ],
      winter: [
        'Plan next year\'s garden layout and order seeds',
        'Start seeds indoors for early spring crops',
        'Prune fruit trees and berry bushes',
        'Protect tender perennials with mulch or covers',
        'Take time to learn about new gardening techniques'
      ]
    }
  };

  const currentRegion = regions.find(r => r.id === selectedRegion);
  const tips = seasonalTips[selectedRegion as keyof typeof seasonalTips] || seasonalTips['mid-atlantic'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Pro Starter Pack
            <LockBadge plan="pro" className="ml-4" />
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized gardening advice, regional tips, and seasonal guidance 
            tailored to your specific location and growing zone.
          </p>
        </div>

        {/* Region Selector */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Select Your Region
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  selectedRegion === region.id
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <h3 className="font-semibold mb-2">{region.name}</h3>
                <p className="text-sm text-gray-500">
                  {region.states.join(', ')}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Seasonal Tips */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {Object.entries(tips).map(([season, seasonTips]) => (
            <div key={season} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 capitalize">
                {season} Tips
              </h3>
              <ul className="space-y-3">
                {seasonTips.map((tip, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Regional Planting Calendar */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            {currentRegion?.name} Planting Calendar
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Early Spring (March-April)</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Lettuce & Spinach</li>
                <li>• Peas & Radishes</li>
                <li>• Onions & Garlic</li>
                <li>• Start tomato seeds indoors</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Late Spring (May-June)</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Tomatoes & Peppers</li>
                <li>• Cucumbers & Squash</li>
                <li>• Beans & Corn</li>
                <li>• Herbs (basil, oregano)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Fall (August-September)</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Kale & Collards</li>
                <li>• Carrots & Beets</li>
                <li>• Lettuce (fall varieties)</li>
                <li>• Garlic (for next year)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Frederick County Specific Tips */}
        {selectedRegion === 'mid-atlantic' && (
          <div className="bg-green-50 rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-semibold text-green-900 mb-4">
              Frederick County Specific Tips
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-3">Climate & Soil</h3>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• USDA Zone 6b-7a with variable microclimates</li>
                  <li>• Last frost typically mid-April to early May</li>
                  <li>• First frost usually late October to early November</li>
                  <li>• Soil tends to be clay-heavy, amend with compost</li>
                  <li>• Good drainage is essential for most crops</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-3">Local Considerations</h3>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Deer pressure is high - consider fencing</li>
                  <li>• Japanese beetles are common in summer</li>
                  <li>• Squash vine borer affects cucurbits</li>
                  <li>• Late blight can affect tomatoes in wet years</li>
                  <li>• Consider native plants for easier maintenance</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Printable Resources */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Printable Resources
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Planting Calendar PDF
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Download a printable calendar with planting dates for your region.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => alert('PDF generation not implemented in demo')}
              >
                Download PDF
              </Button>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Garden Planning Worksheet
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Plan your garden layout with our printable worksheet.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => alert('Worksheet generation not implemented in demo')}
              >
                Download Worksheet
              </Button>
            </div>
          </div>
        </div>

        {/* Upgrade Prompt */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Unlock Your Full Gardening Potential
          </h2>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Get access to personalized tips, advanced planning tools, and expert advice 
            tailored specifically to your location and growing conditions.
          </p>
          <div className="space-x-4">
            <Button 
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100"
              onClick={() => window.location.href = '/pricing'}
            >
              Upgrade to Pro
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-green-600"
              onClick={() => window.location.href = '/about'}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}















