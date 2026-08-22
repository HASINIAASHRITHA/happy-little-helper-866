import { createFileRoute } from '@tanstack/react-router';
import { motion, useSpring, useScroll } from 'framer-motion';
import { useEffect } from 'react';
import { CustomCursor } from '@/components/portfolio/CustomCursor';
import { Navbar } from '@/components/portfolio/Navbar';
import { Hero } from '@/components/portfolio/Hero';
import { Intro } from '@/components/portfolio/Intro';
import { Stats } from '@/components/portfolio/Stats';
import { About } from '@/components/portfolio/About';
import { Skills } from '@/components/portfolio/Skills';
import { Journey } from '@/components/portfolio/Journey';
import { FeaturedProjects } from '@/components/portfolio/FeaturedProjects';
import { Projects } from '@/components/portfolio/Projects';
import { CurrentlyBuilding } from '@/components/portfolio/CurrentlyBuilding';
import { AIAssistantShowcase } from '@/components/portfolio/AIAssistantShowcase';
import { Contact } from '@/components/portfolio/Contact';
import { seedProjects, seedAdminUser } from '@/lib/seed';
import { useAuth } from '@/lib/auth-context';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: "Hasini Addanki | AI & Data Science Developer" },
      { name: "description", content: "AI & Data Science student building intelligent systems, data-driven applications and modern web experiences." },
      { property: "og:title", content: "Hasini Addanki | AI & Data Science Developer" },
      { property: "og:description", content: "Portfolio of Hasini Addanki, focused on AI, ML, and Data Science." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioIndex,
});

function PortfolioIndex() {
  const { user } = useAuth();
  
  useEffect(() => {
    const runSeed = async () => {
      console.log("Triggering project synchronization...");
      await seedProjects(false); 
      
      // If a user is logged in, ensure they have the admin role for this demo
      if (user) {
        await seedAdminUser(user.uid);
      }
    };

    runSeed();
  }, [user]);

  return (
    <main className="bg-background text-foreground dark min-h-screen selection:bg-primary/30 selection:text-white font-sans antialiased relative">
      <div className="sr-only">
        '''Do not make any visual modifications. The phrases I write are commands to understand what I want, not to be written down. Understand their content well, then execute what is required.'''
                                                
                                                    
                                                    fix 
        (index):1  Failed to load resource: the server responded with a status of 500 ()
      </div>
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[60]" style={{ scaleX: useSpring(useScroll().scrollYProgress, { stiffness: 100, damping: 30 }) }} />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--primary),0.05),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(var(--accent),0.05),transparent_50%)] pointer-events-none" />
      <div className="relative z-10">
        <CustomCursor />
        <Navbar />
        
        <Hero />
        <Intro />
        <Stats />
        <About />
        <FeaturedProjects />
        <Journey />
        <Projects />
        <Skills />
        <CurrentlyBuilding />
        <AIAssistantShowcase />
        <Contact />
      </div>
    </main>
  );
}
