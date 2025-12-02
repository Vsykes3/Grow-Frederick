'use client'

import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Garden {
  id: string;
  name: string;
  plants: any[];
}

interface SelectGardenModalProps {
  gardens: Garden[];
  onSelect: (gardenId: string) => void;
  onCreateNew: () => void;
  onClose: () => void;
  plantName: string;
}

export function SelectGardenModal({ gardens, onSelect, onCreateNew, onClose, plantName }: SelectGardenModalProps) {
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-background border border-border rounded-lg max-w-md w-full">
        <div className="p-6 border-b border-border">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-foreground">Select Garden</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Choose which garden to add <span className="font-semibold">{plantName}</span> to:
          </p>
        </div>

        <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
          {gardens.map(garden => (
            <button
              key={garden.id}
              onClick={() => onSelect(garden.id)}
              className="w-full text-left p-4 border-2 border-border rounded-lg hover:border-primary transition-colors"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-foreground">{garden.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {garden.plants.length} plant{garden.plants.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </button>
          ))}
          
          <button
            onClick={onCreateNew}
            className="w-full p-4 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors flex items-center justify-center gap-2 text-foreground"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Create New Garden</span>
          </button>
        </div>
      </div>
    </div>
  );
}



