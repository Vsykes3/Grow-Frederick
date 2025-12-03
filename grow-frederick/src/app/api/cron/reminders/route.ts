import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendReminderEmail, sendReminderPush } from '@/lib/email';
import { sendReminderPush as sendPushReminder } from '@/lib/push-notifications';

export async function POST(request: NextRequest) {
  try {
    // Verify this is a legitimate cron request
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

    // Find events with reminders due in the next hour
    const events = await prisma.event.findMany({
      where: {
        reminderMinutes: {
          not: null
        },
        start: {
          gte: now,
          lte: oneHourFromNow
        },
        channel: {
          in: ['email', 'both']
        }
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true
          }
        }
      }
    });

    const results = [];

    for (const event of events) {
      try {
        const reminderTime = new Date(
          event.start.getTime() - (event.reminderMinutes! * 60 * 1000)
        );

        // Check if reminder should be sent now
        if (reminderTime <= now) {
          // Send email reminder
          if (event.channel === 'email' || event.channel === 'both') {
            const emailResult = await sendReminderEmail(
              event.user.email!,
              event.user.name || 'Gardener',
              event.title,
              event.start.toLocaleDateString()
            );
            results.push({ eventId: event.id, email: emailResult });
          }

          // Send push notification if user has subscription
          if (event.channel === 'push' || event.channel === 'both') {
            const pushSubscriptions = await prisma.pushSubscription.findMany({
              where: { userId: event.user.id }
            });

            for (const subscription of pushSubscriptions) {
              const pushResult = await sendPushReminder(
                {
                  endpoint: subscription.endpoint,
                  keys: {
                    p256dh: subscription.p256dh,
                    auth: subscription.auth
                  }
                },
                event.title,
                event.start.toLocaleDateString()
              );
              results.push({ eventId: event.id, push: pushResult });
            }
          }

          // Mark reminder as sent
          await prisma.event.update({
            where: { id: event.id },
            data: { reminderMinutes: null } // Clear reminder to prevent duplicate sends
          });
        }
      } catch (error) {
        console.error(`Error sending reminder for event ${event.id}:`, error);
        results.push({ eventId: event.id, error: error.message });
      }
    }

    return NextResponse.json({
      success: true,
      processed: events.length,
      results
    });

  } catch (error) {
    console.error('Cron reminders error:', error);
    return NextResponse.json(
      { error: 'Failed to process reminders' },
      { status: 500 }
    );
  }
}















