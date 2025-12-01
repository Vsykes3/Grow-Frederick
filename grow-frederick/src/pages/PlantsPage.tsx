import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Sun, Droplets, Thermometer, Calendar, Leaf } from 'lucide-react';
import { apiService } from '/src/services/api';
import { Button } from '/src/components/ui/Button';
import { ProBadge } from '/src/components/ui/ProBadge';

interface Plant {
  id: number;
  common_name: string;
  scientific_name: string;
  image_url: string;
  family: string;
  genus: string;
  edible?: boolean;
  edible_part?: string[];
  propagation?: string[];
  watering?: string;
  sunlight?: string;
  hardiness?: {
    min: number;
    max: number;
  };
}

interface PlantFilters {
  search: string;
  type: 'all' | 'vegetables' | 'herbs' | 'flowers' | 'fruits';
  season: 'all' | 'spring' | 'summer' | 'fall' | 'winter';
  difficulty: 'all' | 'easy' | 'medium' | 'hard';
  sun: 'all' | 'full_sun' | 'partial_sun' | 'shade';
}

export default function PlantsPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PlantFilters>({
    search: '',
    type: 'all',
    season: 'all',
    difficulty: 'all',
    sun: 'all'
  });

  useEffect(() => {
    loadPlants();
  }, []);

  const loadPlants = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.plants.searchPlants('tomato lettuce basil');
      setPlants(response.data || []);
    } catch (err) {
      setError('Failed to load plants');
      // Load mock data as fallback
      setPlants([
        {
          id: 1,
          common_name: 'Tomato',
          scientific_name: 'Solanum lycopersicum',
          image_url: '/api/placeholder/300/200',
          family: 'Solanaceae',
          genus: 'Solanum',
          edible: true,
          edible_part: ['fruit'],
          propagation: ['seeds'],
          watering: 'regular',
          sunlight: 'full_sun',
          hardiness: { min: 2, max: 11 }
        },
        {
          id: 2,
          common_name: 'Lettuce',
          scientific_name: 'Lactuca sativa',
          image_url: '/api/placeholder/300/200',
          family: 'Asteraceae',
          genus: 'Lactuca',
          edible: true,
          edible_part: ['leaves'],
          propagation: ['seeds'],
          watering: 'regular',
          sunlight: 'partial_sun',
          hardiness: { min: 2, max: 11 }
        },
        {
          id: 3,
          common_name: 'Basil',
          scientific_name: 'Ocimum basilicum',
          image_url: '/api/placeholder/300/200',
          family: 'Lamiaceae',
          genus: 'Ocimum',
          edible: true,
          edible_part: ['leaves'],
          propagation: ['seeds', 'cuttings'],
          watering: 'regular',
          sunlight: 'full_sun',
          hardiness: { min: 4, max: 11 }
        },
        {
          id: 4,
          common_name: 'Pepper',
          scientific_name: 'Capsicum annuum',
          image_url: '/api/placeholder/300/200',
          family: 'Solanaceae',
          genus: 'Capsicum',
          edible: true,
          edible_part: ['fruit'],
          propagation: ['seeds'],
          watering: 'regular',
          sunlight: 'full_sun',
          hardiness: { min: 2, max: 11 }
        },
        {
          id: 5,
          common_name: 'Spinach',
          scientific_name: 'Spinacia oleracea',
          image_url: '/api/placeholder/300/200',
          family: 'Amaranthaceae',
          genus: 'Spinacia',
          edible: true,
          edible_part: ['leaves'],
          propagation: ['seeds'],
          watering: 'regular',
          sunlight: 'partial_sun',
          hardiness: { min: 2, max: 11 }
        },
        {
          id: 6,
          common_name: 'Carrot',
          scientific_name: 'Daucus carota',
          image_url: '/api/placeholder/300/200',
          family: 'Apiaceae',
          genus: 'Daucus',
          edible: true,
          edible_part: ['root'],
          propagation: ['seeds'],
          watering: 'regular',
          sunlight: 'full_sun',
          hardiness: { min: 2, max: 11 }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getSeasonCompatibility = (plant: Plant) => {
    // Mock season compatibility logic
    const currentMonth = new Date().getMonth() + 1;
    if (currentMonth >= 3 && currentMonth <= 5) return 'spring';
    if (currentMonth >= 6 && currentMonth <= 8) return 'summer';
    if (currentMonth >= 9 && currentMonth <= 11) return 'fall';
    return 'winter';
  };

  const getSeasonColor = (season: string) => {
    switch (season) {
      case 'spring': return 'bg-green-100 text-green-800 border-green-200';
      case 'summer': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'fall': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'winter': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyStars = (difficulty: string) => {
    const stars = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
    return Array.from({ length: 3 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getSunIcon = (sunlight: string) => {
    switch (sunlight) {
      case 'full_sun': return <Sun className="w-4 h-4 text-yellow-500" />;
      case 'partial_sun': return <Sun className="w-4 h-4 text-yellow-400" />;
      case 'shade': return <Sun className="w-4 h-4 text-gray-400" />;
      default: return <Sun className="w-4 h-4 text-gray-400" />;
    }
  };

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.common_name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         plant.scientific_name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = filters.type === 'all' || 
                       (filters.type === 'vegetables' && plant.edible) ||
                       (filters.type === 'herbs' && plant.genus === 'Ocimum') ||
                       (filters.type === 'fruits' && plant.edible_part?.includes('fruit'));
    const matchesSeason = filters.season === 'all' || getSeasonCompatibility(plant) === filters.season;
    const matchesSun = filters.sun === 'all' || plant.sunlight === filters.sun;
    
    return matchesSearch && matchesType && matchesSeason && matchesSun;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gc-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading plant database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gc-light/10 to-gc-accent/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gc-dark mb-4">
            Plant Index
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover plants perfect for your garden and growing conditions
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-soft mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search plants..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gc-accent focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value as any })}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gc-accent"
              >
                <option value="all">All Types</option>
                <option value="vegetables">Vegetables</option>
                <option value="herbs">Herbs</option>
                <option value="flowers">Flowers</option>
                <option value="fruits">Fruits</option>
              </select>

              <select
                value={filters.season}
                onChange={(e) => setFilters({ ...filters, season: e.target.value as any })}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gc-accent"
              >
                <option value="all">All Seasons</option>
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="fall">Fall</option>
                <option value="winter">Winter</option>
              </select>

              <select
                value={filters.sun}
                onChange={(e) => setFilters({ ...filters, sun: e.target.value as any })}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gc-accent"
              >
                <option value="all">All Sun</option>
                <option value="full_sun">Full Sun</option>
                <option value="partial_sun">Partial Sun</option>
                <option value="shade">Shade</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Plants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlants.map((plant, index) => {
            const season = getSeasonCompatibility(plant);
            return (
              <motion.div
                key={plant.id}
                className="bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Plant Image */}
                <div className="h-48 bg-gradient-to-br from-gc-light/20 to-gc-accent/20 flex items-center justify-center">
                  <Leaf className="w-16 h-16 text-gc-accent" />
                </div>

                {/* Plant Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gc-dark">{plant.common_name}</h3>
                      <p className="text-sm text-muted-foreground italic">{plant.scientific_name}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeasonColor(season)}`}>
                      {season}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {getSunIcon(plant.sunlight || 'full_sun')}
                      <span className="capitalize">{plant.sunlight?.replace('_', ' ') || 'Full sun'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Droplets className="w-4 h-4 text-blue-500" />
                      <span className="capitalize">{plant.watering || 'Regular'} watering</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Thermometer className="w-4 h-4 text-red-500" />
                      <span>Zones {plant.hardiness?.min || 2}-{plant.hardiness?.max || 11}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {getDifficultyStars('easy')}
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredPlants.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Leaf className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gc-dark mb-2">No plants found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}