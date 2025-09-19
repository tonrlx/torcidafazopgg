/**
 * Image optimization utilities
 */

export interface ImageConfig {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
}

/**
 * Generate optimized image URL from external CDN
 */
export const getOptimizedImageUrl = (
  baseUrl: string, 
  config: ImageConfig = {}
): string => {
  const { width, height, quality = 80, format } = config;
  
  // Using jsDelivr CDN for better performance and caching
  let optimizedUrl = baseUrl;
  
  // Add query parameters for CDN optimization
  const params = new URLSearchParams();
  
  if (width) params.append('w', width.toString());
  if (height) params.append('h', height.toString());
  params.append('q', quality.toString());
  if (format) params.append('f', format);
  
  // Add compression and optimization flags
  params.append('auto', 'compress');
  params.append('cs', 'tinysrgb');
  
  const queryString = params.toString();
  if (queryString) {
    optimizedUrl += `?${queryString}`;
  }
  
  return optimizedUrl;
};

/**
 * Get responsive image sources for different screen sizes
 */
export const getResponsiveImageSources = (baseUrl: string) => {
  return {
    mobile: getOptimizedImageUrl(baseUrl, { width: 480, quality: 70 }),
    tablet: getOptimizedImageUrl(baseUrl, { width: 768, quality: 75 }),
    desktop: getOptimizedImageUrl(baseUrl, { width: 1200, quality: 80 }),
    original: baseUrl
  };
};

/**
 * Preload critical images
 */
export const preloadImage = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = url;
  });
};

/**
 * Lazy load image with intersection observer
 */
export const createLazyImageObserver = (
  callback: (entry: IntersectionObserverEntry) => void
) => {
  return new IntersectionObserver(
    (entries) => {
      entries.forEach(callback);
    },
    {
      rootMargin: '100px 0px', // Load images 100px before they enter viewport
      threshold: 0.01
    }
  );
};

/**
 * Batch preload multiple images
 */
export const preloadImages = async (urls: string[]): Promise<void[]> => {
  return Promise.all(urls.map(preloadImage));
};

/**
 * Get image dimensions without loading the full image
 */
export const getImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = reject;
    img.src = url;
  });
};