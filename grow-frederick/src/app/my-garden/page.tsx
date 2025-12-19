"use client"

import { useState } from 'react'
import { Plus, Grid, List, Download, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LockBadge } from '@/components/ui/lock-badge'
import { FeatureGate } from '@/components/ui/lock-badge'

// Mock garden data
const gardenPlants = [
  {
    id: '1',
    plantName: 'Tomato',
    nickname: 'Big Red',
    datePlanted: '2024-03-15',
    status: 'GROWING',
    location: 'Raised Bed A',
    notes: 'Looking healthy, first flowers appearing'
  },
  {
    id: '2',
    plantName: 'Basil',
    nickname: 'Sweet Basil',
    datePlanted: '2024-04-01',
    status: 'GROWING',
    location: 'Herb Garden',
    notes: 'Ready for first harvest'
  },
  {
    id: '3',
    plantName: 'Lettuce',
    nickname: 'Spring Mix',
    datePlanted: '2024-02-20',
    status: 'HARVESTED',
    location: 'Container 1',
    notes: 'Harvested 3 times, replanting soon'
  }
]

const statusColors = {
  PLANNED: 'bg-blue-100 text-blue-800',
  GROWING: 'bg-green-100 text-green-800',
  HARVESTED: 'bg-yellow-100 text-yellow-800',
  FAILED: 'bg-red-100 text-red-800'
}

export default function MyGardenPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredPlants = gardenPlants.filter(plant => 
    filterStatus === 'all' || plant.status === filterStatus
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Garden</h1>
          <p className="text-muted-foreground">
            Track your plants and their growth progress
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Plant
          </Button>
          <FeatureGate
            hasAccess={false} // This would come from user session
            featureName="Export Garden Data"
            upgradeRequired="Pro"
            onUpgrade={() => window.location.href = '/pricing'}
          >
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </FeatureGate>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-2xl font-bold text-foreground">{gardenPlants.length}</div>
          <div className="text-sm text-muted-foreground">Total Plants</div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-2xl font-bold text-green-600">
            {gardenPlants.filter(p => p.status === 'GROWING').length}
          </div>
          <div className="text-sm text-muted-foreground">Growing</div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-2xl font-bold text-yellow-600">
            {gardenPlants.filter(p => p.status === 'HARVESTED').length}
          </div>
          <div className="text-sm text-muted-foreground">Harvested</div>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <div className="text-2xl font-bold text-blue-600">
            {gardenPlants.filter(p => p.status === 'PLANNED').length}
          </div>
          <div className="text-sm text-muted-foreground">Planned</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-input rounded-md bg-background"
          >
            <option value="all">All Status</option>
            <option value="PLANNED">Planned</option>
            <option value="GROWING">Growing</option>
            <option value="HARVESTED">Harvested</option>
            <option value="FAILED">Failed</option>
          </select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Free Plan Limitation Notice */}
      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-center gap-2">
          <LockBadge size="sm" />
          <p className="text-amber-800">
            Free plan limited to 10 plants. You have {gardenPlants.length}/10 plants.
            <Button variant="link" className="p-0 h-auto text-amber-800 underline">
              Upgrade to Pro
            </Button> for unlimited plants.
          </p>
        </div>
      </div>

      {/* Plants Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlants.map((plant) => (
            <div key={plant.id} className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{plant.plantName}</h3>
                  <p className="text-sm text-muted-foreground">{plant.nickname}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[plant.status]}`}>
                  {plant.status.toLowerCase()}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="text-sm">
                  <span className="text-muted-foreground">Planted:</span> {plant.datePlanted}
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Location:</span> {plant.location}
                </div>
                {plant.notes && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Notes:</span> {plant.notes}
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Log Activity
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPlants.map((plant) => (
            <div key={plant.id} className="bg-card rounded-lg border p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-lg">{plant.plantName}</h3>
                      <p className="text-sm text-muted-foreground">{plant.nickname}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[plant.status]}`}>
                      {plant.status.toLowerCase()}
                    </span>
                  </div>
                  <div className="flex gap-6 mt-2 text-sm text-muted-foreground">
                    <span>Planted: {plant.datePlanted}</span>
                    <span>Location: {plant.location}</span>
                    {plant.notes && <span>Notes: {plant.notes}</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    Log Activity
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredPlants.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {filterStatus === 'all' ? 'No plants in your garden yet' : 'No plants with this status'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {filterStatus === 'all' 
              ? 'Start by adding your first plant to track its growth.'
              : 'Try changing the filter to see more plants.'
            }
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Plant
          </Button>
        </div>
      )}
    </div>
  )
}




