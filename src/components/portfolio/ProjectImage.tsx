import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOptimizedCloudinaryUrl } from '@/lib/cloudinary';
import assistantConcept from '@/assets/ai-assistant-concept.jpg';

interface ProjectImageProps {
  src?: string | null | undefined;
  alt: string;
  className?: string;
  fallbackText?: string;
  isSpecialAI?: boolean;
}

export const ProjectImage: React.FC<ProjectImageProps> = ({ 
  src, 
  alt, 
  className = "", 
  fallbackText = "Project Preview",
  isSpecialAI = false
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Use responsive widths for Cloudinary optimization
  const getResponsiveSrc = (w: number) => isSpecialAI ? assistantConcept : src ? getOptimizedCloudinaryUrl(src, w) : null;

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    
    if (!src && !isSpecialAI) {
      setIsLoading(false);
    }
  }, [src, alt]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    console.warn(`PROJECT IMAGE — could not load screenshot for: ${alt}`, { src });
    setHasError(true);
    setIsLoading(false);
  };

  // Base URL for the image
  const defaultSrc = getResponsiveSrc(800);
  
  // Generate srcset for responsive images (Cloudinary handles the resizing)
  const srcSet = src && !isSpecialAI && !src.startsWith('http') 
    ? [400, 800, 1200].map(w => `${getOptimizedCloudinaryUrl(src, w)} ${w}w`).join(', ')
    : undefined;

  return (
    <div className={`relative overflow-hidden w-full h-full bg-secondary/20 ${className}`}>
      {/* Skeleton Loading State - Improved Placeholder */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-secondary/80 backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]" />
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
              <span className="text-[10px] font-bold text-primary/40 uppercase tracking-widest animate-pulse">
                Loading...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Real Screenshot with Responsive Sizes */}
      {!hasError && defaultSrc ? (
        <img
          src={defaultSrc}
          srcSet={srcSet}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          alt={alt}
          width={1200}
          height={800}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-all duration-1000 ease-out ${isLoading ? 'opacity-0 scale-110 blur-xl' : 'opacity-100 scale-100 blur-0'}`}
          loading="lazy"
        />
      ) : (
        /* Error/Missing Fallback */
        (
          <div className="w-full h-full bg-secondary/30 flex flex-col items-center justify-center p-6 text-center space-y-3 z-10 border border-white/5">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-muted-foreground/30 ring-1 ring-white/10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-primary/60 tracking-[0.2em] uppercase block">
                {!src ? 'Screenshot not uploaded' : 'Load Error'}
              </span>
              <span className="text-xs font-medium text-muted-foreground/40 block max-w-[180px] truncate">
                {alt}
              </span>
            </div>
          </div>
        )
      )}
    </div>
  );
};
