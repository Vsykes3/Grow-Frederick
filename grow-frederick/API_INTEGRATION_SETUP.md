

# API Integration Setup Guide for Plant Index
## Overview
The Plant Index tab will integrate multiple APIs to provide comprehensive plant information, weather data, and growing recommendations.

## Required API Keys

### 1. Google Maps API (Already configured)
- **Purpose**: Location services, plant hardiness zones
- **Setup**: Follow GOOGLE_MAPS_SETUP.md

### 2. OpenWeatherMap API
- **Purpose**: Current weather, forecasts, growing conditions
- **Setup**: 
  1. Go to [OpenWeatherMap](https://openweathermap.org/api)
  2. Sign up for free account
  3. Get API key
  4. Add to .env: `VITE_OPENWEATHER_API_KEY=your_key_here`

### 3. Trefle API (Plant Database)
- **Purpose**: Plant species information, growing guides
- **Setup**:
  1. Go to [Trefle](https://trefle.io/)
  2. Sign up for free account
  3. Get API key
  4. Add to .env: `VITE_TREFLE_API_KEY=your_key_here`

### 4. USDA Plant Database API
- **Purpose**: Plant hardiness zones, native plant data
- **Setup**:
  1. Go to [USDA API](https://data.nal.usda.gov/dataset/usda-plant-hardiness-zone-map)
  2. No API key required (free public API)

### 5. Plant.id API (Plant Identification)
- **Purpose**: Identify plants from photos
- **Setup**:
  1. Go to [Plant.id](https://web.plant.id/)
  2. Sign up for free account
  3. Get API key
  4. Add to .env: `VITE_PLANT_ID_API_KEY=your_key_here`

## Environment Variables
Add these to your `.env` file:

```bash
# Google Maps (already configured)
VITE_GOOGLE_MAPS_KEY=your_google_maps_key

# Weather API
VITE_OPENWEATHER_API_KEY=your_openweather_key

# Plant Database
VITE_TREFLE_API_KEY=your_trefle_key

# Plant Identification
VITE_PLANT_ID_API_KEY=your_plant_id_key
```

## Features to be Implemented

### 1. Plant Search & Database
- Search plants by name, type, growing conditions
- Plant details: care instructions, growing tips
- Hardiness zone compatibility

### 2. Weather Integration
- Current weather conditions
- 7-day forecast
- Growing season recommendations
- Frost warnings

### 3. Location Services
- User's current location
- Plant hardiness zone detection
- Local growing recommendations

### 4. Plant Identification
- Upload photos to identify plants
- Get care instructions for identified plants

### 5. Growing Calendar
- Seasonal planting recommendations
- Local frost dates
- Optimal planting times

## API Rate Limits & Costs
- **OpenWeatherMap**: 1000 calls/day free
- **Trefle**: 1000 calls/month free
- **Plant.id**: 100 identifications/month free
- **Google Maps**: $200/month free tier
- **USDA**: No limits (free)

## Security Notes 
- All API keys are client-side (Vite environment variables)
- Consider implementing rate limiting for production
- Monitor API usage to stay within free tiers
