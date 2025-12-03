'use client'

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface EditPlantModalProps {
  plant: any;
  onClose: () => void;
  onSave: (plant: any) => void;
}

export function EditPlantModal({ plant, onClose, onSave }: EditPlantModalProps) {
  const [location, setLocation] = useState(plant.location || '');
  const [notes, setNotes] = useState(plant.notes || '');
  const [plantedDate, setPlantedDate] = useState(plant.plantedDate.split('T')[0]);

  const handleSave = () => {
    onSave({
      ...plant,
      location,
      notes,
      plantedDate: new Date(plantedDate).toISOString()
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-background border border-border rounded-lg max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground">Edit {plant.commonName}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
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
            <label className="block font-semibold mb-2 text-foreground">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-foreground">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            onClick={handleSave}
            className="flex-1 bg-primary text-primary-foreground"
          >
            Save Changes
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
    </div>
  );
}




