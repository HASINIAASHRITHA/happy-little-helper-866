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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

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
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="glass rounded-2xl p-6 group hover:border-primary transition-all duration-300 relative overflow-hidden h-full flex flex-col cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div 
        className="mb-4 h-48 bg-secondary rounded-lg overflow-hidden relative"
        style={{ transform: 'translateZ(20px)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
          <span className="font-bold text-muted-foreground/30 text-2xl">{project.title.substring(0, 2)}</span>
        </div>
      </div>
      <div style={{ transform: 'translateZ(30px)' }} className="flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6 mt-auto">
          {project.technologies.slice(0, 3).map(tech => (
            <span key={tech} className="px-2 py-1 rounded bg-secondary text-xs group-hover:bg-primary/10 transition-colors">{tech}</span>
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
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center uppercase tracking-widest">Archive</h2>
        
        {/* Filter */}
        <div className="flex justify-center space-x-2 md:space-x-4 mb-12 flex-wrap gap-y-4">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                filter === c ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105' : 'bg-secondary hover:bg-secondary/80 text-muted-foreground'
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
