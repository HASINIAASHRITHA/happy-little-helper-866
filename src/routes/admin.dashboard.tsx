import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { useProjects, useMilestones } from '@/lib/projects';
import { Briefcase, Map, Plus, LogOut, Edit2, Trash2, Home, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db, getFirebaseAuth } from '@/lib/firebase';
import { Project, Milestone } from '@/data/portfolio';
import { useAuth } from '@/lib/auth-context';
import { signOut } from 'firebase/auth';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute('/admin/dashboard')({
  head: () => ({ meta: [
    { title: 'Portfolio dashboard | Hasini Addanki' },
    { name: 'description', content: 'Private dashboard for managing Hasini Addanki’s projects and journey.' },
    { property: 'og:title', content: 'Portfolio dashboard | Hasini Addanki' },
    { property: 'og:description', content: 'Private dashboard for managing Hasini Addanki’s projects and journey.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'projects' | 'journey'>('projects');
  const { projects, loading: projectsLoading } = useProjects();
  const { milestones, loading: milestonesLoading } = useMilestones();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate({ to: '/admin' });
    }
  }, [user, isAdmin, authLoading, navigate]);

  const handleLogout = async () => {
    try {
      const auth = getFirebaseAuth();
      if (!auth) {
        navigate({ to: '/admin' });
        return;
      }
      await signOut(auth);
      navigate({ to: '/admin' });
    } catch (err) {
      toast.error('Failed to logout');
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  const handleOpenAdd = () => {
    setEditingItem(activeTab === 'projects' 
      ? { title: '', year: '3rd Year', category: 'AI & Real-World Systems', description: '', technologies: [], image: '', liveUrl: '', githubUrl: '', featured: false } 
      : { year: '', title: '', skills: [], description: '', active: false, order: milestones.length + 1 }
    );
    setIsDialogOpen(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem({ ...item });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      const collectionName = activeTab === 'projects' ? 'projects' : 'milestones';
      await deleteDoc(doc(db, collectionName, id));
      toast.success('Deleted successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const collectionName = activeTab === 'projects' ? 'projects' : 'milestones';
      const data = { ...editingItem, updatedAt: serverTimestamp() };
      
      // Handle array conversions for text inputs
      if (activeTab === 'projects' && typeof data.technologies === 'string') {
        data.technologies = data.technologies.split(',').map((s: string) => s.trim());
      }
      if (activeTab === 'journey' && typeof data.skills === 'string') {
        data.skills = data.skills.split(',').map((s: string) => s.trim());
      }

      if (editingItem.id) {
        const { id, ...updateData } = data;
        await updateDoc(doc(db, collectionName, id), updateData);
        toast.success('Updated successfully');
      } else {
        await addDoc(collection(db, collectionName), data);
        toast.success('Added successfully');
      }
      setIsDialogOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Failed to save');
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans">
      <aside className="w-64 glass border-r border-white/5 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold">A</div>
          <span className="font-bold tracking-tight">Admin Console</span>
        </div>
        <nav className="flex-grow space-y-2">
          <button onClick={() => setActiveTab('projects')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'projects' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'hover:bg-white/5 text-muted-foreground'}`}>
            <Briefcase size={18} /><span className="font-medium text-sm">Projects</span>
          </button>
          <button onClick={() => setActiveTab('journey')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'journey' ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' : 'hover:bg-white/5 text-muted-foreground'}`}>
            <Map size={18} /><span className="font-medium text-sm">Journey</span>
          </button>
        </nav>
        <div className="pt-6 border-t border-white/5 flex flex-col gap-2">
          <a href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5 transition-all">
            <Home size={18} /><span className="text-sm">View Site</span>
          </a>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all">
            <LogOut size={18} /><span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-grow p-10 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold tracking-tight capitalize">{activeTab}</h1>
              <p className="text-muted-foreground">Manage your portfolio {activeTab} in real-time.</p>
            </div>
            <button onClick={handleOpenAdd} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
              <Plus size={18} />Add {activeTab === 'projects' ? 'Project' : 'Milestone'}
            </button>
          </header>

          {activeTab === 'projects' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(p => (
                <div key={p.id} className="glass p-6 rounded-2xl border border-white/5 group relative overflow-hidden">
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button onClick={() => handleEdit(p)} className="p-2 glass rounded-lg hover:text-primary transition-colors cursor-pointer"><Edit2 size={14} /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 glass rounded-lg hover:text-red-400 transition-colors cursor-pointer"><Trash2 size={14} /></button>
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
                    <button onClick={() => handleEdit(m)} className="p-3 glass rounded-xl hover:text-primary transition-colors cursor-pointer"><Edit2 size={16} /></button>
                    <button onClick={() => handleDelete(m.id)} className="p-3 glass rounded-xl hover:text-red-400 transition-colors cursor-pointer"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] glass border-white/10 text-foreground max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{editingItem?.id ? 'Edit' : 'Add'} {activeTab === 'projects' ? 'Project' : 'Milestone'}</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <form onSubmit={handleSave} className="space-y-4 py-4">
              {activeTab === 'projects' ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Title</label>
                      <Input value={editingItem.title} onChange={e => setEditingItem({...editingItem, title: e.target.value})} className="bg-white/5 border-white/10" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Year</label>
                      <select value={editingItem.year} onChange={e => setEditingItem({...editingItem, year: e.target.value})} className="w-full flex h-9 rounded-md border border-input bg-white/5 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year">3rd Year</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</label>
                    <select value={editingItem.category} onChange={e => setEditingItem({...editingItem, category: e.target.value})} className="w-full flex h-9 rounded-md border border-input bg-white/5 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                      <option value="Web Foundations">Web Foundations</option>
                      <option value="Advanced Projects">Advanced Projects</option>
                      <option value="AI & Real-World Systems">AI & Real-World Systems</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                    <Textarea value={editingItem.description} onChange={e => setEditingItem({...editingItem, description: e.target.value})} className="bg-white/5 border-white/10" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Technologies (comma separated)</label>
                    <Input value={Array.isArray(editingItem.technologies) ? editingItem.technologies.join(', ') : editingItem.technologies} onChange={e => setEditingItem({...editingItem, technologies: e.target.value})} className="bg-white/5 border-white/10" placeholder="React, Firebase, Tailwind" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Image URL</label>
                    <Input value={editingItem.image || ''} onChange={e => setEditingItem({...editingItem, image: e.target.value})} className="bg-white/5 border-white/10" placeholder="https://..." />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Live URL</label>
                      <Input value={editingItem.liveUrl || ''} onChange={e => setEditingItem({...editingItem, liveUrl: e.target.value})} className="bg-white/5 border-white/10" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">GitHub URL</label>
                      <Input value={editingItem.githubUrl || ''} onChange={e => setEditingItem({...editingItem, githubUrl: e.target.value})} className="bg-white/5 border-white/10" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Display Year</label>
                      <Input value={editingItem.year} onChange={e => setEditingItem({...editingItem, year: e.target.value})} className="bg-white/5 border-white/10" placeholder="03 — THIRD YEAR" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Order (number)</label>
                      <Input type="number" value={editingItem.order} onChange={e => setEditingItem({...editingItem, order: parseInt(e.target.value)})} className="bg-white/5 border-white/10" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Title</label>
                    <Input value={editingItem.title} onChange={e => setEditingItem({...editingItem, title: e.target.value})} className="bg-white/5 border-white/10" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                    <Textarea value={editingItem.description} onChange={e => setEditingItem({...editingItem, description: e.target.value})} className="bg-white/5 border-white/10" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Skills (comma separated)</label>
                    <Input value={Array.isArray(editingItem.skills) ? editingItem.skills.join(', ') : editingItem.skills} onChange={e => setEditingItem({...editingItem, skills: e.target.value})} className="bg-white/5 border-white/10" placeholder="Python, ML, IoT" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="active" checked={editingItem.active} onChange={e => setEditingItem({...editingItem, active: e.target.checked})} className="w-4 h-4 rounded border-white/10 bg-white/5" />
                    <label htmlFor="active" className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Active Milestone</label>
                  </div>
                </>
              )}
              <DialogFooter className="pt-4">
                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)} className="cursor-pointer">Cancel</Button>
                <Button type="submit" className="bg-primary text-primary-foreground shadow-lg shadow-primary/20 cursor-pointer">Save Changes</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

