import { motion } from 'framer-motion';
import { skills } from '@/data/portfolio';

const SkillCard = ({ skill, index }: { skill: string, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className="glass px-6 py-5 rounded-3xl border border-white/5 hover:border-primary/50 hover:bg-primary/[0.08] shadow-2xl transition-all group cursor-pointer relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-150 transition-all duration-300" />
        <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{skill}</span>
      </div>
    </motion.div>
  );
};

export const Skills = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden scroll-mt-20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">Tech Stack</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Tools I use to build.</h3>
        </div>

        {/* Background visual storytelling for Skills */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl aspect-video opacity-[0.03] pointer-events-none -z-10 mix-blend-screen">
          <img 
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200" 
            alt="Code Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.1, duration: 0.8 }}
              className="relative group/group"
            >
              {/* AI Image behind skill group */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.08 }}
                className="absolute -top-10 -left-10 w-32 h-32 pointer-events-none group-hover/group:opacity-20 transition-opacity mix-blend-screen"
              >
                <img 
                  src={[
                    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=200", // Programming
                    "https://images.unsplash.com/photo-1551288049-bbda4865cda1?auto=format&fit=crop&q=80&w=200", // AI/Data
                    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=200", // Web
                    "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=200"  // Tools
                  ][groupIndex]}
                  alt=""
                  className="w-full h-full object-contain rounded-full grayscale"
                />
              </motion.div>
              <h4 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-8 flex items-center gap-4">
                {skillGroup.category}
                <span className="h-px flex-grow bg-white/5" />
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {skillGroup.items.map((skill, index) => (
                  <SkillCard 
                    key={skill} 
                    skill={skill} 
                    index={index + (groupIndex * 5)} 
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
