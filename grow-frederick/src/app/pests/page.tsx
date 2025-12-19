"use client"

import { useState } from 'react'
import { Search, Filter, AlertTriangle, Bug, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

// Mock pest data
const pests = [
  {
    id: '1',
    name: 'Aphids',
    scientificName: 'Aphidoidea',
    season: 'Spring-Summer',
    affectedPlants: ['Tomato', 'Lettuce', 'Pepper'],
    severity: 'medium',
    description: 'Small, soft-bodied insects that suck sap from plant leaves and stems.',
    organicControls: ['Neem oil', 'Ladybugs', 'Insecticidal soap'],
    images: ['/api/placeholder/300/200']
  },
  {
    id: '2',
    name: 'Tomato Hornworm',
    scientificName: 'Manduca quinquemaculata',
    season: 'Summer',
    affectedPlants: ['Tomato', 'Pepper', 'Eggplant'],
    severity: 'high',
    description: 'Large green caterpillars that can defoliate tomato plants quickly.',
    organicControls: ['Hand picking', 'Bacillus thuringiensis', 'Parasitic wasps'],
    images: ['/api/placeholder/300/200']
  },
  {
    id: '3',
    name: 'Squash Vine Borer',
    scientificName: 'Melittia cucurbitae',
    season: 'Summer',
    affectedPlants: ['Squash', 'Zucchini', 'Pumpkin'],
    severity: 'high',
    description: 'Larva that bores into squash plant stems, causing wilting and death.',
    organicControls: ['Row covers', 'Bacillus thuringiensis', 'Crop rotation'],
    images: ['/api/placeholder/300/200']
  },
  {
    id: '4',
    name: 'Flea Beetles',
    scientificName: 'Alticini',
    season: 'Spring-Summer',
    affectedPlants: ['Eggplant', 'Radish', 'Cabbage'],
    severity: 'medium',
    description: 'Small jumping beetles that create small holes in leaves.',
    organicControls: ['Floating row covers', 'Diatomaceous earth', 'Neem oil'],
    images: ['/api/placeholder/300/200']
  },
  {
    id: '5',
    name: 'Powdery Mildew',
    scientificName: 'Erysiphales',
    season: 'Summer-Fall',
    affectedPlants: ['Cucumber', 'Squash', 'Zucchini'],
    severity: 'medium',
    description: 'Fungal disease that appears as white powdery coating on leaves.',
    organicControls: ['Milk spray', 'Baking soda solution', 'Proper spacing'],
    images: ['/api/placeholder/300/200']
  }
]

const severityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
}

const seasons = ['All Seasons', 'Spring', 'Summer', 'Fall', 'Winter']

export default function PestsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSeason, setSelectedSeason] = useState('All Seasons')
  const [selectedSeverity, setSelectedSeverity] = useState('all')

  const filteredPests = pests.filter(pest => {
    const matchesSearch = pest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pest.affectedPlants.some(plant => 
                           plant.toLowerCase().includes(searchTerm.toLowerCase())
                         )
    const matchesSeason = selectedSeason === 'All Seasons' || 
                         pest.season.toLowerCase().includes(selectedSeason.toLowerCase())
    const matchesSeverity = selectedSeverity === 'all' || pest.severity === selectedSeverity
    
    return matchesSearch && matchesSeason && matchesSeverity
  })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Pest & Disease Guide</h1>
        <p className="text-muted-foreground">
          Identify and manage common garden pests in Frederick County
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search pests or affected plants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-input rounded-md bg-background"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              {seasons.map(season => (
                <option key={season} value={season}>{season}</option>
              ))}
            </select>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="all">All Severity</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-2xl font-bold text-foreground">{pests.length}</div>
          <div className="text-sm text-muted-foreground">Total Pests</div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-2xl font-bold text-red-600">
            {pests.filter(p => p.severity === 'high').length}
          </div>
          <div className="text-sm text-muted-foreground">High Severity</div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-2xl font-bold text-yellow-600">
            {pests.filter(p => p.severity === 'medium').length}
          </div>
          <div className="text-sm text-muted-foreground">Medium Severity</div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-2xl font-bold text-green-600">
            {pests.filter(p => p.severity === 'low').length}
          </div>
          <div className="text-sm text-muted-foreground">Low Severity</div>
        </div>
      </div>

      {/* Pests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPests.map((pest) => (
          <div key={pest.id} className="bg-card rounded-lg border overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <Bug className="h-12 w-12 text-muted-foreground" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{pest.name}</h3>
                  <p className="text-sm text-muted-foreground italic">{pest.scientificName}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityColors[pest.severity]}`}>
                  {pest.severity}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{pest.season}</span>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Affects:</p>
                  <div className="flex flex-wrap gap-1">
                    {pest.affectedPlants.map((plant, index) => (
                      <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {plant}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {pest.description}
              </p>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Organic Controls:</p>
                <div className="flex flex-wrap gap-1">
                  {pest.organicControls.slice(0, 2).map((control, index) => (
                    <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {control}
                    </span>
                  ))}
                  {pest.organicControls.length > 2 && (
                    <span className="text-xs text-muted-foreground">
                      +{pest.organicControls.length - 2} more
                    </span>
                  )}
                </div>
              </div>
              
              <Button size="sm" className="w-full mt-4">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPests.length === 0 && (
        <div className="text-center py-12">
          <Bug className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No pests found
          </h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search terms or filters
          </p>
          <Button onClick={() => {
            setSearchTerm('')
            setSelectedSeason('All Seasons')
            setSelectedSeverity('all')
          }}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* Report Sighting */}
      <div className="mt-12 bg-card rounded-lg border p-6">
        <div className="text-center">
          <AlertTriangle className="h-8 w-8 text-amber-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Spotted a new pest?
          </h3>
          <p className="text-muted-foreground mb-4">
            Help the community by reporting pest sightings in your area
          </p>
          <Button>
            Report Sighting
          </Button>
        </div>
      </div>
    </div>
  )
}




