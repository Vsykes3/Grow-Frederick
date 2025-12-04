import type { Event } from '@/types';

// Mock calendar data
const mockEvents: Event[] = [
  {
    id: '1',
    userId: '1',
    plantId: '1',
    type: 'sow',
    title: 'Plant Cherry Tomatoes',
    description: 'Start cherry tomato seeds indoors',
    start: '2024-03-15T10:00:00Z',
    end: '2024-03-15T11:00:00Z',
    notes: 'Use seed starting mix. Keep warm and moist.',
    isRecurring: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    userId: '1',
    plantId: '2',
    type: 'sow',
    title: 'Plant Basil',
    description: 'Direct sow basil seeds in garden',
    start: '2024-04-01T09:00:00Z',
    end: '2024-04-01T10:00:00Z',
    notes: 'Plant after last frost. Space 12 inches apart.',
    isRecurring: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    userId: '1',
    plantId: '1',
    type: 'harvest',
    title: 'Harvest Cherry Tomatoes',
    description: 'First harvest of cherry tomatoes',
    start: '2024-07-15T08:00:00Z',
    end: '2024-07-15T09:00:00Z',
    notes: 'Harvest when fully red and slightly soft.',
    isRecurring: true,
    recurrencePattern: 'weekly',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '4',
    userId: '1',
    type: 'task',
    title: 'Water Garden',
    description: 'Deep watering for all plants',
    start: '2024-03-20T18:00:00Z',
    end: '2024-03-20T19:00:00Z',
    notes: 'Water deeply to encourage root growth.',
    isRecurring: true,
    recurrencePattern: 'weekly',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '5',
    userId: '1',
    type: 'reminder',
    title: 'Check for Pests',
    description: 'Weekly pest inspection',
    start: '2024-03-25T10:00:00Z',
    end: '2024-03-25T10:30:00Z',
    notes: 'Look for aphids, caterpillars, and other common pests.',
    isRecurring: true,
    recurrencePattern: 'weekly',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export async function listEvents(userId: string, startDate?: string, endDate?: string): Promise<Event[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  let events = mockEvents.filter(event => event.userId === userId);

  // Filter by date range if provided
  if (startDate && endDate) {
    events = events.filter(event => {
      const eventDate = new Date(event.start);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return eventDate >= start && eventDate <= end;
    });
  }

  return events.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
}

export async function createEvent(event: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>): Promise<Event> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const newEvent: Event = {
    ...event,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockEvents.push(newEvent);
  return newEvent;
}

export async function updateEvent(id: string, updates: Partial<Event>): Promise<Event | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const eventIndex = mockEvents.findIndex(event => event.id === id);
  if (eventIndex === -1) return null;

  const updatedEvent: Event = {
    ...mockEvents[eventIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  mockEvents[eventIndex] = updatedEvent;
  return updatedEvent;
}

export async function deleteEvent(id: string): Promise<boolean> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  const eventIndex = mockEvents.findIndex(event => event.id === id);
  if (eventIndex === -1) return false;

  mockEvents.splice(eventIndex, 1);
  return true;
}

export async function getEvent(id: string): Promise<Event | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  return mockEvents.find(event => event.id === id) || null;
}

export async function getEventsByPlant(plantId: string): Promise<Event[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  return mockEvents.filter(event => event.plantId === plantId);
}

export async function getUpcomingEvents(userId: string, days: number = 7): Promise<Event[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  const now = new Date();
  const futureDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

  return mockEvents
    .filter(event => {
      const eventDate = new Date(event.start);
      return event.userId === userId && eventDate >= now && eventDate <= futureDate;
    })
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
}

export async function getSmartSuggestions(userId: string, zip: string): Promise<Event[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Mock smart suggestions based on location and season
  const currentMonth = new Date().getMonth() + 1;
  const suggestions: Event[] = [];

  // Spring suggestions (March-May)
  if (currentMonth >= 3 && currentMonth <= 5) {
    suggestions.push({
      id: `smart-${Date.now()}-1`,
      userId,
      type: 'sow',
      title: 'Start Cool-Season Vegetables',
      description: 'Plant lettuce, spinach, and peas',
      start: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      notes: 'Based on your location and current weather conditions',
      isRecurring: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  // Summer suggestions (June-August)
  if (currentMonth >= 6 && currentMonth <= 8) {
    suggestions.push({
      id: `smart-${Date.now()}-2`,
      userId,
      type: 'task',
      title: 'Deep Watering Session',
      description: 'Water deeply to help plants through hot weather',
      start: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      notes: 'Hot weather expected - increase watering frequency',
      isRecurring: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  // Fall suggestions (September-November)
  if (currentMonth >= 9 && currentMonth <= 11) {
    suggestions.push({
      id: `smart-${Date.now()}-3`,
      userId,
      type: 'sow',
      title: 'Plant Fall Crops',
      description: 'Plant kale, broccoli, and other cool-season crops',
      start: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      notes: 'Perfect timing for fall harvest',
      isRecurring: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return suggestions;
}

export function exportToICal(events: Event[]): string {
  const icalHeader = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//GrowCommon//Garden Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  const icalEvents = events.map(event => {
    const startDate = new Date(event.start).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    const endDate = event.end ? new Date(event.end).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z' : startDate;

    return [
      'BEGIN:VEVENT',
      `UID:${event.id}@growcommon.com`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${event.title}`,
      event.description ? `DESCRIPTION:${event.description}` : '',
      event.notes ? `COMMENT:${event.notes}` : '',
      'STATUS:CONFIRMED',
      'END:VEVENT',
    ].filter(line => line !== '').join('\n');
  });

  const icalFooter = ['END:VCALENDAR'];

  return [...icalHeader, ...icalEvents, ...icalFooter].join('\n');
}

export function getRecurringEvents(event: Event, startDate: Date, endDate: Date): Event[] {
  if (!event.isRecurring || !event.recurrencePattern) return [event];

  const events: Event[] = [];
  const baseDate = new Date(event.start);
  const currentDate = new Date(baseDate);

  while (currentDate <= endDate) {
    if (currentDate >= startDate) {
      const recurringEvent: Event = {
        ...event,
        id: `${event.id}-${currentDate.getTime()}`,
        start: currentDate.toISOString(),
        end: event.end ? new Date(currentDate.getTime() + (new Date(event.end).getTime() - baseDate.getTime())).toISOString() : undefined,
      };
      events.push(recurringEvent);
    }

    // Increment based on recurrence pattern
    switch (event.recurrencePattern) {
      case 'daily':
        currentDate.setDate(currentDate.getDate() + 1);
        break;
      case 'weekly':
        currentDate.setDate(currentDate.getDate() + 7);
        break;
      case 'monthly':
        currentDate.setMonth(currentDate.getMonth() + 1);
        break;
      case 'yearly':
        currentDate.setFullYear(currentDate.getFullYear() + 1);
        break;
      default:
        currentDate.setDate(currentDate.getDate() + 7);
    }
  }

  return events;
}

