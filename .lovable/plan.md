# Premium Animation & Interaction Upgrade Plan

This plan outlines the steps to upgrade the portfolio with high-end, cinematic animations and interactions while preserving the current visual identity.

## User Review Required

> [!IMPORTANT]
> The upgrade focuses on "expensive" feeling motion: smooth easings, spring physics, and subtle parallax. Custom cursor and hover effects will be optimized for desktop and disabled/simplified for mobile.

- **Animation Timing**: Standardizing on 300ms–1.5s sequences for loading and transitions.
- **Interactions**: Magnetic effects for buttons, 3D tilt for cards, and scroll-driven timeline progress.
- **Performance**: Leveraging GPU-accelerated properties (transform, opacity) and respecting `prefers-reduced-motion`.

## Technical Details

### 1. Global Motion & Load Sequence
- Implement a `PageTransition` or `Layout` wrapper for the initial 1.5s entrance sequence.
- Staggered reveals for Hero elements using Framer Motion.
- Add a top-fixed scroll progress indicator.

### 2. Interactive Hero & Parallax
- Update `Hero.tsx` with mouse-based parallax for background, profile, and tech cards.
- Refine the technology cards with continuous organic floating motion and cursor proximity reactions.
- Enhance the keyword rotator with a transform-like transition (blur/fade/slide).

### 3. Component Enhancements
- **Navbar**: Add smooth glass transition on scroll and animated active section indicator.
- **CustomCursor**: Refine to a small dot that expands and changes content (e.g., "View") over project cards.
- **Buttons**: Implement magnetic hover effects and subtle click feedback.

### 4. Section & Project Motion
- **Journey**: Convert to a full scroll-driven animation where the timeline illuminates and milestones active as they pass the "focus" point.
- **Projects**: Use `AnimatePresence` and `layout` prop for smooth filtering/reorganization transitions.
- **Project Cards**: Add subtle 3D tilt (max 5deg) and internal element motion (tags, icons).
- **Featured Projects**: Implement a "presentation" feel with cross-fade transitions on scroll between major highlights.
- **Skills**: Replace list entrance with interactive cards that glow and lift on hover.

### 5. Final Polish
- Ensure all transitions are spring-based for a premium organic feel.
- Optimize for performance (GPU-only transforms).
- Mobile-specific optimizations: disable custom cursor and reduce parallax intensity.
