/**
 * Expanded Plant Database for GrowCommon
 * Zone 6b-7a specific (Frederick County, Maryland)
 * 50+ plants with comprehensive growing information
 */

import { Plant } from './plants';
import { getPlantImageURL } from './plantImages';

// Helper to create plant entries more concisely
function createPlant(plant: Partial<Plant> & { 
  id: string; 
  name: string; 
  scientificName: string;
  category: Plant['category'];
  description: string;
}): Plant {
  const defaultPlant: Plant = {
    id: plant.id,
    name: plant.name,
    scientificName: plant.scientificName,
    category: plant.category,
    difficulty: 2,
    hardinessZones: ['6a', '6b', '7a', '7b'],
    plantingSeasons: {
      spring: false,
      summer: false,
      fall: false,
      winter: false,
    },
    wateringSchedule: {
      frequency: 'weekly',
      amount: 'moderate',
    },
    soilRequirements: {
      type: 'loamy',
      ph: { min: 6.0, max: 7.0 },
      drainage: 'good',
    },
    sunRequirements: 'full-sun',
    spacing: {
      betweenPlants: '12 inches',
      betweenRows: '24 inches',
    },
    maturity: {
      daysToHarvest: 60,
      harvestWindow: 'Summer',
    },
    description: plant.description,
    growingTips: [],
    commonPests: [],
    companionPlants: [],
    imageUrl: getPlantImageURL(plant.name),
    isPro: false,
    ...plant,
  } as Plant;
  
  return defaultPlant;
}

export const expandedVegetables: Plant[] = [
  // Existing - keep
  createPlant({
    id: 'tomato',
    name: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    category: 'vegetable',
    difficulty: 2,
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Water deeply at base, avoid wetting leaves' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 6.8 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '24-36 inches', betweenRows: '36-48 inches' },
    maturity: { daysToHarvest: 75, harvestWindow: 'Mid-summer to early fall' },
    description: 'A warm-season crop that produces juicy, flavorful fruits. Perfect for beginners and experienced gardeners alike. Thrives in Frederick County\'s warm summers with proper support and consistent watering.',
    growingTips: [
      'Start seeds indoors 6-8 weeks before last frost (mid-March for Zone 6b-7a)',
      'Transplant after soil temperature reaches 60°F',
      'Provide support with stakes or cages to prevent disease',
      'Pinch off suckers to encourage fruit production'
    ],
    commonPests: ['Aphids', 'Tomato hornworm', 'Whiteflies', 'Blossom end rot'],
    companionPlants: ['Basil', 'Marigolds', 'Onions', 'Garlic'],
    isPro: false,
  }),
  
  createPlant({
    id: 'lettuce',
    name: 'Lettuce',
    scientificName: 'Lactuca sativa',
    category: 'vegetable',
    difficulty: 1,
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'daily', amount: 'light', notes: 'Keep soil consistently moist but not waterlogged' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'partial-sun',
    spacing: { betweenPlants: '6-12 inches', betweenRows: '12-18 inches' },
    maturity: { daysToHarvest: 45, harvestWindow: 'Spring and fall' },
    description: 'A cool-season crop that grows quickly and provides fresh greens for salads. Great for succession planting. Ideal for Frederick County\'s cool springs and falls.',
    growingTips: [
      'Direct sow seeds in early spring (late March) or late summer (late August)',
      'Thin seedlings to prevent overcrowding',
      'Harvest outer leaves for continuous production',
      'Provide shade in hot weather to prevent bolting'
    ],
    commonPests: ['Slugs', 'Aphids', 'Cutworms'],
    companionPlants: ['Radishes', 'Carrots', 'Onions', 'Chives'],
    isPro: false,
  }),
  
  // New vegetables (18 more)
  createPlant({
    id: 'bell-pepper',
    name: 'Bell Pepper',
    scientificName: 'Capsicum annuum',
    category: 'vegetable',
    difficulty: 2,
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Consistent moisture important, avoid waterlogged soil' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 6.8 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '18-24 inches', betweenRows: '24-36 inches' },
    maturity: { daysToHarvest: 70, harvestWindow: 'Mid-summer through fall' },
    description: 'Sweet, crisp peppers perfect for salads, stir-fries, and stuffing. Warm-season crop that produces abundantly in Frederick County\'s summers. Available in multiple colors when fully ripe.',
    growingTips: [
      'Start seeds indoors 8-10 weeks before last frost',
      'Transplant when nighttime temps consistently above 60°F',
      'Harvest green or wait for color change (red, yellow, orange)',
      'Provide support for heavy fruit loads'
    ],
    commonPests: ['Aphids', 'Pepper weevils', 'Blossom end rot'],
    companionPlants: ['Basil', 'Oregano', 'Onions', 'Marigolds'],
    isPro: false,
  }),
  
  createPlant({
    id: 'cucumber',
    name: 'Cucumber',
    scientificName: 'Cucumis sativus',
    category: 'vegetable',
    difficulty: 2,
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'daily', amount: 'moderate', notes: 'Keep soil consistently moist, mulch to retain moisture' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '12-18 inches', betweenRows: '36-48 inches' },
    maturity: { daysToHarvest: 55, harvestWindow: 'Mid-summer through early fall' },
    description: 'Fast-growing vine crop producing crisp, refreshing fruits. Excellent for salads, pickling, and fresh eating. Requires trellising or ample ground space.',
    growingTips: [
      'Direct sow after last frost or start indoors 3-4 weeks early',
      'Provide trellis for vining varieties to save space and improve air circulation',
      'Harvest frequently to encourage continued production',
      'Water consistently to prevent bitter fruit'
    ],
    commonPests: ['Cucumber beetles', 'Aphids', 'Spider mites', 'Powdery mildew'],
    companionPlants: ['Radishes', 'Beans', 'Corn', 'Marigolds'],
    isPro: false,
  }),
  
  createPlant({
    id: 'zucchini',
    name: 'Zucchini',
    scientificName: 'Cucurbita pepo',
    category: 'vegetable',
    difficulty: 1,
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Deep watering at base, avoid wetting leaves' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.5 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '24-36 inches', betweenRows: '36-48 inches' },
    maturity: { daysToHarvest: 50, harvestWindow: 'Early summer through fall' },
    description: 'Prolific summer squash that produces abundantly. Harvest small for best flavor and texture. One of the easiest vegetables to grow in Zone 6b-7a.',
    growingTips: [
      'Direct sow after last frost (late May for Frederick County)',
      'Harvest when 6-8 inches long for best quality',
      'Check daily during peak season - fruits grow rapidly',
      'Remove powdery mildew affected leaves promptly'
    ],
    commonPests: ['Squash bugs', 'Squash vine borers', 'Cucumber beetles', 'Powdery mildew'],
    companionPlants: ['Nasturtiums', 'Marigolds', 'Beans', 'Radishes'],
    isPro: false,
  }),
  
  createPlant({
    id: 'squash',
    name: 'Squash',
    scientificName: 'Cucurbita spp.',
    category: 'vegetable',
    difficulty: 2,
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Water deeply, allow soil to dry slightly between waterings' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '36-48 inches', betweenRows: '48-60 inches' },
    maturity: { daysToHarvest: 90, harvestWindow: 'Late summer through fall' },
    description: 'Winter and summer squash varieties perfect for storage and cooking. Butternut, acorn, and spaghetti squash are excellent choices for Frederick County gardens.',
    growingTips: [
      'Direct sow after last frost when soil is warm',
      'Allow winter squash to fully mature on vine for best storage',
      'Harvest summer squash young and tender',
      'Provide ample space for vining varieties'
    ],
    commonPests: ['Squash bugs', 'Squash vine borers', 'Cucumber beetles'],
    companionPlants: ['Corn', 'Beans', 'Nasturtiums', 'Marigolds'],
    isPro: false,
  }),
  
  createPlant({
    id: 'eggplant',
    name: 'Eggplant',
    scientificName: 'Solanum melongena',
    category: 'vegetable',
    difficulty: 3,
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Consistent moisture, mulch to retain soil moisture' },
    soilRequirements: { type: 'loamy', ph: { min: 5.5, max: 6.5 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '24-30 inches', betweenRows: '30-36 inches' },
    maturity: { daysToHarvest: 80, harvestWindow: 'Mid-summer through early fall' },
    description: 'Warm-season crop producing glossy, purple fruits. Requires long, hot growing season. Best started indoors for Zone 6b-7a success.',
    growingTips: [
      'Start seeds indoors 8-10 weeks before last frost',
      'Wait until soil temperature is consistently 70°F before transplanting',
      'Use black plastic mulch to warm soil',
      'Harvest when skin is glossy and firm'
    ],
    commonPests: ['Flea beetles', 'Aphids', 'Colorado potato beetles'],
    companionPlants: ['Beans', 'Peppers', 'Marigolds', 'Basil'],
    isPro: true,
  }),
  
  createPlant({
    id: 'broccoli',
    name: 'Broccoli',
    scientificName: 'Brassica oleracea var. italica',
    category: 'vegetable',
    difficulty: 2,
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '18-24 inches', betweenRows: '24-36 inches' },
    maturity: { daysToHarvest: 70, harvestWindow: 'Late spring and fall' },
    description: 'Cool-season crop producing large, nutritious heads. Excellent for spring and fall plantings in Frederick County. Harvest before flowers open.',
    growingTips: [
      'Start seeds indoors 6-8 weeks before transplant date',
      'Transplant in early spring (late March) or late summer (mid-August)',
      'Harvest central head when tight and before yellow flowers appear',
      'Side shoots will continue producing after main head harvest'
    ],
    commonPests: ['Cabbage worms', 'Aphids', 'Flea beetles'],
    companionPlants: ['Dill', 'Beets', 'Onions', 'Celery'],
    isPro: false,
  }),
  
  createPlant({
    id: 'cauliflower',
    name: 'Cauliflower',
    scientificName: 'Brassica oleracea var. botrytis',
    category: 'vegetable',
    difficulty: 3,
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Consistent moisture critical for head development' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '18-24 inches', betweenRows: '24-36 inches' },
    maturity: { daysToHarvest: 75, harvestWindow: 'Late spring and fall' },
    description: 'Delicate cool-season crop requiring consistent conditions. Blanching varieties need leaves tied over head. More challenging but rewarding.',
    growingTips: [
      'Start seeds indoors 6-8 weeks before transplant',
      'Transplant when weather is consistently cool',
      'For white varieties, tie leaves over head when 2-3 inches across',
      'Harvest when head is firm and tight'
    ],
    commonPests: ['Cabbage worms', 'Aphids', 'Flea beetles'],
    companionPlants: ['Beans', 'Celery', 'Onions', 'Spinach'],
    isPro: true,
  }),
  
  createPlant({
    id: 'cabbage',
    name: 'Cabbage',
    scientificName: 'Brassica oleracea var. capitata',
    category: 'vegetable',
    difficulty: 2,
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Keep soil consistently moist for head formation' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.5 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '18-24 inches', betweenRows: '24-36 inches' },
    maturity: { daysToHarvest: 80, harvestWindow: 'Late spring and fall' },
    description: 'Versatile cool-season crop perfect for coleslaw, sauerkraut, and cooking. Stores well after harvest. Excellent for Frederick County\'s climate.',
    growingTips: [
      'Start seeds indoors 6-8 weeks before transplant',
      'Transplant in early spring or late summer',
      'Water consistently - heads may split if watering is irregular',
      'Harvest when heads are firm and full-sized'
    ],
    commonPests: ['Cabbage worms', 'Aphids', 'Flea beetles', 'Cabbage loopers'],
    companionPlants: ['Dill', 'Beets', 'Onions', 'Celery'],
    isPro: false,
  }),
  
  createPlant({
    id: 'kale',
    name: 'Kale',
    scientificName: 'Brassica oleracea var. acephala',
    category: 'vegetable',
    difficulty: 1,
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Keep soil moist for tender leaves' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.5 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '12-18 inches', betweenRows: '18-24 inches' },
    maturity: { daysToHarvest: 55, harvestWindow: 'Year-round with protection' },
    description: 'Nutritious leafy green that thrives in cool weather. Can survive light frosts, making it ideal for extended harvests in Zone 6b-7a.',
    growingTips: [
      'Direct sow in early spring or late summer',
      'Harvest outer leaves regularly for continuous production',
      'Flavor improves after light frost',
      'Protect from extreme cold with row covers'
    ],
    commonPests: ['Cabbage worms', 'Aphids', 'Flea beetles'],
    companionPlants: ['Beets', 'Onions', 'Celery', 'Dill'],
    isPro: false,
  }),
  
  createPlant({
    id: 'spinach',
    name: 'Spinach',
    scientificName: 'Spinacia oleracea',
    category: 'vegetable',
    difficulty: 1,
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'daily', amount: 'light', notes: 'Keep soil consistently moist' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'partial-sun',
    spacing: { betweenPlants: '4-6 inches', betweenRows: '12-18 inches' },
    maturity: { daysToHarvest: 40, harvestWindow: 'Spring and fall' },
    description: 'Fast-growing cool-season green perfect for salads and cooking. Bolts quickly in heat, best grown in spring and fall.',
    growingTips: [
      'Direct sow as soon as soil is workable in spring',
      'Succession plant every 2 weeks for continuous harvest',
      'Harvest whole plants or cut leaves',
      'Provide shade in warm weather to delay bolting'
    ],
    commonPests: ['Leaf miners', 'Aphids', 'Slugs'],
    companionPlants: ['Strawberries', 'Radishes', 'Lettuce'],
    isPro: false,
  }),
  
  createPlant({
    id: 'carrots',
    name: 'Carrots',
    scientificName: 'Daucus carota subsp. sativus',
    category: 'vegetable',
    difficulty: 2,
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Deep, infrequent watering encourages straight roots' },
    soilRequirements: { type: 'sandy', ph: { min: 6.0, max: 7.0 }, drainage: 'excellent' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '2-3 inches', betweenRows: '12-18 inches' },
    maturity: { daysToHarvest: 70, harvestWindow: 'Late spring through fall' },
    description: 'Root crop requiring loose, stone-free soil. Sweet flavor improves after light frost. Can be left in ground for extended harvest.',
    growingTips: [
      'Direct sow in loose, well-prepared soil',
      'Thin seedlings to proper spacing when 2 inches tall',
      'Keep soil surface moist until seeds germinate',
      'Harvest when shoulders are visible at soil line'
    ],
    commonPests: ['Carrot rust flies', 'Aphids', 'Wireworms'],
    companionPlants: ['Leeks', 'Onions', 'Radishes', 'Lettuce'],
    isPro: false,
  }),
  
  createPlant({
    id: 'radishes',
    name: 'Radishes',
    scientificName: 'Raphanus sativus',
    category: 'vegetable',
    difficulty: 1,
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'every-other-day', amount: 'moderate', notes: 'Consistent moisture prevents splitting and pithiness' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '1-2 inches', betweenRows: '12 inches' },
    maturity: { daysToHarvest: 25, harvestWindow: 'Spring and fall' },
    description: 'Fastest-growing vegetable, ready in just 3-4 weeks. Perfect for beginners and succession planting. Spicy flavor adds zest to salads.',
    growingTips: [
      'Direct sow as soon as soil is workable',
      'Harvest promptly when mature to avoid pithiness',
      'Succession plant every 2 weeks',
      'Grows best in cool weather'
    ],
    commonPests: ['Flea beetles', 'Root maggots'],
    companionPlants: ['Lettuce', 'Spinach', 'Cucumbers', 'Carrots'],
    isPro: false,
  }),
  
  createPlant({
    id: 'beets',
    name: 'Beets',
    scientificName: 'Beta vulgaris',
    category: 'vegetable',
    difficulty: 2,
    plantingSeasons: { spring: true, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Consistent moisture for uniform root development' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.5 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '3-4 inches', betweenRows: '12-18 inches' },
    maturity: { daysToHarvest: 55, harvestWindow: 'Early summer and fall' },
    description: 'Dual-purpose crop - harvest both roots and greens. Tolerates light frost. Versatile in cooking and excellent for storage.',
    growingTips: [
      'Direct sow in early spring or late summer',
      'Soak seeds overnight to speed germination',
      'Thin to proper spacing when seedlings are 2 inches tall',
      'Harvest greens when young for salads, roots when mature'
    ],
    commonPests: ['Leaf miners', 'Aphids'],
    companionPlants: ['Onions', 'Lettuce', 'Kohlrabi', 'Cabbage'],
    isPro: false,
  }),
  
  createPlant({
    id: 'green-beans',
    name: 'Green Beans',
    scientificName: 'Phaseolus vulgaris',
    category: 'vegetable',
    difficulty: 1,
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Water at base, avoid wetting leaves' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '4-6 inches', betweenRows: '18-24 inches' },
    maturity: { daysToHarvest: 55, harvestWindow: 'Mid-summer through early fall' },
    description: 'Bush or pole varieties provide abundant harvests. Easy to grow and great for beginners. Continues producing when harvested regularly.',
    growingTips: [
      'Direct sow after last frost when soil is warm',
      'Provide trellis for pole varieties',
      'Harvest frequently to encourage continued production',
      'Water consistently, especially during flowering'
    ],
    commonPests: ['Bean beetles', 'Aphids', 'Japanese beetles'],
    companionPlants: ['Corn', 'Carrots', 'Cucumbers', 'Marigolds'],
    isPro: false,
  }),
  
  createPlant({
    id: 'peas',
    name: 'Peas',
    scientificName: 'Pisum sativum',
    category: 'vegetable',
    difficulty: 1,
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Keep soil moist, especially during flowering and pod development' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.5 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '2-3 inches', betweenRows: '18-24 inches' },
    maturity: { daysToHarvest: 60, harvestWindow: 'Late spring to early summer' },
    description: 'Cool-season crop that loves Frederick County springs. Plant as soon as soil is workable. Sweet flavor best when harvested young.',
    growingTips: [
      'Direct sow as soon as soil can be worked (late March)',
      'Provide trellis for climbing varieties',
      'Harvest regularly when pods are plump but before seeds harden',
      'Plant in succession for extended harvest'
    ],
    commonPests: ['Aphids', 'Pea weevils', 'Powdery mildew'],
    companionPlants: ['Carrots', 'Radishes', 'Cucumbers', 'Corn'],
    isPro: false,
  }),
  
  createPlant({
    id: 'onions',
    name: 'Onions',
    scientificName: 'Allium cepa',
    category: 'vegetable',
    difficulty: 2,
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Consistent moisture until bulbs form, then reduce watering' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.0 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '4-6 inches', betweenRows: '12-18 inches' },
    maturity: { daysToHarvest: 100, harvestWindow: 'Late summer' },
    description: 'Essential kitchen crop available as seeds, sets, or transplants. Long-day varieties best for Zone 6b-7a. Stores well after curing.',
    growingTips: [
      'Plant sets or transplants in early spring',
      'Keep weed-free and well-watered until bulbs form',
      'Stop watering when tops begin to fall over',
      'Harvest and cure in dry, airy location'
    ],
    commonPests: ['Onion maggots', 'Thrips'],
    companionPlants: ['Carrots', 'Beets', 'Cabbages', 'Chamomile'],
    isPro: false,
  }),
  
  createPlant({
    id: 'garlic',
    name: 'Garlic',
    scientificName: 'Allium sativum',
    category: 'vegetable',
    difficulty: 1,
    plantingSeasons: { spring: false, summer: false, fall: true, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Consistent moisture in spring, reduce in summer' },
    soilRequirements: { type: 'loamy', ph: { min: 6.0, max: 7.5 }, drainage: 'excellent' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '6 inches', betweenRows: '12 inches' },
    maturity: { daysToHarvest: 240, harvestWindow: 'Mid-summer' },
    description: 'Plant cloves in fall for harvest next summer. Very low maintenance. Hardneck varieties perform well in Frederick County\'s climate.',
    growingTips: [
      'Plant cloves in fall (October) for best results',
      'Plant pointed end up, 2 inches deep',
      'Mulch heavily after planting to prevent frost heaving',
      'Harvest when bottom 3-4 leaves have browned'
    ],
    commonPests: ['Onion maggots', 'Thrips'],
    companionPlants: ['Tomatoes', 'Peppers', 'Roses'],
    isPro: false,
  }),
  
  createPlant({
    id: 'potatoes',
    name: 'Potatoes',
    scientificName: 'Solanum tuberosum',
    category: 'vegetable',
    difficulty: 2,
    plantingSeasons: { spring: true, summer: false, fall: false, winter: false },
    wateringSchedule: { frequency: 'weekly', amount: 'moderate', notes: 'Consistent moisture, especially during tuber formation' },
    soilRequirements: { type: 'loamy', ph: { min: 5.0, max: 6.0 }, drainage: 'good' },
    sunRequirements: 'full-sun',
    spacing: { betweenPlants: '12 inches', betweenRows: '30-36 inches' },
    maturity: { daysToHarvest: 90, harvestWindow: 'Late summer to early fall' },
    description: 'Versatile staple crop perfect for home gardens. Plant seed potatoes in spring. Harvest new potatoes early or mature potatoes for storage.',
    growingTips: [
      'Plant seed potatoes when soil temperature reaches 45°F',
      'Hill soil around plants as they grow to protect tubers',
      'Keep consistently moist, especially during flowering',
      'Harvest after tops die back for storage potatoes'
    ],
    commonPests: ['Colorado potato beetles', 'Aphids', 'Wireworms'],
    companionPlants: ['Beans', 'Corn', 'Cabbage', 'Horseradish'],
    isPro: false,
  }),
];

// Continue with herbs, fruits, and flowers in the next response due to length limits...












