import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AdminErrorBoundary } from '@/components/admin/AdminErrorBoundary';
import { AuthProvider } from '@/lib/auth-context';

export const Route = createFileRoute('/admin')({
  component: () => (
    <div className="min-h-screen bg-background">
      <AuthProvider>
        <AdminErrorBoundary>
          <Outlet />
        </AdminErrorBoundary>
      </AuthProvider>
    </div>
  ),
});
