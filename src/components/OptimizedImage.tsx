import React, { useState, useRef, useEffect } from 'react';
import { getResponsiveImageSources, createLazyImageObserver, preloadImage } from '../utils/imageOptimization';
import { CDN_CONFIG } from '../constants/assets';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onError?: () => void;
  fallbackSrc?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  onError,
  fallbackSrc
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Preload critical images
    if (priority) {
      preloadImage(src).catch(() => {
        console.warn(`Failed to preload critical image: ${src}`);
      });
    }

    if (priority || shouldLoad) return;

    // Use configuration from CDN_CONFIG
    const observer = createLazyImageObserver((entry) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.unobserve(entry.target);
      }
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, shouldLoad]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    if (onError) onError();
  };

  const imageSrc = hasError && fallbackSrc ? fallbackSrc : src;
  const responsiveSources = getResponsiveImageSources(imageSrc);

  // Generate optimized srcSet with better quality settings
  const srcSet = shouldLoad ? `
    ${responsiveSources.mobile} 480w,
    ${responsiveSources.tablet} 768w,
    ${responsiveSources.desktop} 1200w
  `.trim() : undefined;
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading placeholder */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-900 animate-pulse flex items-center justify-center"
          style={{ width, height }}
        >
          <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      
      {/* Optimized image with responsive sources */}
      <img
        ref={imgRef}
        src={shouldLoad ? responsiveSources.mobile : undefined}
        srcSet={srcSet}
        sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px"
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </div>
  );
};

export default OptimizedImage;