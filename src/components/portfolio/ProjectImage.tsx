import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOptimizedCloudinaryUrl } from '@/lib/cloudinary';

interface ProjectImageProps {
  src?: string;
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
        <div className="w-full h-full bg-gradient-to-br from-primary/20 via-background to-accent/20 flex flex-col items-center justify-center p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl border-2 border-white/5 flex items-center justify-center text-white/10">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold text-primary tracking-widest uppercase block">{fallbackText}</span>
            <span className="text-sm font-medium text-muted-foreground/40 block">Image Unavailable</span>
          </div>
          <span className="text-4xl font-black text-white/5 absolute inset-0 flex items-center justify-center pointer-events-none select-none uppercase tracking-tighter overflow-hidden whitespace-nowrap px-4">
            {alt}
          </span>
        </div>
      )}
    </div>
  );
};
