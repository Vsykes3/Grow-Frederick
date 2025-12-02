'use client'

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LogActivityModalProps {
  plant: any;
  onClose: () => void;
  onLog: (activity: any) => void;
}

export function LogActivityModal({ plant, onClose, onLog }: LogActivityModalProps) {
  const [type, setType] = useState<'watered' | 'fertilized' | 'pruned' | 'pest-control' | 'other'>('watered');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleLog = () => {
    onLog({
      id: Date.now().toString(),
      type,
      notes,
      date: new Date(date).toISOString()
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
          <h2 className="text-2xl font-bold text-foreground">Log Activity for {plant.commonName}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-2 text-foreground">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-foreground">Activity Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
            >
              <option value="watered">💧 Watered</option>
              <option value="fertilized">🌿 Fertilized</option>
              <option value="pruned">✂️ Pruned</option>
              <option value="pest-control">🐛 Pest Control</option>
              <option value="other">📝 Other</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2 text-foreground">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What did you do?"
              rows={3}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            onClick={handleLog}
            className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
          >
            Log Activity
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




