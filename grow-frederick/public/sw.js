// Service Worker for Push Notifications
const CACHE_NAME = 'growcommon-v1';
const urlsToCache = [
  '/',
  '/plant-index',
  '/my-garden',
  '/calendar',
  '/weather',
  '/pests',
  '/about',
  '/pricing'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Push event
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: data.icon || '/icons/icon-192x192.png',
    badge: data.badge || '/icons/badge-72x72.png',
    data: data.data,
    actions: data.actions || [],
    requireInteraction: data.requireInteraction || false,
    tag: data.tag || 'growcommon-notification'
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const action = event.action;
  const data = event.notification.data;

  let url = '/';

  switch (action) {
    case 'view':
    case 'view_details':
      if (data?.type === 'reminder') {
        url = '/calendar';
      } else if (data?.type === 'weather_alert') {
        url = '/weather';
      } else if (data?.type === 'daily_tip') {
        url = '/pro-starter-pack';
      }
      break;
    case 'view_weather':
      url = '/weather';
      break;
    case 'view_tip':
      url = '/pro-starter-pack';
      break;
    case 'dismiss':
    default:
      return;
  }

  event.waitUntil(
    clients.openWindow(url)
  );
});

// Background sync for offline functionality
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Sync any pending data when connection is restored
  try {
    const response = await fetch('/api/sync/pending');
    if (response.ok) {
      console.log('Background sync completed');
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}















