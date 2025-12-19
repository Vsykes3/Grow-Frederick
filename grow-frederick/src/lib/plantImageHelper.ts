/**
 * Helper function to get correct plant image path
 * Handles both old /assets/ paths and new /images/plants/ paths
 */
export function getPlantImageUrl(imageUrl?: string, plantId?: string): string {
  if (!imageUrl) {
    // Return placeholder based on plant ID
    return '/images/plants/placeholder.jpg';
  }

  // If already using /images/plants/, return as is
  if (imageUrl.startsWith('/images/plants/')) {
    return imageUrl;
  }

  // Convert old /assets/ paths to /images/plants/
  if (imageUrl.startsWith('/assets/')) {
    const filename = imageUrl.split('/').pop() || '';
    // Convert to lowercase, hyphenated format
    const normalized = filename
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, '-')
      .replace(/-+/g, '-');
    return `/images/plants/${normalized}`;
  }

  // If it's an external URL (Unsplash, etc.), return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // Default fallback
  return imageUrl;
}

/**
 * Get fallback image based on plant category
 */
export function getCategoryFallback(category: string): string {
  const fallbacks: Record<string, string> = {
    vegetable: '🥕',
    herb: '🌿',
    fruit: '🍓',
    flower: '🌸',
    tree: '🌳',
    shrub: '🌿'
  };
  return fallbacks[category] || '🌱';
}












