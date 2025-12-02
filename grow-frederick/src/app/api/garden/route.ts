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

    const userPlants = await prisma.userPlant.findMany({
      where: { userId: session.user.id },
      include: {
        plant: true
      },
      orderBy: { datePlanted: 'desc' }
    });

    return NextResponse.json(userPlants);

  } catch (error) {
    console.error('Garden API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch garden' },
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

    const { plantId, nickname, datePlanted, locationNote, notes } = await request.json();

    if (!plantId) {
      return NextResponse.json({ error: 'Plant ID is required' }, { status: 400 });
    }

    // Check if user has reached the limit for free plan
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { plan: true }
    });

    if (user?.plan === 'free') {
      const plantCount = await prisma.userPlant.count({
        where: { userId: session.user.id }
      });

      if (plantCount >= 10) {
        return NextResponse.json(
          { error: 'Free plan limited to 10 plants. Upgrade to add more.' },
          { status: 403 }
        );
      }
    }

    const userPlant = await prisma.userPlant.create({
      data: {
        userId: session.user.id,
        plantId,
        nickname: nickname || null,
        datePlanted: datePlanted ? new Date(datePlanted) : new Date(),
        locationNote: locationNote || null,
        notes: notes || null
      },
      include: {
        plant: true
      }
    });

    return NextResponse.json(userPlant);

  } catch (error) {
    console.error('Add to garden error:', error);
    return NextResponse.json(
      { error: 'Failed to add plant to garden' },
      { status: 500 }
    );
  }
}




