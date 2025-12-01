#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const envContent = `# API Keys for GrowCommon Plant Index
# Get your API keys from the following services:

# Google Maps API (Required for Map functionality)
# https://console.cloud.google.com/apis/credentials
VITE_GOOGLE_MAPS_KEY=your_google_maps_api_key_here

# OpenWeatherMap API (Required for weather data)
# https://openweathermap.org/api
VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here

# Trefle API (Required for plant database)
# https://trefle.io/
VITE_TREFLE_API_KEY=your_trefle_api_key_here

# Plant.id API (Required for plant identification)
# https://web.plant.id/
VITE_PLANT_ID_API_KEY=your_plant_id_api_key_here

# Instructions:
# 1. Replace all 'your_*_api_key_here' with your actual API keys
# 2. Save the file
# 3. Restart your development server (npm run dev)
# 4. The Plant Index should now work with all features enabled

# Note: All APIs have free tiers available
# - OpenWeatherMap: 1000 calls/day free
# - Trefle: 1000 calls/month free  
# - Plant.id: 100 identifications/month free
# - Google Maps: $200/month free tier
`;

console.log('🌱 Setting up API keys for GrowCommon Plant Index...\n');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists!');
  console.log('Please check if all required API keys are set correctly.\n');
  
  // Read existing .env file to check what's already configured
  const existingContent = fs.readFileSync(envPath, 'utf8');
  const requiredKeys = [
    'VITE_GOOGLE_MAPS_KEY',
    'VITE_OPENWEATHER_API_KEY', 
    'VITE_TREFLE_API_KEY',
    'VITE_PLANT_ID_API_KEY'
  ];
  
  console.log('📋 Current API key status:');
  requiredKeys.forEach(key => {
    if (existingContent.includes(key) && !existingContent.includes('your_')) {
      console.log(`✅ ${key} - Configured`);
    } else {
      console.log(`❌ ${key} - Missing or placeholder`);
    }
  });
  
  console.log('\n📝 To update existing keys, edit the .env file manually.');
} else {
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log('📝 Please edit the .env file and add your API keys');
    console.log('\n🔑 Required API keys:');
    console.log('   • Google Maps API (for location services)');
    console.log('   • OpenWeatherMap API (for weather data)');
    console.log('   • Trefle API (for plant database)');
    console.log('   • Plant.id API (for plant identification)');
    console.log('\n📚 For detailed setup instructions, see API_INTEGRATION_SETUP.md');
  } catch (error) {
    console.error('❌ Error creating .env file:', error.message);
    console.log('\n📝 Please manually create a .env file with the required API keys');
  }
}

console.log('\n🚀 After setting up all API keys, restart your dev server with: npm run dev');
console.log('🌿 The Plant Index will then have access to:');
console.log('   • Real-time weather data and growing recommendations');
console.log('   • Comprehensive plant database with search functionality');
console.log('   • Plant identification from photos');
console.log('   • Location-based hardiness zone detection');
console.log('   • Seasonal growing calendar');
