'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useI18n } from '/src/hooks/useI18n';
import { useTheme } from '/src/hooks/useTheme';
import { plantDatabase, type Plant } from '/src/lib/plants';
import { ProBadge } from '/src/components/ui/ProBadge';
import { PaywallGuard } from '/src/components/ui/PaywallGuard';
import { Button } from '/src/components/ui/Button';
import { cn } from '/src/lib/utils';

interface GardenPlotProps {
  className?: string;
}

interface PlotPlant {
  id: string;
  plantId: string;
  x: number;
  y: number;
  plantedDate: Date;
  notes?: string;
}

interface PlotSquare {
  x: number;
  y: number;
  plant?: PlotPlant;
  isSelected: boolean;
  isHovered: boolean;
}

export function GardenPlot({ className }: GardenPlotProps) {
  const { t, mounted } = useI18n();
  const { resolvedTheme } = useTheme();
  const [plotSize, setPlotSize] = useState({ width: 8, height: 6 }); // in feet
  const [squareSize, setSquareSize] = useState(24); // in pixels
  const [plants, setPlants] = useState<PlotPlant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [isPlacing, setIsPlacing] = useState(false);
  const [hoveredSquare, setHoveredSquare] = useState<{ x: number; y: number } | null>(null);
  const [selectedSquare, setSelectedSquare] = useState<{ x: number; y: number } | null>(null);
  const plotRef = useRef<HTMLDivElement>(null);

  // Calculate grid dimensions
  const gridWidth = plotSize.width * 12; // Convert feet to inches, then to squares (1 square = 1 inch)
  const gridHeight = plotSize.height * 12;

  // Create grid squares
  const gridSquares: PlotSquare[] = [];
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      const plant = plants.find(p => p.x === x && p.y === y);
      gridSquares.push({
        x,
        y,
        plant,
        isSelected: selectedSquare?.x === x && selectedSquare?.y === y,
        isHovered: hoveredSquare?.x === x && hoveredSquare?.y === y,
      });
    }
  }

  const handleSquareClick = (x: number, y: number) => {
    if (isPlacing && selectedPlant) {
      // Place plant
      const newPlant: PlotPlant = {
        id: `${Date.now()}-${Math.random()}`,
        plantId: selectedPlant.id,
        x,
        y,
        plantedDate: new Date(),
      };
      setPlants([...plants, newPlant]);
      setIsPlacing(false);
      setSelectedPlant(null);
    } else {
      // Select square
      setSelectedSquare({ x, y });
    }
  };

  const handleSquareHover = (x: number, y: number) => {
    setHoveredSquare({ x, y });
  };

  const handleSquareLeave = () => {
    setHoveredSquare(null);
  };

  const startPlanting = (plant: Plant) => {
    setSelectedPlant(plant);
    setIsPlacing(true);
    setSelectedSquare(null);
  };

  const removePlant = (x: number, y: number) => {
    setPlants(plants.filter(p => !(p.x === x && p.y === y)));
    setSelectedSquare(null);
  };

  const getPlantAtPosition = (x: number, y: number): Plant | undefined => {
    const plotPlant = plants.find(p => p.x === x && p.y === y);
    return plotPlant ? plantDatabase.find(p => p.id === plotPlant.plantId) : undefined;
  };

  const getSquareColor = (square: PlotSquare): string => {
    if (square.plant) {
      const plant = getPlantAtPosition(square.x, square.y);
      if (plant) {
        switch (plant.category) {
          case 'vegetable':
            return 'bg-green-400';
          case 'herb':
            return 'bg-green-300';
          case 'fruit':
            return 'bg-red-300';
          case 'flower':
            return 'bg-pink-300';
          case 'tree':
            return 'bg-green-600';
          case 'shrub':
            return 'bg-green-500';
          default:
            return 'bg-gray-300';
        }
      }
    }
    
    if (square.isSelected) {
      return 'bg-gc-accent/30';
    }
    
    if (square.isHovered) {
      return 'bg-gc-light/20';
    }
    
    return 'bg-gray-100 dark:bg-gray-800';
  };

  if (!mounted) {
    return (
      <div className={cn('flex items-center justify-center h-96', className)}>
        <div className="text-center space-y-4">
          <div className="w-8 h-8 border-4 border-gc-accent border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gc-dark">
          Interactive Garden Plot
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Design your garden layout by placing plants on the grid. Each square represents 1 inch of space.
        </p>
      </div>

      {/* Plot Controls */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gc-dark">Plot Size:</label>
            <select
              value={`${plotSize.width}x${plotSize.height}`}
              onChange={(e) => {
                const [width, height] = e.target.value.split('x').map(Number);
                setPlotSize({ width, height });
              }}
              className="px-3 py-2 border border-gc-light/30 rounded-lg bg-background text-gc-dark focus:outline-none focus:ring-2 focus:ring-gc-accent"
            >
              <option value="4x4">4x4 feet</option>
              <option value="6x4">6x4 feet</option>
              <option value="8x6">8x6 feet</option>
              <option value="10x8">10x8 feet</option>
              <option value="12x8">12x8 feet</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gc-dark">Square Size:</label>
            <select
              value={squareSize}
              onChange={(e) => setSquareSize(Number(e.target.value))}
              className="px-3 py-2 border border-gc-light/30 rounded-lg bg-background text-gc-dark focus:outline-none focus:ring-2 focus:ring-gc-accent"
            >
              <option value={16}>16px</option>
              <option value={20}>20px</option>
              <option value={24}>24px</option>
              <option value={28}>28px</option>
              <option value={32}>32px</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ProBadge size="sm" />
          <span className="text-sm text-muted-foreground">Pro Feature</span>
        </div>
      </div>

      {/* Garden Plot */}
      <PaywallGuard>
        <div className="glass rounded-2xl p-6">
          <div className="flex gap-6">
            {/* Plot Grid */}
            <div className="flex-1">
              <div
                ref={plotRef}
                className="grid gap-1 mx-auto"
                style={{
                  gridTemplateColumns: `repeat(${gridWidth}, ${squareSize}px)`,
                  gridTemplateRows: `repeat(${gridHeight}, ${squareSize}px)`,
                  width: 'fit-content',
                }}
              >
                {gridSquares.map((square) => (
                  <div
                    key={`${square.x}-${square.y}`}
                    className={cn(
                      'border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-150',
                      'hover:scale-105',
                      getSquareColor(square)
                    )}
                    style={{ width: squareSize, height: squareSize }}
                    onClick={() => handleSquareClick(square.x, square.y)}
                    onMouseEnter={() => handleSquareHover(square.x, square.y)}
                    onMouseLeave={handleSquareLeave}
                    title={square.plant ? getPlantAtPosition(square.x, square.y)?.name : `Position ${square.x}, ${square.y}`}
                  >
                    {square.plant && (
                      <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white">
                        {getPlantAtPosition(square.x, square.y)?.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Plot Legend */}
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-400 rounded"></div>
                  <span>Vegetables</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-300 rounded"></div>
                  <span>Herbs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-300 rounded"></div>
                  <span>Fruits</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-pink-300 rounded"></div>
                  <span>Flowers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-600 rounded"></div>
                  <span>Trees</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span>Shrubs</span>
                </div>
              </div>
            </div>

            {/* Plant Selection */}
            <div className="w-80 space-y-4">
              <h3 className="text-lg font-semibold text-gc-dark">Plant Selection</h3>
              
              {isPlacing && selectedPlant && (
                <div className="bg-gc-accent/10 border border-gc-accent rounded-lg p-4">
                  <p className="text-sm text-gc-dark">
                    Click on a square to place <strong>{selectedPlant.name}</strong>
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setIsPlacing(false);
                      setSelectedPlant(null);
                    }}
                    className="mt-2"
                  >
                    Cancel
                  </Button>
                </div>
              )}

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {plantDatabase.slice(0, 10).map((plant) => (
                  <div
                    key={plant.id}
                    className="flex items-center gap-3 p-3 bg-background border border-gc-light/30 rounded-lg hover:border-gc-accent transition-colors cursor-pointer"
                    onClick={() => startPlanting(plant)}
                  >
                    <div className="w-8 h-8 bg-gc-light/20 rounded-lg flex items-center justify-center">
                      <span className="text-sm">
                        {plant.category === 'vegetable' && 'ðŸ¥•'}
                        {plant.category === 'herb' && 'ðŸŒ¿'}
                        {plant.category === 'fruit' && 'ðŸ“'}
                        {plant.category === 'flower' && 'ðŸŒ¸'}
                        {plant.category === 'tree' && 'ðŸŒ³'}
                        {plant.category === 'shrub' && 'ðŸŒ¿'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gc-dark">{plant.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {plant.spacing.betweenPlants} spacing
                      </div>
                    </div>
                    {plant.isPro && <ProBadge size="sm" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PaywallGuard>

      {/* Selected Square Info */}
      {selectedSquare && (
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gc-dark mb-4">
            Square {selectedSquare.x}, {selectedSquare.y}
          </h3>
          
          {(() => {
            const plant = getPlantAtPosition(selectedSquare.x, selectedSquare.y);
            if (plant) {
              return (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gc-light/20 rounded-lg flex items-center justify-center">
                      <span className="text-xl">
                        {plant.category === 'vegetable' && 'ðŸ¥•'}
                        {plant.category === 'herb' && 'ðŸŒ¿'}
                        {plant.category === 'fruit' && 'ðŸ“'}
                        {plant.category === 'flower' && 'ðŸŒ¸'}
                        {plant.category === 'tree' && 'ðŸŒ³'}
                        {plant.category === 'shrub' && 'ðŸŒ¿'}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gc-dark">{plant.name}</h4>
                      <p className="text-sm text-muted-foreground italic">{plant.scientificName}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gc-dark">Planted:</span>
                      <p className="text-muted-foreground">
                        {plants.find(p => p.x === selectedSquare.x && p.y === selectedSquare.y)?.plantedDate.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gc-dark">Spacing:</span>
                      <p className="text-muted-foreground">{plant.spacing.betweenPlants}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gc-dark">Watering:</span>
                      <p className="text-muted-foreground">{plant.wateringSchedule.frequency}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gc-dark">Sun:</span>
                      <p className="text-muted-foreground capitalize">
                        {plant.sunRequirements.replace('-', ' ')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Edit Notes
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removePlant(selectedSquare.x, selectedSquare.y)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">ðŸŒ±</div>
                  <p className="text-muted-foreground mb-4">
                    This square is empty. Select a plant from the sidebar to place it here.
                  </p>
                  <Button onClick={() => setSelectedSquare(null)}>
                    Close
                  </Button>
                </div>
              );
            }
          })()}
        </div>
      )}

      {/* Garden Summary */}
      {plants.length > 0 && (
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gc-dark mb-4">Garden Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gc-accent">{plants.length}</div>
              <div className="text-sm text-muted-foreground">Total Plants</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gc-accent">
                {new Set(plants.map(p => p.plantId)).size}
              </div>
              <div className="text-sm text-muted-foreground">Unique Species</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gc-accent">
                {Math.round((plants.length / (gridWidth * gridHeight)) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Plot Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gc-accent">
                {plotSize.width * plotSize.height}
              </div>
              <div className="text-sm text-muted-foreground">Square Feet</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

