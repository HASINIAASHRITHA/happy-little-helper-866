import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/data/portfolio';
import { ExternalLink, X } from 'lucide-react';
import { ProjectImage } from './ProjectImage';

const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

export const ProjectModal = ({ 
  project, 
  isOpen, 
  onClose 
}: { 
  project: Project | null; 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            layoutId={project.id}
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ type: "spring", damping: 30, stiffness: 200, mass: 1 }}
            className="w-full max-w-5xl glass rounded-[2rem] overflow-hidden relative z-10 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-secondary hover:bg-secondary/80 z-20 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="grid md:grid-cols-2">
              <div className="h-64 md:h-auto bg-secondary relative overflow-hidden min-h-[400px]">
                <ProjectImage 
                  src={project.image} 
                  alt={project.title} 
                  fallbackText={project.category}
                  width={1200}
                />
              </div>
              
              <div className="p-8 md:p-12">
                <span className="text-primary text-sm font-bold uppercase tracking-wider">{project.year}</span>
                <h2 className="text-3xl font-bold mt-2 mb-4">{project.title}</h2>
                <div className="inline-block px-3 py-1 bg-secondary rounded-full text-xs text-muted-foreground mb-6 uppercase tracking-widest">
                  {project.category}
                </div>
                
                <p className="text-muted-foreground mb-8 text-lg">
                  {project.description}
                </p>
                
                <div className="mb-8">
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-secondary rounded-lg text-sm border border-border/50">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-auto">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all active:scale-95">
                      <ExternalLink size={20} /> Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-white/10 rounded-full font-bold flex items-center gap-2 hover:bg-white/5 transition-all active:scale-95">
                      <GithubIcon size={20} /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
