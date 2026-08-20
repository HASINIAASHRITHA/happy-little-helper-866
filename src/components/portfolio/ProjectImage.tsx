import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOptimizedCloudinaryUrl } from '@/lib/cloudinary';

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
  const getResponsiveSrc = (w: number) => src ? getOptimizedCloudinaryUrl(src, w) : null;

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    
    if (!src) {
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
  const srcSet = src && !src.startsWith('http') 
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
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-all duration-1000 ease-out ${isLoading ? 'opacity-0 scale-110 blur-xl' : 'opacity-100 scale-100 blur-0'}`}
          loading="lazy"
        />
      ) : (
        /* Error/Missing Fallback */
        isSpecialAI ? (
          <div className="w-full h-full relative group/ai overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1675557009875-436f09789900?auto=format&fit=crop&q=80&w=800"
              alt="AI Assistant Interface"
              className="w-full h-full object-cover grayscale opacity-40 group-hover/ai:grayscale-0 group-hover/ai:opacity-100 transition-all duration-700"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-black/60 backdrop-blur-[2px] group-hover/ai:bg-black/20 group-hover/ai:backdrop-blur-0 transition-all duration-700">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary ring-1 ring-primary/40 mb-4 animate-pulse">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
              </div>
              <span className="text-[10px] font-bold text-primary tracking-[0.2em] uppercase block mb-1">
                AI Assistant
              </span>
              <span className="text-[9px] font-medium text-muted-foreground/60 uppercase tracking-widest">
                Intelligent Interface
              </span>
            </div>
          </div>
        ) : (
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
