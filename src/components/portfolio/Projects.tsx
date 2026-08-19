import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { projects, Project } from '@/data/portfolio';
import { ExternalLink } from 'lucide-react';
import { ProjectModal } from './ProjectModal';

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      layoutId={project.id}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor-text="View"
      className="glass rounded-2xl p-6 group hover:border-primary transition-all duration-300 relative overflow-hidden h-full flex flex-col cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div 
        className="mb-4 h-48 bg-secondary rounded-lg overflow-hidden relative border border-white/5"
        style={{ transform: 'translateZ(20px)' }}
      >
        <div className="absolute top-0 left-0 right-0 h-6 bg-white/10 flex items-center px-3 gap-1 z-10">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <div className="absolute inset-0 pt-6 flex items-center justify-center bg-white/5 group-hover:scale-105 transition-transform duration-700">
           {project.image ? (
             <img 
               src={project.image} 
               alt={project.title}
               className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
               onError={(e) => {
                 (e.target as HTMLImageElement).style.display = 'none';
                 (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
               }}
             />
           ) : null}
           <div className={`${project.image ? 'hidden' : ''} w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex flex-col p-4 space-y-2 opacity-60`}>
             <div className="h-4 w-2/3 bg-white/10 rounded" />
             <div className="grid grid-cols-3 gap-2">
               <div className="h-20 bg-white/5 rounded" />
               <div className="h-20 bg-white/5 rounded" />
               <div className="h-20 bg-white/5 rounded" />
             </div>
             <div className="h-4 w-full bg-white/5 rounded" />
           </div>
           {!project.image && (
             <div className="absolute inset-0 flex items-center justify-center">
               <span className="font-bold text-white/20 text-xs tracking-widest uppercase">Dashboard Preview</span>
             </div>
           )}
        </div>
      </div>
      <div style={{ transform: 'translateZ(30px)' }} className="flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {project.technologies.slice(0, 3).map(tech => (
            <motion.span 
              key={tech} 
              initial={{ opacity: 0.8 }}
              whileHover={{ y: -2, opacity: 1 }}
              className="px-2 py-1 rounded bg-secondary text-xs group-hover:bg-primary/10 transition-colors"
            >
              {tech}
            </motion.span>
          ))}
        </div>
        <div className="flex space-x-4 relative z-10" onClick={(e) => e.stopPropagation()}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-sm flex items-center gap-1 hover:text-primary transition-colors"><ExternalLink size={16} /> Demo</a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-sm flex items-center gap-1 hover:text-primary transition-colors"><GithubIcon size={16} /> Code</a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const categories = ['All', '1st Year', '2nd Year', '3rd Year'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.year === filter);

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4 text-center">Archive</h2>
        <h3 className="text-4xl md:text-5xl font-bold mb-16 text-center tracking-tight">Development Journey</h3>
        
        {/* Filter */}
        <div className="flex justify-center space-x-2 md:space-x-4 mb-12 flex-wrap gap-y-4">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-6 py-2 rounded-full transition-all duration-500 font-medium ${
                filter === c ? 'bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-105' : 'bg-secondary hover:bg-secondary/80 text-muted-foreground'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
        
        <ProjectModal 
          project={selectedProject} 
          isOpen={!!selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      </div>
    </section>
  );
};
