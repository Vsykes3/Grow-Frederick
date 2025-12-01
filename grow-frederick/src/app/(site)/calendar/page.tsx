'use client';

import React, { useState } from 'react';
import { PaywallGuard } from '/src/components/ui/PaywallGuard';
import { ProBadge } from '/src/components/ui/ProBadge';
import { Button } from '/src/components/ui/Button';
import { usePlan } from '/src/hooks/usePlan';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  
  // Mock user ID - in real app, get from auth context
  const userId = 'demo-user';
  const { plan, isLoading: planLoading } = usePlan(userId);
  const isPro = plan === 'pro';

  const tasks = [
    {
      id: 1,
      title: 'Plant tomato seeds indoors',
      date: '2024-01-20',
      type: 'planting',
      isPro: false,
    },
    {
      id: 2,
      title: 'Frost warning - protect plants',
      date: '2024-01-22',
      type: 'weather',
      isPro: true,
    },
    {
      id: 3,
      title: 'Harvest lettuce',
      date: '2024-01-25',
      type: 'harvest',
      isPro: false,
    },
    {
      id: 4,
      title: 'Apply fertilizer to roses',
      date: '2024-01-28',
      type: 'maintenance',
      isPro: false,
    },
    {
      id: 5,
      title: 'Check for aphids on roses',
      date: '2024-01-30',
      type: 'pest',
      isPro: true,
    },
  ];

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'planting': return 'ðŸŒ±';
      case 'harvest': return 'ðŸŒ¾';
      case 'maintenance': return 'ðŸ”§';
      case 'pest': return 'ðŸ›';
      case 'weather': return 'ðŸŒ¤ï¸';
      default: return 'ðŸ“…';
    }
  };

  const getTaskColor = (type: string) => {
    switch (type) {
      case 'planting': return 'bg-green-100 text-green-800 border-green-200';
      case 'harvest': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'maintenance': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pest': return 'bg-red-100 text-red-800 border-red-200';
      case 'weather': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="glass border-b border-gc-light/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gc-dark flex items-center gap-3">
                Garden Calendar
                <ProBadge size="md" />
              </h1>
              <p className="text-muted-foreground mt-2">
                Plan your planting, harvesting, and garden maintenance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                {(['month', 'week', 'day'] as const).map((viewType) => (
                  <Button
                    key={viewType}
                    variant={view === viewType ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setView(viewType)}
                    className="capitalize"
                  >
                    {viewType}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gc-dark">
                  {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">â†</Button>
                  <Button variant="outline" size="sm">â†’</Button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`p-2 min-h-[60px] border border-gc-light/20 rounded-lg ${
                      day === today.getDate() 
                        ? 'bg-gc-accent text-gc-dark font-semibold' 
                        : 'hover:bg-gc-light/10'
                    }`}
                  >
                    {day && (
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{day}</div>
                        {/* Show tasks for this day */}
                        {tasks
                          .filter(task => new Date(task.date).getDate() === day)
                          .slice(0, 2)
                          .map(task => (
                            <div
                              key={task.id}
                              className={`text-xs px-1 py-0.5 rounded border ${getTaskColor(task.type)}`}
                            >
                              {getTaskIcon(task.type)} {task.title.slice(0, 10)}...
                            </div>
                          ))}
                        {tasks.filter(task => new Date(task.date).getDate() === day).length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{tasks.filter(task => new Date(task.date).getDate() === day).length - 2} more
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tasks Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Tasks */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gc-dark mb-4">
                Upcoming Tasks
              </h3>
              <div className="space-y-3">
                {tasks.slice(0, 5).map((task) => (
                  <PaywallGuard
                    key={task.id}
                    isPro={isPro || !task.isPro}
                    feature={task.isPro ? 'Smart Calendar Features' : 'Basic Calendar'}
                  >
                    <div className="flex items-center gap-3 p-3 bg-gc-light/5 rounded-lg">
                      <div className="text-lg">{getTaskIcon(task.type)}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium text-gc-dark">
                            {task.title}
                          </h4>
                          {task.isPro && <ProBadge size="sm" />}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(task.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </PaywallGuard>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gc-dark mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  ðŸŒ± Add Planting Task
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  ðŸŒ¾ Add Harvest Task
                </Button>
                <PaywallGuard isPro={isPro} feature="iCal Export">
                  <Button variant="outline" className="w-full justify-start">
                    ðŸ“… Export to iCal
                    <ProBadge size="sm" className="ml-auto" />
                  </Button>
                </PaywallGuard>
                <PaywallGuard isPro={isPro} feature="Smart Reminders">
                  <Button variant="outline" className="w-full justify-start">
                    ðŸ”” Smart Reminders
                    <ProBadge size="sm" className="ml-auto" />
                  </Button>
                </PaywallGuard>
              </div>
            </div>

            {/* Pro Features Preview */}
            {!isPro && (
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-gc-dark mb-4">
                  Unlock Smart Calendar
                </h3>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>âœ…</span>
                    <span>iCal export & sync</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>âœ…</span>
                    <span>Smart planting reminders</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>âœ…</span>
                    <span>Weather-based scheduling</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>âœ…</span>
                    <span>Zone-aware suggestions</span>
                  </div>
                </div>
                <Button size="sm" className="w-full">
                  <ProBadge size="sm" className="mr-2" />
                  Upgrade to Pro
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

