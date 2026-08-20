import { motion } from 'framer-motion';
import { useProjects } from '@/lib/projects';
import { MessageSquare, ArrowRight } from 'lucide-react';

export const AIAssistantShowcase = () => {
  const { projects } = useProjects();
  const assistantProject = projects.find(p => p.id === 'ai-assistant');
  
  if (!assistantProject) return null;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass p-12 rounded-[2.5rem] border border-primary/20 relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 blur-3xl rounded-full" />
          
          <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
            <div className="w-20 h-20 rounded-3xl bg-primary/20 flex items-center justify-center text-primary border border-primary/30 flex-shrink-0">
              <MessageSquare size={40} />
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <h3 className="text-3xl font-bold mb-4 tracking-tight">Get to know about Hasini's AI Bot.</h3>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                Meet my intelligent companion — a custom-trained AI assistant designed to handle complex queries, provide insights on my work, and showcase the potential of conversational intelligence.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="aspect-video rounded-2xl overflow-hidden glass border border-white/5">
                  <img 
                    src={assistantProject.image ? `https://res.cloudinary.com/dopo6gjfq/image/upload/v1787201738/${assistantProject.image}.png` : ""} 
                    alt="AI Interface" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-video rounded-2xl overflow-hidden glass border border-white/5 flex items-center justify-center bg-primary/5">
                   <div className="text-center p-4">
                     <div className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">Trained on</div>
                     <div className="text-sm font-medium">Custom Knowledge</div>
                   </div>
                </div>
              </div>
              
              {assistantProject.liveUrl ? (
                <a 
                  href={assistantProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all"
                >
                  Interact with the Bot <ArrowRight size={20} />
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-muted-foreground rounded-full font-bold border border-white/10 cursor-not-allowed">
                  Bot coming soon
                </span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
