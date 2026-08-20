# Admin Page Implementation Plan

Implement a professional, premium admin dashboard for managing projects and journey milestones.

## User Review Required

> [!IMPORTANT]
> - **Security**: This implementation uses a simple password-based gate for demonstration. For production, full Supabase Auth with RLS is recommended.
> - **Firestore Structure**: I will ensure the Firestore collections (`projects`, `milestones`) are correctly initialized.

## Proposed Changes

### Core Data & Database
- Add `milestones` collection handling to Firestore.
- Update `Project` and `Milestone` types if needed for management.

### New Routes
- `src/routes/admin.tsx`: Main admin dashboard (protected by a simple key/password for now).
- `src/routes/admin.projects.tsx`: Interface to add, edit, and delete projects.
- `src/routes/admin.journey.tsx`: Interface to manage journey milestones.

### Components
- `AdminLayout`: Sidebar-based layout for the admin section.
- `ProjectForm`: Reusable form for creating and updating projects.
- `MilestoneForm`: Reusable form for creating and updating milestones.
- `ImageUpload`: Component to handle image URL input or Cloudinary integration.

### Integration
- Connect forms to Firestore for real-time updates.
- Ensure the main portfolio correctly reflects changes made in the admin panel.

## Technical Details

### Route Structure
- `/admin`: Login/Gate page.
- `/admin/dashboard`: Overview.
- `/admin/projects`: Project list and management.
- `/admin/journey`: Journey list and management.

### Dependencies
- `lucide-react`: Icons.
- `sonner`: Notifications.
- `firebase/firestore`: Data persistence.
- `react-hook-form` + `zod`: Form validation.
