import React from 'react';
import { useParams } from 'react-router-dom';

export default function PlantDetailPage() {
  const { id } = useParams();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gc-dark mb-6">Plant Details</h1>
      <p className="text-muted-foreground">Details for plant ID: {id}</p>
    </div>
  );
}