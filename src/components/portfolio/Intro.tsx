import { motion } from 'framer-motion';

const IntroCard = ({ title, desc, icon }: { title: string, desc: string, icon: string }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="glass p-8 rounded-3xl border border-white/5 hover:border-primary/50 transition-all group"
  >
    <div className="text-4xl mb-6">{icon}</div>
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-muted-foreground leading-relaxed">{desc}</p>
  </motion.div>
);

export const Intro = () => (
  <section id="about" className="py-24">
    <div className="container mx-auto px-6">
      <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-4 text-center">WHAT I BUILD</h2>
      <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-center mb-20">From ideas to working products.</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <IntroCard title="AI & MACHINE LEARNING" desc="Building intelligent systems and prediction-driven applications." icon="🤖" />
        <IntroCard title="DATA SCIENCE" desc="Working with data to discover patterns, insights and useful decisions." icon="📊" />
        <IntroCard title="WEB DEVELOPMENT" desc="Creating modern, responsive and interactive web experiences." icon="🌐" />
        <IntroCard title="AI-POWERED PRODUCTS" desc="Combining AI with practical applications and real-world workflows." icon="🚀" />
      </div>
    </div>
  </section>
);
