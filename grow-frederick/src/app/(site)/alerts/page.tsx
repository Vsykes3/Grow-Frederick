'use client';

import React, { useState } from 'react';
import { PaywallGuard } from '@/components/ui/PaywallGuard';
import { ProBadge } from '@/components/ui/ProBadge';
import { Button } from '@/components/ui/button';
import { usePlan } from '@/hooks/usePlan';

export const dynamic = 'force-dynamic';

export default function AlertsPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'pest' | 'weather' | 'disease'>('all');
  
  // Mock user ID - in real app, get from auth context
  const userId = 'demo-user';
  const { plan, isLoading: planLoading } = usePlan(userId);
  const isPro = plan === 'pro';

  const alerts = [
    {
      id: 1,
      type: 'weather',
      severity: 'high',
      title: 'Frost Warning',
      description: 'Temperatures expected to drop below 32Â°F tonight. Protect sensitive plants.',
      location: 'Maryland, USA',
      date: '2024-01-15',
      isPro: true,
    },
    {
      id: 2,
      type: 'pest',
      severity: 'medium',
      title: 'Aphid Alert',
      description: 'Aphid activity detected in your area. Check plants for signs of infestation.',
      location: 'Maryland, USA',
      date: '2024-01-14',
      isPro: false,
    },
    {
      id: 3,
      type: 'disease',
      severity: 'low',
      title: 'Powdery Mildew Risk',
      description: 'High humidity conditions may promote powdery mildew development.',
      location: 'Maryland, USA',
      date: '2024-01-13',
      isPro: true,
    },
    {
      id: 4,
      type: 'weather',
      severity: 'medium',
      title: 'Heat Wave Alert',
      description: 'Temperatures expected to exceed 90Â°F for the next 3 days.',
      location: 'Maryland, USA',
      date: '2024-01-12',
      isPro: true,
    },
  ];

  const filteredAlerts = selectedCategory === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.type === selectedCategory);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weather': return 'ðŸŒ¤ï¸';
      case 'pest': return 'ðŸ›';
      case 'disease': return 'ðŸ¦ ';
      default: return 'ðŸ“¢';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass border-b border-gc-light/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gc-dark flex items-center gap-3">
                Garden Alerts
                <ProBadge size="md" />
              </h1>
              <p className="text-muted-foreground mt-2">
                Stay informed about weather, pests, and plant health
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {filteredAlerts.length} active alerts
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'all', label: 'All Alerts', icon: 'ðŸ“¢' },
            { key: 'weather', label: 'Weather', icon: 'ðŸŒ¤ï¸' },
            { key: 'pest', label: 'Pests', icon: 'ðŸ›' },
            { key: 'disease', label: 'Diseases', icon: 'ðŸ¦ ' },
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={selectedCategory === tab.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(tab.key as any)}
              className="flex items-center gap-2"
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </Button>
          ))}
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <PaywallGuard
              key={alert.id}
              isPro={isPro || !alert.isPro}
              feature={alert.isPro ? 'Severe Weather Alerts' : 'Basic Alerts'}
            >
              <div className="glass rounded-xl p-6 hover:shadow-lg transition-all duration-200">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{getTypeIcon(alert.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gc-dark">
                        {alert.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert.severity)}`}>
                        {alert.severity.toUpperCase()}
                      </span>
                      {alert.isPro && <ProBadge size="sm" />}
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {alert.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>ðŸ“ {alert.location}</span>
                      <span>ðŸ“… {new Date(alert.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                    {alert.type === 'weather' && (
                      <Button size="sm" variant="outline">
                        Set Reminder
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </PaywallGuard>
          ))}
        </div>

        {/* Pro Features Preview */}
        {!isPro && (
          <div className="mt-8 glass rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-gc-dark mb-4">
              Unlock Advanced Alert System
            </h3>
            <p className="text-muted-foreground mb-6">
              Get severe weather alerts, pest outbreak notifications, and disease risk assessments
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-gc-light/10 rounded-lg">
                <div className="text-2xl mb-2">âš¡</div>
                <h4 className="font-semibold text-gc-dark">Severe Weather</h4>
                <p className="text-sm text-muted-foreground">Frost warnings, heat waves, storms</p>
              </div>
              <div className="p-4 bg-gc-light/10 rounded-lg">
                <div className="text-2xl mb-2">ðŸ”</div>
                <h4 className="font-semibold text-gc-dark">Pest Monitoring</h4>
                <p className="text-sm text-muted-foreground">Early detection and prevention</p>
              </div>
              <div className="p-4 bg-gc-light/10 rounded-lg">
                <div className="text-2xl mb-2">ðŸ›¡ï¸</div>
                <h4 className="font-semibold text-gc-dark">Disease Prevention</h4>
                <p className="text-sm text-muted-foreground">Risk assessment and treatment</p>
              </div>
            </div>
            <Button size="lg">
              <ProBadge size="sm" className="mr-2" />
              Upgrade to Pro
            </Button>
          </div>
        )}

        {/* Alert Settings */}
        <div className="mt-8 glass rounded-2xl p-6">
          <h3 className="text-xl font-semibold text-gc-dark mb-4">
            Alert Preferences
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gc-dark">Notification Types</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm text-muted-foreground">Email notifications</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm text-muted-foreground">Push notifications</span>
                </label>
                <PaywallGuard isPro={isPro} feature="SMS Alerts">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-muted-foreground">SMS alerts</span>
                    <ProBadge size="sm" />
                  </label>
                </PaywallGuard>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gc-dark">Alert Frequency</h4>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="radio" name="frequency" defaultChecked className="rounded" />
                  <span className="text-sm text-muted-foreground">Immediate</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="radio" name="frequency" className="rounded" />
                  <span className="text-sm text-muted-foreground">Daily digest</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="radio" name="frequency" className="rounded" />
                  <span className="text-sm text-muted-foreground">Weekly summary</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

