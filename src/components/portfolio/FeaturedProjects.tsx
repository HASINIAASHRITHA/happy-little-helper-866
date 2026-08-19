import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Project } from '@/data/portfolio';
import { ExternalLink, AlertCircle } from 'lucide-react';
import { ProjectModal } from './ProjectModal';
import { useProjects } from '@/lib/projects';
import { ProjectImage } from './ProjectImage';
import { FeaturedProjectSkeleton } from './ProjectSkeleton';

const GithubIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

export const FeaturedProjects = () => {
  const { projects: allProjects, loading, error } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const featured = allProjects.filter(p => p.featured);

  return (
    <section className="py-20 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">Featured Work</h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Main Highlights</h3>
          </div>
          <div className="h-px flex-grow bg-border mx-8 hidden lg:block mb-4 opacity-30" />
        </div>
        
        {error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
             <AlertCircle className="text-red-500" size={48} />
             <h4 className="text-xl font-bold">Featured content unavailable</h4>
          </div>
        ) : (
          <div className="space-y-48">
            {loading ? (
               Array.from({ length: 2 }).map((_, i) => (
                <FeaturedProjectSkeleton key={i} index={i} />
               ))
            ) : featured.length > 0 ? (
              featured.map((project, index) => (
                <FeaturedProjectItem 
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              ))
            ) : null}
          </div>
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

const FeaturedProjectItem = ({ project, index, onClick }: { project: Project, index: number, onClick: () => void }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="group relative cursor-pointer"
      onClick={onClick}
      data-cursor-text="View"
    >
      <div className={`grid lg:grid-cols-12 gap-12 items-center ${index % 2 === 1 ? 'lg:direction-rtl' : ''}`}>
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
          className={`lg:col-span-7 relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}
        >
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden glass border border-white/5 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-1000 ease-out">
              <div className="absolute top-0 left-0 right-0 h-8 bg-white/10 flex items-center px-4 gap-2 z-10 border-b border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                <div className="ml-4 h-4 w-32 bg-white/5 rounded-full" />
              </div>
              <div className="absolute inset-0 pt-8 flex items-center justify-center bg-white/5 group-hover:scale-105 transition-transform duration-1000">
                <ProjectImage 
                  src={project.image} 
                  alt={project.title} 
                  fallbackText={project.category}
                  width={1200}
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700" />
          </div>
          
          <div className={`absolute -bottom-4 ${index % 2 === 1 ? '-left-4' : '-right-4'} hidden md:flex flex-wrap gap-2 max-w-[300px]`}>
            {project.technologies?.slice(0, 2).map((tech, i) => (
              <motion.span 
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="px-4 py-2 glass rounded-xl text-xs font-bold uppercase tracking-wider border border-primary/20 shadow-2xl"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <div className={`lg:col-span-5 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
          <div className={`flex flex-col ${index % 2 === 1 ? 'lg:items-start' : 'lg:items-start'}`}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-4"
            >
              <span className="h-px w-8 bg-primary/50" />
              <span className="text-primary text-sm font-bold uppercase tracking-[0.2em]">{project.year}</span>
            </motion.div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight group-hover:text-glow transition-all"
            >
              {project.title}
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground mb-10 leading-relaxed"
            >
              {project.description}
            </motion.p>
            
            <div className="flex flex-wrap gap-3 mb-12">
              {project.technologies?.map(tech => (
                <span key={tech} className="text-sm text-muted-foreground/80 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex items-center gap-8" onClick={(e) => e.stopPropagation()}>
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-foreground font-bold flex items-center gap-2 group/link relative py-3 text-lg"
                >
                  <span className="relative z-10">Launch Project</span>
                  <ExternalLink size={20} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  <motion.div className="absolute bottom-0 left-0 h-px bg-primary w-0 group-hover/link:w-full transition-all duration-300" />
                </a>
              )}
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-foreground transition-colors p-2"
                >
                  <GithubIcon size={28} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
