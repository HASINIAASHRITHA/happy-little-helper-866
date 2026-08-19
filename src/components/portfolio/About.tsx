import { motion } from 'framer-motion';
import { useProjects } from '@/lib/projects';

export const About = () => {
  const { projects } = useProjects();
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 50, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1"
            >
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm font-bold text-primary uppercase tracking-[0.4em] mb-8"
              >
                Personal Essence
              </motion.h2>
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-bold tracking-tighter mb-10 leading-[1.1]"
              >
                Bridging Human Intuition with <span className="text-primary italic">Artificial Intelligence.</span>
              </motion.h3>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  My journey in technology has been a continuous evolution. I started with the foundational building blocks of the web and have grown into developing complex, AI-driven applications that solve real-world problems.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Currently, I'm focused on the intersection of <span className="text-foreground font-medium">Data Science and Software Engineering</span>, creating tools that don't just present information but actively assist in decision-making through intelligence.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  I've taken on leadership roles as a <span className="text-foreground font-medium">Team Leader</span>, guiding projects with a vision for efficiency and collaboration. As an active member of the <span className="text-foreground font-medium">SmartCity Lab</span>, I specialized in IoT systems—exploring sensor integrations, understanding their electrical connections, and developing logic for how they interact to solve urban challenges.
                </motion.p>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-12 flex flex-wrap gap-6"
              >
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-foreground">3+</span>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Years of Growth</span>
                </div>
                <div className="w-px h-12 bg-border hidden sm:block" />
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-foreground">{projects.length || 0}+</span>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Projects Built</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 w-full"
            >
              <div className="glass rounded-3xl p-8 md:p-10 border border-white/5 relative overflow-hidden group">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                    x: [0, 20, 0],
                    y: [0, -20, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                  className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -z-10 group-hover:bg-primary/20 transition-colors" 
                />
                
                <h4 className="text-xl font-bold mb-8 flex items-center gap-3">
                  <span className="w-8 h-px bg-primary" />
                  Development Philosophy
                </h4>
                
                <ul className="space-y-6">
                  {[
                    { title: "User-Centric Design", desc: "Building interfaces that are as intuitive as they are powerful." },
                    { title: "Data-Driven Logic", desc: "Using statistical insights to drive application behavior." },
                    { title: "Scalable Architecture", desc: "Writing clean, maintainable code for long-term growth." }
                  ].map((item, i) => (
                    <motion.li 
                      key={item.title}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + (i * 0.1) }}
                      className="flex gap-4"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0" />
                      <div>
                        <h5 className="font-bold text-foreground mb-1">{item.title}</h5>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
