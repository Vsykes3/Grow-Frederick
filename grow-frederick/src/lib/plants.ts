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
    imageUrl: '/assets/GettyImages-1365178498-81dd069cd1514e288e68516bc96df8d4.jpg',
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
    imageUrl: '/assets/tango-oakleaf-lettuce-c6f6417e-b835c4813e1d4cbf9d11ddf09fbd2ea6 (1).jpg',
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
    description: 'Sweet Basil - The #1 culinary herb. A fragrant herb perfect for cooking and companion planting. Easy to grow and harvest throughout the season.',
    growingTips: [
      'Pinch off flower buds to encourage leaf growth',
      'Harvest regularly to promote bushier growth',
      'Plant near tomatoes for natural pest control',
      'Can be grown in containers',
    ],
    commonPests: ['Aphids', 'Whiteflies', 'Japanese beetles'],
    companionPlants: ['Tomatoes', 'Peppers', 'Oregano', 'Marigolds'],
    imageUrl: '/assets/images (6).jpg',
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
    description: 'Blueberry (Highbush) - Zone 6b-7a perfect. A perennial shrub that produces sweet, antioxidant-rich berries. Requires acidic soil and patience for establishment.',
    growingTips: [
      'Test and amend soil pH before planting',
      'Plant multiple varieties for better pollination',
      'Mulch with pine needles or sawdust',
      'Prune in late winter to encourage new growth',
    ],
    commonPests: ['Blueberry maggot', 'Spotted wing drosophila', 'Birds'],
    companionPlants: ['Azaleas', 'Rhododendrons', 'Pine trees'],
    imageUrl: '/assets/blue.jpeg',
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
    description: 'Rosemary - Essential perennial herb. A woody perennial herb with aromatic leaves. Great for cooking and as an ornamental plant.',
    growingTips: [
      'Plant in well-draining soil',
      'Prune regularly to maintain shape',
      'Can be grown in containers',
      'Harvest sprigs as needed',
    ],
    commonPests: ['Spider mites', 'Whiteflies', 'Root rot'],
    companionPlants: ['Sage', 'Thyme', 'Lavender', 'Marigolds'],
    imageUrl: '/assets/51KSLzvs40L._AC_UF894,1000_QL80_.jpg',
    isPro: false,
  },
  // TOMATOES (5 varieties)
  {
    id: 'cherry-tomato',
    name: 'Cherry Tomato',
    scientificName: 'Solanum lycopersicum var. cerasiforme',
    category: 'vegetable',
    difficulty: 2,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Water deeply at base' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 6.8 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '24-36 inches', betweenRows: '36-48 inches' },
    maturity: { daysToHarvest: 60, harvestWindow: 'Mid-summer to early fall' },
    description: 'Small, sweet, prolific. Perfect for containers and snacking. Produces abundant clusters of bite-sized fruits.',
    growingTips: [
      'Start seeds indoors 6-8 weeks before last frost',
      'Provide support with cages or stakes',
      'Harvest when fully colored for best flavor',
      'Great for container gardening',
    ],
    commonPests: ['Aphids', 'Tomato hornworm', 'Whiteflies'],
    companionPlants: ['Basil', 'Marigolds', 'Onions'],
    imageUrl: '/assets/images (9).jpg',
    isPro: false,
  },
  {
    id: 'beefsteak-tomato',
    name: 'Beefsteak Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'vegetable',
    difficulty: 2,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Water deeply at base' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 6.8 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '36-48 inches', betweenRows: '48-60 inches' },
    maturity: { daysToHarvest: 80, harvestWindow: 'Late summer to early fall' },
    description: 'Large slicing tomato for sandwiches and burgers. Produces massive, meaty fruits perfect for slicing.',
    growingTips: [
      'Requires strong support - use heavy-duty cages',
      'Prune lower leaves to improve air circulation',
      'Harvest when fully ripe for best flavor',
      'Needs consistent watering to prevent cracking',
    ],
    commonPests: ['Aphids', 'Tomato hornworm', 'Blossom end rot'],
    companionPlants: ['Basil', 'Marigolds', 'Onions'],
    imageUrl: '/assets/BHG-Beefsteak-Tomatoes-Brandywine-1086937892-76281dc8fae643bb909255406ee532ac.jpg',
    isPro: false,
  },
  {
    id: 'roma-tomato',
    name: 'Roma Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'vegetable',
    difficulty: 2,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Water deeply at base' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 6.8 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '24-30 inches', betweenRows: '36-48 inches' },
    maturity: { daysToHarvest: 75, harvestWindow: 'Mid to late summer' },
    description: 'Paste tomato ideal for sauces and canning. Dense, meaty flesh with fewer seeds, perfect for processing.',
    growingTips: [
      'Determinate variety - all fruits ripen at once',
      'Excellent for making sauces and pastes',
      'Harvest when fully red',
      'Can be preserved by canning',
    ],
    commonPests: ['Aphids', 'Tomato hornworm', 'Whiteflies'],
    companionPlants: ['Basil', 'Marigolds', 'Onions'],
    imageUrl: '/assets/How-to-Plant-and-Grow-Roma-Tomatoes-Featured.jpg',
    isPro: false,
  },
  {
    id: 'heirloom-tomato-brandywine',
    name: 'Heirloom Tomato (Brandywine)',
    scientificName: 'Solanum lycopersicum',
    category: 'vegetable',
    difficulty: 3,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Water deeply at base' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 6.8 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '36-48 inches', betweenRows: '48-60 inches' },
    maturity: { daysToHarvest: 85, harvestWindow: 'Late summer to early fall' },
    description: 'Premium flavor, perfect for farmers market gardeners. Classic heirloom variety with exceptional taste and pink-red fruits.',
    growingTips: [
      'Indeterminate variety - produces all season',
      'Requires staking or caging',
      'Harvest when fully colored for best flavor',
      'Susceptible to cracking - maintain consistent moisture',
    ],
    commonPests: ['Aphids', 'Tomato hornworm', 'Blossom end rot'],
    companionPlants: ['Basil', 'Marigolds', 'Onions'],
    imageUrl: '/assets/71r1XnzXyNL.jpg',
    isPro: false,
  },
  {
    id: 'grape-tomato',
    name: 'Grape Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'vegetable',
    difficulty: 2,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Water deeply at base' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 6.8 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '24-30 inches', betweenRows: '36-48 inches' },
    maturity: { daysToHarvest: 65, harvestWindow: 'Mid-summer to early fall' },
    description: 'Smaller than cherry, excellent for salads and roasting. Oblong shape, sweet flavor, perfect for snacking.',
    growingTips: [
      'Indeterminate variety - produces all season',
      'Great for container growing',
      'Harvest when fully colored',
      'Excellent for roasting whole',
    ],
    commonPests: ['Aphids', 'Tomato hornworm', 'Whiteflies'],
    companionPlants: ['Basil', 'Marigolds', 'Onions'],
    imageUrl: '/assets/images (13).jpg',
    isPro: false,
  },
  // PEPPERS (4 varieties)
  {
    id: 'bell-pepper',
    name: 'Bell Pepper (Green/Red)',
    scientificName: 'Capsicum annuum',
    category: 'vegetable',
    difficulty: 2,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Water deeply at base' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '18-24 inches', betweenRows: '24-36 inches' },
    maturity: { daysToHarvest: 70, harvestWindow: 'Mid to late summer' },
    description: 'Essential kitchen staple, beginner-friendly. Versatile pepper that turns from green to red when fully ripe.',
    growingTips: [
      'Start seeds indoors 8-10 weeks before last frost',
      'Transplant after danger of frost',
      'Harvest green for crisp texture, red for sweetness',
      'Support plants with stakes if needed',
    ],
    commonPests: ['Aphids', 'Pepper maggot', 'Blossom end rot'],
    companionPlants: ['Basil', 'Onions', 'Marigolds'],
    imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=300&fit=crop',
    isPro: false,
  },
  {
    id: 'jalapeno-pepper',
    name: 'Jalapeño Pepper',
    scientificName: 'Capsicum annuum',
    category: 'vegetable',
    difficulty: 2,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Water deeply at base' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '18-24 inches', betweenRows: '24-36 inches' },
    maturity: { daysToHarvest: 75, harvestWindow: 'Mid to late summer' },
    description: 'Most popular hot pepper for home gardens. Medium heat, perfect for salsas, pickling, and cooking.',
    growingTips: [
      'Start seeds indoors 8-10 weeks before last frost',
      'Harvest when 2-3 inches long and dark green',
      'Let some ripen to red for hotter flavor',
      'Wear gloves when handling',
    ],
    commonPests: ['Aphids', 'Pepper maggot', 'Blossom end rot'],
    companionPlants: ['Basil', 'Onions', 'Marigolds'],
    imageUrl: '/assets/eat-me-jalapeno-peper-teelt.jpg',
    isPro: false,
  },
  {
    id: 'banana-pepper',
    name: 'Banana Pepper',
    scientificName: 'Capsicum annuum',
    category: 'vegetable',
    difficulty: 2,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Water deeply at base' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '18-24 inches', betweenRows: '24-36 inches' },
    maturity: { daysToHarvest: 65, harvestWindow: 'Mid to late summer' },
    description: 'Mild, versatile for pickling and fresh eating. Sweet, tangy flavor perfect for sandwiches and salads.',
    growingTips: [
      'Start seeds indoors 8-10 weeks before last frost',
      'Harvest when yellow and 4-6 inches long',
      'Excellent for pickling',
      'Produces abundantly',
    ],
    commonPests: ['Aphids', 'Pepper maggot', 'Blossom end rot'],
    companionPlants: ['Basil', 'Onions', 'Marigolds'],
    imageUrl: '/assets/images (5).jpg',
    isPro: false,
  },
  {
    id: 'cayenne-pepper',
    name: 'Cayenne Pepper',
    scientificName: 'Capsicum annuum',
    category: 'vegetable',
    difficulty: 2,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Water deeply at base' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '18-24 inches', betweenRows: '24-36 inches' },
    maturity: { daysToHarvest: 70, harvestWindow: 'Late summer to early fall' },
    description: 'For hot sauce makers and spice lovers. Long, thin, very hot peppers perfect for drying and grinding.',
    growingTips: [
      'Start seeds indoors 8-10 weeks before last frost',
      'Harvest when red and fully mature',
      'Dry whole peppers for spice powder',
      'Very productive plant',
    ],
    commonPests: ['Aphids', 'Pepper maggot', 'Blossom end rot'],
    companionPlants: ['Basil', 'Onions', 'Marigolds'],
    imageUrl: '/assets/images (8).jpg',
    isPro: false,
  },
  // LEAFY GREENS (4 varieties)
  {
    id: 'romaine-lettuce',
    name: 'Romaine Lettuce',
    scientificName: 'Lactuca sativa var. longifolia',
    category: 'vegetable',
    difficulty: 1,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'daily', amount: 'light', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'partial-sun',
    spacing: { betweenPlants: '8-12 inches', betweenRows: '12-18 inches' },
    maturity: { daysToHarvest: 45, harvestWindow: 'Spring and fall' },
    description: 'Heat-tolerant lettuce for Zone 6b-7a summers. Crisp, upright leaves perfect for Caesar salads.',
    growingTips: [
      'Direct sow in early spring or late summer',
      'Harvest outer leaves for continuous production',
      'Provide afternoon shade in hot weather',
      'Bolts in extreme heat',
    ],
    commonPests: ['Slugs', 'Aphids', 'Cutworms'],
    companionPlants: ['Radishes', 'Carrots', 'Onions'],
    imageUrl: '/assets/lettuce-romaine_1.jpg',
    isPro: false,
  },
  {
    id: 'spinach',
    name: 'Spinach',
    scientificName: 'Spinacia oleracea',
    category: 'vegetable',
    difficulty: 1,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'daily', amount: 'light', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.5 }, drainage: 'good' },
    sunRequirements: 'partial-sun',
    spacing: { betweenPlants: '4-6 inches', betweenRows: '12-18 inches' },
    maturity: { daysToHarvest: 40, harvestWindow: 'Spring and fall' },
    description: 'Cool-season favorite, highly nutritious. Dark green, nutrient-dense leaves perfect for salads and cooking.',
    growingTips: [
      'Direct sow in early spring or late summer',
      'Harvest outer leaves for continuous production',
      'Bolts quickly in hot weather',
      'Succession plant every 2 weeks',
    ],
    commonPests: ['Slugs', 'Aphids', 'Leaf miners'],
    companionPlants: ['Radishes', 'Carrots', 'Onions'],
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop',
    isPro: false,
  },
  {
    id: 'kale-curly',
    name: 'Kale (Curly)',
    scientificName: 'Brassica oleracea var. acephala',
    category: 'vegetable',
    difficulty: 1,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.5 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '12-18 inches', betweenRows: '18-24 inches' },
    maturity: { daysToHarvest: 55, harvestWindow: 'Spring and fall, can overwinter' },
    description: 'Cold-hardy superfood, increasingly popular. Curly leaves packed with vitamins, flavor improves after frost.',
    growingTips: [
      'Direct sow in early spring or late summer',
      'Harvest outer leaves for continuous production',
      'Flavor improves after first frost',
      'Can overwinter in Zone 6b-7a',
    ],
    commonPests: ['Cabbage worms', 'Aphids', 'Flea beetles'],
    companionPlants: ['Beets', 'Onions', 'Herbs'],
    imageUrl: '/assets/030623_T135336_205891_Bonnie_CurlyKale_ALT_02.jpg',
    isPro: false,
  },
  {
    id: 'arugula',
    name: 'Arugula',
    scientificName: 'Eruca vesicaria',
    category: 'vegetable',
    difficulty: 1,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'daily', amount: 'light', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'partial-sun',
    spacing: { betweenPlants: '4-6 inches', betweenRows: '12-18 inches' },
    maturity: { daysToHarvest: 30, harvestWindow: 'Spring and fall' },
    description: 'Fast-growing, peppery green for salads. Adds zesty flavor to salads and sandwiches.',
    growingTips: [
      'Direct sow in early spring or late summer',
      'Harvest when leaves are 2-3 inches',
      'Bolts quickly in hot weather',
      'Succession plant every 2 weeks',
    ],
    commonPests: ['Flea beetles', 'Aphids', 'Slugs'],
    companionPlants: ['Lettuce', 'Radishes', 'Carrots'],
    imageUrl: '/assets/030623_T135336_205891_Bonnie_CurlyKale_ALT_02.jpg',
    isPro: false,
  },
  // CUCURBITS (3 varieties)
  {
    id: 'cucumber-slicing',
    name: 'Cucumber (Slicing)',
    scientificName: 'Cucumis sativus',
    category: 'vegetable',
    difficulty: 2,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'daily', amount: 'moderate', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '12-18 inches', betweenRows: '36-48 inches' },
    maturity: { daysToHarvest: 55, harvestWindow: 'Mid to late summer' },
    description: 'Garden essential, productive and easy. Crisp, refreshing fruits perfect for salads and snacking.',
    growingTips: [
      'Direct sow after last frost',
      'Provide trellis for vertical growth',
      'Harvest when 6-8 inches long',
      'Keep fruits picked to encourage more production',
    ],
    commonPests: ['Cucumber beetles', 'Aphids', 'Powdery mildew'],
    companionPlants: ['Radishes', 'Beans', 'Marigolds'],
    imageUrl: '/assets/images (11).jpg',
    isPro: false,
  },
  {
    id: 'zucchini',
    name: 'Zucchini',
    scientificName: 'Cucurbita pepo',
    category: 'vegetable',
    difficulty: 1,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'daily', amount: 'moderate', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.5 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '24-36 inches', betweenRows: '48-60 inches' },
    maturity: { daysToHarvest: 45, harvestWindow: 'Mid to late summer' },
    description: 'Extremely productive summer squash. One plant can produce dozens of fruits - perfect for sharing!',
    growingTips: [
      'Direct sow after last frost',
      'Harvest when 6-8 inches for best flavor',
      'Check daily - fruits grow quickly',
      'Great for grilling and baking',
    ],
    commonPests: ['Squash bugs', 'Cucumber beetles', 'Powdery mildew'],
    companionPlants: ['Radishes', 'Beans', 'Marigolds'],
    imageUrl: '/assets/courgette-oogsten.jpg',
    isPro: false,
  },
  {
    id: 'butternut-squash',
    name: 'Butternut Squash',
    scientificName: 'Cucurbita moschata',
    category: 'vegetable',
    difficulty: 2,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Water deeply, less frequent' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '36-48 inches', betweenRows: '60-72 inches' },
    maturity: { daysToHarvest: 85, harvestWindow: 'Late summer to early fall' },
    description: 'Fall harvest favorite, stores well. Sweet, nutty flavor perfect for soups, roasting, and pies.',
    growingTips: [
      'Direct sow after last frost',
      'Needs plenty of space to vine',
      'Harvest when skin is hard and tan',
      'Cure in warm place for 2 weeks before storing',
    ],
    commonPests: ['Squash bugs', 'Cucumber beetles', 'Powdery mildew'],
    companionPlants: ['Radishes', 'Beans', 'Marigolds'],
    imageUrl: '/assets/Butternut-squash.jpg',
    isPro: false,
  },
  // ROOT VEGETABLES (2 varieties)
  {
    id: 'carrot-nantes',
    name: 'Carrot (Nantes)',
    scientificName: 'Daucus carota',
    category: 'vegetable',
    difficulty: 2,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'sandy', ph: { min: 6.0, max: 7.0 }, drainage: 'excellent' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '2-3 inches', betweenRows: '12-18 inches' },
    maturity: { daysToHarvest: 65, harvestWindow: 'Late spring to early fall' },
    description: 'Sweet, easy variety for Zone 6b-7a. Cylindrical, sweet roots perfect for fresh eating and storage.',
    growingTips: [
      'Direct sow in loose, stone-free soil',
      'Thin seedlings to prevent crowding',
      'Keep soil consistently moist for straight roots',
      'Harvest when tops are 1/2 to 3/4 inch diameter',
    ],
    commonPests: ['Carrot rust fly', 'Aphids', 'Wireworms'],
    companionPlants: ['Onions', 'Leeks', 'Radishes'],
    imageUrl: '/assets/carrot-2309814_1280-e1588928361423-416x597.jpg',
    isPro: false,
  },
  {
    id: 'radish-cherry-belle',
    name: 'Radish (Cherry Belle)',
    scientificName: 'Raphanus sativus',
    category: 'vegetable',
    difficulty: 1,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'daily', amount: 'light', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '1-2 inches', betweenRows: '12-18 inches' },
    maturity: { daysToHarvest: 25, harvestWindow: 'Spring and fall' },
    description: 'Fast-growing (25 days), perfect for beginners. Crisp, mild radishes perfect for salads and snacking.',
    growingTips: [
      'Direct sow in early spring or late summer',
      'Harvest when 1 inch diameter',
      'Succession plant every 2 weeks',
      'Grows quickly - great for kids',
    ],
    commonPests: ['Flea beetles', 'Root maggots', 'Aphids'],
    companionPlants: ['Lettuce', 'Carrots', 'Cucumbers'],
    imageUrl: '/assets/VRADCHB-A-Cherry-Belle-Radish-Seeds.jpg',
    isPro: false,
  },
  // BRASSICAS (2 varieties)
  {
    id: 'broccoli',
    name: 'Broccoli',
    scientificName: 'Brassica oleracea var. italica',
    category: 'vegetable',
    difficulty: 2,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.5 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '18-24 inches', betweenRows: '24-36 inches' },
    maturity: { daysToHarvest: 60, harvestWindow: 'Spring and fall' },
    description: 'Popular cool-season crop. Nutritious green heads perfect for steaming, roasting, and fresh eating.',
    growingTips: [
      'Start seeds indoors 6-8 weeks before transplant',
      'Transplant in early spring or late summer',
      'Harvest when heads are tight and firm',
      'Side shoots will produce after main head',
    ],
    commonPests: ['Cabbage worms', 'Aphids', 'Flea beetles'],
    companionPlants: ['Onions', 'Beets', 'Herbs'],
    imageUrl: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=400&h=300&fit=crop',
    isPro: false,
  },
  {
    id: 'cabbage-green',
    name: 'Cabbage (Green)',
    scientificName: 'Brassica oleracea var. capitata',
    category: 'vegetable',
    difficulty: 2,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.5 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '18-24 inches', betweenRows: '24-36 inches' },
    maturity: { daysToHarvest: 70, harvestWindow: 'Late spring to early fall' },
    description: 'Long-storing vegetable. Dense heads perfect for coleslaw, sauerkraut, and cooking. Stores well in cool conditions.',
    growingTips: [
      'Start seeds indoors 6-8 weeks before transplant',
      'Transplant in early spring or late summer',
      'Harvest when heads are firm and solid',
      'Can store for months in cool, humid conditions',
    ],
    commonPests: ['Cabbage worms', 'Aphids', 'Flea beetles'],
    companionPlants: ['Onions', 'Beets', 'Herbs'],
    imageUrl: '/assets/images (7).jpg',
    isPro: false,
  },
  // HERBS (12 plants - continuing from existing basil and rosemary)
  {
    id: 'thyme-common',
    name: 'Thyme (Common)',
    scientificName: 'Thymus vulgaris',
    category: 'herb',
    difficulty: 2,
    hardinessZones: ['5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'light', notes: 'Drought tolerant once established' },
    soilRequirements: { type: 'sandy', ph: { min: 6.0, max: 8.0 }, drainage: 'excellent' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '12-18 inches', betweenRows: '18-24 inches' },
    maturity: { daysToHarvest: 75, harvestWindow: 'Year-round' },
    description: 'Hardy perennial, essential for cooking. Small, aromatic leaves perfect for seasoning meats, vegetables, and soups.',
    growingTips: [
      'Plant in well-draining soil',
      'Prune regularly to prevent woody growth',
      'Can be grown in containers',
      'Harvest sprigs as needed',
    ],
    commonPests: ['Spider mites', 'Root rot'],
    companionPlants: ['Rosemary', 'Sage', 'Lavender'],
    imageUrl: '/assets/1870_Thyme_Common__34273.jpg',
    isPro: false,
  },
  {
    id: 'oregano-greek',
    name: 'Oregano (Greek)',
    scientificName: 'Origanum vulgare',
    category: 'herb',
    difficulty: 2,
    hardinessZones: ['5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'light', notes: 'Drought tolerant once established' },
    soilRequirements: { type: 'sandy', ph: { min: 6.0, max: 8.0 }, drainage: 'excellent' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '12-18 inches', betweenRows: '18-24 inches' },
    maturity: { daysToHarvest: 60, harvestWindow: 'Year-round' },
    description: 'Perennial, pizza/pasta essential. Strong, aromatic flavor perfect for Italian and Mediterranean dishes.',
    growingTips: [
      'Plant in well-draining soil',
      'Prune regularly to encourage new growth',
      'Can be grown in containers',
      'Harvest before flowering for best flavor',
    ],
    commonPests: ['Spider mites', 'Root rot'],
    companionPlants: ['Basil', 'Thyme', 'Marigolds'],
    imageUrl: '/assets/images (14).jpg',
    isPro: false,
  },
  {
    id: 'parsley-curly',
    name: 'Parsley (Curly)',
    scientificName: 'Petroselinum crispum',
    category: 'herb',
    difficulty: 2,
    hardinessZones: ['5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'partial-sun',
    spacing: { betweenPlants: '8-12 inches', betweenRows: '12-18 inches' },
    maturity: { daysToHarvest: 70, harvestWindow: 'Year-round' },
    description: 'Biennial, garnish and cooking. Curly leaves perfect for garnishing and adding fresh flavor to dishes.',
    growingTips: [
      'Start seeds indoors - slow to germinate',
      'Harvest outer leaves for continuous production',
      'Can overwinter in Zone 6b-7a',
      'Great for container growing',
    ],
    commonPests: ['Aphids', 'Leaf miners', 'Slugs'],
    companionPlants: ['Tomatoes', 'Asparagus', 'Chives'],
    imageUrl: 'https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400&h=300&fit=crop',
    isPro: false,
  },
  {
    id: 'cilantro',
    name: 'Cilantro',
    scientificName: 'Coriandrum sativum',
    category: 'herb',
    difficulty: 1,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'partial-sun',
    spacing: { betweenPlants: '6-8 inches', betweenRows: '12-18 inches' },
    maturity: { daysToHarvest: 45, harvestWindow: 'Spring and fall' },
    description: 'Fast-growing annual, Mexican/Asian cooking. Fresh, citrusy leaves essential for salsas and curries.',
    growingTips: [
      'Direct sow in early spring or late summer',
      'Harvest when leaves are 4-6 inches',
      'Bolts quickly in hot weather',
      'Succession plant every 2-3 weeks',
    ],
    commonPests: ['Aphids', 'Leaf miners'],
    companionPlants: ['Tomatoes', 'Peppers', 'Basil'],
    imageUrl: '/assets/cilantro-photo-vert.jpg',
    isPro: false,
  },
  {
    id: 'mint-spearmint',
    name: 'Mint (Spearmint)',
    scientificName: 'Mentha spicata',
    category: 'herb',
    difficulty: 1,
    hardinessZones: ['3a', '3b', '4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.5 }, drainage: 'good' },
    sunRequirements: 'partial-sun',
    spacing: { betweenPlants: '18-24 inches', betweenRows: '24-36 inches' },
    maturity: { daysToHarvest: 60, harvestWindow: 'Year-round' },
    description: 'Perennial, tea and mojitos. Refreshing, aromatic leaves perfect for beverages, desserts, and cooking.',
    growingTips: [
      'Grow in containers to prevent spreading',
      'Harvest regularly to encourage new growth',
      'Can be invasive - contain roots',
      'Great for shady areas',
    ],
    commonPests: ['Spider mites', 'Aphids', 'Rust'],
    companionPlants: ['Cabbage', 'Tomatoes', 'Peppers'],
    imageUrl: '/assets/Mint_spearmint2.jpg',
    isPro: false,
  },
  {
    id: 'chives',
    name: 'Chives',
    scientificName: 'Allium schoenoprasum',
    category: 'herb',
    difficulty: 1,
    hardinessZones: ['3a', '3b', '4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '8-12 inches', betweenRows: '12-18 inches' },
    maturity: { daysToHarvest: 60, harvestWindow: 'Year-round' },
    description: 'Perennial onion flavor, edible flowers. Mild onion taste perfect for garnishing and cooking.',
    growingTips: [
      'Divide clumps every 3-4 years',
      'Harvest by cutting leaves at base',
      'Edible purple flowers in spring',
      'Great for container growing',
    ],
    commonPests: ['Onion thrips', 'Rust'],
    companionPlants: ['Carrots', 'Tomatoes', 'Rosemary'],
    imageUrl: '/assets/images (10).jpg',
    isPro: false,
  },
  {
    id: 'dill',
    name: 'Dill',
    scientificName: 'Anethum graveolens',
    category: 'herb',
    difficulty: 1,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 5.5, max: 7.5 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '12-18 inches', betweenRows: '18-24 inches' },
    maturity: { daysToHarvest: 50, harvestWindow: 'Summer' },
    description: 'Annual, pickling and fish dishes. Feathery leaves and seeds perfect for pickling and seafood.',
    growingTips: [
      'Direct sow in early spring',
      'Harvest leaves when young',
      'Let some plants go to seed for dill seed',
      'Attracts beneficial insects',
    ],
    commonPests: ['Aphids', 'Caterpillars'],
    companionPlants: ['Cabbage', 'Onions', 'Cucumbers'],
    imageUrl: '/assets/GettyImages-1091224196-a633541a6d444765bf108f86b92b2454.jpg',
    isPro: false,
  },
  {
    id: 'sage',
    name: 'Sage',
    scientificName: 'Salvia officinalis',
    category: 'herb',
    difficulty: 2,
    hardinessZones: ['5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'light', notes: 'Drought tolerant once established' },
    soilRequirements: { type: 'sandy', ph: { min: 6.0, max: 7.0 }, drainage: 'excellent' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '18-24 inches', betweenRows: '24-36 inches' },
    maturity: { daysToHarvest: 75, harvestWindow: 'Year-round' },
    description: 'Perennial, Thanksgiving herb. Aromatic, gray-green leaves essential for holiday cooking and stuffing.',
    growingTips: [
      'Plant in well-draining soil',
      'Prune regularly to prevent woody growth',
      'Can be grown in containers',
      'Harvest leaves as needed',
    ],
    commonPests: ['Spider mites', 'Root rot'],
    companionPlants: ['Rosemary', 'Thyme', 'Lavender'],
    imageUrl: '/assets/the-medicinal-uses-and-health-benefits-of-sage_f0b0c974-33be-4e34-a971-6da1d79456c9.jpg',
    isPro: false,
  },
  {
    id: 'lavender-english',
    name: 'Lavender (English)',
    scientificName: 'Lavandula angustifolia',
    category: 'herb',
    difficulty: 2,
    hardinessZones: ['5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'light', notes: 'Drought tolerant once established' },
    soilRequirements: { type: 'sandy', ph: { min: 6.5, max: 8.0 }, drainage: 'excellent' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '24-36 inches', betweenRows: '36-48 inches' },
    maturity: { daysToHarvest: 120, harvestWindow: 'Summer' },
    description: 'Perennial, fragrant, medicinal. Beautiful purple flowers and aromatic leaves perfect for sachets and teas.',
    growingTips: [
      'Plant in well-draining, alkaline soil',
      'Prune after flowering',
      'Great for borders and containers',
      'Attracts pollinators',
    ],
    commonPests: ['Root rot', 'Fungal diseases'],
    companionPlants: ['Rosemary', 'Sage', 'Thyme'],
    imageUrl: '/assets/Lavender__42369.jpg',
    isPro: false,
  },
  {
    id: 'lemon-balm',
    name: 'Lemon Balm',
    scientificName: 'Melissa officinalis',
    category: 'herb',
    difficulty: 1,
    hardinessZones: ['4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.5 }, drainage: 'good' },
    sunRequirements: 'partial-sun',
    spacing: { betweenPlants: '18-24 inches', betweenRows: '24-36 inches' },
    maturity: { daysToHarvest: 70, harvestWindow: 'Year-round' },
    description: 'Perennial, tea herb, pollinator attractor. Lemon-scented leaves perfect for tea and attracting bees.',
    growingTips: [
      'Can be invasive - contain roots',
      'Harvest leaves before flowering',
      'Great for shady areas',
      'Attracts beneficial insects',
    ],
    commonPests: ['Aphids', 'Spider mites'],
    companionPlants: ['Tomatoes', 'Cabbage', 'Broccoli'],
    imageUrl: '/assets/40040-LemonBalm.jpg',
    isPro: false,
  },
  // FRUITS (8 plants)
  {
    id: 'strawberry-junebearing',
    name: 'Strawberry (Junebearing)',
    scientificName: 'Fragaria × ananassa',
    category: 'fruit',
    difficulty: 2,
    hardinessZones: ['4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 5.5, max: 6.5 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '12-18 inches', betweenRows: '24-36 inches' },
    maturity: { daysToHarvest: 365, harvestWindow: 'Late spring to early summer' },
    description: 'Classic spring berry. Produces large, sweet berries in early summer. Perfect for fresh eating and preserves.',
    growingTips: [
      'Plant in early spring or fall',
      'Mulch with straw to keep fruits clean',
      'Remove runners first year for better production',
      'Replace plants every 3-4 years',
    ],
    commonPests: ['Slugs', 'Birds', 'Spider mites'],
    companionPlants: ['Borage', 'Lettuce', 'Spinach'],
    imageUrl: '/assets/RddfgBy4GMj4XDxtPKboQG.jpg',
    isPro: false,
  },
  {
    id: 'raspberry-red',
    name: 'Raspberry (Red)',
    scientificName: 'Rubus idaeus',
    category: 'fruit',
    difficulty: 3,
    hardinessZones: ['4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 5.5, max: 6.5 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '24-36 inches', betweenRows: '48-60 inches' },
    maturity: { daysToHarvest: 365, harvestWindow: 'Summer' },
    description: 'Summer harvest, easy to grow. Sweet, delicate berries perfect for fresh eating, jams, and desserts.',
    growingTips: [
      'Plant in early spring or fall',
      'Provide trellis for support',
      'Prune canes after fruiting',
      'Produces on second-year canes',
    ],
    commonPests: ['Japanese beetles', 'Birds', 'Raspberry cane borers'],
    companionPlants: ['Marigolds', 'Garlic', 'Chives'],
    imageUrl: '/assets/images (15).jpg',
    isPro: false,
  },
  {
    id: 'blackberry-thornless',
    name: 'Blackberry (Thornless)',
    scientificName: 'Rubus fruticosus',
    category: 'fruit',
    difficulty: 3,
    hardinessZones: ['5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 5.5, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '36-48 inches', betweenRows: '60-72 inches' },
    maturity: { daysToHarvest: 365, harvestWindow: 'Late summer to early fall' },
    description: 'Less maintenance than thorny varieties. Large, sweet berries without the thorns - perfect for home gardens.',
    growingTips: [
      'Plant in early spring or fall',
      'Provide trellis for support',
      'Prune canes after fruiting',
      'Produces on second-year canes',
    ],
    commonPests: ['Japanese beetles', 'Birds', 'Cane borers'],
    companionPlants: ['Marigolds', 'Garlic', 'Chives'],
    imageUrl: '/assets/2140.jpg',
    isPro: false,
  },
  {
    id: 'currant-red',
    name: 'Currant (Red)',
    scientificName: 'Ribes rubrum',
    category: 'fruit',
    difficulty: 3,
    hardinessZones: ['3a', '3b', '4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 5.5, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'partial-sun',
    spacing: { betweenPlants: '36-48 inches', betweenRows: '48-60 inches' },
    maturity: { daysToHarvest: 730, harvestWindow: 'Early to mid-summer' },
    description: 'Underrated productive berry. Tart, tangy berries perfect for jams, jellies, and baking. Very productive.',
    growingTips: [
      'Plant in early spring or fall',
      'Prune in late winter',
      'Prefers partial shade in hot climates',
      'Self-pollinating but better with multiple plants',
    ],
    commonPests: ['Birds', 'Currant worms', 'Aphids'],
    companionPlants: ['Gooseberries', 'Elderberries'],
    imageUrl: '/assets/red-currant-1-3.jpg',
    isPro: false,
  },
  {
    id: 'apple-honeycrisp-dwarf',
    name: 'Apple (Honeycrisp) - Dwarf',
    scientificName: 'Malus domestica',
    category: 'fruit',
    difficulty: 4,
    hardinessZones: ['4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Deep watering during dry periods' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '8-10 feet', betweenRows: '10-12 feet' },
    maturity: { daysToHarvest: 1095, harvestWindow: 'Late September to early October' },
    description: 'Most popular apple variety. Dwarf tree perfect for small spaces. Crisp, sweet-tart flavor, excellent for fresh eating.',
    growingTips: [
      'Plant in early spring or fall',
      'Requires cross-pollination - plant another variety nearby',
      'Prune in late winter',
      'Thin fruits for larger apples',
    ],
    commonPests: ['Apple maggot', 'Codling moth', 'Aphids'],
    companionPlants: ['Marigolds', 'Nasturtiums', 'Chives'],
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop',
    isPro: true,
  },
  {
    id: 'peach-redhaven-dwarf',
    name: 'Peach (Redhaven) - Dwarf',
    scientificName: 'Prunus persica',
    category: 'fruit',
    difficulty: 4,
    hardinessZones: ['5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Deep watering during dry periods' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'excellent' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '8-10 feet', betweenRows: '10-12 feet' },
    maturity: { daysToHarvest: 1095, harvestWindow: 'Mid to late July' },
    description: 'Classic Maryland peach. Dwarf tree perfect for home gardens. Freestone, sweet, juicy fruits perfect for fresh eating.',
    growingTips: [
      'Plant in early spring or fall',
      'Self-pollinating but better with another variety',
      'Prune in late winter',
      'Thin fruits for larger peaches',
    ],
    commonPests: ['Peach tree borers', 'Aphids', 'Brown rot'],
    companionPlants: ['Marigolds', 'Nasturtiums', 'Chives'],
    imageUrl: '/assets/0002850_redhaven-peach.jpeg',
    isPro: true,
  },
  {
    id: 'cherry-bing-dwarf',
    name: 'Cherry (Bing) - Dwarf',
    scientificName: 'Prunus avium',
    category: 'fruit',
    difficulty: 4,
    hardinessZones: ['5a', '5b', '6a', '6b', '7a', '7b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Deep watering during dry periods' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'excellent' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '8-10 feet', betweenRows: '10-12 feet' },
    maturity: { daysToHarvest: 1460, harvestWindow: 'Late May to early June' },
    description: 'Sweet cherry for fresh eating. Dwarf tree perfect for home gardens. Large, dark red, sweet fruits.',
    growingTips: [
      'Plant in early spring or fall',
      'Requires cross-pollination - plant another variety nearby',
      'Prune in late winter',
      'Net trees to protect from birds',
    ],
    commonPests: ['Birds', 'Cherry fruit fly', 'Aphids'],
    companionPlants: ['Marigolds', 'Nasturtiums', 'Chives'],
    imageUrl: '/assets/cherry-bing-fb__59626.jpg',
    isPro: true,
  },
  // FLOWERS (8 plants)
  {
    id: 'marigold-french',
    name: 'Marigold (French)',
    scientificName: 'Tagetes patula',
    category: 'flower',
    difficulty: 1,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b'],
    plantingSeasons: { spring: true, summer: true, fall: false, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'any', ph: { min: 6.0, max: 7.5 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '8-12 inches', betweenRows: '12-18 inches' },
    maturity: { daysToHarvest: 50, harvestWindow: 'Summer to fall' },
    description: 'Pest deterrent, companion plant essential. Bright, cheerful flowers that repel harmful insects and attract beneficial ones.',
    growingTips: [
      'Direct sow after last frost',
      'Deadhead regularly for continuous blooms',
      'Plant near vegetables for pest control',
      'Very easy to grow from seed',
    ],
    commonPests: ['Aphids', 'Spider mites'],
    companionPlants: ['Tomatoes', 'Peppers', 'Cucumbers'],
    imageUrl: '/assets/marigoldfrenchbp.jpg',
    isPro: false,
  },
  {
    id: 'zinnia-giant',
    name: 'Zinnia (Giant)',
    scientificName: 'Zinnia elegans',
    category: 'flower',
    difficulty: 1,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b'],
    plantingSeasons: { spring: true, summer: true, fall: false, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Water at base, avoid wetting leaves' },
    soilRequirements: { type: 'loamy', ph: { min: 5.5, max: 7.5 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '12-18 inches', betweenRows: '18-24 inches' },
    maturity: { daysToHarvest: 60, harvestWindow: 'Summer to fall' },
    description: 'Cut flower favorite, pollinator magnet. Large, colorful blooms perfect for bouquets and attracting butterflies.',
    growingTips: [
      'Direct sow after last frost',
      'Deadhead regularly for continuous blooms',
      'Great for cutting gardens',
      'Attracts butterflies and hummingbirds',
    ],
    commonPests: ['Aphids', 'Powdery mildew'],
    companionPlants: ['Marigolds', 'Cosmos', 'Sunflowers'],
    imageUrl: '/assets/images (17).jpg',
    isPro: false,
  },
  {
    id: 'sunflower-mammoth',
    name: 'Sunflower (Mammoth)',
    scientificName: 'Helianthus annuus',
    category: 'flower',
    difficulty: 1,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b'],
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Deep watering once established' },
    soilRequirements: { type: 'any', ph: { min: 6.0, max: 7.5 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '24-36 inches', betweenRows: '36-48 inches' },
    maturity: { daysToHarvest: 80, harvestWindow: 'Late summer to early fall' },
    description: 'Iconic, kid-friendly. Massive flowers reaching 10-12 feet tall. Perfect for seeds, bird food, and garden beauty.',
    growingTips: [
      'Direct sow after last frost',
      'Provide support for tall varieties',
      'Harvest seeds when heads droop',
      'Great for attracting birds',
    ],
    commonPests: ['Birds', 'Aphids', 'Sunflower moths'],
    companionPlants: ['Corn', 'Cucumbers', 'Squash'],
    imageUrl: '/assets/images (16).jpg',
    isPro: false,
  },
  {
    id: 'nasturtium',
    name: 'Nasturtium',
    scientificName: 'Tropaeolum majus',
    category: 'flower',
    difficulty: 1,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b'],
    plantingSeasons: { spring: true, summer: true, fall: false, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'light', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'any', ph: { min: 6.0, max: 7.5 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '8-12 inches', betweenRows: '12-18 inches' },
    maturity: { daysToHarvest: 50, harvestWindow: 'Summer to fall' },
    description: 'Edible flowers, aphid trap crop. Beautiful, peppery flowers and leaves perfect for salads and pest control.',
    growingTips: [
      'Direct sow after last frost',
      'Edible flowers and leaves',
      'Attracts aphids away from other plants',
      'Great for containers and hanging baskets',
    ],
    commonPests: ['Aphids (trap crop)', 'Slugs'],
    companionPlants: ['Tomatoes', 'Cucumbers', 'Radishes'],
    imageUrl: '/assets/bhg-nasturtium-flowers-102654772-5311a2a630d5462db101f9766a9e1c14.jpg',
    isPro: false,
  },
  {
    id: 'cosmos',
    name: 'Cosmos',
    scientificName: 'Cosmos bipinnatus',
    category: 'flower',
    difficulty: 1,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b'],
    plantingSeasons: { spring: true, summer: true, fall: false, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'light', notes: 'Drought tolerant once established' },
    soilRequirements: { type: 'any', ph: { min: 6.0, max: 7.5 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '12-18 inches', betweenRows: '18-24 inches' },
    maturity: { daysToHarvest: 60, harvestWindow: 'Summer to fall' },
    description: 'Low-maintenance, pollinator favorite. Delicate, daisy-like flowers in pink, white, and purple. Self-seeding annual.',
    growingTips: [
      'Direct sow after last frost',
      'Deadhead regularly for continuous blooms',
      'Self-seeds readily',
      'Great for wildflower gardens',
    ],
    commonPests: ['Aphids', 'Spider mites'],
    companionPlants: ['Marigolds', 'Zinnias', 'Sunflowers'],
    imageUrl: '/assets/rubenza-cosmos-cosmos-bipinnatus-garden-design_17781.jpg',
    isPro: false,
  },
  {
    id: 'black-eyed-susan',
    name: 'Black-Eyed Susan',
    scientificName: 'Rudbeckia hirta',
    category: 'flower',
    difficulty: 1,
    hardinessZones: ['4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b', '9a', '9b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Drought tolerant once established' },
    soilRequirements: { type: 'any', ph: { min: 5.5, max: 7.5 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '18-24 inches', betweenRows: '24-36 inches' },
    maturity: { daysToHarvest: 90, harvestWindow: 'Mid-summer to early fall' },
    description: 'Maryland native, low-maintenance. Bright yellow flowers with dark centers. Perfect for naturalized gardens.',
    growingTips: [
      'Direct sow in spring or fall',
      'Self-seeds readily',
      'Deadhead to prevent excessive self-seeding',
      'Great for cut flowers',
    ],
    commonPests: ['Aphids', 'Powdery mildew'],
    companionPlants: ['Purple Coneflower', 'Bee Balm', 'Grasses'],
    imageUrl: '/assets/StefanBloodworth-rudbeckia.jpg',
    isPro: false,
  },
  {
    id: 'purple-coneflower',
    name: 'Purple Coneflower (Echinacea)',
    scientificName: 'Echinacea purpurea',
    category: 'flower',
    difficulty: 1,
    hardinessZones: ['3a', '3b', '4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Drought tolerant once established' },
    soilRequirements: { type: 'any', ph: { min: 6.0, max: 8.0 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '18-24 inches', betweenRows: '24-36 inches' },
    maturity: { daysToHarvest: 120, harvestWindow: 'Mid-summer to early fall' },
    description: 'Native, medicinal, pollinator plant. Beautiful purple-pink flowers with medicinal properties. Attracts butterflies.',
    growingTips: [
      'Plant in spring or fall',
      'Deadhead for continuous blooms',
      'Leave seed heads for birds in winter',
      'Medicinal properties in roots',
    ],
    commonPests: ['Aphids', 'Powdery mildew'],
    companionPlants: ['Black-Eyed Susan', 'Bee Balm', 'Grasses'],
    imageUrl: '/assets/Purple_Cone_5B82226F15BB1.jpg',
    isPro: false,
  },
  {
    id: 'bee-balm-scarlet',
    name: 'Bee Balm (Scarlet)',
    scientificName: 'Monarda didyma',
    category: 'flower',
    difficulty: 2,
    hardinessZones: ['4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.5 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '18-24 inches', betweenRows: '24-36 inches' },
    maturity: { daysToHarvest: 365, harvestWindow: 'Mid-summer' },
    description: 'Native, hummingbird magnet. Bright red, tubular flowers that attract hummingbirds and butterflies. Mint family.',
    growingTips: [
      'Plant in spring or fall',
      'Divide every 2-3 years',
      'Deadhead for continuous blooms',
      'Can be used for tea',
    ],
    commonPests: ['Powdery mildew', 'Spider mites'],
    companionPlants: ['Purple Coneflower', 'Black-Eyed Susan', 'Grasses'],
    imageUrl: '/assets/DETA-1801.jpg',
    isPro: false,
  },
  // TREES (4 varieties)
  {
    id: 'japanese-maple-bloodgood',
    name: 'Japanese Maple (Bloodgood)',
    scientificName: 'Acer palmatum',
    category: 'tree',
    difficulty: 3,
    hardinessZones: ['5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 5.5, max: 6.5 }, drainage: 'excellent' },
    sunRequirements: 'partial-sun',
    spacing: { betweenPlants: '15-20 feet', betweenRows: '20-25 feet' },
    maturity: { daysToHarvest: 1825, harvestWindow: 'Ornamental - year-round interest' },
    description: 'Stunning ornamental tree with deep red foliage. Perfect specimen tree for small gardens and landscapes.',
    growingTips: [
      'Plant in well-draining, slightly acidic soil',
      'Protect from harsh afternoon sun',
      'Mulch to retain moisture',
      'Prune in late fall or winter',
    ],
    commonPests: ['Aphids', 'Scale insects', 'Verticillium wilt'],
    companionPlants: ['Hostas', 'Ferns', 'Azaleas'],
    imageUrl: '/assets/bloodgoodjapanesemaple1.jpg',
    isPro: false,
  },
  {
    id: 'dogwood-white-flowering',
    name: 'Dogwood (White Flowering)',
    scientificName: 'Cornus florida',
    category: 'tree',
    difficulty: 2,
    hardinessZones: ['5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Keep soil consistently moist, especially first year' },
    soilRequirements: { type: 'loamy', ph: { min: 5.5, max: 6.5 }, drainage: 'good' },
    sunRequirements: 'partial-sun',
    spacing: { betweenPlants: '15-30 feet', betweenRows: '20-35 feet' },
    maturity: { daysToHarvest: 1825, harvestWindow: 'Ornamental - spring blooms, fall color' },
    description: 'Native Maryland tree with beautiful spring blooms. Excellent for wildlife and four-season interest.',
    growingTips: [
      'Plant in partial shade',
      'Mulch to retain moisture',
      'Prune after flowering',
      'Attracts birds with fall berries',
    ],
    commonPests: ['Dogwood borer', 'Anthracnose', 'Powdery mildew'],
    companionPlants: ['Azaleas', 'Rhododendrons', 'Ferns'],
    imageUrl: '/assets/White_Dogwood_17_BB.jpg',
    isPro: false,
  },
  {
    id: 'redbud-eastern',
    name: 'Redbud (Eastern)',
    scientificName: 'Cercis canadensis',
    category: 'tree',
    difficulty: 2,
    hardinessZones: ['4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Drought tolerant once established' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 8.0 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '20-30 feet', betweenRows: '25-35 feet' },
    maturity: { daysToHarvest: 1825, harvestWindow: 'Ornamental - spring flowers, fall color' },
    description: 'Native tree with stunning pink spring flowers. Low maintenance and drought-tolerant once established.',
    growingTips: [
      'Plant in spring or fall',
      'Tolerates various soil conditions',
      'Prune after flowering',
      'Attracts early spring pollinators',
    ],
    commonPests: ['Canker', 'Verticillium wilt', 'Scale insects'],
    companionPlants: ['Wildflowers', 'Native grasses', 'Ferns'],
    imageUrl: '/assets/0004727_eastern-redbud.jpeg',
    isPro: false,
  },
  {
    id: 'serviceberry-amelanchier',
    name: 'Serviceberry (Amelanchier)',
    scientificName: 'Amelanchier canadensis',
    category: 'tree',
    difficulty: 2,
    hardinessZones: ['4a', '4b', '5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Keep soil consistently moist first year' },
    soilRequirements: { type: 'loamy', ph: { min: 5.5, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '15-25 feet', betweenRows: '20-30 feet' },
    maturity: { daysToHarvest: 1095, harvestWindow: 'Edible berries in early summer' },
    description: 'Multi-season interest with spring flowers, edible berries, and fall color. Native wildlife magnet.',
    growingTips: [
      'Plant in spring or fall',
      'Produces edible berries in early summer',
      'Excellent fall color',
      'Attracts birds and wildlife',
    ],
    commonPests: ['Rust', 'Fire blight', 'Scale insects'],
    companionPlants: ['Native perennials', 'Wildflowers', 'Grasses'],
    imageUrl: '/assets/images (12).jpg',
    isPro: false,
  },
  // SHRUBS (4 varieties)
  {
    id: 'hydrangea-endless-summer',
    name: 'Hydrangea (Endless Summer)',
    scientificName: 'Hydrangea macrophylla',
    category: 'shrub',
    difficulty: 2,
    hardinessZones: ['5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 5.5, max: 6.5 }, drainage: 'good' },
    sunRequirements: 'partial-sun',
    spacing: { betweenPlants: '3-5 feet', betweenRows: '4-6 feet' },
    maturity: { daysToHarvest: 365, harvestWindow: 'Summer blooms' },
    description: 'Re-blooming hydrangea with stunning blue or pink blooms. Perfect for foundation plantings.',
    growingTips: [
      'Plant in partial shade',
      'Flower color depends on soil pH',
      'Prune in late winter or early spring',
      'Mulch to retain moisture',
    ],
    commonPests: ['Aphids', 'Spider mites', 'Powdery mildew'],
    companionPlants: ['Hostas', 'Ferns', 'Astilbe'],
    imageUrl: '/assets/The_Original_Endless_Summer_Hydrangea_Shrub_with_Blue_Flowers__23001.jpg',
    isPro: false,
  },
  {
    id: 'boxwood-american',
    name: 'Boxwood (American)',
    scientificName: 'Buxus sempervirens',
    category: 'shrub',
    difficulty: 2,
    hardinessZones: ['5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.5 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '4-6 feet', betweenRows: '5-7 feet' },
    maturity: { daysToHarvest: 1095, harvestWindow: 'Evergreen - year-round structure' },
    description: 'Classic evergreen hedge plant. Ideal for formal gardens and year-round structure.',
    growingTips: [
      'Plant in well-draining soil',
      'Prune in late spring or early summer',
      'Great for hedges and topiary',
      'Protect from winter winds',
    ],
    commonPests: ['Boxwood blight', 'Leaf miners', 'Mites'],
    companionPlants: ['Roses', 'Perennials', 'Annuals'],
    imageUrl: '/assets/DETA3-706.jpg',
    isPro: false,
  },
  {
    id: 'azalea-encore',
    name: 'Azalea (Encore)',
    scientificName: 'Rhododendron',
    category: 'shrub',
    difficulty: 3,
    hardinessZones: ['6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'sandy', ph: { min: 4.5, max: 6.0 }, drainage: 'excellent' },
    sunRequirements: 'partial-sun',
    spacing: { betweenPlants: '3-4 feet', betweenRows: '4-5 feet' },
    maturity: { daysToHarvest: 365, harvestWindow: 'Spring and fall blooms' },
    description: 'Re-blooming azalea with spring and fall flowers. Requires acidic soil like blueberries.',
    growingTips: [
      'Plant in acidic, well-draining soil',
      'Mulch with pine needles or oak leaves',
      'Prune after spring bloom',
      'Protect from afternoon sun',
    ],
    commonPests: ['Lace bugs', 'Azalea caterpillars', 'Root rot'],
    companionPlants: ['Blueberries', 'Camellias', 'Rhododendrons'],
    imageUrl: '/assets/Encore-Azalea-1024x1024.jpg',
    isPro: false,
  },
  {
    id: 'butterfly-bush-purple',
    name: 'Butterfly Bush (Purple)',
    scientificName: 'Buddleja davidii',
    category: 'shrub',
    difficulty: 1,
    hardinessZones: ['5a', '5b', '6a', '6b', '7a', '7b', '8a', '8b'],
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Drought tolerant once established' },
    soilRequirements: { type: 'any', ph: { min: 6.0, max: 7.5 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '5-10 feet', betweenRows: '6-12 feet' },
    maturity: { daysToHarvest: 365, harvestWindow: 'Summer to fall blooms' },
    description: 'Pollinator magnet with fragrant purple flower spikes. Fast-growing and low-maintenance.',
    growingTips: [
      'Plant in full sun',
      'Prune hard in late winter',
      'Deadhead for continuous blooms',
      'Attracts butterflies and hummingbirds',
    ],
    commonPests: ['Spider mites', 'Aphids', 'Caterpillars'],
    companionPlants: ['Coneflowers', 'Black-Eyed Susans', 'Salvia'],
    imageUrl: '/assets/61d87c07efc7be5590abd21f66e77da3.jpg',
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

