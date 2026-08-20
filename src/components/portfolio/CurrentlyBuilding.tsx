import { motion } from 'framer-motion';

export const CurrentlyBuilding = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Currently learning & building</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4"
            >
              CURRENTLY BUILDING
            </motion.h2>
            
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-8"
            >
              The journey doesn't stop here.
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed"
            >
              I'm continuing to explore AI, Machine Learning, Data Science and modern software development while building new projects.
            </motion.p>

            <div className="flex flex-wrap gap-4">
              {['AI', 'Machine Learning', 'Data', 'Intelligent Systems'].map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="px-6 py-3 glass rounded-2xl text-sm font-bold border border-white/5"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 w-full max-w-md relative group"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-colors duration-700" />
            <div className="relative glass rounded-[2.5rem] border border-white/10 overflow-hidden aspect-square flex items-center justify-center p-8 group-hover:border-primary/30 transition-colors">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600" 
                alt="Cybersecurity and Code"
                className="w-full h-full object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Status</div>
                <div className="text-sm font-medium">Researching Advanced Neural Architectures</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
