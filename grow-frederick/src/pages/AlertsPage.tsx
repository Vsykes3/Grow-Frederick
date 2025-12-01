import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Bug, Droplets, Thermometer, Wind, Shield, Leaf } from 'lucide-react';
import { apiService } from '/src/services/api';
import { Button } from '/src/components/ui/Button';
import { ProBadge } from '/src/components/ui/ProBadge';
import { PaywallGuard } from '/src/components/ui/PaywallGuard';

interface Alert {
  id: string;
  type: 'pest' | 'disease' | 'weather' | 'maintenance';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  plant?: string;
  date: string;
  location: string;
  resolved: boolean;
  recommendations: string[];
}

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pest' | 'disease' | 'weather' | 'maintenance'>('all');

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = () => {
    // Mock alerts data
    const mockAlerts: Alert[] = [
      {
        id: '1',
        type: 'pest',
        severity: 'high',
        title: 'Aphid Infestation Detected',
        description: 'Aphids have been spotted on your tomato plants. Early treatment recommended.',
        plant: 'Tomato',
        date: '2024-03-15',
        location: 'Frederick, MD',
        resolved: false,
        recommendations: [
          'Spray with neem oil solution',
          'Introduce ladybugs to the area',
          'Remove heavily infested leaves'
        ]
      },
      {
        id: '2',
        type: 'weather',
        severity: 'critical',
        title: 'Frost Warning',
        description: 'Temperatures expected to drop below freezing tonight. Protect tender plants.',
        date: '2024-03-20',
        location: 'Frederick, MD',
        resolved: false,
        recommendations: [
          'Cover plants with frost cloth',
          'Move potted plants indoors',
          'Water soil to retain heat'
        ]
      },
      {
        id: '3',
        type: 'disease',
        severity: 'medium',
        title: 'Early Blight Spotted',
        description: 'Brown spots on lower leaves indicate early blight in tomato plants.',
        plant: 'Tomato',
        date: '2024-03-18',
        location: 'Frederick, MD',
        resolved: false,
        recommendations: [
          'Remove affected leaves immediately',
          'Improve air circulation',
          'Apply copper fungicide'
        ]
      },
      {
        id: '4',
        type: 'maintenance',
        severity: 'low',
        title: 'Fertilizer Application Due',
        description: 'Your lettuce plants are ready for their monthly fertilizer application.',
        plant: 'Lettuce',
        date: '2024-03-22',
        location: 'Frederick, MD',
        resolved: false,
        recommendations: [
          'Apply balanced liquid fertilizer',
          'Water thoroughly after application',
          'Monitor for signs of over-fertilization'
        ]
      }
    ];
    setAlerts(mockAlerts);
    setLoading(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pest': return <Bug className="w-5 h-5" />;
      case 'disease': return <Shield className="w-5 h-5" />;
      case 'weather': return <Thermometer className="w-5 h-5" />;
      case 'maintenance': return <Leaf className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <AlertTriangle className="w-4 h-4 text-green-500" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'high': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredAlerts = alerts.filter(alert => 
    filter === 'all' || alert.type === filter
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gc-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading alerts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gc-light/10 to-gc-accent/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gc-dark mb-4">
            Pest & Plant Care Hub
            <ProBadge size="sm" className="ml-3" />
          </h1>
          <p className="text-xl text-muted-foreground">
            Stay ahead of pests, diseases, and weather threats with smart alerts
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          className="bg-white rounded-2xl shadow-soft p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Alerts', icon: AlertTriangle },
              { id: 'pest', label: 'Pests', icon: Bug },
              { id: 'disease', label: 'Diseases', icon: Shield },
              { id: 'weather', label: 'Weather', icon: Thermometer },
              { id: 'maintenance', label: 'Maintenance', icon: Leaf }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    filter === tab.id
                      ? 'bg-gc-accent text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Alerts List */}
        <div className="space-y-6">
          {filteredAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              className="bg-white rounded-2xl shadow-soft p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-full ${getSeverityColor(alert.severity)}`}>
                    {getTypeIcon(alert.type)}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gc-dark">{alert.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                        <span className="text-sm text-muted-foreground">{alert.date}</span>
                        {alert.plant && (
                          <span className="text-sm text-muted-foreground">• {alert.plant}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getSeverityIcon(alert.severity)}
                      <span className="text-sm text-muted-foreground">{alert.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{alert.description}</p>
                  
                  <PaywallGuard>
                    <div className="bg-gc-cream rounded-lg p-4 mb-4">
                      <h4 className="font-semibold text-gc-dark mb-2">Recommended Actions:</h4>
                      <ul className="space-y-1">
                        {alert.recommendations.map((rec, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-gc-accent mt-1">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </PaywallGuard>
                  
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline">
                      Mark as Resolved
                    </Button>
                    <Button size="sm">
                      Get More Help
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredAlerts.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <AlertTriangle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gc-dark mb-2">No alerts found</h3>
            <p className="text-muted-foreground">Great job! Your garden is healthy and pest-free.</p>
          </motion.div>
        )}

        {/* Pro Features Preview */}
        <PaywallGuard>
          <motion.div
            className="mt-8 bg-gradient-to-r from-gc-dark to-gc-accent rounded-2xl p-8 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">Unlock Advanced Pest Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-2">AI Pest Detection</h4>
                <p className="text-sm opacity-90">Upload photos to identify pests and diseases automatically</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Predictive Alerts</h4>
                <p className="text-sm opacity-90">Get warnings before problems become serious</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Treatment Plans</h4>
                <p className="text-sm opacity-90">Personalized treatment recommendations for your specific situation</p>
              </div>
            </div>
            <Button className="mt-6 bg-white text-gc-dark hover:bg-gray-100">
              Upgrade to Pro
            </Button>
          </motion.div>
        </PaywallGuard>
      </div>
    </div>
  );
}