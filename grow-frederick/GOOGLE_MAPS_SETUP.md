# Google Maps API Setup Guide

## Issue
The map tab is showing "Oops! Something went wrong. This page didn't load Google Maps correctly" because the Google Maps API key is missing or invalid.

## Solution

### 1. Get a Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Geocoding API (optional, for address lookup)
   - Places API (optional, for place search)
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy your API key

### 2. Configure API Key Restrictions (Recommended)
1. Click on your API key in the credentials list
2. Under "Application restrictions", select "HTTP referrers (web sites)"
3. Add your domain(s):
   - `localhost:5173/*` (for development)
   - `yourdomain.com/*` (for production)
4. Under "API restrictions", select "Restrict key" and choose the APIs you enabled

### 3. Set Environment Variable
Create a `.env` file in the `grow-frederick` directory:

```bash
# .env
VITE_GOOGLE_MAPS_KEY=your_actual_api_key_here
```

**Important**: Replace `your_actual_api_key_here` with your real API key.

### 4. Restart Development Server
After creating the `.env` file, restart your development server:

```bash
npm run dev
```

### 5. Verify Setup
- The map should now load without errors
- You should see your current location or the Frederick, MD fallback location
- Check the browser console for any remaining errors

## Troubleshooting

### API Key Not Working
- Ensure the API key is correct and has no extra spaces
- Check that the required APIs are enabled
- Verify API key restrictions allow your domain
- Check Google Cloud Console billing is set up

### Still Getting Errors
- Check browser console for specific error messages
- Verify the `.env` file is in the correct location
- Ensure the environment variable name matches exactly: `VITE_GOOGLE_MAPS_KEY`
- Try hardcoding the API key temporarily to test

### Billing Issues
- Google Maps API has a free tier with quotas
- Set up billing in Google Cloud Console
- Monitor usage in the Google Cloud Console

## Security Notes
- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- Use API key restrictions to limit usage to your domains
- Monitor API usage to prevent unexpected charges
