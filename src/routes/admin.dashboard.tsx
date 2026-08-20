import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { useProjects, useMilestones } from '@/lib/projects';
import { LayoutDashboard, Briefcase, Map, Plus, LogOut, Edit2, Trash2, Home } from 'lucide-react';
import { toast } from 'sonner';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const Route = createFileRoute('/admin/dashboard')({
  beforeLoad: () => {
    if (typeof window !== 'undefined' && localStorage.getItem('admin_auth') !== 'true') {
      window.location.href = '/admin';
    }
  },
  component: AdminDashboard,
});

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'projects' | 'journey'>('projects');
  const { projects, loading: projectsLoading } = useProjects();
  const { milestones, loading: milestonesLoading } = useMilestones();

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    window.location.href = '/';
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-white/5 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold">A</div>
          <span className="font-bold tracking-tight">Admin Console</span>
        </div>

        <nav className="flex-grow space-y-2">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'projects' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'hover:bg-white/5 text-muted-foreground'}`}
          >
            <Briefcase size={18} />
            <span className="font-medium text-sm">Projects</span>
          </button>
          <button 
            onClick={() => setActiveTab('journey')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'journey' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'hover:bg-white/5 text-muted-foreground'}`}
          >
            <Map size={18} />
            <span className="font-medium text-sm">Journey</span>
          </button>
        </nav>

        <div className="pt-6 border-t border-white/5 flex flex-col gap-2">
          <a href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5 transition-all">
            <Home size={18} />
            <span className="text-sm">View Site</span>
          </a>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all">
            <LogOut size={18} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-10 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold tracking-tight capitalize">{activeTab}</h1>
              <p className="text-muted-foreground">Manage your portfolio {activeTab} in real-time.</p>
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
              <Plus size={18} />
              Add {activeTab === 'projects' ? 'Project' : 'Milestone'}
            </button>
          </header>

          {activeTab === 'projects' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(p => (
                <div key={p.id} className="glass p-6 rounded-2xl border border-white/5 group relative overflow-hidden">
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 glass rounded-lg hover:text-primary transition-colors"><Edit2 size={14} /></button>
                    <button className="p-2 glass rounded-lg hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                  </div>
                  <div className="h-32 bg-secondary rounded-xl mb-4 overflow-hidden">
                    {p.image ? <img src={p.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No image</div>}
                  </div>
                  <h3 className="font-bold mb-1">{p.title}</h3>
                  <div className="text-[10px] font-bold text-primary/60 uppercase tracking-widest mb-3">{p.year}</div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{p.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {milestones.map(m => (
                <div key={m.id} className="glass p-6 rounded-2xl border border-white/5 flex justify-between items-center group">
                  <div>
                    <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{m.year}</div>
                    <h3 className="text-xl font-bold">{m.title}</h3>
                    <p className="text-sm text-muted-foreground max-w-2xl">{m.description}</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-3 glass rounded-xl hover:text-primary transition-colors"><Edit2 size={16} /></button>
                    <button className="p-3 glass rounded-xl hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
