import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const sun = searchParams.get('sun');
    const water = searchParams.get('water');
    const soil = searchParams.get('soil');
    const tags = searchParams.get('tags');
    const native = searchParams.get('native');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const where: any = {};

    if (type) where.type = type;
    if (sun) where.sun = sun;
    if (water) where.water = water;
    if (soil) where.soil = soil;
    if (native !== null) where.native = native === 'true';
    if (search) {
      where.OR = [
        { commonName: { contains: search, mode: 'insensitive' } },
        { scientificName: { contains: search, mode: 'insensitive' } }
      ];
    }
    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      where.tags = {
        hasSome: tagArray
      };
    }

    const [plants, total] = await Promise.all([
      prisma.plant.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { commonName: 'asc' }
      }),
      prisma.plant.count({ where })
    ]);

    return NextResponse.json({
      plants,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Plants API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch plants' },
      { status: 500 }
    );
  }
}




