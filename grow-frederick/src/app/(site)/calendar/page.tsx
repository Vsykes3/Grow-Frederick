'use client'

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AddEventModal } from '@/components/calendar/AddEventModal';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'harvest' | 'plant' | 'water' | 'fertilize' | 'custom';
  color: string;
  plantId?: string;
  gardenId?: string;
  notes?: string;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  useEffect(() => {
    // Load events from localStorage
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      try {
        setEvents(JSON.parse(savedEvents));
      } catch (error) {
        console.error('Error loading events:', error);
      }
    }

    // Load gardens to auto-generate harvest events
    const savedGardens = localStorage.getItem('myGardens');
    if (savedGardens) {
      try {
        const gardens = JSON.parse(savedGardens);
        generateHarvestEvents(gardens);
      } catch (error) {
        console.error('Error loading gardens:', error);
      }
    }
  }, []);

  const generateHarvestEvents = (gardens: any[]) => {
    const harvestEvents: CalendarEvent[] = [];
    
    gardens.forEach(garden => {
      garden.plants?.forEach((plant: any) => {
        if (plant.expectedHarvestDate && plant.status === 'growing') {
          harvestEvents.push({
            id: `harvest-${plant.id}`,
            title: `Harvest ${plant.commonName}`,
            date: plant.expectedHarvestDate,
            type: 'harvest',
            color: '#10b981',
            plantId: plant.id,
            gardenId: garden.id
          });
        }
      });
    });

    setEvents(prev => {
      // Remove old auto-generated harvest events
      const manual = prev.filter(e => !e.id.startsWith('harvest-'));
      return [...manual, ...harvestEvents];
    });
  };

  const saveEvents = (newEvents: CalendarEvent[]) => {
    setEvents(newEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(newEvents));
  };

  const addEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const newEvent = {
      ...event,
      id: Date.now().toString()
    };
    saveEvents([...events, newEvent]);
  };

  const deleteEvent = (eventId: string) => {
    if (confirm('Delete this event?')) {
      saveEvents(events.filter(e => e.id !== eventId));
    }
  };

  // Calendar helpers
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2 min-h-24"></div>);
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();

      days.push(
        <div
          key={day}
          onClick={() => {
            setSelectedDate(date);
            setShowAddEventModal(true);
          }}
          className={`min-h-24 p-2 border border-border cursor-pointer hover:bg-accent/10 transition ${
            isToday ? 'bg-primary/10 border-primary' : ''
          }`}
        >
          <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-primary' : 'text-foreground'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map(event => (
              <div
                key={event.id}
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm('Delete this event?')) {
                    deleteEvent(event.id);
                  }
                }}
                className="text-xs p-1 rounded truncate cursor-pointer hover:opacity-80"
                style={{ backgroundColor: event.color + '20', color: event.color }}
              >
                {event.type === 'harvest' && '🌾 '}
                {event.type === 'plant' && '🌱 '}
                {event.type === 'water' && '💧 '}
                {event.type === 'fertilize' && '🌿 '}
                {event.title}
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-muted-foreground">
                +{dayEvents.length - 3} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const today = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-foreground">Garden Calendar</h1>
        <Button
          onClick={() => {
            setSelectedDate(new Date());
            setShowAddEventModal(true);
          }}
          className="bg-primary text-primary-foreground"
        >
          + Add Event
        </Button>
      </div>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-6 bg-card p-4 rounded-lg border">
        <Button
          onClick={previousMonth}
          variant="outline"
        >
          ← Previous
        </Button>
        <h2 className="text-2xl font-bold text-foreground">
          {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex gap-2">
          <Button
            onClick={today}
            className="bg-primary text-primary-foreground"
          >
            Today
          </Button>
          <Button
            onClick={nextMonth}
            variant="outline"
          >
            Next →
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-card rounded-lg overflow-hidden border">
        {/* Day Headers */}
        <div className="grid grid-cols-7 bg-muted">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-3 text-center font-bold text-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {renderCalendar()}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#10b981' }}></div>
          <span className="text-sm text-foreground">Harvest</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#3b82f6' }}></div>
          <span className="text-sm text-foreground">Plant</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#06b6d4' }}></div>
          <span className="text-sm text-foreground">Water</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: '#8b5cf6' }}></div>
          <span className="text-sm text-foreground">Fertilize</span>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEventModal && selectedDate && (
        <AddEventModal
          date={selectedDate}
          onClose={() => setShowAddEventModal(false)}
          onAdd={addEvent}
        />
      )}
    </div>
  );
}
