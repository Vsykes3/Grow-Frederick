'use client';

import React from 'react';
import { PlantIndex } from '@/components/plants/PlantIndex';
import { GardenPlot } from '@/components/garden/GardenPlot';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function PlantIndexPage() {

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass border-b border-gc-light/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gc-dark">
                Plant Index
              </h1>
              <p className="text-muted-foreground mt-2">
                Discover plants perfect for your garden
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <PlantIndex />
        
        {/* Interactive Garden Plot */}
        <div className="mt-12">
          <GardenPlot />
        </div>
      </div>
    </div>
  );
}

