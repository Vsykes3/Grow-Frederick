'use client'

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { plantDatabase as fallbackPlants } from '@/lib/plants';

interface AddPlantModalProps {
  onClose: () => void;
  onAdd: (plantData: any) => void;
}

export function AddPlantModal({ onClose, onAdd }: AddPlantModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlant, setSelectedPlant] = useState<any>(null);
  const [plantedDate, setPlantedDate] = useState(new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [plants, setPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load plants from JSON file
    const loadPlants = async () => {
      try {
        const response = await fetch('/data/plants.json');
        if (response.ok) {
          const data = await response.json();
          // Merge with fallback plants and ensure all have required fields
          const merged = data.map((p: any) => ({
            ...p,
            daysToHarvest: p.daysToHarvest || 60,
            maturity: { daysToHarvest: p.daysToHarvest || 60 }
          }));
          setPlants(merged.length > 0 ? merged : fallbackPlants);
        } else {
          setPlants(fallbackPlants);
        }
      } catch (error) {
        console.error('Error loading plants:', error);
        setPlants(fallbackPlants);
      } finally {
        setLoading(false);
      }
    };
    loadPlants();
  }, []);

  const filteredPlants = plants.filter(p => {
    const name = (p.name || p.commonName || '').toLowerCase();
    const scientific = (p.scientificName || '').toLowerCase();
    const search = searchTerm.toLowerCase();
    return name.includes(search) || scientific.includes(search);
  });

  const handleAdd = () => {
    if (!selectedPlant) return;

    onAdd({
      ...selectedPlant,
      name: selectedPlant.name || selectedPlant.commonName,
      commonName: selectedPlant.name || selectedPlant.commonName,
      plantedDate: new Date(plantedDate).toISOString(),
      location,
      notes,
      daysToHarvest: selectedPlant.daysToHarvest || selectedPlant.maturity?.daysToHarvest || 60,
      imageUrl: selectedPlant.imageUrl || selectedPlant.image
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-background border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border sticky top-0 bg-background">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-foreground">Add Plant to Garden</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {!selectedPlant ? (
            // PLANT SELECTION
            <>
              <input
                type="text"
                placeholder="Search plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg mb-6 text-lg bg-background text-foreground"
                autoFocus
              />

              {loading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading plants...
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                  {filteredPlants.length === 0 ? (
                    <div className="col-span-3 text-center py-8 text-muted-foreground">
                      No plants found. Try a different search term.
                    </div>
                  ) : (
                  filteredPlants.map(plant => (
                    <div
                      key={plant.id}
                      onClick={() => setSelectedPlant(plant)}
                      className="border-2 border-border rounded-lg p-4 cursor-pointer hover:border-primary transition"
                    >
                      {(plant.imageUrl || plant.image) && (
                        <img 
                          src={plant.imageUrl || plant.image || '/images/plants/placeholder.jpg'} 
                          alt={plant.name || plant.commonName} 
                          className="w-full h-32 object-cover rounded mb-2"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      )}
                      <h3 className="font-bold text-foreground">{plant.name}</h3>
                      <p className="text-sm text-muted-foreground italic">{plant.scientificName}</p>
                    </div>
                  ))
                  )}
                </div>
              )}
            </>
          ) : (
            // PLANT DETAILS FORM
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                {(selectedPlant.imageUrl || selectedPlant.image) && (
                  <img 
                    src={selectedPlant.imageUrl || selectedPlant.image || '/images/plants/placeholder.jpg'} 
                    alt={selectedPlant.name || selectedPlant.commonName} 
                    className="w-24 h-24 object-cover rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{selectedPlant.name || selectedPlant.commonName}</h3>
                  <p className="text-muted-foreground italic">{selectedPlant.scientificName}</p>
                </div>
                <button
                  onClick={() => setSelectedPlant(null)}
                  className="ml-auto text-primary hover:text-primary/80"
                >
                  Change Plant
                </button>
              </div>

              <div>
                <label className="block font-semibold mb-2 text-foreground">Planted Date</label>
                <input
                  type="date"
                  value={plantedDate}
                  onChange={(e) => setPlantedDate(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-foreground">Location in Garden</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Main bed, Container #3, North corner"
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-foreground">Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional notes..."
                  rows={3}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAdd}
                  className="flex-1 bg-primary text-primary-foreground"
                >
                  Add to Garden
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

