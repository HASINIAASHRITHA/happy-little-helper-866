import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Project } from '@/data/portfolio';
import { ExternalLink, AlertCircle } from 'lucide-react';
import { ProjectModal } from './ProjectModal';
import { useProjects } from '@/lib/projects';
import { ProjectImage } from './ProjectImage';
import { ProjectSkeleton } from './ProjectSkeleton';

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

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
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      exit={{ opacity: 0, scale: 0.9, y: 30 }}
      transition={{ duration: 0.5 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor-text="View"
      className="glass rounded-2xl p-6 group hover:border-primary transition-all duration-300 relative overflow-hidden h-full flex flex-col cursor-pointer active:scale-[0.98]"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div 
        className="mb-6 h-48 bg-secondary rounded-xl overflow-hidden relative border border-white/5"
        style={{ transform: 'translateZ(20px)' }}
      >
        <div className="absolute top-0 left-0 right-0 h-6 bg-white/10 flex items-center px-3 gap-1 z-10 border-b border-white/5">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <div className="absolute inset-0 pt-6 group-hover:scale-110 transition-transform duration-1000 ease-out">
           <ProjectImage 
            src={project.image} 
            alt={project.title} 
            fallbackText={project.category}
          />
        </div>
      </div>
      
      <div style={{ transform: 'translateZ(30px)' }} className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold group-hover:text-primary transition-colors leading-tight">{project.title}</h3>
          <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">{project.year.split(' ')[0]}</span>
        </div>
        <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
          {project.technologies?.slice(0, 3).map(tech => (
            <span 
              key={tech} 
              className="px-2 py-1 rounded bg-secondary text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 group-hover:bg-primary/10 group-hover:text-primary transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-6 relative z-10" onClick={(e) => e.stopPropagation()}>
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-bold flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <ExternalLink size={14} /> 
              <span>Live Demo</span>
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-bold flex items-center gap-1.5 hover:text-primary transition-colors"
            >
              <GithubIcon size={14} /> 
              <span>Source</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const { projects: allProjects, loading, error } = useProjects();
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const categories = ['All', '1st Year', '2nd Year', '3rd Year'];

  const filteredProjects = filter === 'All' 
    ? allProjects 
    : allProjects.filter(p => p.year === filter);

  return (
    <section id="projects" className="py-24 scroll-mt-20">
      <div className="container mx-auto px-6">
        <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4 text-center">PROJECT ARCHIVE</h2>
        <h3 className="text-4xl md:text-5xl font-bold mb-4 text-center tracking-tight">Explore everything I've built.</h3>
        <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          From my first web projects to AI-powered systems.
        </p>
        
        {/* Filter */}
        <div className="flex justify-center space-x-2 md:space-x-4 mb-16 flex-wrap gap-y-4">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-6 py-2 rounded-full transition-all duration-500 font-bold text-xs uppercase tracking-widest ${
                filter === c 
                  ? 'bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-105' 
                  : 'bg-secondary hover:bg-secondary/80 text-muted-foreground'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
              <AlertCircle size={32} />
            </div>
            <h4 className="text-xl font-bold">{error}</h4>
            <p className="text-muted-foreground max-w-md">We're having trouble connecting to the project database. Please try again later.</p>
          </div>
        ) : (
          /* Project Grid */
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            <AnimatePresence mode="popLayout" initial={false}>
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <ProjectSkeleton key={i} />
                ))
              ) : filteredProjects.length > 0 ? (
                filteredProjects
                  .sort((a, b) => ((b as any).order || 0) - ((a as any).order || 0))
                  .map((project) => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      onClick={() => setSelectedProject(project)}
                    />
                  ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full py-20 text-center"
                >
                  <p className="text-muted-foreground text-lg">No projects in this category yet.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
        
        <ProjectModal 
          project={selectedProject} 
          isOpen={!!selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      </div>
    </section>
  );
};
