# Project Memory

## Core
- Source of truth for projects: Firebase Firestore `projects` collection.
- Image handling: Cloudinary exclusively.
- UI Consistency: Maintain premium dark theme, animations, and typography.

## Memories
- [Data Model](mem://features/data-model) - Defined Firestore project document schema.
- [Image Strategy](mem://features/images) - Cloudinary transformation and fallback rules.

# Plan

## 1. Infrastructure Audit & Setup
- Verify `src/lib/firebase.ts` for frontend client initialization.
- Create `src/lib/projects.ts` to manage Firestore data fetching (Real-time or standard fetch).
- Update `src/lib/cloudinary.ts` with robust transformation and fallback logic.

## 2. Reusable Components
- **ProjectImage.tsx**: New component for optimized Cloudinary images with skeleton loading and premium fallbacks.
- **ProjectSkeleton.tsx**: Premium ghost cards for loading states.

## 3. Data Integration
- Refactor `Projects.tsx`, `FeaturedProjects.tsx`, and `ProjectModal.tsx` to consume Firestore data instead of the hardcoded `src/data/portfolio.ts` list.
- Implement a `useProjects` hook with TanStack Query (if available) or standard `useEffect` for resilience.

## 4. UI/UX Refinement
- Fix all broken links and images by ensuring they are strictly pulled from the new data source.
- Implement "Launch Project" and "Source Code" logic that hides missing links.
- Ensure all external links have proper security attributes.

## 5. Validation & Seeding
- Create a utility script to seed the Firestore database with the provided 1st, 2nd, and 3rd-year projects.
- Add runtime validation for project data to prevent UI breaks.

# Technical details
- **Firestore Schema**: `id`, `title`, `year`, `category`, `description`, `imageUrl` (Cloudinary), `liveUrl`, `githubUrl`, `featured` (boolean), `technologies` (array).
- **Cloudinary**: Use `f_auto`, `q_auto`, and `w_800` transformations.
- **Loading**: Framer Motion staggered entrance for skeletons.
