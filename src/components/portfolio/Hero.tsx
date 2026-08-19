import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowDown, Mail } from 'lucide-react';
import { socialLinks, resumeUrl } from '@/data/portfolio';
import portraitAsset from '@/assets/portrait.png.asset.json';

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

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  // Parallax effects
  const portraitX = useTransform(springX, [-500, 500], [-15, 15]);
  const portraitY = useTransform(springY, [-500, 500], [-15, 15]);
  const bgX = useTransform(springX, [-500, 500], [-5, 5]);
  const bgY = useTransform(springY, [-500, 500], [-5, 5]);

  const rotateX = useTransform(springY, [-500, 500], [5, -5]);
  const rotateY = useTransform(springX, [-500, 500], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const [keywordIndex, setKeywordIndex] = useState(0);
  const keywords = ['AI', 'Data', 'Machine Learning', 'Web'];

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
      <motion.div 
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)] -z-10" 
      />
      <motion.div 
        style={{ x: bgX, y: bgY }}
        className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" 
      />
      <motion.div 
        style={{ x: bgX, y: bgY }}
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10" 
      />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative z-20"
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
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1] md:leading-[1.2]"
            >
              I build <br /> 
              <span className="text-primary italic">intelligent</span> <br />
              <span className="relative inline-block h-[1.1em] overflow-hidden align-top min-w-[200px] md:min-w-[300px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={keywords[keywordIndex]}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ 
                      duration: 0.4, 
                      ease: "easeInOut" 
                    }}
                    className="text-primary absolute left-0 top-0 whitespace-nowrap"
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
              I'm a 3rd-year B.Tech student exploring AI, Data Science and modern web development — turning ideas into real, usable products.
            </motion.p>
            
            <motion.div variants={itemVariants} transition={{ duration: 0.8 }} className="flex flex-wrap gap-6 mb-12">
              <motion.a 
                href="#projects" 
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-primary text-primary-foreground rounded-full font-bold shadow-xl shadow-primary/20 hover:shadow-[0_0_30px_rgba(var(--primary),0.4)] transition-all"
              >
                View My Work
              </motion.a>
              {resumeUrl && resumeUrl !== '#' ? (
                <motion.a 
                  href={resumeUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  whileHover={{ y: -2, scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-4 border border-white/10 rounded-full font-bold transition-all"
                >
                  Download CV
                </motion.a>
              ) : (
                <div className="px-10 py-4 border border-white/5 rounded-full font-bold text-muted-foreground/40 cursor-not-allowed">
                  CV coming soon
                </div>
              )}
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
              <motion.div 
                style={{ x: portraitX, y: portraitY }}
                className="absolute inset-0 rounded-3xl overflow-hidden glass border border-white/5 p-2"
              >
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary/10 via-secondary to-accent/10 flex items-center justify-center relative overflow-hidden group">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(var(--primary),0.2),transparent_70%)]" />
                   <img 
                    src={portraitAsset.url} 
                    alt="Hasini Addanki" 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-active:grayscale-0 transition-all duration-700 relative z-10"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-20" />
                </div>
              </motion.div>

              {/* Decorative rings */}
              <div className="absolute -inset-4 border border-white/5 rounded-[40px] animate-[spin_30s_linear_infinite]" />
              <div className="absolute -inset-10 border border-primary/5 rounded-[50px] animate-[spin_40s_linear_infinite_reverse]" />
              
              {/* Floating Technology Cards */}
              {techCards.map((card, i) => {
                // Individual card parallax intensity
                const cardX = useTransform(springX, [-500, 500], [-(20 + i * 5), 20 + i * 5]);
                const cardY = useTransform(springY, [-500, 500], [-(20 + i * 5), 20 + i * 5]);

                return (
                  <motion.div
                    key={card.name}
                    style={{ x: cardX, y: cardY }}
                    className={`absolute ${card.position} z-20`}
                  >
                    <motion.div
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
                      whileHover={{ scale: 1.1, zIndex: 30 }}
                      className="glass px-6 py-3 rounded-2xl text-sm font-bold shadow-2xl border border-primary/20 whitespace-nowrap cursor-default"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        {card.name}
                      </span>
                    </motion.div>
                  </motion.div>
                );
              })}
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
