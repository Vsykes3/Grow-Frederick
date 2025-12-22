'use client'

import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { AddPlantModal } from '@/components/my-garden/AddPlantModal';
import { EditPlantModal } from '@/components/my-garden/EditPlantModal';
import { LogActivityModal } from '@/components/my-garden/LogActivityModal';
import { SelectGardenModal } from '@/components/my-garden/SelectGardenModal';

// Type definitions
interface Garden {
  id: string;
  name: string;
  plants: PlantInGarden[];
  createdAt: string;
  location: string;
}

interface PlantInGarden {
  id: string;
  plantId: string;
  commonName: string;
  scientificName: string;
  image?: string;
  addedDate: string;
  plantedDate: string;
  expectedHarvestDate?: string;
  harvestedDate?: string;
  status: 'growing' | 'harvested' | 'failed';
  location?: string;
  notes?: string;
  activities?: PlantActivity[];
}

interface PlantActivity {
  id: string;
  date: string;
  type: 'watered' | 'fertilized' | 'pruned' | 'pest-control' | 'other';
  notes: string;
}

export default function MyGardenPage() {
  const [gardens, setGardens] = useState<Garden[]>([]);
  const [selectedGarden, setSelectedGarden] = useState<Garden | null>(null);
  const [showAddPlantModal, setShowAddPlantModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<PlantInGarden | null>(null);
  const [showGardenSelectModal, setShowGardenSelectModal] = useState(false);
  const [pendingPlant, setPendingPlant] = useState<any>(null);

  // Load gardens from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('myGardens');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setGardens(parsed);
        if (parsed.length > 0) {
          setSelectedGarden(parsed[0]);
        }
      } catch (error) {
        console.error('Error loading gardens:', error);
        localStorage.removeItem('myGardens');
        setGardens([]);
      }
    }
  }, []);

  // ADD PLANT TO SPECIFIC GARDEN
  const handleAddPlantToGarden = (gardenId: string, plantData: any) => {
    const currentGardens = JSON.parse(localStorage.getItem('myGardens') || '[]');
    const currentGarden = currentGardens.find((g: any) => g.id === gardenId) || currentGardens[0];
    if (!currentGarden) {
      // Create default garden if none exists
      const defaultGarden: Garden = {
        id: Date.now().toString(),
        name: 'My Garden',
        plants: [],
        createdAt: new Date().toISOString(),
        location: 'Frederick County, MD'
      };
      const updated = [defaultGarden];
      saveGardens(updated);
      setSelectedGarden(defaultGarden);
      // Add plant to new garden
      const newPlant: PlantInGarden = {
        id: Date.now().toString(),
        plantId: plantData.id || plantData.plantId || Date.now().toString(),
        commonName: plantData.commonName || plantData.name || 'Unknown Plant',
        scientificName: plantData.scientificName || '',
        image: plantData.image || plantData.imageUrl,
        addedDate: new Date().toISOString(),
        plantedDate: plantData.plantedDate || new Date().toISOString(),
        expectedHarvestDate: plantData.expectedHarvestDate || calculateHarvestDate(plantData.daysToHarvest || 60),
        status: 'growing',
        location: plantData.location || 'Main bed',
        notes: plantData.notes || '',
        activities: []
      };
      defaultGarden.plants.push(newPlant);
      saveGardens([defaultGarden]);
      setSelectedGarden(defaultGarden);
      return;
    }

    const newPlant: PlantInGarden = {
      id: Date.now().toString(),
      plantId: plantData.id || plantData.plantId || Date.now().toString(),
      commonName: plantData.commonName || plantData.name || 'Unknown Plant',
      scientificName: plantData.scientificName || '',
      image: plantData.image || plantData.imageUrl,
      addedDate: new Date().toISOString(),
      plantedDate: plantData.plantedDate || new Date().toISOString(),
      expectedHarvestDate: plantData.expectedHarvestDate || calculateHarvestDate(plantData.daysToHarvest || 60),
      status: 'growing',
      location: plantData.location || 'Main bed',
      notes: plantData.notes || '',
      activities: []
    };

    const updatedGardens = currentGardens.map((g: any) => 
      g.id === gardenId 
        ? { ...g, plants: [...g.plants, newPlant] }
        : g
    );

    saveGardens(updatedGardens);
    const updated = updatedGardens.find((g: any) => g.id === gardenId);
    if (updated) setSelectedGarden(updated);
  };

  // Process pending plant from Plant Index
  useEffect(() => {
    const pendingPlantData = sessionStorage.getItem('pendingPlant');
    if (!pendingPlantData) return;
    
    try {
      const plant = JSON.parse(pendingPlantData);
      sessionStorage.removeItem('pendingPlant');
      
      // Check gardens from localStorage directly
      const existingGardens = JSON.parse(localStorage.getItem('myGardens') || '[]');
      
      if (existingGardens.length === 0) {
        // Create first garden automatically and add plant
        const newGarden: Garden = {
          id: Date.now().toString(),
          name: 'My Garden',
          plants: [],
          createdAt: new Date().toISOString(),
          location: 'Frederick County, MD'
        };
        setGardens([newGarden]);
        setSelectedGarden(newGarden);
        // Wait a moment for state to update, then add plant
        setTimeout(() => {
          handleAddPlantToGarden(newGarden.id, plant);
        }, 50);
      } else if (existingGardens.length === 1) {
        // Only one garden, add directly
        handleAddPlantToGarden(existingGardens[0].id, plant);
      } else {
        // Multiple gardens, show selection modal
        setPendingPlant(plant);
        setShowGardenSelectModal(true);
      }
    } catch (error) {
      console.error('Error processing pending plant:', error);
    }
  }, []); // Run once on mount

  const saveGardens = (updatedGardens: Garden[]) => {
    setGardens(updatedGardens);
    localStorage.setItem('myGardens', JSON.stringify(updatedGardens));
  };

  // CREATE NEW GARDEN
  const createNewGarden = () => {
    const newGarden: Garden = {
      id: Date.now().toString(),
      name: `My Garden ${gardens.length + 1}`,
      plants: [], // START EMPTY
      createdAt: new Date().toISOString(),
      location: 'Frederick County, MD'
    };
    const updated = [...gardens, newGarden];
    saveGardens(updated);
    setSelectedGarden(newGarden);
  };


  // ADD PLANT TO GARDEN
  const handleAddPlant = (plantData: any) => {
    if (!selectedGarden) {
      // Create default garden if none exists
      const defaultGarden: Garden = {
        id: Date.now().toString(),
        name: 'My Garden',
        plants: [],
        createdAt: new Date().toISOString(),
        location: 'Frederick County, MD'
      };
      setGardens([defaultGarden]);
      setSelectedGarden(defaultGarden);
    }

    const currentGarden = selectedGarden || gardens[0];
    if (!currentGarden) return;

    const newPlant: PlantInGarden = {
      id: Date.now().toString(),
      plantId: plantData.id || plantData.plantId || Date.now().toString(),
      commonName: plantData.commonName || plantData.name || 'Unknown Plant',
      scientificName: plantData.scientificName || '',
      image: plantData.image || plantData.imageUrl,
      addedDate: new Date().toISOString(),
      plantedDate: plantData.plantedDate || new Date().toISOString(),
      expectedHarvestDate: plantData.expectedHarvestDate || calculateHarvestDate(plantData.daysToHarvest || 60),
      status: 'growing',
      location: plantData.location || 'Main bed',
      notes: plantData.notes || '',
      activities: []
    };

    const updatedGardens = gardens.map(g => 
      g.id === currentGarden.id 
        ? { ...g, plants: [...g.plants, newPlant] }
        : g
    );

    saveGardens(updatedGardens);
    const updated = updatedGardens.find(g => g.id === currentGarden.id);
    if (updated) setSelectedGarden(updated);
    setShowAddPlantModal(false);
  };

  // UPDATE PLANT STATUS
  const updatePlantStatus = (plantId: string, newStatus: 'growing' | 'harvested' | 'failed') => {
    if (!selectedGarden) return;

    const updatedGardens = gardens.map(g => 
      g.id === selectedGarden.id
        ? {
            ...g,
            plants: g.plants.map(p => 
              p.id === plantId
                ? { 
                    ...p, 
                    status: newStatus,
                    harvestedDate: newStatus === 'harvested' ? new Date().toISOString() : p.harvestedDate
                  }
                : p
            )
          }
        : g
    );

    saveGardens(updatedGardens);
    const updated = updatedGardens.find(g => g.id === selectedGarden.id);
    if (updated) setSelectedGarden(updated);
  };

  // EDIT PLANT
  const handleEditPlant = (updatedPlant: PlantInGarden) => {
    if (!selectedGarden) return;

    const updatedGardens = gardens.map(g => 
      g.id === selectedGarden.id
        ? {
            ...g,
            plants: g.plants.map(p => p.id === updatedPlant.id ? updatedPlant : p)
          }
        : g
    );

    saveGardens(updatedGardens);
    const updated = updatedGardens.find(g => g.id === selectedGarden.id);
    if (updated) setSelectedGarden(updated);
    setShowEditModal(false);
  };

  // DELETE PLANT
  const deletePlant = (plantId: string) => {
    if (!selectedGarden) return;
    if (!confirm('Are you sure you want to remove this plant?')) return;

    const updatedGardens = gardens.map(g => 
      g.id === selectedGarden.id
        ? { ...g, plants: g.plants.filter(p => p.id !== plantId) }
        : g
    );

    saveGardens(updatedGardens);
    const updated = updatedGardens.find(g => g.id === selectedGarden.id);
    if (updated) setSelectedGarden(updated);
  };

  // LOG ACTIVITY
  const logActivity = (plantId: string, activity: PlantActivity) => {
    if (!selectedGarden) return;

    const updatedGardens = gardens.map(g => 
      g.id === selectedGarden.id
        ? {
            ...g,
            plants: g.plants.map(p => 
              p.id === plantId
                ? { ...p, activities: [...(p.activities || []), activity] }
                : p
            )
          }
        : g
    );

    saveGardens(updatedGardens);
    const updated = updatedGardens.find(g => g.id === selectedGarden.id);
    if (updated) setSelectedGarden(updated);
    setShowActivityModal(false);
  };

  const calculateHarvestDate = (daysToHarvest: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToHarvest);
    return date.toISOString();
  };

  const statusColors = {
    growing: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    harvested: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-foreground">My Gardens</h1>
        <Button onClick={createNewGarden} className="bg-primary text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          New Garden
        </Button>
      </div>

      {gardens.length === 0 ? (
        // EMPTY STATE
        <div className="text-center py-16 bg-card rounded-lg border">
          <div className="text-6xl mb-4">🌱</div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Start Your Garden Journey</h2>
          <p className="text-muted-foreground mb-6">
            Create your first garden and start tracking your plants!
          </p>
          <Button onClick={createNewGarden} size="lg" className="bg-primary text-primary-foreground">
            Create Your First Garden
          </Button>
        </div>
      ) : (
        <div>
          {/* Garden Selector */}
          <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
            {gardens.map(garden => (
              <div
                key={garden.id}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition ${
                  selectedGarden?.id === garden.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                <button
                  onClick={() => setSelectedGarden(garden)}
                  className="flex-1 text-left"
                >
                  {garden.name} ({garden.plants.length})
                </button>
                {gardens.length > 1 && (
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${garden.name}"? This will permanently remove all plants in this garden.`)) {
                        const updated = gardens.filter(g => g.id !== garden.id);
                        saveGardens(updated);
                        if (selectedGarden?.id === garden.id) {
                          setSelectedGarden(updated.length > 0 ? updated[0] : null);
                        }
                      }
                    }}
                    className="ml-2 hover:text-red-500 transition-colors"
                    title="Delete garden"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {selectedGarden && (
            <>
              {selectedGarden.plants.length === 0 ? (
                // EMPTY GARDEN STATE
                <div className="text-center py-16 bg-card rounded-lg border">
                  <div className="text-6xl mb-4">🪴</div>
                  <h2 className="text-2xl font-bold mb-2 text-foreground">Add Your First Plant</h2>
                  <p className="text-muted-foreground mb-6">
                    Start tracking plants in {selectedGarden.name}
                  </p>
                  <Button onClick={() => setShowAddPlantModal(true)} size="lg" className="bg-primary text-primary-foreground">
                    Add Plant
                  </Button>
                </div>
              ) : (
                // PLANTS GRID
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-foreground">{selectedGarden.name}</h2>
                    <Button onClick={() => setShowAddPlantModal(true)} className="bg-primary text-primary-foreground">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Plant
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedGarden.plants.map(plant => (
                      <div
                        key={plant.id}
                        className="bg-card rounded-lg border-2 border-border overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        {/* Plant Image */}
                        {plant.image && (
                          <img 
                            src={plant.image} 
                            alt={plant.commonName}
                            className="w-full h-48 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        )}

                        <div className="p-4">
                          <h3 className="text-xl font-bold mb-1 text-foreground">{plant.commonName}</h3>
                          <p className="text-sm text-muted-foreground italic mb-3">
                            {plant.scientificName}
                          </p>

                          {/* Status Badges */}
                          <div className="flex gap-2 mb-4 flex-wrap">
                            <button
                              onClick={() => updatePlantStatus(plant.id, 'growing')}
                              className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                                plant.status === 'growing'
                                  ? 'bg-green-600 text-white'
                                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                              }`}
                            >
                              🌱 Growing
                            </button>
                            <button
                              onClick={() => updatePlantStatus(plant.id, 'harvested')}
                              className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                                plant.status === 'harvested'
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                              }`}
                            >
                              ✓ Harvested
                            </button>
                            <button
                              onClick={() => updatePlantStatus(plant.id, 'failed')}
                              className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                                plant.status === 'failed'
                                  ? 'bg-red-600 text-white'
                                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                              }`}
                            >
                              ✗ Failed
                            </button>
                          </div>

                          {/* Plant Info */}
                          <div className="text-sm space-y-1 mb-4 text-muted-foreground">
                            <p>📅 Planted: {new Date(plant.plantedDate).toLocaleDateString()}</p>
                            {plant.status === 'growing' && plant.expectedHarvestDate && (
                              <p>🎯 Expected harvest: {new Date(plant.expectedHarvestDate).toLocaleDateString()}</p>
                            )}
                            {plant.location && <p>📍 {plant.location}</p>}
                            {plant.activities && plant.activities.length > 0 && (
                              <p>📝 {plant.activities.length} activities logged</p>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2">
                            <Button
                              onClick={() => {
                                setSelectedPlant(plant);
                                setShowActivityModal(true);
                              }}
                              size="sm"
                              className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                            >
                              Log Activity
                            </Button>
                            <Button
                              onClick={() => {
                                setSelectedPlant(plant);
                                setShowEditModal(true);
                              }}
                              size="sm"
                              variant="outline"
                              className="flex-1"
                            >
                              Edit
                            </Button>
                            <Button
                              onClick={() => deletePlant(plant.id)}
                              size="sm"
                              variant="destructive"
                              className="px-3"
                            >
                              🗑️
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}

      {/* GARDEN SELECTION MODAL */}
      {showGardenSelectModal && pendingPlant && (
        <SelectGardenModal
          gardens={gardens}
          onSelect={(gardenId) => {
            handleAddPlantToGarden(gardenId, pendingPlant);
            setShowGardenSelectModal(false);
            setPendingPlant(null);
          }}
          onCreateNew={() => {
            const newGarden: Garden = {
              id: Date.now().toString(),
              name: `My Garden ${gardens.length + 1}`,
              plants: [],
              createdAt: new Date().toISOString(),
              location: 'Frederick County, MD'
            };
            const updated = [...gardens, newGarden];
            saveGardens(updated);
            setSelectedGarden(newGarden);
            handleAddPlantToGarden(newGarden.id, pendingPlant);
            setShowGardenSelectModal(false);
            setPendingPlant(null);
          }}
          onClose={() => {
            setShowGardenSelectModal(false);
            setPendingPlant(null);
          }}
          plantName={pendingPlant.name || pendingPlant.commonName || 'this plant'}
        />
      )}

      {/* ADD PLANT MODAL */}
      {showAddPlantModal && (
        <AddPlantModal
          onClose={() => setShowAddPlantModal(false)}
          onAdd={handleAddPlant}
        />
      )}

      {/* EDIT PLANT MODAL */}
      {showEditModal && selectedPlant && (
        <EditPlantModal
          plant={selectedPlant}
          onClose={() => setShowEditModal(false)}
          onSave={handleEditPlant}
        />
      )}

      {/* LOG ACTIVITY MODAL */}
      {showActivityModal && selectedPlant && (
        <LogActivityModal
          plant={selectedPlant}
          onClose={() => setShowActivityModal(false)}
          onLog={(activity) => logActivity(selectedPlant.id, activity)}
        />
      )}
    </div>
  );
}
