import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const region = searchParams.get('region');
    const season = searchParams.get('season');
    const affectedTags = searchParams.get('affectedTags');

    const where: any = {};

    if (region) {
      where.OR = [
        { region: { contains: region, mode: 'insensitive' } },
        { region: null } // Include pests without specific region
      ];
    }

    if (season) {
      where.AND = [
        {
          seasonFrom: {
            lte: season
          }
        },
        {
          seasonTo: {
            gte: season
          }
        }
      ];
    }

    if (affectedTags) {
      const tagArray = affectedTags.split(',').map(tag => tag.trim());
      where.affectedTags = {
        hasSome: tagArray
      };
    }

    const pests = await prisma.pest.findMany({
      where,
      orderBy: { name: 'asc' }
    });

    return NextResponse.json(pests);

  } catch (error) {
    console.error('Pests API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pests' },
      { status: 500 }
    );
  }
}




