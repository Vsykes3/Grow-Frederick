'use client';

import React, { useState } from 'react';
import { Search, Filter, AlertTriangle, Bug, Calendar, ExternalLink, Shield, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ReportPestSighting, type PestReport } from '@/components/ReportPestSighting';
import pestImage from '@/assets/Pest.jpg';
import japaneseBeetleImage from '@/assets/japanese-beetle.jpg';
import aphidsImage from '@/assets/aphids.jpg';
import wormImage from '@/assets/worm.jpg';
import squashImage from '@/assets/squash.jpg';
import cucumberBeetleImage from '@/assets/cucumber beetle.jpg';
import fleaImage from '@/assets/flea.jpg';
import mitesImage from '@/assets/mites.jpg';
import cabbageWormImage from '@/assets/cabbage worm.jpg';
import slugsSnailsImage from '@/assets/slugs and snails.jpg';

// Helper function to get image URL from imported asset
const getImageUrl = (img: any): string => {
  if (typeof img === 'string') return img;
  return img?.src || img?.default || img;
};

interface Pest {
  id: string;
  name: string;
  scientificName: string;
  season: string;
  affectedPlants: string[];
  riskLevel: 'Small' | 'Medium' | 'High';
  description: string;
  organicControls: string[];
  chemicalControls?: string[];
  prevention: string[];
  identification: string;
  imageUrl: string;
  frederickCountyIssue?: boolean;
  reportingUrl?: string;
}

const pests: Pest[] = [
  {
    id: '1',
    name: 'Spotted Lanternfly',
    scientificName: 'Lycorma delicatula',
    season: 'Late Spring - Fall',
    affectedPlants: ['Grape', 'Apple', 'Maple', 'Black Walnut', 'Willow', 'Stone Fruits', 'Hardwood Trees'],
    riskLevel: 'High',
    description: 'An invasive planthopper native to Asia that poses a serious threat to agriculture and forestry in Frederick County. First detected in Pennsylvania in 2014, it has spread rapidly through the Mid-Atlantic region. The spotted lanternfly feeds on over 70 plant species, causing significant damage to crops and trees.',
    organicControls: [
      'Scrape and destroy egg masses (October-April)',
      'Use sticky bands on tree trunks (May-June)',
      'Remove Tree of Heaven (Ailanthus altissima) - preferred host',
      'Apply neem oil or insecticidal soap to nymphs',
      'Introduce natural predators (praying mantises, spiders)',
      'Use circle traps around tree trunks'
    ],
    chemicalControls: [
      'Systemic insecticides (imidacloprid) for severe infestations',
      'Contact insecticides (bifenthrin) for direct application',
      'Always follow label instructions and local regulations'
    ],
    prevention: [
      'Inspect vehicles and outdoor equipment before moving',
      'Check firewood and outdoor furniture for egg masses',
      'Report sightings to Maryland Department of Agriculture',
      'Remove Tree of Heaven from your property',
      'Use physical barriers on vulnerable trees'
    ],
    identification: 'Adults: 1 inch long, gray wings with black spots, red hind wings with black spots. Nymphs: Black with white spots (early instars), red and black with white spots (later instars). Egg masses: Gray, mud-like patches on smooth surfaces.',
    imageUrl: getImageUrl(pestImage),
    frederickCountyIssue: true,
    reportingUrl: 'https://mda.maryland.gov/plants-pests/Pages/spotted-lantern-fly.aspx'
  },
  {
    id: '2',
    name: 'Japanese Beetle',
    scientificName: 'Popillia japonica',
    season: 'June - August',
    affectedPlants: ['Rose', 'Grape', 'Raspberry', 'Linden', 'Apple', 'Bean', 'Corn'],
    riskLevel: 'High',
    description: 'Metallic green and bronze beetles that skeletonize leaves and feed on flowers and fruits. They are highly destructive and can quickly defoliate plants. Larvae (grubs) feed on grass roots, damaging lawns.',
    organicControls: [
      'Hand-pick beetles early morning (they are sluggish)',
      'Use milky spore disease for grub control',
      'Apply neem oil to deter feeding',
      'Use floating row covers on vulnerable plants',
      'Plant trap crops (geraniums, evening primrose)',
      'Apply beneficial nematodes to soil for grubs'
    ],
    chemicalControls: [
      'Pyrethrin-based sprays for adult beetles',
      'Systemic insecticides for severe infestations',
      'Grub control products (imidacloprid) applied in late summer'
    ],
    prevention: [
      'Avoid planting highly attractive plants',
      'Maintain healthy soil to support beneficial organisms',
      'Use pheromone traps away from garden (attracts more beetles)',
      'Keep lawn healthy to resist grub damage'
    ],
    identification: 'Adults: 1/2 inch long, metallic green head and thorax, bronze wing covers. Larvae: C-shaped white grubs in soil. Damage: Skeletonized leaves, damaged flowers.',
    imageUrl: getImageUrl(japaneseBeetleImage)
  },
  {
    id: '3',
    name: 'Aphids',
    scientificName: 'Aphidoidea',
    season: 'Spring - Fall',
    affectedPlants: ['Tomato', 'Lettuce', 'Pepper', 'Rose', 'Cabbage', 'Broccoli'],
    riskLevel: 'Medium',
    description: 'Small, soft-bodied insects that suck sap from plant leaves and stems. They reproduce rapidly and can cause stunted growth, curled leaves, and transmit plant viruses. Honeydew secretion promotes sooty mold growth.',
    organicControls: [
      'Spray with strong water stream to dislodge',
      'Apply insecticidal soap or neem oil',
      'Introduce beneficial insects (ladybugs, lacewings)',
      'Use reflective mulches to deter',
      'Plant companion plants (nasturtiums, marigolds)',
      'Apply horticultural oil in dormant season'
    ],
    prevention: [
      'Encourage natural predators',
      'Avoid over-fertilizing (promotes tender growth)',
      'Use row covers on young plants',
      'Remove heavily infested plant parts',
      'Maintain plant health through proper watering'
    ],
    identification: 'Small (1/8 inch), pear-shaped insects in various colors (green, black, yellow, pink). Often found in clusters on new growth. May have wings in crowded conditions.',
    imageUrl: getImageUrl(aphidsImage)
  },
  {
    id: '4',
    name: 'Tomato Hornworm',
    scientificName: 'Manduca quinquemaculata',
    season: 'Summer',
    affectedPlants: ['Tomato', 'Pepper', 'Eggplant', 'Potato'],
    riskLevel: 'High',
    description: 'Large green caterpillars that can defoliate tomato plants overnight. They blend in with foliage, making them difficult to spot. A single hornworm can consume multiple leaves per day.',
    organicControls: [
      'Hand-pick caterpillars (check daily)',
      'Apply Bacillus thuringiensis (Bt) spray',
      'Introduce parasitic wasps (Trichogramma)',
      'Use floating row covers',
      'Plant trap crops (dill, fennel)',
      'Apply spinosad-based products'
    ],
    prevention: [
      'Till soil in fall to expose pupae',
      'Rotate crops annually',
      'Encourage natural predators',
      'Use companion planting (basil, marigolds)',
      'Monitor plants daily during peak season'
    ],
    identification: 'Large (3-4 inches), green caterpillars with white diagonal stripes and a horn on rear. Often found on stems and leaves. May have white cocoons (parasitized by wasps).',
    imageUrl: getImageUrl(wormImage)
  },
  {
    id: '5',
    name: 'Squash Vine Borer',
    scientificName: 'Melittia cucurbitae',
    season: 'June - August',
    affectedPlants: ['Squash', 'Zucchini', 'Pumpkin', 'Cucumber'],
    riskLevel: 'High',
    description: 'Larva that bores into squash plant stems, causing sudden wilting and plant death. The adult is a clear-winged moth that lays eggs at the base of plants. Once inside the stem, larvae are difficult to control.',
    organicControls: [
      'Use floating row covers until flowering',
      'Wrap base of stems with aluminum foil',
      'Apply Bt to base of plants when eggs are present',
      'Inject Bt into stems if borer detected',
      'Plant early or late to avoid peak moth activity',
      'Remove and destroy infested plants'
    ],
    prevention: [
      'Plant resistant varieties when available',
      'Use row covers during egg-laying period',
      'Monitor for adult moths (red body, clear wings)',
      'Rotate crops to different location',
      'Till soil in fall to destroy overwintering pupae'
    ],
    identification: 'Adult: Red and black clear-winged moth, active during day. Larvae: White caterpillars with brown heads inside stems. Damage: Sudden wilting, sawdust-like frass at base, holes in stems.',
    imageUrl: getImageUrl(squashImage)
  },
  {
    id: '6',
    name: 'Cucumber Beetle',
    scientificName: 'Acalymma vittatum / Diabrotica undecimpunctata',
    season: 'Spring - Fall',
    affectedPlants: ['Cucumber', 'Squash', 'Melon', 'Bean', 'Corn'],
    riskLevel: 'Medium',
    description: 'Striped or spotted beetles that feed on leaves, flowers, and fruits. They transmit bacterial wilt and cucumber mosaic virus. Larvae feed on roots, stunting plant growth.',
    organicControls: [
      'Use floating row covers until flowering',
      'Apply kaolin clay to deter feeding',
      'Hand-pick beetles early morning',
      'Apply neem oil or pyrethrin',
      'Plant trap crops (radish, nasturtium)',
      'Use beneficial nematodes for larvae'
    ],
    prevention: [
      'Remove crop debris after harvest',
      'Use row covers on young plants',
      'Plant resistant varieties',
      'Rotate crops annually',
      'Maintain healthy soil'
    ],
    identification: 'Striped: Yellow with three black stripes. Spotted: Yellow-green with 12 black spots. Both about 1/4 inch long. Damage: Holes in leaves, damaged flowers, stunted growth.',
    imageUrl: getImageUrl(cucumberBeetleImage)
  },
  {
    id: '7',
    name: 'Flea Beetle',
    scientificName: 'Alticini',
    season: 'Spring - Summer',
    affectedPlants: ['Eggplant', 'Radish', 'Cabbage', 'Broccoli', 'Turnip', 'Arugula'],
    riskLevel: 'Small',
    description: 'Small jumping beetles that create numerous small holes in leaves, giving them a "shot-hole" appearance. While rarely fatal, heavy infestations can stunt growth and reduce yields.',
    organicControls: [
      'Use floating row covers on young plants',
      'Apply diatomaceous earth around plants',
      'Spray with neem oil or pyrethrin',
      'Use sticky traps',
      'Plant trap crops (radish, arugula)',
      'Apply kaolin clay'
    ],
    prevention: [
      'Remove crop debris after harvest',
      'Use row covers until plants are established',
      'Plant later in season when beetles are less active',
      'Maintain healthy, fast-growing plants',
      'Rotate crops'
    ],
    identification: 'Tiny (1/16-1/8 inch) black, bronze, or striped beetles that jump when disturbed. Damage: Small round holes in leaves, especially on young plants.',
    imageUrl: getImageUrl(fleaImage)
  },
  {
    id: '8',
    name: 'Spider Mites',
    scientificName: 'Tetranychidae',
    season: 'Summer',
    affectedPlants: ['Tomato', 'Bean', 'Cucumber', 'Strawberry', 'Rose', 'Houseplants'],
    riskLevel: 'Medium',
    description: 'Tiny arachnids that suck plant sap, causing stippling, yellowing, and webbing. Thrive in hot, dry conditions. Can reproduce rapidly, causing significant damage in short time.',
    organicControls: [
      'Spray with strong water stream regularly',
      'Apply insecticidal soap or neem oil',
      'Increase humidity around plants',
      'Introduce predatory mites (Phytoseiulus persimilis)',
      'Use horticultural oil',
      'Apply miticides (spinosad) if severe'
    ],
    prevention: [
      'Maintain adequate soil moisture',
      'Avoid over-fertilizing',
      'Monitor plants regularly with magnifying glass',
      'Increase air circulation',
      'Remove heavily infested leaves'
    ],
    identification: 'Tiny (1/50 inch) red, yellow, or green mites. Fine webbing on leaves and stems. Damage: Yellow stippling on leaves, leaves may turn bronze and drop.',
    imageUrl: getImageUrl(mitesImage)
  },
  {
    id: '9',
    name: 'Cabbage Worm',
    scientificName: 'Pieris rapae',
    season: 'Spring - Fall',
    affectedPlants: ['Cabbage', 'Broccoli', 'Cauliflower', 'Kale', 'Brussels Sprouts'],
    riskLevel: 'Medium',
    description: 'Green caterpillars that feed on brassica crops, creating holes in leaves and heads. The adult is a white butterfly with black spots. Multiple generations per year.',
    organicControls: [
      'Hand-pick caterpillars and eggs',
      'Apply Bt (Bacillus thuringiensis)',
      'Use floating row covers',
      'Introduce parasitic wasps',
      'Apply spinosad',
      'Plant trap crops (collards)'
    ],
    prevention: [
      'Use row covers throughout growing season',
      'Monitor for white butterflies',
      'Remove and destroy infested leaves',
      'Plant early or late to avoid peak populations',
      'Encourage natural predators'
    ],
    identification: 'Adult: White butterfly with black spots on wings. Larvae: Velvety green caterpillars with faint yellow stripe. Eggs: Yellow, laid singly on leaves.',
    imageUrl: getImageUrl(cabbageWormImage)
  },
  {
    id: '10',
    name: 'Slugs and Snails',
    scientificName: 'Gastropoda',
    season: 'Spring - Fall (especially wet periods)',
    affectedPlants: ['Lettuce', 'Hostas', 'Strawberry', 'Cabbage', 'Seedlings'],
    riskLevel: 'Small',
    description: 'Mollusks that feed on leaves, stems, and fruits, leaving irregular holes and slime trails. Most active at night and during wet weather. Can damage seedlings severely.',
    organicControls: [
      'Hand-pick at night with flashlight',
      'Use beer traps (sink containers level with soil)',
      'Apply diatomaceous earth around plants',
      'Use copper barriers',
      'Apply iron phosphate baits',
      'Create dry barriers (gravel, crushed eggshells)'
    ],
    prevention: [
      'Remove hiding places (boards, debris)',
      'Water in morning so soil dries by evening',
      'Improve drainage',
      'Use raised beds',
      'Encourage natural predators (birds, toads)'
    ],
    identification: 'Slugs: Soft-bodied, no shell, various colors. Snails: Similar but with spiral shell. Both leave silvery slime trails. Damage: Irregular holes in leaves, especially young plants.',
    imageUrl: getImageUrl(slugsSnailsImage)
  }
];

const riskLevelColors = {
  Small: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
  High: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'
};

const seasons = ['All Seasons', 'Spring', 'Summer', 'Fall', 'Winter'];

export default function PestsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('All Seasons');
  const [selectedRisk, setSelectedRisk] = useState('all');
  const [selectedPest, setSelectedPest] = useState<Pest | null>(null);
  const [showReportForm, setShowReportForm] = useState(false);

  const filteredPests = pests.filter(pest => {
    const matchesSearch = pest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pest.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pest.affectedPlants.some(plant => 
                           plant.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesSeason = selectedSeason === 'All Seasons' || 
                         pest.season.toLowerCase().includes(selectedSeason.toLowerCase());
    const matchesRisk = selectedRisk === 'all' || pest.riskLevel === selectedRisk;
    
    return matchesSearch && matchesSeason && matchesRisk;
  });

  const stats = {
    total: pests.length,
    high: pests.filter(p => p.riskLevel === 'High').length,
    medium: pests.filter(p => p.riskLevel === 'Medium').length,
    small: pests.filter(p => p.riskLevel === 'Small').length,
    frederickCounty: pests.filter(p => p.frederickCountyIssue).length
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600/10 to-orange-600/10 border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <Bug className="h-10 w-10" />
              Pest & Disease Guide
            </h1>
            <p className="text-xl text-muted-foreground">
              Identify, prevent, and manage common garden pests in Frederick County, Maryland
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Alert for Spotted Lanternfly */}
        {pests.find(p => p.frederickCountyIssue) && (
          <div className="mb-8 bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-800 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-red-900 dark:text-red-100 mb-2">
                  🚨 High Priority: Spotted Lanternfly Alert
                </h3>
                <p className="text-red-800 dark:text-red-200 mb-3">
                  The Spotted Lanternfly is an invasive species actively spreading in Frederick County. 
                  Early detection and reporting are critical to prevent further spread.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => setSelectedPest(pests.find(p => p.frederickCountyIssue) || null)}
                  >
                    Learn More & Report
                  </Button>
                  {pests.find(p => p.frederickCountyIssue)?.reportingUrl && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(pests.find(p => p.frederickCountyIssue)?.reportingUrl, '_blank')}
                    >
                      Report to MDA
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Search pests, plants, or scientific names..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-input rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gc-accent"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="px-4 py-3 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gc-accent"
              >
                {seasons.map(season => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </select>
              <select
                value={selectedRisk}
                onChange={(e) => setSelectedRisk(e.target.value)}
                className="px-4 py-3 border border-input rounded-xl bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-gc-accent"
              >
                <option value="all">All Risk Levels</option>
                <option value="High">High Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="Small">Small Risk</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-card p-4 rounded-xl border">
            <div className="text-2xl font-bold text-foreground">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Pests</div>
          </div>
          <div className="bg-card p-4 rounded-xl border border-red-300 dark:border-red-800">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.high}</div>
            <div className="text-sm text-muted-foreground">High Risk</div>
          </div>
          <div className="bg-card p-4 rounded-xl border border-yellow-300 dark:border-yellow-800">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.medium}</div>
            <div className="text-sm text-muted-foreground">Medium Risk</div>
          </div>
          <div className="bg-card p-4 rounded-xl border border-green-300 dark:border-green-800">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.small}</div>
            <div className="text-sm text-muted-foreground">Small Risk</div>
          </div>
          <div className="bg-card p-4 rounded-xl border border-orange-300 dark:border-orange-800">
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.frederickCounty}</div>
            <div className="text-sm text-muted-foreground">Frederick Co. Issues</div>
          </div>
        </div>

        {/* Pests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPests.map((pest) => (
            <div 
              key={pest.id} 
              className="bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
              onClick={() => setSelectedPest(pest)}
            >
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={pest.imageUrl}
                  alt={pest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://picsum.photos/800/600?random=10';
                    target.onerror = null; // Prevent infinite loop
                  }}
                  loading="lazy"
                />
                {pest.frederickCountyIssue && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Frederick Co. Alert
                    </span>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${riskLevelColors[pest.riskLevel]}`}>
                    {pest.riskLevel} Risk
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="mb-3">
                  <h3 className="font-bold text-lg text-foreground mb-1">{pest.name}</h3>
                  <p className="text-sm text-muted-foreground italic">{pest.scientificName}</p>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{pest.season}</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Affects:</p>
                    <div className="flex flex-wrap gap-1">
                      {pest.affectedPlants.slice(0, 3).map((plant, index) => (
                        <span key={index} className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
                          {plant}
                        </span>
                      ))}
                      {pest.affectedPlants.length > 3 && (
                        <span className="text-xs text-muted-foreground">+{pest.affectedPlants.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {pest.description}
                </p>
                
                <Button size="sm" className="w-full" variant="outline">
                  View Details & Solutions
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPests.length === 0 && (
          <div className="text-center py-12">
            <Bug className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No pests found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button onClick={() => {
              setSearchTerm('');
              setSelectedSeason('All Seasons');
              setSelectedRisk('all');
            }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Pest Detail Modal */}
        {selectedPest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedPest(null)}>
            <div className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold text-foreground">{selectedPest.name}</h2>
                <Button variant="ghost" size="icon" onClick={() => setSelectedPest(null)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Header Image */}
                <div className="relative h-64 rounded-xl overflow-hidden bg-muted">
                  <img
                    src={selectedPest.imageUrl}
                    alt={selectedPest.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1533038590840-cd47b7665b8e?w=800&h=600&fit=crop&q=80';
                      target.onerror = null; // Prevent infinite loop
                    }}
                    loading="lazy"
                  />
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Scientific Name</p>
                    <p className="font-medium text-foreground italic">{selectedPest.scientificName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Risk Level</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold border-2 ${riskLevelColors[selectedPest.riskLevel]}`}>
                      {selectedPest.riskLevel} Risk
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Active Season</p>
                    <p className="font-medium text-foreground">{selectedPest.season}</p>
                  </div>
                  {selectedPest.frederickCountyIssue && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Status</p>
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-bold bg-red-600 text-white">
                        Frederick County Priority
                      </span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
                  <p className="text-muted-foreground">{selectedPest.description}</p>
                </div>

                {/* Identification */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Identification</h3>
                  <p className="text-muted-foreground">{selectedPest.identification}</p>
                </div>

                {/* Affected Plants */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Affected Plants</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedPest.affectedPlants.map((plant, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg text-sm">
                        {plant}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Organic Controls */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Organic Control Methods
                  </h3>
                  <ul className="space-y-2">
                    {selectedPest.organicControls.map((control, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-green-600 mt-1">•</span>
                        <span>{control}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Chemical Controls (if available) */}
                {selectedPest.chemicalControls && selectedPest.chemicalControls.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Chemical Control Methods</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Use chemical controls only when organic methods are insufficient. Always follow label instructions and local regulations.
                    </p>
                    <ul className="space-y-2">
                      {selectedPest.chemicalControls.map((control, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-orange-600 mt-1">•</span>
                          <span>{control}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Prevention */}
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Prevention Strategies</h3>
                  <ul className="space-y-2">
                    {selectedPest.prevention.map((prevent, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{prevent}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Reporting (for Frederick County issues) */}
                {selectedPest.frederickCountyIssue && selectedPest.reportingUrl && (
                  <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-800 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
                      Report Sightings
                    </h3>
                    <p className="text-red-800 dark:text-red-200 mb-3">
                      If you spot this pest, please report it to the Maryland Department of Agriculture to help track and control its spread.
                    </p>
                    <Button 
                      variant="destructive"
                      onClick={() => window.open(selectedPest.reportingUrl, '_blank')}
                    >
                      Report to MDA
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Report Sighting */}
        <div className="mt-12 bg-card rounded-xl border p-6">
          <div className="text-center">
            <AlertTriangle className="h-8 w-8 text-amber-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Spotted a new pest?
            </h3>
            <p className="text-muted-foreground mb-4">
              Help the community by reporting pest sightings in your area. Early detection helps protect Frederick County's agriculture and natural resources.
            </p>
            <Button onClick={() => setShowReportForm(true)}>
              Report Sighting
            </Button>
          </div>
        </div>
      </div>

      {/* Report Form Modal */}
      {showReportForm && (
        <ReportPestSighting
          onClose={() => setShowReportForm(false)}
          onSubmit={(report) => {
            // Store report in localStorage
            const existing = JSON.parse(localStorage.getItem('pestReports') || '[]');
            const newReport = {
              ...report,
              id: Date.now(),
              submittedAt: new Date().toISOString(),
            };
            localStorage.setItem('pestReports', JSON.stringify([...existing, newReport]));
            console.log('Pest report submitted:', newReport);
            setShowReportForm(false);
          }}
        />
      )}
    </div>
  );
}
