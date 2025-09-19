/**
 * Assets Module - External asset management
 * This module manages all external assets and media files
 */

export { ASSETS, ASSETS_BASE_URL, CDN_CONFIG } from '../../constants/assets';
export { 
  getOptimizedImageUrl, 
  getResponsiveImageSources, 
  preloadImage, 
  createLazyImageObserver 
} from '../../utils/imageOptimization';