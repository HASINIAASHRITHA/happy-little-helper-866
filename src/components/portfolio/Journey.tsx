import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

const milestones = [
  {
    year: '01 — FIRST YEAR',
    title: 'Learning the Web',
    skills: ['HTML', 'CSS', 'JavaScript'],
    description: 'Focus on fundamentals and early project foundations.',
  },
  {
    year: '02 — SECOND YEAR',
    title: 'Building Bigger Experiences',
    skills: ['React', 'Interactive Apps', 'Authentication'],
    description: 'Progressing into advanced interactive applications and modern UI.',
  },
  {
    year: '03 — THIRD YEAR',
    title: 'AI, IoT & Leadership',
    skills: ['AI', 'IoT (SmartCity Lab)', 'Team Leadership'],
    description: 'Leading technical teams and specializing in AI-driven IoT systems and smart manufacturing assistants.',
    active: true,
  },
];

export const Journey = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="journey" className="py-24 relative overflow-hidden bg-background/50 scroll-mt-20" ref={containerRef}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4"
          >
            MY JOURNEY
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Three years. A lot of building.
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            What started with simple websites gradually evolved into interactive applications and AI-powered systems.
          </motion.p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-border -translate-x-1/2 opacity-20" />
          
          {/* Animated Progress Line */}
          <motion.div 
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-primary -translate-x-1/2 origin-top z-10"
            style={{ scaleY }}
          />

          <div className="space-y-24 md:space-y-32">
            {milestones.map((m, index) => {
              return (
                <MilestoneItem 
                  key={m.year} 
                  milestone={m} 
                  index={index} 
                  total={milestones.length}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

const MilestoneItem = ({ milestone, index, total }: { milestone: any, index: number, total: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1.02, 1.02, 0.95]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className={`flex flex-col md:flex-row items-center gap-12 md:gap-0 ${
        index % 2 === 1 ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Content Side */}
      <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
        <div className={`group relative glass p-8 md:p-10 rounded-[2rem] transition-all duration-500 border border-white/5 ${milestone.active ? 'bg-primary/[0.03] border-primary/30 shadow-[0_0_30px_rgba(var(--primary),0.05)]' : 'hover:border-white/20'}`}>
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <span className="text-6xl font-bold">{index + 1}</span>
          </div>
          
          <div className={`text-primary font-bold text-xs mb-3 tracking-widest ${index % 2 === 0 ? 'md:justify-end' : ''} flex items-center gap-2 uppercase`}>
            {index % 2 === 1 && <span className="w-4 h-px bg-primary/30" />}
            {milestone.year}
            {index % 2 === 0 && <span className="w-4 h-px bg-primary/30 md:hidden lg:block" />}
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors">{milestone.title}</h3>
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">{milestone.description}</p>
          
          <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}>
            {milestone.skills.map((s: string) => (
              <span key={s} className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium border border-white/5 backdrop-blur-sm group-hover:border-primary/20 transition-colors">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Middle Point */}
      <div className="relative flex items-center justify-center z-20 md:w-32">
         <motion.div 
           className={`w-4 h-4 rounded-full shadow-2xl ${milestone.active ? 'bg-primary ring-4 ring-primary/20' : 'bg-border ring-4 ring-background'}`} 
         />
         {milestone.active && (
           <div className="absolute w-12 h-12 rounded-full border border-primary/30 animate-ping opacity-20" />
         )}
      </div>
      
      {/* Empty Side for alignment */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
};
