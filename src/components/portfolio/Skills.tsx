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
      className="glass px-6 py-4 rounded-2xl border border-white/5 hover:border-primary/50 hover:bg-primary/[0.05] shadow-2xl transition-all group cursor-pointer relative overflow-hidden"
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
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4">Tech Stack</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight">Expertise & Tools</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.1, duration: 0.8 }}
            >
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
