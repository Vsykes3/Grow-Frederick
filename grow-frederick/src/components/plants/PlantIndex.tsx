'use client';

import React, { useState, useMemo } from 'react';
import { useI18n } from '/src/hooks/useI18n';
import { useTheme } from '/src/hooks/useTheme';
import { 
  plantDatabase, 
  type Plant, 
  getPlantsByCategory, 
  getPlantsForSeason, 
  getSeasonalCompatibility,
  getCurrentSeason,
  getDifficultyColor,
  getSeasonCompatibilityColor,
  getWateringFrequencyText,
  getWateringAmountText,
  searchPlants
} from '/src/lib/plants';
import { ProBadge } from '/src/components/ui/ProBadge';
import { PaywallGuard } from '/src/components/ui/PaywallGuard';
import { Button } from '@/components/ui/button';
import { cn } from '/src/lib/utils';

interface PlantIndexProps {
  className?: string;
}

type FilterCategory = 'all' | 'vegetable' | 'herb' | 'fruit' | 'flower' | 'tree' | 'shrub';
type SortOption = 'name' | 'difficulty' | 'season' | 'category';

export function PlantIndex({ className }: PlantIndexProps) {
  const { t, mounted } = useI18n();
  const { resolvedTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [showProOnly, setShowProOnly] = useState(false);

  const currentSeason = getCurrentSeason();

  // Filter and sort plants
  const filteredPlants = useMemo(() => {
    let plants = plantDatabase;

    // Filter by search query
    if (searchQuery) {
      plants = searchPlants(searchQuery);
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      plants = plants.filter(plant => plant.category === selectedCategory);
    }

    // Filter by Pro status
    if (showProOnly) {
      plants = plants.filter(plant => plant.isPro);
    }

    // Sort plants
    plants.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'difficulty':
          return a.difficulty - b.difficulty;
        case 'season':
          const aCompatibility = getSeasonalCompatibility(a, currentSeason);
          const bCompatibility = getSeasonalCompatibility(b, currentSeason);
          const seasonOrder = { excellent: 0, good: 1, fair: 2, poor: 3 };
          return seasonOrder[aCompatibility.compatibility] - seasonOrder[bCompatibility.compatibility];
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return plants;
  }, [searchQuery, selectedCategory, sortBy, showProOnly, currentSeason]);

  const categories: { id: FilterCategory; label: string; icon: string }[] = [
    { id: 'all', label: 'All Plants', icon: 'ðŸŒ±' },
    { id: 'vegetable', label: 'Vegetables', icon: 'ðŸ¥•' },
    { id: 'herb', label: 'Herbs', icon: 'ðŸŒ¿' },
    { id: 'fruit', label: 'Fruits', icon: 'ðŸ“' },
    { id: 'flower', label: 'Flowers', icon: 'ðŸŒ¸' },
    { id: 'tree', label: 'Trees', icon: 'ðŸŒ³' },
    { id: 'shrub', label: 'Shrubs', icon: 'ðŸŒ¿' },
  ];

  if (!mounted) {
    return (
      <div className={cn('flex items-center justify-center h-96', className)}>
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-gc-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gc-dark">
          {t('plants.index')}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover plants perfect for your garden. Each plant includes detailed growing information, 
          seasonal compatibility, and care instructions.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search plants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-10 bg-background border border-gc-light/30 rounded-xl text-gc-dark placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gc-accent"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            ðŸ”
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                'hover:bg-gc-light/20 focus:outline-none focus:ring-2 focus:ring-gc-accent',
                selectedCategory === category.id
                  ? 'bg-gc-accent text-white'
                  : 'bg-background border border-gc-light/30 text-gc-dark hover:border-gc-accent'
              )}
            >
              <span>{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Sort and Options */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gc-dark">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 border border-gc-light/30 rounded-lg bg-background text-gc-dark focus:outline-none focus:ring-2 focus:ring-gc-accent"
            >
              <option value="name">Name</option>
              <option value="difficulty">Difficulty</option>
              <option value="season">Season</option>
              <option value="category">Category</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 text-sm text-gc-dark">
              <input
                type="checkbox"
                checked={showProOnly}
                onChange={(e) => setShowProOnly(e.target.checked)}
                className="rounded"
              />
              Pro plants only
            </label>
          </div>
        </div>
      </div>

      {/* Plants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlants.map((plant) => {
          const compatibility = getSeasonalCompatibility(plant, currentSeason);
          
          return (
            <div
              key={plant.id}
              className="glass rounded-2xl p-6 hover:shadow-lg transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedPlant(plant)}
            >
              {/* Plant Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gc-dark">{plant.name}</h3>
                  <p className="text-sm text-muted-foreground italic">{plant.scientificName}</p>
                </div>
                {plant.isPro && <ProBadge size="sm" />}
              </div>

              {/* Plant Image Placeholder */}
              <div className="w-full h-32 bg-gc-light/20 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">
                  {plant.category === 'vegetable' && 'ðŸ¥•'}
                  {plant.category === 'herb' && 'ðŸŒ¿'}
                  {plant.category === 'fruit' && 'ðŸ“'}
                  {plant.category === 'flower' && 'ðŸŒ¸'}
                  {plant.category === 'tree' && 'ðŸŒ³'}
                  {plant.category === 'shrub' && 'ðŸŒ¿'}
                </span>
              </div>

              {/* Plant Info */}
              <div className="space-y-3">
                {/* Difficulty */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Difficulty:</span>
                  <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getDifficultyColor(plant.difficulty))}>
                    {plant.difficulty}/5
                  </span>
                </div>

                {/* Season Compatibility */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Season:</span>
                  <span className={cn('px-2 py-1 rounded-full text-xs font-medium', getSeasonCompatibilityColor(compatibility.compatibility))}>
                    {compatibility.compatibility}
                  </span>
                </div>

                {/* Watering Schedule */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Watering:</span>
                  <span className="text-sm text-gc-dark">
                    {getWateringFrequencyText(plant.wateringSchedule.frequency)}
                  </span>
                </div>

                {/* Sun Requirements */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Sun:</span>
                  <span className="text-sm text-gc-dark capitalize">
                    {plant.sunRequirements.replace('-', ' ')}
                  </span>
                </div>

                {/* Maturity */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Harvest:</span>
                  <span className="text-sm text-gc-dark">
                    {plant.maturity.daysToHarvest < 365 
                      ? `${plant.maturity.daysToHarvest} days`
                      : `${Math.round(plant.maturity.daysToHarvest / 365)} years`
                    }
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mt-4 line-clamp-2">
                {plant.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredPlants.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">ðŸ”</div>
          <h3 className="text-xl font-semibold text-gc-dark mb-2">No plants found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Plant Detail Modal */}
      {selectedPlant && (
        <PlantDetailModal
          plant={selectedPlant}
          onClose={() => setSelectedPlant(null)}
        />
      )}
    </div>
  );
}

interface PlantDetailModalProps {
  plant: Plant;
  onClose: () => void;
}

function PlantDetailModal({ plant, onClose }: PlantDetailModalProps) {
  const { t } = useI18n();
  const currentSeason = getCurrentSeason();
  const compatibility = getSeasonalCompatibility(plant, currentSeason);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gc-dark">{plant.name}</h2>
              <p className="text-muted-foreground italic">{plant.scientificName}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gc-light/20 rounded-lg transition-colors"
            >
              âœ•
            </button>
          </div>

          {/* Plant Image */}
          <div className="w-full h-48 bg-gc-light/20 rounded-xl mb-6 flex items-center justify-center">
            <span className="text-6xl">
              {plant.category === 'vegetable' && 'ðŸ¥•'}
              {plant.category === 'herb' && 'ðŸŒ¿'}
              {plant.category === 'fruit' && 'ðŸ“'}
              {plant.category === 'flower' && 'ðŸŒ¸'}
              {plant.category === 'tree' && 'ðŸŒ³'}
              {plant.category === 'shrub' && 'ðŸŒ¿'}
            </span>
          </div>

          {/* Description */}
          <p className="text-gc-dark mb-6">{plant.description}</p>

          {/* Key Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gc-light/10 rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Difficulty</div>
              <div className={cn('text-lg font-semibold', getDifficultyColor(plant.difficulty))}>
                {plant.difficulty}/5
              </div>
            </div>
            <div className="bg-gc-light/10 rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Current Season</div>
              <div className={cn('text-lg font-semibold', getSeasonCompatibilityColor(compatibility.compatibility))}>
                {compatibility.compatibility}
              </div>
            </div>
            <div className="bg-gc-light/10 rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Watering</div>
              <div className="text-lg font-semibold text-gc-dark">
                {getWateringFrequencyText(plant.wateringSchedule.frequency)}
              </div>
            </div>
            <div className="bg-gc-light/10 rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Sun</div>
              <div className="text-lg font-semibold text-gc-dark capitalize">
                {plant.sunRequirements.replace('-', ' ')}
              </div>
            </div>
          </div>

          {/* Growing Tips */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gc-dark mb-3">Growing Tips</h3>
            <ul className="space-y-2">
              {plant.growingTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gc-dark">
                  <span className="text-gc-accent mt-1">â€¢</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Companion Plants */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gc-dark mb-3">Companion Plants</h3>
            <div className="flex flex-wrap gap-2">
              {plant.companionPlants.map((companion, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gc-accent/10 text-gc-accent rounded-full text-sm"
                >
                  {companion}
                </span>
              ))}
            </div>
          </div>

          {/* Pro Features */}
          {plant.isPro && (
            <PaywallGuard>
              <div className="bg-gc-light/10 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gc-dark mb-3">Pro Features</h3>
                <ul className="space-y-2 text-sm text-gc-dark">
                  <li>â€¢ Detailed pest management guide</li>
                  <li>â€¢ Soil testing recommendations</li>
                  <li>â€¢ Harvest timing optimization</li>
                  <li>â€¢ Disease prevention strategies</li>
                </ul>
              </div>
            </PaywallGuard>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button className="flex-1">
              Add to Garden
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

