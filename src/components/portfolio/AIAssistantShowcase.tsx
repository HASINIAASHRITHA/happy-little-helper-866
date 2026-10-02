import { motion } from 'framer-motion';
import { useProjects } from '@/lib/projects';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import assistantConcept from '@/assets/ai-assistant-concept.jpg';

export const AIAssistantShowcase = () => {
  const { projects } = useProjects();
  const assistantProject = projects.find((project) => project.id === 'ai-assistant');
  const liveUrl = assistantProject?.liveUrl === 'https://ai-assistant-preview.vercel.app' ? undefined : assistantProject?.liveUrl;

  return (
    <section className="border-t border-border py-24">
      <div className="container mx-auto grid items-center gap-12 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="mb-5 text-xs font-semibold uppercase text-primary">AI / In progress</p>
          <h2 className="max-w-xl font-display text-4xl leading-tight md:text-5xl">An assistant built for useful conversations.</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            My AI Assistant is a conversational project in development, exploring how context-aware responses can make information easier to use.
          </p>
          <div className="mt-8 flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
            <span className="border border-border px-3 py-2">Conversational AI</span>
            <span className="border border-border px-3 py-2">Natural language</span>
            <span className="border border-border px-3 py-2">React</span>
          </div>
          {liveUrl && (
            <Button asChild className="mt-8">
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">Interact with Bot <ArrowUpRight aria-hidden="true" /></a>
            </Button>
          )}
        </motion.div>
        <motion.figure initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="min-w-0">
          <div className="overflow-hidden border border-border bg-secondary">
            <img src={assistantConcept} alt="Concept visualization of the AI Assistant conversation interface" width={1200} height={800} loading="lazy" className="aspect-[3/2] w-full object-cover" />
          </div>
          <figcaption className="mt-3 text-xs text-muted-foreground">Concept visual · Assistant in development</figcaption>
        </motion.figure>
      </div>
    </section>
  );
};