import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const start = searchParams.get('start');
    const end = searchParams.get('end');

    const where: any = {
      userId: session.user.id
    };

    if (start && end) {
      where.start = {
        gte: new Date(start),
        lte: new Date(end)
      };
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        userPlant: {
          include: {
            plant: true
          }
        }
      },
      orderBy: { start: 'asc' }
    });

    return NextResponse.json(events);

  } catch (error) {
    console.error('Events API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      title,
      description,
      start,
      end,
      allDay,
      repeatRule,
      reminderMinutes,
      channel,
      userPlantId
    } = await request.json();

    if (!title || !start) {
      return NextResponse.json(
        { error: 'Title and start date are required' },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        userId: session.user.id,
        userPlantId: userPlantId || null,
        title,
        description: description || null,
        start: new Date(start),
        end: end ? new Date(end) : null,
        allDay: allDay || false,
        repeatRule: repeatRule || null,
        reminderMinutes: reminderMinutes || null,
        channel: channel || 'email'
      }
    });

    return NextResponse.json(event);

  } catch (error) {
    console.error('Create event error:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}




