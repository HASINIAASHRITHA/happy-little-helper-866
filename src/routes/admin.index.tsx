import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'sonner';

export const Route = createFileRoute('/admin/')({
  component: AdminLogin,
});

function AdminLogin() {
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple gate for request
      localStorage.setItem('admin_auth', 'true');
      window.location.href = '/admin/dashboard';
    } else {
      toast.error('Invalid password');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <form onSubmit={handleLogin} className="glass p-8 rounded-xl w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6">Admin Access</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 mb-4"
        />
        <button type="submit" className="w-full py-2 bg-primary rounded-lg font-bold">Login</button>
      </form>
    </div>
  );
}
