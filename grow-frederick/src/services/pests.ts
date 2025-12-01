import type { PestReport, PestPressure, Alert } from '/src/types';

// Mock pest data
const mockPestReports: PestReport[] = [
  {
    id: '1',
    userId: '1',
    species: 'Aphids',
    severity: 'medium',
    notes: 'Found on tomato plants. Small green insects on underside of leaves.',
    location: {
      lat: 39.4143,
      lng: -77.4105,
      address: 'Frederick, MD',
    },
    plantAffected: 'Cherry Tomato',
    reportedAt: '2024-03-15T10:00:00Z',
    status: 'verified',
  },
  {
    id: '2',
    userId: '1',
    species: 'Japanese Beetles',
    severity: 'high',
    notes: 'Large numbers on rose bushes. Eating leaves and flowers.',
    location: {
      lat: 39.4143,
      lng: -77.4105,
      address: 'Frederick, MD',
    },
    plantAffected: 'Rose',
    reportedAt: '2024-03-10T14:30:00Z',
    status: 'pending',
  },
  {
    id: '3',
    userId: '1',
    species: 'Slugs',
    severity: 'low',
    notes: 'Found on lettuce leaves. Small holes in leaves.',
    location: {
      lat: 39.4143,
      lng: -77.4105,
      address: 'Frederick, MD',
    },
    plantAffected: 'Lettuce',
    reportedAt: '2024-03-12T08:15:00Z',
    status: 'resolved',
  },
];

const mockPestPressure: PestPressure = {
  region: 'Frederick, MD',
  score: 65,
  trend: 'increasing',
  topPests: [
    {
      species: 'Aphids',
      severity: 'medium',
      affectedPlants: ['Tomato', 'Pepper', 'Lettuce'],
    },
    {
      species: 'Japanese Beetles',
      severity: 'high',
      affectedPlants: ['Rose', 'Grape', 'Bean'],
    },
    {
      species: 'Slugs',
      severity: 'low',
      affectedPlants: ['Lettuce', 'Cabbage', 'Hostas'],
    },
  ],
  recommendations: [
    'Use insecticidal soap for aphids',
    'Hand-pick Japanese beetles in early morning',
    'Set up beer traps for slugs',
    'Encourage beneficial insects with companion planting',
  ],
  lastUpdated: '2024-03-15T12:00:00Z',
};

const mockPestAlerts: Alert[] = [
  {
    id: '1',
    type: 'pest',
    severity: 'high',
    title: 'Japanese Beetle Alert',
    message: 'High activity of Japanese beetles reported in your area. Check your roses and other susceptible plants.',
    region: 'Frederick, MD',
    zip: '21701',
    zone: '7a',
    actionRequired: true,
    actionUrl: '/alerts',
    createdAt: '2024-03-15T09:00:00Z',
    expiresAt: '2024-03-22T09:00:00Z',
  },
  {
    id: '2',
    type: 'pest',
    severity: 'medium',
    title: 'Aphid Activity Increasing',
    message: 'Aphid populations are on the rise. Monitor your vegetables and herbs closely.',
    region: 'Frederick, MD',
    zip: '21701',
    zone: '7a',
    actionRequired: false,
    createdAt: '2024-03-14T15:30:00Z',
    expiresAt: '2024-03-21T15:30:00Z',
  },
];

export async function getRegionalPests(zip: string): Promise<PestPressure> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  // Mock data based on location
  return {
    ...mockPestPressure,
    region: zip === '21701' ? 'Frederick, MD' : `Region ${zip}`,
  };
}

export async function submitPestReport(report: Omit<PestReport, 'id' | 'reportedAt' | 'status'>): Promise<PestReport> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const newReport: PestReport = {
    ...report,
    id: Date.now().toString(),
    reportedAt: new Date().toISOString(),
    status: 'pending',
  };

  mockPestReports.push(newReport);
  return newReport;
}

export async function getPestReports(userId: string): Promise<PestReport[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  return mockPestReports.filter(report => report.userId === userId);
}

export async function getPestAlerts(zip: string): Promise<Alert[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  return mockPestAlerts.filter(alert => alert.zip === zip);
}

export async function getPestSolutions(species: string): Promise<{
  shortTerm: string[];
  longTerm: string[];
  natural: string[];
  chemical: string[];
}> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const solutions: Record<string, any> = {
    aphids: {
      shortTerm: [
        'Spray with strong water stream',
        'Apply insecticidal soap',
        'Use neem oil spray',
      ],
      longTerm: [
        'Plant companion plants like marigolds',
        'Encourage beneficial insects',
        'Use row covers for protection',
      ],
      natural: [
        'Ladybugs and lacewings',
        'Diatomaceous earth',
        'Garlic spray',
      ],
      chemical: [
        'Pyrethrin-based insecticides',
        'Systemic insecticides (use sparingly)',
      ],
    },
    'japanese beetles': {
      shortTerm: [
        'Hand-pick in early morning',
        'Use pheromone traps',
        'Apply neem oil',
      ],
      longTerm: [
        'Plant resistant varieties',
        'Use milky spore disease',
        'Encourage natural predators',
      ],
      natural: [
        'Beneficial nematodes',
        'Bacillus thuringiensis',
        'Companion planting with garlic',
      ],
      chemical: [
        'Carbaryl (Sevin)',
        'Pyrethrin-based sprays',
      ],
    },
    slugs: {
      shortTerm: [
        'Set up beer traps',
        'Hand-pick at night',
        'Use copper barriers',
      ],
      longTerm: [
        'Improve drainage',
        'Remove hiding places',
        'Use raised beds',
      ],
      natural: [
        'Diatomaceous earth',
        'Coffee grounds',
        'Eggshell barriers',
      ],
      chemical: [
        'Iron phosphate baits',
        'Metaldehyde baits (use carefully)',
      ],
    },
  };

  return solutions[species.toLowerCase()] || {
    shortTerm: ['Monitor plants regularly', 'Remove affected plant parts'],
    longTerm: ['Improve plant health', 'Use proper spacing'],
    natural: ['Encourage beneficial insects', 'Use companion planting'],
    chemical: ['Consult with local extension office'],
  };
}

export async function getPestPreventionTips(): Promise<{
  general: string[];
  seasonal: Record<string, string[]>;
}> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  return {
    general: [
      'Keep garden clean and free of debris',
      'Rotate crops annually',
      'Use proper spacing between plants',
      'Water at soil level, not on leaves',
      'Encourage beneficial insects',
      'Use row covers for protection',
      'Monitor plants regularly',
      'Remove diseased plant material immediately',
    ],
    seasonal: {
      spring: [
        'Clean up winter debris',
        'Apply dormant oil sprays',
        'Set up monitoring traps',
        'Plant pest-resistant varieties',
      ],
      summer: [
        'Monitor for pest activity daily',
        'Use floating row covers',
        'Apply organic sprays as needed',
        'Harvest regularly to reduce pest attraction',
      ],
      fall: [
        'Clean up garden debris',
        'Till soil to expose overwintering pests',
        'Plant cover crops',
        'Apply beneficial nematodes',
      ],
      winter: [
        'Plan next year\'s pest management',
        'Order beneficial insects',
        'Clean and store tools',
        'Review pest records from previous year',
      ],
    },
  };
}

export async function getBeneficialInsects(): Promise<{
  name: string;
  description: string;
  attracts: string[];
  plants: string[];
}[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  return [
    {
      name: 'Ladybugs',
      description: 'Natural predators of aphids, mealybugs, and other soft-bodied insects',
      attracts: ['Aphids', 'Mealybugs', 'Scale insects'],
      plants: ['Dill', 'Fennel', 'Yarrow', 'Cosmos'],
    },
    {
      name: 'Lacewings',
      description: 'Green and brown lacewings feed on aphids, thrips, and other small insects',
      attracts: ['Aphids', 'Thrips', 'Whiteflies', 'Mites'],
      plants: ['Dill', 'Fennel', 'Yarrow', 'Sunflowers'],
    },
    {
      name: 'Praying Mantis',
      description: 'Large predatory insects that eat a wide variety of garden pests',
      attracts: ['Caterpillars', 'Beetles', 'Grasshoppers', 'Flies'],
      plants: ['Tall grasses', 'Shrubs', 'Perennials'],
    },
    {
      name: 'Parasitic Wasps',
      description: 'Tiny wasps that lay eggs in pest insects, controlling their populations',
      attracts: ['Caterpillars', 'Aphids', 'Whiteflies'],
      plants: ['Dill', 'Fennel', 'Yarrow', 'Queen Anne\'s Lace'],
    },
    {
      name: 'Ground Beetles',
      description: 'Nocturnal predators that feed on slugs, snails, and other ground-dwelling pests',
      attracts: ['Slugs', 'Snails', 'Cutworms', 'Earwigs'],
      plants: ['Straw mulch', 'Leaf litter', 'Ground covers'],
    },
  ];
}

export async function getPestIdentificationHelp(imageUrl: string): Promise<{
  species: string;
  confidence: number;
  description: string;
  solutions: string[];
}> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock AI identification - in real implementation, this would use a plant/pest identification API
  const mockIdentifications = [
    {
      species: 'Aphids',
      confidence: 0.95,
      description: 'Small, soft-bodied insects that cluster on new growth and undersides of leaves',
      solutions: ['Spray with water', 'Use insecticidal soap', 'Encourage ladybugs'],
    },
    {
      species: 'Japanese Beetles',
      confidence: 0.88,
      description: 'Metallic green and bronze beetles that skeletonize leaves',
      solutions: ['Hand-pick in morning', 'Use pheromone traps', 'Apply neem oil'],
    },
    {
      species: 'Slugs',
      confidence: 0.92,
      description: 'Slime-covered mollusks that leave irregular holes in leaves',
      solutions: ['Set beer traps', 'Use copper barriers', 'Apply diatomaceous earth'],
    },
  ];

  // Return random identification for demo
  return mockIdentifications[Math.floor(Math.random() * mockIdentifications.length)];
}

