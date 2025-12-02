// Optional web-push package - loaded dynamically to avoid build-time errors
let webpush: any = null;

async function getWebPush() {
  if (webpush !== null) return webpush;
  try {
    // Use Function constructor to avoid webpack resolution
    const webpushModule = await new Function('return import("web-push")')();
    webpush = webpushModule.default || webpushModule;
    // Configure web-push
    webpush.setVapidDetails(
      process.env.VAPID_SUBJECT || 'mailto:admin@growcommon.com',
      process.env.VAPID_PUBLIC_KEY || '',
      process.env.VAPID_PRIVATE_KEY || ''
    );
    return webpush;
  } catch (e) {
    // web-push package not installed - will use mock responses
    webpush = false; // Mark as unavailable
    return null;
  }
}

export interface PushNotification {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  data?: any;
  actions?: Array<{
    action: string;
    title: string;
  }>;
}

export async function sendPushNotification(
  subscription: any,
  notification: PushNotification
) {
  try {
    const webpushClient = await getWebPush();
    if (!webpushClient) {
      console.log('Push notification not sent - web-push package not installed');
      return { success: true };
    }
    
    const payload = JSON.stringify(notification);
    
    await webpushClient.sendNotification(subscription, payload);
    
    return { success: true };
  } catch (error) {
    console.error('Push notification error:', error);
    return { success: false, error };
  }
}

export async function sendReminderPush(
  subscription: any,
  eventTitle: string,
  eventDate: string
) {
  return sendPushNotification(subscription, {
    title: 'Garden Reminder',
    body: `${eventTitle} - ${eventDate}`,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    data: {
      type: 'reminder',
      eventTitle,
      eventDate
    },
    actions: [
      {
        action: 'view',
        title: 'View Details'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  });
}

export async function sendWeatherAlertPush(
  subscription: any,
  alert: string
) {
  return sendPushNotification(subscription, {
    title: 'Weather Alert',
    body: alert,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    data: {
      type: 'weather_alert',
      alert
    },
    actions: [
      {
        action: 'view_weather',
        title: 'View Weather'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  });
}

export async function sendDailyTipPush(
  subscription: any,
  tip: string
) {
  return sendPushNotification(subscription, {
    title: 'Daily Garden Tip',
    body: tip,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    data: {
      type: 'daily_tip',
      tip
    },
    actions: [
      {
        action: 'view_tip',
        title: 'Read More'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  });
}










