import type { Plant, PlantDetail } from '/src/types';

// Mock plant data
const mockPlants: Plant[] = [
  {
    id: '1',
    name: 'Cherry Tomato',
    scientificName: 'Solanum lycopersicum var. cerasiforme',
    type: 'vegetable',
    description: 'Small, sweet tomatoes perfect for snacking and salads. Easy to grow and highly productive.',
    image: '/images/plants/cherry-tomato.jpg',
    sun: 'full',
    water: 'moderate',
    frostTolerance: 'tender',
    season: ['spring', 'summer'],
    hardinessZones: ['2-10'],
    companionPlants: ['basil', 'marigold', 'nasturtium'],
    antagonistPlants: ['corn', 'potato'],
    careInstructions: 'Plant after last frost. Provide support for vines. Water consistently.',
    pestNotes: 'Watch for aphids, hornworms, and blight.',
    sowWindow: { start: 'March', end: 'May' },
    harvestWindow: { start: 'July', end: 'October' },
    isPro: false,
  },
  {
    id: '2',
    name: 'Sweet Basil',
    scientificName: 'Ocimum basilicum',
    type: 'herb',
    description: 'Aromatic herb essential for Italian and Thai cuisine. Easy to grow and harvest.',
    image: '/images/plants/sweet-basil.jpg',
    sun: 'full',
    water: 'moderate',
    frostTolerance: 'tender',
    season: ['spring', 'summer'],
    hardinessZones: ['4-10'],
    companionPlants: ['tomato', 'pepper', 'oregano'],
    antagonistPlants: ['sage', 'rue'],
    careInstructions: 'Pinch flowers to encourage leaf growth. Harvest regularly.',
    pestNotes: 'Generally pest-free. Watch for aphids in dry conditions.',
    sowWindow: { start: 'April', end: 'June' },
    harvestWindow: { start: 'June', end: 'September' },
    isPro: false,
  },
  {
    id: '3',
    name: 'English Lavender',
    scientificName: 'Lavandula angustifolia',
    type: 'herb',
    description: 'Beautiful, fragrant perennial known for its calming properties and purple flowers.',
    image: '/images/plants/english-lavender.jpg',
    sun: 'full',
    water: 'low',
    frostTolerance: 'hardy',
    season: ['spring', 'summer'],
    hardinessZones: ['5-9'],
    companionPlants: ['rosemary', 'sage', 'thyme'],
    antagonistPlants: ['mint'],
    careInstructions: 'Plant in well-drained soil. Prune after flowering.',
    pestNotes: 'Generally pest-free. Deer resistant.',
    sowWindow: { start: 'March', end: 'May' },
    harvestWindow: { start: 'June', end: 'August' },
    isPro: false,
  },
  {
    id: '4',
    name: 'Highbush Blueberry',
    scientificName: 'Vaccinium corymbosum',
    type: 'fruit',
    description: 'Delicious, antioxidant-rich berries that grow on a medium-sized bush.',
    image: '/images/plants/highbush-blueberry.jpg',
    sun: 'full',
    water: 'high',
    frostTolerance: 'hardy',
    season: ['spring', 'summer'],
    hardinessZones: ['4-7'],
    companionPlants: ['azalea', 'rhododendron', 'pine'],
    antagonistPlants: ['black walnut'],
    careInstructions: 'Requires acidic soil. Plant multiple varieties for better pollination.',
    pestNotes: 'Watch for birds, Japanese beetles, and mummy berry disease.',
    sowWindow: { start: 'March', end: 'April' },
    harvestWindow: { start: 'June', end: 'August' },
    isPro: true,
  },
  {
    id: '5',
    name: 'Rosemary',
    scientificName: 'Rosmarinus officinalis',
    type: 'herb',
    description: 'Woody, aromatic herb with needle-like leaves, great for cooking and landscaping.',
    image: '/images/plants/rosemary.jpg',
    sun: 'full',
    water: 'low',
    frostTolerance: 'half-hardy',
    season: ['spring', 'summer', 'fall'],
    hardinessZones: ['7-10'],
    companionPlants: ['sage', 'thyme', 'oregano'],
    antagonistPlants: ['mint'],
    careInstructions: 'Plant in well-drained soil. Drought tolerant once established.',
    pestNotes: 'Generally pest-free. Deer resistant.',
    sowWindow: { start: 'March', end: 'May' },
    harvestWindow: { start: 'Year-round', end: 'Year-round' },
    isPro: false,
  },
  {
    id: '6',
    name: 'Lacinato Kale',
    scientificName: 'Brassica oleracea var. palmifolia',
    type: 'vegetable',
    description: 'Dark, crinkly leaves with a robust flavor, also known as Dinosaur Kale.',
    image: '/images/plants/lacinato-kale.jpg',
    sun: 'full',
    water: 'moderate',
    frostTolerance: 'hardy',
    season: ['spring', 'fall'],
    hardinessZones: ['8-10'],
    companionPlants: ['beet', 'onion', 'garlic'],
    antagonistPlants: ['strawberry', 'tomato'],
    careInstructions: 'Plant in cool weather. Harvest outer leaves regularly.',
    pestNotes: 'Watch for cabbage worms, aphids, and flea beetles.',
    sowWindow: { start: 'March', end: 'April' },
    harvestWindow: { start: 'May', end: 'June' },
    isPro: false,
  },
  {
    id: '7',
    name: 'Everbearing Strawberry',
    scientificName: 'Fragaria x ananassa',
    type: 'fruit',
    description: 'Produces fruit throughout the growing season, not just once.',
    image: '/images/plants/everbearing-strawberry.jpg',
    sun: 'full',
    water: 'high',
    frostTolerance: 'hardy',
    season: ['spring', 'summer', 'fall'],
    hardinessZones: ['4-8'],
    companionPlants: ['borage', 'thyme', 'lettuce'],
    antagonistPlants: ['cabbage', 'broccoli'],
    careInstructions: 'Plant in well-drained soil. Mulch around plants.',
    pestNotes: 'Watch for slugs, birds, and gray mold.',
    sowWindow: { start: 'March', end: 'April' },
    harvestWindow: { start: 'May', end: 'October' },
    isPro: true,
  },
  {
    id: '8',
    name: 'Common Sunflower',
    scientificName: 'Helianthus annuus',
    type: 'flower',
    description: 'Tall, iconic flowers with large yellow petals and edible seeds.',
    image: '/images/plants/common-sunflower.jpg',
    sun: 'full',
    water: 'moderate',
    frostTolerance: 'tender',
    season: ['spring', 'summer'],
    hardinessZones: ['4-9'],
    companionPlants: ['corn', 'cucumber', 'squash'],
    antagonistPlants: ['potato'],
    careInstructions: 'Plant in full sun. Provide support for tall varieties.',
    pestNotes: 'Watch for birds, squirrels, and sunflower moths.',
    sowWindow: { start: 'April', end: 'June' },
    harvestWindow: { start: 'August', end: 'October' },
    isPro: false,
  },
];

export async function searchPlants(query: string, filters: {
  type?: string;
  sun?: string;
  water?: string;
  frostTolerance?: string;
  season?: string;
} = {}): Promise<Plant[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  let filteredPlants = mockPlants;

  // Apply text search
  if (query) {
    const searchTerm = query.toLowerCase();
    filteredPlants = filteredPlants.filter(plant =>
      plant.name.toLowerCase().includes(searchTerm) ||
      plant.scientificName.toLowerCase().includes(searchTerm) ||
      plant.description.toLowerCase().includes(searchTerm)
    );
  }

  // Apply filters
  if (filters.type) {
    filteredPlants = filteredPlants.filter(plant => plant.type === filters.type);
  }

  if (filters.sun) {
    filteredPlants = filteredPlants.filter(plant => plant.sun === filters.sun);
  }

  if (filters.water) {
    filteredPlants = filteredPlants.filter(plant => plant.water === filters.water);
  }

  if (filters.frostTolerance) {
    filteredPlants = filteredPlants.filter(plant => plant.frostTolerance === filters.frostTolerance);
  }

  if (filters.season) {
    filteredPlants = filteredPlants.filter(plant => plant.season.includes(filters.season!));
  }

  return filteredPlants;
}

export async function getPlant(id: string): Promise<PlantDetail | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  const plant = mockPlants.find(p => p.id === id);
  if (!plant) return null;

  // Convert to PlantDetail with additional Pro features
  const plantDetail: PlantDetail = {
    ...plant,
    care: {
      watering: getWateringInstructions(plant.water),
      fertilizing: getFertilizingInstructions(plant.type),
      pruning: getPruningInstructions(plant.type),
      harvesting: getHarvestingInstructions(plant.type),
    },
    pestRiskScore: plant.isPro ? Math.floor(Math.random() * 100) : undefined,
    microclimateRecommendations: plant.isPro ? getMicroclimateRecommendations(plant.type) : undefined,
  };

  return plantDetail;
}

export async function getPlantsByType(type: string): Promise<Plant[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  return mockPlants.filter(plant => plant.type === type);
}

export async function getCompanionPlants(plantId: string): Promise<Plant[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const plant = mockPlants.find(p => p.id === plantId);
  if (!plant) return [];

  return mockPlants.filter(p => 
    plant.companionPlants.some(companion => 
      p.name.toLowerCase().includes(companion.toLowerCase())
    )
  );
}

export async function getAntagonistPlants(plantId: string): Promise<Plant[]> {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const plant = mockPlants.find(p => p.id === plantId);
  if (!plant) return [];

  return mockPlants.filter(p => 
    plant.antagonistPlants.some(antagonist => 
      p.name.toLowerCase().includes(antagonist.toLowerCase())
    )
  );
}

// Helper functions
function getWateringInstructions(waterLevel: string): string {
  const instructions = {
    low: 'Water deeply once per week. Allow soil to dry between waterings.',
    moderate: 'Water 2-3 times per week. Keep soil consistently moist but not soggy.',
    high: 'Water daily or every other day. Keep soil consistently moist.',
  };
  return instructions[waterLevel as keyof typeof instructions];
}

function getFertilizingInstructions(type: string): string {
  const instructions = {
    vegetable: 'Apply balanced fertilizer every 4-6 weeks during growing season.',
    herb: 'Use light fertilizer monthly. Avoid over-fertilizing.',
    flower: 'Apply bloom fertilizer every 2-3 weeks during flowering.',
    fruit: 'Use fruit-specific fertilizer in spring and after harvest.',
    tree: 'Apply tree fertilizer in early spring and fall.',
    shrub: 'Use shrub fertilizer in spring and mid-summer.',
  };
  return instructions[type as keyof typeof instructions] || 'Apply balanced fertilizer as needed.';
}

function getPruningInstructions(type: string): string {
  const instructions = {
    vegetable: 'Remove dead or diseased leaves. Pinch back for bushier growth.',
    herb: 'Pinch back regularly to encourage branching. Harvest frequently.',
    flower: 'Deadhead spent flowers. Cut back in fall or spring.',
    fruit: 'Prune in late winter. Remove dead or crossing branches.',
    tree: 'Prune in late winter. Remove dead, diseased, or crossing branches.',
    shrub: 'Prune after flowering. Remove old wood to encourage new growth.',
  };
  return instructions[type as keyof typeof instructions] || 'Prune as needed to maintain shape and health.';
}

function getHarvestingInstructions(type: string): string {
  const instructions = {
    vegetable: 'Harvest when mature but before overripe. Check regularly.',
    herb: 'Harvest in morning when oils are strongest. Use fresh or dry.',
    flower: 'Cut flowers in morning. Remove spent blooms regularly.',
    fruit: 'Harvest when fully ripe. Check daily during peak season.',
    tree: 'Harvest fruit when fully ripe. Use proper harvesting tools.',
    shrub: 'Harvest berries when fully colored. Check daily during season.',
  };
  return instructions[type as keyof typeof instructions] || 'Harvest when ready. Check regularly for best quality.';
}

function getMicroclimateRecommendations(type: string): string {
  const recommendations = {
    vegetable: 'Plant in areas with good air circulation. Avoid low spots where frost collects.',
    herb: 'Most herbs prefer well-drained, slightly elevated areas with good sun exposure.',
    flower: 'Consider wind protection for tall varieties. Ensure good drainage.',
    fruit: 'Plant in areas protected from late frosts. Good air circulation is important.',
    tree: 'Consider mature size and root spread. Avoid areas with overhead wires.',
    shrub: 'Plant in areas with good drainage. Consider mature size and spacing.',
  };
  return recommendations[type as keyof typeof recommendations] || 'Choose location based on plant needs and local conditions.';
}

