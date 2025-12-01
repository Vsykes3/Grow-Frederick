// lib/plants.ts
/**
 * Plant database and management for GrowCommon
 * Includes seasonal compatibility, watering schedules, and growing information
 */

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  category: 'vegetable' | 'herb' | 'fruit' | 'flower' | 'tree' | 'shrub';
  difficulty: 1 | 2 | 3 | 4 | 5; // 1 = easiest, 5 = hardest
  hardinessZones: string[];
  plantingSeasons: {
    spring: boolean;
    summer: boolean;
    fall: boolean;
    winter: boolean;
  };
  wateringSchedule: {
    frequency: 'daily' | 'every-other-day' | 'weekly' | 'bi-weekly' | 'monthly';
    amount: 'light' | 'moderate' | 'heavy';
    notes?: string;
  };
  soilRequirements: {
    type: 'sandy' | 'loamy' | 'clay' | 'any';
    ph: {
      min: number;
      max: number;
    };
    drainage: 'excellent' | 'good' | 'moderate' | 'poor';
  };
  sunRequirements: 'full-sun' | 'partial-sun' | 'partial-shade' | 'full-shade';
  spacing: {
    betweenPlants: string;
    betweenRows: string;
  };
  maturity: {
    daysToHarvest: number;
    harvestWindow: string;
  };
  description: string;
  growingTips: string[];
  commonPests: string[];
  companionPlants: string[];
  imageUrl?: string;
  isPro: boolean;
}

export interface SeasonalCompatibility {
  plant: Plant;
  currentSeason: 'spring' | 'summer' | 'fall' | 'winter';
  compatibility: 'excellent' | 'good' | 'fair' | 'poor';
  reason: string;
  recommendations: string[];
}

export interface GardenPlot {
  id: string;
  name: string;
  width: number; // in feet
  height: number; // in feet
  plants: Array<{
    plantId: string;
    x: number;
    y: number;
    plantedDate: Date;
    notes?: string;
  }>;
  soilType: 'sandy' | 'loamy' | 'clay' | 'mixed';
  sunExposure: 'full-sun' | 'partial-sun' | 'partial-shade' | 'full-shade';
}

// Sample plant database
export const plantDatabase: Plant[] = [
  {
    id: 'tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'vegetable',
    difficulty: 2,
    hardinessZones: ['3a', '3b', '4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b', '10a', '10b'],
    plantingSeasons: {
      spring: true,
      summer: false,
      fall: false,
      winter: false,
    },
    wateringSchedule: {
      frequency: 'every-other-day',
      amount: 'moderate',
      notes: 'Water deeply at the base, avoid wetting leaves',
    },
    soilRequirements: {
      type: 'loamy',
      ph: { min: 6.0, max: 6.8 },
      drainage: 'good',
    },
    sunRequirements: 'full-sun',
    spacing: {
      betweenPlants: '24-36 inches',
      betweenRows: '36-48 inches',
    },
    maturity: {
      daysToHarvest: 75,
      harvestWindow: 'Mid-summer to early fall',
    },
    description: 'A warm-season crop that produces juicy, flavorful fruits. Perfect for beginners and experienced gardeners alike.',
    growingTips: [
      'Start seeds indoors 6-8 weeks before last frost',
      'Transplant after soil temperature reaches 60Â°F',
      'Provide support with stakes or cages',
      'Pinch off suckers to encourage fruit production',
    ],
    commonPests: ['Aphids', 'Tomato hornworm', 'Whiteflies', 'Blossom end rot'],
    companionPlants: ['Basil', 'Marigolds', 'Onions', 'Garlic'],
    isPro: false,
  },
  {
    id: 'lettuce',
    name: 'Lettuce',
    scientificName: 'Lactuca sativa',
    category: 'vegetable',
    difficulty: 1,
    hardinessZones: ['3a', '3b', '4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b', '10a', '10b', '11a'],
    plantingSeasons: {
      spring: true,
      summer: false,
      fall: true,
      winter: false,
    },
    wateringSchedule: {
      frequency: 'daily',
      amount: 'light',
      notes: 'Keep soil consistently moist but not waterlogged',
    },
    soilRequirements: {
      type: 'loamy',
      ph: { min: 6.0, max: 7.0 },
      drainage: 'good',
    },
    sunRequirements: 'partial-sun',
    spacing: {
      betweenPlants: '6-12 inches',
      betweenRows: '12-18 inches',
    },
    maturity: {
      daysToHarvest: 45,
      harvestWindow: 'Spring and fall',
    },
    description: 'A cool-season crop that grows quickly and provides fresh greens for salads. Great for succession planting.',
    growingTips: [
      'Direct sow seeds in early spring or late summer',
      'Thin seedlings to prevent overcrowding',
      'Harvest outer leaves for continuous production',
      'Provide shade in hot weather',
    ],
    commonPests: ['Slugs', 'Aphids', 'Cutworms'],
    companionPlants: ['Radishes', 'Carrots', 'Onions', 'Chives'],
    isPro: false,
  },
  {
    id: 'basil',
    name: 'Basil',
    scientificName: 'Ocimum basilicum',
    category: 'herb',
    difficulty: 1,
    hardinessZones: ['4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b', '10a', '10b', '11a'],
    plantingSeasons: {
      spring: true,
      summer: true,
      fall: false,
      winter: false,
    },
    wateringSchedule: {
      frequency: 'every-other-day',
      amount: 'moderate',
      notes: 'Water at the base, avoid wetting leaves to prevent disease',
    },
    soilRequirements: {
      type: 'loamy',
      ph: { min: 6.0, max: 7.5 },
      drainage: 'excellent',
    },
    sunRequirements: 'full-sun',
    spacing: {
      betweenPlants: '12-18 inches',
      betweenRows: '18-24 inches',
    },
    maturity: {
      daysToHarvest: 60,
      harvestWindow: 'Summer to early fall',
    },
    description: 'A fragrant herb perfect for cooking and companion planting. Easy to grow and harvest throughout the season.',
    growingTips: [
      'Pinch off flower buds to encourage leaf growth',
      'Harvest regularly to promote bushier growth',
      'Plant near tomatoes for natural pest control',
      'Can be grown in containers',
    ],
    commonPests: ['Aphids', 'Whiteflies', 'Japanese beetles'],
    companionPlants: ['Tomatoes', 'Peppers', 'Oregano', 'Marigolds'],
    isPro: false,
  },
  {
    id: 'blueberry',
    name: 'Blueberry',
    scientificName: 'Vaccinium spp.',
    category: 'fruit',
    difficulty: 3,
    hardinessZones: ['3a', '3b', '4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: {
      spring: true,
      summer: false,
      fall: true,
      winter: false,
    },
    wateringSchedule: {
      frequency: 'weekly',
      amount: 'heavy',
      notes: 'Requires consistent moisture, especially during fruiting',
    },
    soilRequirements: {
      type: 'sandy',
      ph: { min: 4.5, max: 5.5 },
      drainage: 'excellent',
    },
    sunRequirements: 'full-sun',
    spacing: {
      betweenPlants: '4-6 feet',
      betweenRows: '8-10 feet',
    },
    maturity: {
      daysToHarvest: 1095, // 3 years
      harvestWindow: 'Early to mid-summer',
    },
    description: 'A perennial shrub that produces sweet, antioxidant-rich berries. Requires acidic soil and patience for establishment.',
    growingTips: [
      'Test and amend soil pH before planting',
      'Plant multiple varieties for better pollination',
      'Mulch with pine needles or sawdust',
      'Prune in late winter to encourage new growth',
    ],
    commonPests: ['Blueberry maggot', 'Spotted wing drosophila', 'Birds'],
    companionPlants: ['Azaleas', 'Rhododendrons', 'Pine trees'],
    isPro: true,
  },
  {
    id: 'rosemary',
    name: 'Rosemary',
    scientificName: 'Rosmarinus officinalis',
    category: 'herb',
    difficulty: 2,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b', '10a', '10b', '11a'],
    plantingSeasons: {
      spring: true,
      summer: false,
      fall: true,
      winter: false,
    },
    wateringSchedule: {
      frequency: 'weekly',
      amount: 'light',
      notes: 'Drought tolerant once established, avoid overwatering',
    },
    soilRequirements: {
      type: 'sandy',
      ph: { min: 6.0, max: 7.5 },
      drainage: 'excellent',
    },
    sunRequirements: 'full-sun',
    spacing: {
      betweenPlants: '24-36 inches',
      betweenRows: '36-48 inches',
    },
    maturity: {
      daysToHarvest: 90,
      harvestWindow: 'Year-round in warm climates',
    },
    description: 'A woody perennial herb with aromatic leaves. Great for cooking and as an ornamental plant.',
    growingTips: [
      'Plant in well-draining soil',
      'Prune regularly to maintain shape',
      'Can be grown in containers',
      'Harvest sprigs as needed',
    ],
    commonPests: ['Spider mites', 'Whiteflies', 'Root rot'],
    companionPlants: ['Sage', 'Thyme', 'Lavender', 'Marigolds'],
    isPro: false,
  },
];

/**
 * Get plants by category
 */
export function getPlantsByCategory(category: Plant['category']): Plant[] {
  return plantDatabase.filter(plant => plant.category === category);
}

/**
 * Get plants suitable for current season
 */
export function getPlantsForSeason(season: keyof Plant['plantingSeasons']): Plant[] {
  return plantDatabase.filter(plant => plant.plantingSeasons[season]);
}

/**
 * Get plants by difficulty level
 */
export function getPlantsByDifficulty(difficulty: Plant['difficulty']): Plant[] {
  return plantDatabase.filter(plant => plant.difficulty <= difficulty);
}

/**
 * Get plants by hardiness zone
 */
export function getPlantsByZone(zone: string): Plant[] {
  return plantDatabase.filter(plant => plant.hardinessZones.includes(zone));
}

/**
 * Search plants by name or scientific name
 */
export function searchPlants(query: string): Plant[] {
  const lowercaseQuery = query.toLowerCase();
  return plantDatabase.filter(plant => 
    plant.name.toLowerCase().includes(lowercaseQuery) ||
    plant.scientificName.toLowerCase().includes(lowercaseQuery)
  );
}

/**
 * Get seasonal compatibility for a plant
 */
export function getSeasonalCompatibility(plant: Plant, currentSeason: keyof Plant['plantingSeasons']): SeasonalCompatibility {
  const isPlantingSeason = plant.plantingSeasons[currentSeason];
  
  let compatibility: SeasonalCompatibility['compatibility'];
  let reason: string;
  let recommendations: string[] = [];

  if (isPlantingSeason) {
    compatibility = 'excellent';
    reason = `Perfect time to plant ${plant.name}`;
    recommendations = [
      'Prepare soil with compost',
      'Water regularly after planting',
      'Monitor for pests and diseases',
    ];
  } else {
    switch (currentSeason) {
      case 'spring':
        if (plant.plantingSeasons.fall) {
          compatibility = 'good';
          reason = 'Can be planted in fall for next year';
          recommendations = ['Plan for fall planting', 'Start seeds indoors', 'Prepare garden space'];
        } else {
          compatibility = 'poor';
          reason = 'Not suitable for spring planting';
          recommendations = ['Consider alternative plants', 'Wait for appropriate season'];
        }
        break;
      case 'summer':
        compatibility = 'fair';
        reason = 'Hot weather may stress the plant';
        recommendations = ['Provide extra shade', 'Water more frequently', 'Consider container growing'];
        break;
      case 'fall':
        if (plant.plantingSeasons.spring) {
          compatibility = 'good';
          reason = 'Can be planted in spring';
          recommendations = ['Plan for spring planting', 'Start seeds indoors', 'Prepare garden space'];
        } else {
          compatibility = 'poor';
          reason = 'Not suitable for fall planting';
          recommendations = ['Consider alternative plants', 'Wait for appropriate season'];
        }
        break;
      case 'winter':
        compatibility = 'poor';
        reason = 'Too cold for outdoor planting';
        recommendations = ['Start seeds indoors', 'Use greenhouse or cold frame', 'Wait for warmer weather'];
        break;
    }
  }

  return {
    plant,
    currentSeason,
    compatibility,
    reason,
    recommendations,
  };
}

/**
 * Get difficulty color for UI
 */
export function getDifficultyColor(difficulty: Plant['difficulty']): string {
  switch (difficulty) {
    case 1:
      return 'text-green-600 bg-green-100 dark:bg-green-900/20';
    case 2:
      return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
    case 3:
      return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
    case 4:
      return 'text-red-600 bg-red-100 dark:bg-red-900/20';
    case 5:
      return 'text-red-800 bg-red-200 dark:bg-red-900/40';
    default:
      return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
  }
}

/**
 * Get season compatibility color
 */
export function getSeasonCompatibilityColor(compatibility: SeasonalCompatibility['compatibility']): string {
  switch (compatibility) {
    case 'excellent':
      return 'text-green-600 bg-green-100 dark:bg-green-900/20';
    case 'good':
      return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
    case 'fair':
      return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
    case 'poor':
      return 'text-red-600 bg-red-100 dark:bg-red-900/20';
    default:
      return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
  }
}

/**
 * Get current season based on date
 */
export function getCurrentSeason(): keyof Plant['plantingSeasons'] {
  const month = new Date().getMonth() + 1; // 1-12
  
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  if (month >= 9 && month <= 11) return 'fall';
  return 'winter';
}

/**
 * Get watering frequency display text
 */
export function getWateringFrequencyText(frequency: Plant['wateringSchedule']['frequency']): string {
  switch (frequency) {
    case 'daily':
      return 'Daily';
    case 'every-other-day':
      return 'Every 2 days';
    case 'weekly':
      return 'Weekly';
    case 'bi-weekly':
      return 'Every 2 weeks';
    case 'monthly':
      return 'Monthly';
    default:
      return 'As needed';
  }
}

/**
 * Get watering amount display text
 */
export function getWateringAmountText(amount: Plant['wateringSchedule']['amount']): string {
  switch (amount) {
    case 'light':
      return 'Light';
    case 'moderate':
      return 'Moderate';
    case 'heavy':
      return 'Heavy';
    default:
      return 'Moderate';
  }
}

