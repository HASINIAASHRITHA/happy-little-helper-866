import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOptimizedCloudinaryUrl } from '@/lib/cloudinary';

interface ProjectImageProps {
  src?: string | null | undefined;
  alt: string;
  className?: string;
  fallbackText?: string;
  width?: number;
}

export const ProjectImage: React.FC<ProjectImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  fallbackText = "Project Preview",
  width = 800
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const optimizedSrc = src ? getOptimizedCloudinaryUrl(src, width) : null;

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    console.error(`Failed to load image for project: ${alt}`, { src, optimizedSrc });
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div className={`relative overflow-hidden w-full h-full ${className}`}>
      {/* Loading Skeleton */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-secondary animate-pulse z-10"
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image or Fallback */}
      {!hasError && optimizedSrc ? (
        <img
          src={optimizedSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-secondary/30 flex flex-col items-center justify-center p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-xl border border-white/5 flex items-center justify-center text-muted-foreground/30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-primary/60 tracking-[0.2em] uppercase block">
              {src ? 'Preview unavailable' : 'Preview coming soon'}
            </span>
            <span className="text-xs font-medium text-muted-foreground/40 block">
              {alt}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
