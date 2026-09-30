import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import portrait from '@/assets/hasini-portrait-enhanced.png';
import { socialLinks } from '@/data/portfolio';
import { Button } from '@/components/ui/button';

export const Hero = () => (
  <section id="home" className="relative isolate flex min-h-[720px] h-[min(900px,94svh)] max-h-[900px] items-end overflow-hidden border-b border-border bg-background pt-24 max-md:min-h-[740px] max-md:h-[92svh]">
    <img
      src={portrait}
      alt="Portrait of Hasini Addanki"
      fetchPriority="high"
      className="hero-portrait absolute inset-y-0 right-0 h-full w-[68%] object-cover object-[center_22%] max-md:inset-x-0 max-md:top-0 max-md:h-[69%] max-md:w-full max-md:object-[center_18%]"
    />
    <div className="hero-image-shade absolute inset-0 pointer-events-none" />
    <div className="absolute inset-x-0 top-0 h-px bg-border" />
    <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-col px-6 pb-12 md:px-12 md:pb-16 lg:px-20">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }} className="max-w-[760px]">
        <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase text-primary md:mb-7">
          <span className="h-px w-8 bg-primary" /> AI & DATA SCIENCE DEVELOPER
        </div>
        <h1 className="font-display text-[clamp(3.5rem,6.6vw,7.5rem)] leading-[.98] font-medium text-foreground">
          Hasini<br />Addanki<span className="text-primary">.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/90 md:mt-8 md:text-xl">
          I turn ideas into intelligent, useful products — across AI, data science, and the web.
        </p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          B.Tech student, team leader, and SmartCity Lab member building toward real-world impact.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
          <Button asChild size="lg" className="h-12 px-6 font-semibold">
            <a href="#work">Explore my work <ArrowUpRight aria-hidden="true" /></a>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 border-foreground/30 bg-background/40 px-6 font-semibold backdrop-blur-sm hover:bg-secondary">
            <a href="#contact">Get in touch <ArrowDownRight aria-hidden="true" /></a>
          </Button>
        </div>
      </motion.div>
      <div className="mt-10 flex items-center justify-between gap-6 border-t border-foreground/20 pt-6 md:mt-16">
        <p className="text-xs font-medium uppercase text-muted-foreground">Selected work <span className="mx-2 text-primary">/</span> AI · DATA · WEB</p>
        <div className="flex items-center gap-5">
          <a className="text-foreground/80 transition-colors hover:text-primary" href={socialLinks.github} aria-label="GitHub" target="_blank" rel="noreferrer"><Github size={19} /></a>
          <a className="text-foreground/80 transition-colors hover:text-primary" href={socialLinks.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin size={19} /></a>
          <a className="text-foreground/80 transition-colors hover:text-primary" href="#contact" aria-label="Contact"><Mail size={19} /></a>
        </div>
      </div>
    </div>
  </section>
);