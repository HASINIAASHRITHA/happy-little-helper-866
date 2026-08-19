# Premium Portfolio Refinement Plan

The objective is to overhaul the UI/UX to a premium level, update social links, and implement dashboard-style image previews for all projects.

## User Preferences
- **Links**: LinkedIn (https://www.linkedin.com/in/hasini-addanki-70b236322/), GitHub (https://github.com/HASINIAASHRITHA).
- **Style**: Premium, professional, "cinematic" editorial feel.
- **Project Representation**: Dashboard-style images for all projects.

## Proposed Changes

### 1. Data Layer (`src/data/portfolio.ts`)
- Update `socialLinks.linkedin` and `socialLinks.github`.
- Add placeholders for dashboard images for all projects to facilitate "dashboard" style previews.

### 2. Global Styling (`src/styles.css`)
- Refine typography (increased line-heights, tighter letter-spacing for headings).
- Enhance glassmorphism with better contrast and multi-layered shadows.
- Add more organic, subtle background animations (noise texture, moving blobs).

### 3. Components Overhaul
- **Hero**: More cinematic layout with larger typography and a refined "portrait" area using the uploaded image.
- **Project Cards**: Redesign `ProjectCard` and `FeaturedProject` to showcase "dashboard" images with realistic browser frames or device mockups.
- **Navbar**: More minimal, floating design.
- **Contact**: Clean up layout for a more "studio" feel.

### 4. Image Assets
- Use `lovable-assets` to integrate the user-uploaded portrait.
- Create or use high-quality generic dashboard placeholders for projects that don't have specific screenshots yet.

## Technical Details
- **Framer Motion**: Use more sophisticated `staggerChildren` and `layoutId` transitions.
- **Tailwind**: Use CSS variables for a consistent semantic palette (OKLCH).
- **Responsive**: Ensure the "premium" feel translates to mobile with custom touch-friendly interactions.
