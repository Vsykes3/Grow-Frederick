import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const OWM_API_KEY = process.env.OWM_API_KEY;
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

interface WeatherData {
  current: any;
  hourly: any[];
  daily: any[];
  alerts: any[];
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const zip = searchParams.get('zip');
    
    if (!zip) {
      return NextResponse.json({ error: 'ZIP code is required' }, { status: 400 });
    }

    if (!OWM_API_KEY) {
      return NextResponse.json({ error: 'Weather API not configured' }, { status: 500 });
    }

    // Check cache first
    const cached = await prisma.weatherSnapshot.findFirst({
      where: {
        zip,
        takenAt: {
          gte: new Date(Date.now() - CACHE_DURATION)
        }
      },
      orderBy: { takenAt: 'desc' }
    });

    if (cached) {
      return NextResponse.json(JSON.parse(cached.payloadJSON));
    }

    // Get coordinates from ZIP
    const geocodeResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/zip?zip=${zip},US&appid=${OWM_API_KEY}`
    );
    
    if (!geocodeResponse.ok) {
      throw new Error('Failed to geocode ZIP code');
    }
    
    const { lat, lon } = await geocodeResponse.json();

    // Fetch weather data
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${OWM_API_KEY}&units=imperial&exclude=minutely`
    );

    if (!weatherResponse.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherData: WeatherData = await weatherResponse.json();

    // Cache the result
    await prisma.weatherSnapshot.create({
      data: {
        zip,
        lat,
        lon,
        payloadJSON: JSON.stringify(weatherData),
        takenAt: new Date()
      }
    });

    return NextResponse.json(weatherData);

  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}




