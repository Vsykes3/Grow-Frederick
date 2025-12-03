'use client'

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface AddEventModalProps {
  date: Date;
  onClose: () => void;
  onAdd: (event: any) => void;
}

export function AddEventModal({ date, onClose, onAdd }: AddEventModalProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'harvest' | 'plant' | 'water' | 'fertilize' | 'custom'>('custom');
  const [notes, setNotes] = useState('');
  const [eventDate, setEventDate] = useState(date.toISOString().split('T')[0]);

  const typeColors = {
    harvest: '#10b981',
    plant: '#3b82f6',
    water: '#06b6d4',
    fertilize: '#8b5cf6',
    custom: '#6b7280'
  };

  const handleAdd = () => {
    if (!title.trim()) {
      alert('Please enter an event title');
      return;
    }

    onAdd({
      title,
      type,
      date: new Date(eventDate).toISOString(),
      color: typeColors[type],
      notes
    });

    onClose();
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
          <h2 className="text-2xl font-bold text-foreground">Add Calendar Event</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-2 text-foreground">Event Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Water tomatoes, Fertilize roses"
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
              autoFocus
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-foreground">Date</label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-foreground">Event Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option value="custom">📅 Custom Event</option>
              <option value="harvest">🌾 Harvest</option>
              <option value="plant">🌱 Planting</option>
              <option value="water">💧 Watering</option>
              <option value="fertilize">🌿 Fertilizing</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2 text-foreground">Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground resize-none"
              placeholder="Additional details..."
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            onClick={handleAdd}
            className="flex-1 bg-primary text-primary-foreground"
          >
            Add Event
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




