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
    <section id="work" className="py-20 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="container mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">SELECTED WORK</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Things I've built.</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of projects from my journey across web development, AI and data.
          </p>
        </div>
        
        <div className="space-y-48">
          {loading ? (
             Array.from({ length: 4 }).map((_, i) => (
              <FeaturedProjectSkeleton key={i} index={i} />
             ))
          ) : featured.length > 0 ? (
            [...featured]
              .sort((a, b) => {
                const yearOrder = { '3rd Year': 3, '2nd Year': 2, '1st Year': 1 };
                const yearA = yearOrder[a.year as keyof typeof yearOrder] || 0;
                const yearB = yearOrder[b.year as keyof typeof yearOrder] || 0;
                if (yearB !== yearA) return yearB - yearA;
                return ((b as any).order || 0) - ((a as any).order || 0);
              })
              .map((project, index) => (
                <FeaturedProjectItem 
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                />
              ))
          ) : (
            <div className="text-center py-20 text-muted-foreground italic">
              No featured projects found.
            </div>
          )}
        </div>
        
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
      className="group relative"
      data-cursor-text="View"
    >
      <div className={`grid lg:grid-cols-12 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
        <motion.div 
          style={{ 
            y: useTransform(scrollYProgress, [0, 1], [100, -100]),
            rotate: useTransform(scrollYProgress, [0, 1], [2, -2])
          }}
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
              <div className="absolute inset-0 pt-8 flex items-center justify-center bg-white/5 group-hover:scale-110 transition-transform duration-1000 group-hover:shadow-[0_0_50px_rgba(var(--primary),0.3)]">
                <ProjectImage 
                  src={project.image} 
                  alt={project.title} 
                  fallbackText={project.category}
                  isSpecialAI={project.id === 'ai-assistant'}
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
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full border border-primary/20">
                {project.year} · {project.category.split(' ')[0]}
              </span>
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
              className="text-xl text-muted-foreground mb-8 leading-relaxed"
            >
              {project.description}
            </motion.p>
            
            {project.longDescription && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-10 p-6 glass border border-primary/10 rounded-2xl bg-primary/5 italic text-sm text-muted-foreground/80 relative"
              >
                <div className="absolute top-0 left-6 -translate-y-1/2 px-3 py-0.5 bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-primary/20">
                  Project Insight
                </div>
                {project.longDescription}
              </motion.div>
            )}
            
            <div className="flex flex-wrap gap-2 mb-12">
              {project.technologies?.map(tech => (
                <span key={tech} className="px-3 py-1 bg-white/5 text-[10px] text-muted-foreground/80 rounded-lg border border-white/5 group-hover:border-primary/20 transition-colors uppercase tracking-wider font-bold">
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex flex-wrap items-center gap-6" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={onClick}
                className="text-foreground font-bold flex items-center gap-2 group/link relative py-3 text-lg"
              >
                <span className="relative z-10 px-5 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-xl transition-all duration-300 border border-primary/30 shadow-[0_0_20px_rgba(var(--primary),0.1)]">
                  View Details
                </span>
                <ExternalLink size={20} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform text-primary" />
              </button>
              
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary font-bold flex items-center gap-2 group/link relative py-3 text-lg transition-all duration-300"
                >
                  <span className="relative z-10 px-5 py-2 glass rounded-xl border border-white/5 hover:border-primary/30 transition-all">Live Demo</span>
                </a>
              )}

              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-all duration-300 p-3 glass rounded-xl border border-white/5 hover:border-primary/30"
                  aria-label="View Source on GitHub"
                >
                  <GithubIcon size={24} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
