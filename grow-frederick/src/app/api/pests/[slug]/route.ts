import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const pest = await prisma.pest.findUnique({
      where: { slug: params.slug }
    });

    if (!pest) {
      return NextResponse.json({ error: 'Pest not found' }, { status: 404 });
    }

    return NextResponse.json(pest);

  } catch (error) {
    console.error('Pest detail API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pest details' },
      { status: 500 }
    );
  }
}















