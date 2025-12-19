import React, { useState, useEffect } from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '../components/Footer';
import './StartMyGarden.css';

const StartMyGarden = () => {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [showAddPlant, setShowAddPlant] = useState(false);
  const [newPlant, setNewPlant] = useState({
    name: '',
    type: '',
    plantedDate: '',
    location: '',
    notes: ''
  });

  // Sample garden data
  useEffect(() => {
    const samplePlants = [
      {
        id: 1,
        name: 'Tomato Plant',
        type: 'Vegetable',
        plantedDate: '2024-03-15',
        location: 'Backyard Garden',
        progress: 75,
        status: 'Growing',
        notes: 'Planted in raised bed with organic soil'
      },
      {
        id: 2,
        name: 'Basil',
        type: 'Herb',
        plantedDate: '2024-03-20',
        location: 'Kitchen Window',
        progress: 90,
        status: 'Ready to Harvest',
        notes: 'Growing well in sunny window'
      },
      {
        id: 3,
        name: 'Lettuce Mix',
        type: 'Leafy Green',
        plantedDate: '2024-03-10',
        location: 'Container Garden',
        progress: 60,
        status: 'Growing',
        notes: 'Mixed varieties for continuous harvest'
      }
    ];
    setPlants(samplePlants);
  }, []);

  const addPlant = () => {
    if (newPlant.name.trim()) {
      const plant = {
        ...newPlant,
        id: Date.now(),
        progress: 0,
        status: 'Planted'
      };
      setPlants(prev => [...prev, plant]);
      setNewPlant({ name: '', type: '', plantedDate: '', location: '', notes: '' });
      setShowAddPlant(false);
    }
  };

  const updateProgress = (plantId, newProgress) => {
    setPlants(prev => prev.map(plant => 
      plant.id === plantId 
        ? { ...plant, progress: Math.max(0, Math.min(100, newProgress)) }
        : plant
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Planted': return '#ffc107';
      case 'Growing': return '#28a745';
      case 'Ready to Harvest': return '#17a2b8';
      case 'Harvested': return '#6c757d';
      default: return '#6c757d';
    }
  };

  return (
    <div className="stack">
      <Navbar />
      
      <div className="garden-container">
        <div className="garden-header">
          <h1>ðŸŒ± Start My Garden</h1>
          <p>Track your plants, monitor progress, and watch your garden grow</p>
        </div>

        <div className="garden-stats">
          <div className="stat-card">
            <div className="stat-number">{plants.length}</div>
            <div className="stat-label">Total Plants</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{plants.filter(p => p.status === 'Ready to Harvest').length}</div>
            <div className="stat-label">Ready to Harvest</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{Math.round(plants.reduce((acc, p) => acc + p.progress, 0) / plants.length || 0)}%</div>
            <div className="stat-label">Average Progress</div>
          </div>
        </div>

        <div className="garden-actions">
          <button 
            className="add-plant-btn"
            onClick={() => setShowAddPlant(true)}
          >
            + Add New Plant
          </button>
        </div>

        <div className="plants-grid">
          {plants.map(plant => (
            <div key={plant.id} className="plant-card" onClick={() => setSelectedPlant(plant)}>
              <div className="plant-header">
                <h3>{plant.name}</h3>
                <span className="plant-type">{plant.type}</span>
              </div>
              <div className="plant-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${plant.progress}%` }}
                  ></div>
                </div>
                <span className="progress-text">{plant.progress}%</span>
              </div>
              <div className="plant-details">
                <p><strong>Planted:</strong> {new Date(plant.plantedDate).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {plant.location}</p>
                <p><strong>Status:</strong> 
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(plant.status) }}
                  >
                    {plant.status}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Add Plant Modal */}
        {showAddPlant && (
          <div className="modal-overlay" onClick={() => setShowAddPlant(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <h3>Add New Plant</h3>
              <div className="form-group">
                <label>Plant Name</label>
                <input
                  type="text"
                  value={newPlant.name}
                  onChange={(e) => setNewPlant({...newPlant, name: e.target.value})}
                  placeholder="Enter plant name"
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={newPlant.type}
                  onChange={(e) => setNewPlant({...newPlant, type: e.target.value})}
                >
                  <option value="">Select type</option>
                  <option value="Vegetable">Vegetable</option>
                  <option value="Herb">Herb</option>
                  <option value="Fruit">Fruit</option>
                  <option value="Flower">Flower</option>
                  <option value="Leafy Green">Leafy Green</option>
                </select>
              </div>
              <div className="form-group">
                <label>Planted Date</label>
                <input
                  type="date"
                  value={newPlant.plantedDate}
                  onChange={(e) => setNewPlant({...newPlant, plantedDate: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={newPlant.location}
                  onChange={(e) => setNewPlant({...newPlant, location: e.target.value})}
                  placeholder="e.g., Backyard, Container, Window"
                />
              </div>
              <div className="form-group">
                <label>Notes</label>
                <textarea
                  value={newPlant.notes}
                  onChange={(e) => setNewPlant({...newPlant, notes: e.target.value})}
                  placeholder="Any special notes about this plant"
                />
              </div>
              <div className="modal-actions">
                <button onClick={() => setShowAddPlant(false)} className="btn-secondary">
                  Cancel
                </button>
                <button onClick={addPlant} className="btn-primary">
                  Add Plant
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Plant Detail Modal */}
        {selectedPlant && (
          <div className="modal-overlay" onClick={() => setSelectedPlant(null)}>
            <div className="modal-content plant-detail-modal" onClick={e => e.stopPropagation()}>
              <h3>{selectedPlant.name}</h3>
              <div className="plant-detail-content">
                <div className="detail-section">
                  <h4>Progress</h4>
                  <div className="progress-controls">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={selectedPlant.progress}
                      onChange={(e) => updateProgress(selectedPlant.id, parseInt(e.target.value))}
                      className="progress-slider"
                    />
                    <span className="progress-value">{selectedPlant.progress}%</span>
                  </div>
                </div>
                <div className="detail-section">
                  <h4>Details</h4>
                  <p><strong>Type:</strong> {selectedPlant.type}</p>
                  <p><strong>Planted:</strong> {new Date(selectedPlant.plantedDate).toLocaleDateString()}</p>
                  <p><strong>Location:</strong> {selectedPlant.location}</p>
                  <p><strong>Status:</strong> {selectedPlant.status}</p>
                  {selectedPlant.notes && <p><strong>Notes:</strong> {selectedPlant.notes}</p>}
                </div>
              </div>
              <div className="modal-actions">
                <button onClick={() => setSelectedPlant(null)} className="btn-primary">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default StartMyGarden;

