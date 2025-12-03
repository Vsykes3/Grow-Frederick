import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      channel
    } = await request.json();

    const event = await prisma.event.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      }
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const updatedEvent = await prisma.event.update({
      where: { id: params.id },
      data: {
        title: title || event.title,
        description: description !== undefined ? description : event.description,
        start: start ? new Date(start) : event.start,
        end: end ? new Date(end) : event.end,
        allDay: allDay !== undefined ? allDay : event.allDay,
        repeatRule: repeatRule !== undefined ? repeatRule : event.repeatRule,
        reminderMinutes: reminderMinutes !== undefined ? reminderMinutes : event.reminderMinutes,
        channel: channel || event.channel
      }
    });

    return NextResponse.json(updatedEvent);

  } catch (error) {
    console.error('Update event error:', error);
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const event = await prisma.event.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      }
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    await prisma.event.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Delete event error:', error);
    return NextResponse.json(
      { error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}




