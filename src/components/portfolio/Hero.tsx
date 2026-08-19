import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowDown, Mail } from 'lucide-react';
import { socialLinks } from '@/data/portfolio';

const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const techCards = [
  { name: 'Python', position: 'top-10 -right-4', delay: 0 },
  { name: 'Machine Learning', position: 'bottom-20 -left-10', delay: 0.5 },
  { name: 'Data Science', position: 'top-1/2 -right-16', delay: 1 },
  { name: 'SQL', position: '-bottom-4 right-1/4', delay: 1.5 },
];

export const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(springY, [-300, 300], [10, -10]);
  const rotateY = useTransform(springX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const [keywordIndex, setKeywordIndex] = useState(0);
  const keywords = ['AI', 'Data Science', 'Machine Learning', 'Web Development', 'Creative Technology'];

  useEffect(() => {
    const timer = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % keywords.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
    },
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)] -z-10" />
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span 
              variants={itemVariants}
              transition={{ duration: 0.8 }}
              className="text-primary font-bold tracking-[0.3em] text-xs block mb-6 uppercase"
            >
              AI & DATA SCIENCE DEVELOPER
            </motion.span>
            
            <motion.h1 
              variants={itemVariants}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[0.9]"
            >
              Building <br /> 
              <span className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={keywords[keywordIndex]}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-primary"
                  >
                    {keywords[keywordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
              <br />
              digital experiences.
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              transition={{ duration: 0.8 }}
              className="text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed"
            >
              AI & Data Science student building intelligent systems, data-driven applications and modern web experiences.
            </motion.p>
            
            <motion.div variants={itemVariants} transition={{ duration: 0.8 }} className="flex flex-wrap gap-6 mb-12">
              <a 
                href="#projects" 
                className="px-10 py-4 bg-primary text-primary-foreground rounded-full font-bold hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all active:scale-95"
              >
                View My Work
              </a>
              <button className="px-10 py-4 border border-white/10 rounded-full font-bold hover:bg-white/5 transition-all active:scale-95">
                Download CV
              </button>
            </motion.div>

            <motion.div variants={itemVariants} transition={{ duration: 0.8 }} className="flex items-center gap-8">
              <a href={socialLinks.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"><GithubIcon size={28} /></a>
              <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"><LinkedinIcon size={28} /></a>
              <a href={socialLinks.email} className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"><Mail size={28} /></a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="relative hidden lg:block"
            style={{ rotateX, rotateY, perspective: 1000 }}
          >
            <div className="relative w-[500px] h-[500px] mx-auto">
              {/* Profile Image Placeholder Area */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden glass border border-white/5 p-2">
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary/10 via-secondary to-accent/10 flex items-center justify-center relative overflow-hidden">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary),0.2),transparent_70%)]" />
                   <div className="w-48 h-48 rounded-full bg-white/5 blur-3xl animate-pulse" />
                   <div className="z-10 text-center">
                      <div className="w-32 h-32 rounded-full border-4 border-primary/20 mx-auto mb-4 flex items-center justify-center">
                        <span className="text-4xl font-black opacity-10">IMAGE</span>
                      </div>
                      <p className="text-xs font-bold uppercase tracking-widest opacity-20">Hasini Addanki</p>
                   </div>
                </div>
              </div>

              {/* Decorative rings */}
              <div className="absolute -inset-4 border border-white/5 rounded-[40px] animate-[spin_30s_linear_infinite]" />
              <div className="absolute -inset-10 border border-primary/5 rounded-[50px] animate-[spin_40s_linear_infinite_reverse]" />
              
              {/* Floating Technology Cards */}
              {techCards.map((card, i) => (
                <motion.div
                  key={card.name}
                  animate={{ 
                    y: [0, -15, 0],
                    x: [0, i % 2 === 0 ? 10 : -10, 0]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 5 + i, 
                    ease: "easeInOut",
                    delay: card.delay 
                  }}
                  className={`absolute ${card.position} glass px-6 py-3 rounded-2xl text-sm font-bold shadow-2xl border border-primary/20 z-20 whitespace-nowrap`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    {card.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="text-muted-foreground/30" />
        </motion.div>
      </motion.div>
    </section>
  );
};
