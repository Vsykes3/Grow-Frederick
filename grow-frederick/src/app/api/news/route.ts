import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'news';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // Check cache for news
    const cached = await prisma.post.findFirst({
      where: {
        type: 'news',
        publishedAt: {
          gte: new Date(Date.now() - CACHE_DURATION)
        }
      },
      orderBy: { publishedAt: 'desc' }
    });

    if (!cached) {
      // In a real implementation, you would fetch from external APIs here
      // For now, we'll return cached posts or create some sample data
    }

    const posts = await prisma.post.findMany({
      where: { type },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { publishedAt: 'desc' }
    });

    const total = await prisma.post.count({
      where: { type }
    });

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('News API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}















