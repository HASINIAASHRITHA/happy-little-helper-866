import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const mouseX = useSpring(0, { damping: 20, stiffness: 200, mass: 0.5 });
  const mouseY = useSpring(0, { damping: 20, stiffness: 200, mass: 0.5 });
  const outerX = useSpring(0, { damping: 30, stiffness: 100, mass: 0.8 });
  const outerY = useSpring(0, { damping: 30, stiffness: 100, mass: 0.8 });
  
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      outerX.set(e.clientX);
      outerY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      }
    };

    const onMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
            style={{
              x: mouseX,
              y: mouseY,
              translateX: "-50%",
              translateY: "-50%"
            }}
            animate={{
              scale: isHovering ? 2.5 : 1,
            }}
          />
          <motion.div
            className="fixed top-0 left-0 w-8 h-8 border border-primary/30 rounded-full pointer-events-none z-[9998]"
            style={{
              x: outerX,
              y: outerY,
              translateX: "-50%",
              translateY: "-50%"
            }}
            animate={{
              scale: isHovering ? 1.5 : 1,
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
};
