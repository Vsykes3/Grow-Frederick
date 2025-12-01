import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, CheckCircle, AlertTriangle, Sun, Droplets, Thermometer, Leaf } from 'lucide-react';
import { apiService } from '/src/services/api';
import { Button } from '/src/components/ui/Button';
import { ProBadge } from '/src/components/ui/ProBadge';
import { PaywallGuard } from '/src/components/ui/PaywallGuard';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'planting' | 'harvest' | 'maintenance' | 'weather';
  plant?: string;
  description?: string;
  completed: boolean;
  weatherDependent?: boolean;
}

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    type: 'planting' as const,
    plant: '',
    description: ''
  });

  useEffect(() => {
    loadWeatherData();
    loadEvents();
  }, []);

  const loadWeatherData = async () => {
    try {
      const weatherData = await apiService.weather.getCurrentWeather(39.4143, -77.4105);
      setWeather(weatherData);
    } catch (error) {
      console.error('Failed to load weather:', error);
    }
  };

  const loadEvents = () => {
    // Mock events data
    const mockEvents: CalendarEvent[] = [
      {
        id: '1',
        title: 'Plant Tomato Seeds',
        date: '2024-03-15',
        type: 'planting',
        plant: 'Tomato',
        description: 'Start tomato seeds indoors',
        completed: false,
        weatherDependent: true
      },
      {
        id: '2',
        title: 'Transplant Lettuce',
        date: '2024-03-20',
        type: 'planting',
        plant: 'Lettuce',
        description: 'Transplant lettuce seedlings to garden',
        completed: false,
        weatherDependent: true
      },
      {
        id: '3',
        title: 'Harvest Spinach',
        date: '2024-04-10',
        type: 'harvest',
        plant: 'Spinach',
        description: 'First spinach harvest',
        completed: false
      },
      {
        id: '4',
        title: 'Frost Warning',
        date: '2024-03-25',
        type: 'weather',
        description: 'Potential frost - protect tender plants',
        completed: false,
        weatherDependent: true
      }
    ];
    setEvents(mockEvents);
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date) return;

    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: newEvent.date,
      type: newEvent.type,
      plant: newEvent.plant,
      description: newEvent.description,
      completed: false,
      weatherDependent: newEvent.type === 'planting'
    };

    setEvents([...events, event]);
    setNewEvent({ title: '', date: '', type: 'planting', plant: '', description: '' });
    setShowAddEvent(false);
  };

  const toggleEventComplete = (id: string) => {
    setEvents(events.map(event => 
      event.id === id ? { ...event, completed: !event.completed } : event
    ));
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const getWeatherIcon = (weather: string) => {
    switch (weather.toLowerCase()) {
      case 'clear': return <Sun className="w-4 h-4 text-yellow-500" />;
      case 'clouds': return <Sun className="w-4 h-4 text-gray-500" />;
      case 'rain': return <Droplets className="w-4 h-4 text-blue-500" />;
      default: return <Sun className="w-4 h-4 text-gray-500" />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'planting': return 'bg-green-100 text-green-800 border-green-200';
      case 'harvest': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'maintenance': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'weather': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isGoodPlantingDay = (date: Date) => {
    // Mock logic for good planting days
    const day = date.getDate();
    return day % 3 === 0; // Every 3rd day is a "good" planting day
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < startingDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayEvents = getEventsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = date.toDateString() === selectedDate.toDateString();
      const isGoodDay = isGoodPlantingDay(date);

      days.push(
        <motion.div
          key={day}
          className={`h-24 p-2 border border-gray-200 cursor-pointer hover:bg-gc-light/10 ${
            isToday ? 'bg-gc-accent/10 border-gc-accent' : ''
          } ${isSelected ? 'bg-gc-light/20' : ''}`}
          onClick={() => setSelectedDate(date)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className={`text-sm font-medium ${isToday ? 'text-gc-accent' : 'text-gc-dark'}`}>
              {day}
            </span>
            {isGoodDay && (
              <Leaf className="w-3 h-3 text-green-500" />
            )}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map(event => (
              <div
                key={event.id}
                className={`text-xs px-1 py-0.5 rounded border ${getEventTypeColor(event.type)}`}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-muted-foreground">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </motion.div>
      );
    }

    return days;
  };

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
            Smart Planting Calendar
            <ProBadge size="sm" className="ml-3" />
          </h1>
          <p className="text-xl text-muted-foreground">
            Weather-linked planting reminders and garden management
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white rounded-2xl shadow-soft p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gc-dark">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  >
                    ←
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date())}
                  >
                    Today
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  >
                    →
                  </Button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="h-8 flex items-center justify-center text-sm font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
                {renderCalendar()}
              </div>

              <PaywallGuard>
                <div className="mt-4 p-4 bg-gc-cream rounded-lg">
                  <h3 className="font-semibold text-gc-dark mb-2">Weather-Linked Suggestions</h3>
                  <p className="text-sm text-muted-foreground">
                    Pro feature: Get automatic planting recommendations based on weather conditions and frost dates.
                  </p>
                </div>
              </PaywallGuard>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Weather Widget */}
            {weather && (
              <motion.div
                className="bg-white rounded-2xl shadow-soft p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-lg font-semibold text-gc-dark mb-4">Current Weather</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    {getWeatherIcon(weather.weather[0]?.main || 'Clear')}
                    <div>
                      <p className="font-medium text-gc-dark">{Math.round(weather.main.temp)}°F</p>
                      <p className="text-sm text-muted-foreground">{weather.weather[0]?.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-muted-foreground">Humidity: {weather.main.humidity}%</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Selected Date Events */}
            <motion.div
              className="bg-white rounded-2xl shadow-soft p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-gc-dark mb-4">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </h3>
              
              <div className="space-y-3">
                {getEventsForDate(selectedDate).map(event => (
                  <div
                    key={event.id}
                    className={`p-3 rounded-lg border ${getEventTypeColor(event.type)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{event.title}</h4>
                        {event.description && (
                          <p className="text-sm opacity-75 mt-1">{event.description}</p>
                        )}
                        {event.weatherDependent && (
                          <div className="flex items-center gap-1 mt-2">
                            <AlertTriangle className="w-3 h-3" />
                            <span className="text-xs">Weather dependent</span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => toggleEventComplete(event.id)}
                        className="ml-2"
                      >
                        <CheckCircle
                          className={`w-5 h-5 ${
                            event.completed ? 'text-green-500 fill-current' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
                
                {getEventsForDate(selectedDate).length === 0 && (
                  <p className="text-muted-foreground text-sm">No events scheduled</p>
                )}
              </div>

              <Button
                className="w-full mt-4"
                onClick={() => setShowAddEvent(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Add Event Modal */}
        {showAddEvent && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-md mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-lg font-semibold text-gc-dark mb-4">Add Event</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gc-dark mb-1">Title</label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gc-accent"
                    placeholder="e.g., Plant Tomato Seeds"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gc-dark mb-1">Date</label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gc-accent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gc-dark mb-1">Type</label>
                  <select
                    value={newEvent.type}
                    onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gc-accent"
                  >
                    <option value="planting">Planting</option>
                    <option value="harvest">Harvest</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="weather">Weather Alert</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gc-dark mb-1">Plant (optional)</label>
                  <input
                    type="text"
                    value={newEvent.plant}
                    onChange={(e) => setNewEvent({ ...newEvent, plant: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gc-accent"
                    placeholder="e.g., Tomato"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gc-dark mb-1">Description (optional)</label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gc-accent"
                    rows={3}
                    placeholder="Additional notes..."
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowAddEvent(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={addEvent}
                >
                  Add Event
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}