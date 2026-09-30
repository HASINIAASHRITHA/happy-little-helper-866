import { motion } from 'framer-motion';
import { BrainCircuit, ChartNoAxesCombined, Code2, Workflow } from 'lucide-react';

const areas = [
  { title: 'AI & machine learning', desc: 'Building systems that turn complex inputs into useful decisions.', icon: BrainCircuit },
  { title: 'Data science', desc: 'Finding patterns and making information easier to act on.', icon: ChartNoAxesCombined },
  { title: 'Web development', desc: 'Designing and engineering thoughtful digital experiences.', icon: Code2 },
  { title: 'Connected systems', desc: 'Exploring sensors and intelligent workflows at SmartCity Lab.', icon: Workflow },
];

export const Intro = () => (
  <section className="border-b border-border bg-secondary/20 py-20 md:py-28">
    <div className="mx-auto max-w-[1500px] px-6 md:px-12 lg:px-20">
      <div className="mb-12 grid gap-5 md:grid-cols-[1fr_2fr] md:items-end md:gap-12">
        <p className="text-xs font-semibold uppercase text-primary">01 / EXPERTISE</p>
        <h2 className="font-display max-w-3xl text-4xl font-medium leading-tight md:text-6xl">Curiosity meets <em className="font-normal text-primary">execution.</em></h2>
      </div>
      <div className="grid border-t border-border sm:grid-cols-2 xl:grid-cols-4">
        {areas.map(({ title, desc, icon: Icon }, i) => (
          <motion.div key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .08 }} className="border-b border-border py-8 pr-8 xl:border-b-0 xl:border-r xl:pl-7 first:pl-0 last:border-r-0">
            <Icon className="mb-8 text-primary" size={27} strokeWidth={1.5} aria-hidden="true" />
            <h3 className="mb-3 text-lg font-semibold">{title}</h3>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
