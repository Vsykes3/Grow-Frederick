'use client';

import React from 'react';
import { useI18n } from '/src/hooks/useI18n';
import { PlantIndex } from '/src/components/plants/PlantIndex';
import { GardenPlot } from '/src/components/garden/GardenPlot';

export default function PlantIndexPage() {
  const { t, mounted } = useI18n();

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-gc-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass border-b border-gc-light/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gc-dark">
                {t('plants.index')}
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

