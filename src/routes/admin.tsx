import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AdminErrorBoundary } from '@/components/admin/AdminErrorBoundary';

export const Route = createFileRoute('/admin')({
  component: () => (
    <div className="min-h-screen bg-background">
      <AdminErrorBoundary>
        <Outlet />
      </AdminErrorBoundary>
    </div>
  ),
});
