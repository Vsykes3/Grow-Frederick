/**
 * Plant Image Utility
 * Handles fetching plant images from Unsplash/Pexels with fallback support
 */

const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY;

// Fallback botanical SVG illustration
export const getFallbackSVG = (plantName: string) => {
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="300" fill="#f0f9ff"/>
      <g fill="none" stroke="#86efac" stroke-width="2">
        <circle cx="200" cy="150" r="40" fill="#dcfce7" opacity="0.5"/>
        <path d="M 200 110 Q 180 130 160 150 T 200 190 Q 220 170 240 150 T 200 110"/>
        <path d="M 200 140 L 200 200" stroke-width="3"/>
      </g>
      <text x="200" y="240" text-anchor="middle" font-family="Arial" font-size="14" fill="#4b5563">${plantName}</text>
    </svg>
  `)}`;
};

// Cache for image URLs
const imageCache = new Map<string, { url: string; timestamp: number }>();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Get plant image URL from Unsplash
 */
async function fetchFromUnsplash(plantName: string): Promise<string | null> {
  if (!UNSPLASH_ACCESS_KEY) return null;

  try {
    const query = `${plantName} plant growing garden`;
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].urls?.regular || data.results[0].urls?.small;
    }
  } catch (error) {
    console.error('Unsplash API error:', error);
  }

  return null;
}

/**
 * Get plant image URL from Pexels
 */
async function fetchFromPexels(plantName: string): Promise<string | null> {
  if (!PEXELS_API_KEY) return null;

  try {
    const query = `${plantName} plant growing`;
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) return null;

    const data = await response.json();
    if (data.photos && data.photos.length > 0) {
      return data.photos[0].src?.large || data.photos[0].src?.medium;
    }
  } catch (error) {
    console.error('Pexels API error:', error);
  }

  return null;
}

/**
 * Get plant image with caching and fallback chain
 */
export async function getPlantImage(plantName: string): Promise<string> {
  // Check cache first
  const cached = imageCache.get(plantName);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.url;
  }

  // Try Unsplash first
  let imageUrl = await fetchFromUnsplash(plantName);
  if (imageUrl) {
    imageCache.set(plantName, { url: imageUrl, timestamp: Date.now() });
    return imageUrl;
  }

  // Try Pexels as fallback
  imageUrl = await fetchFromPexels(plantName);
  if (imageUrl) {
    imageCache.set(plantName, { url: imageUrl, timestamp: Date.now() });
    return imageUrl;
  }

  // Use Unsplash Source API (no auth required, but deprecated)
  const sourceUrl = `https://source.unsplash.com/400x300/?${encodeURIComponent(plantName + ' plant')}`;
  imageCache.set(plantName, { url: sourceUrl, timestamp: Date.now() });
  return sourceUrl;
}

/**
 * Get plant image synchronously (for pre-loaded images)
 * Uses a simple URL pattern that doesn't require API calls
 */
export function getPlantImageURL(plantName: string): string {
  // Use a predictable pattern that works without API
  // In production, you'd want to use a CDN or pre-loaded images
  return `https://picsum.photos/400/300?random=${plantName.charCodeAt(0)}`;
}

/**
 * Clear image cache
 */
export function clearImageCache(): void {
  imageCache.clear();
}












