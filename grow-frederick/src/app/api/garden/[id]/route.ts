import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userPlant = await prisma.userPlant.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      }
    });

    if (!userPlant) {
      return NextResponse.json({ error: 'Plant not found' }, { status: 404 });
    }

    await prisma.userPlant.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Remove from garden error:', error);
    return NextResponse.json(
      { error: 'Failed to remove plant from garden' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { nickname, locationNote, notes } = await request.json();

    const userPlant = await prisma.userPlant.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      }
    });

    if (!userPlant) {
      return NextResponse.json({ error: 'Plant not found' }, { status: 404 });
    }

    const updatedPlant = await prisma.userPlant.update({
      where: { id: params.id },
      data: {
        nickname: nickname || null,
        locationNote: locationNote || null,
        notes: notes || null
      },
      include: {
        plant: true
      }
    });

    return NextResponse.json(updatedPlant);

  } catch (error) {
    console.error('Update garden plant error:', error);
    return NextResponse.json(
      { error: 'Failed to update plant' },
      { status: 500 }
    );
  }
}




