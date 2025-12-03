import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const plant = await prisma.plant.findUnique({
      where: { slug: params.slug }
    });

    if (!plant) {
      return NextResponse.json({ error: 'Plant not found' }, { status: 404 });
    }

    return NextResponse.json(plant);

  } catch (error) {
    console.error('Plant detail API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plant details' },
      { status: 500 }
    );
  }
}




