#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const envContent = `# Google Maps API Key
# Get your API key from: https://console.cloud.google.com/apis/credentials
# Make sure to enable: Maps JavaScript API, Geocoding API, Places API
VITE_GOOGLE_MAPS_KEY=your_google_maps_api_key_here

# Instructions:
# 1. Replace 'your_google_maps_api_key_here' with your actual API key
# 2. Restart your development server (npm run dev)
# 3. The map should now work properly
`;

console.log('Setting up environment file for Google Maps...\n');

if (fs.existsSync(envPath)) {
  console.log('⚠️  .env file already exists!');
  console.log('Please check if VITE_GOOGLE_MAPS_KEY is set correctly.\n');
} else {
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created successfully!');
    console.log('📝 Please edit the .env file and add your Google Maps API key');
    console.log('🔑 Get your API key from: https://console.cloud.google.com/apis/credentials\n');
  } catch (error) {
    console.error('❌ Error creating .env file:', error.message);
    console.log('\n📝 Please manually create a .env file with:');
    console.log('VITE_GOOGLE_MAPS_KEY=your_actual_api_key_here\n');
  }
}

console.log('📚 For detailed setup instructions, see GOOGLE_MAPS_SETUP.md');
console.log('🚀 After setting up the API key, restart your dev server with: npm run dev');
