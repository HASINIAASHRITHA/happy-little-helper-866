import { motion } from 'framer-motion';
import { socialLinks } from '@/data/portfolio';

export const Contact = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto glass p-8 md:p-12 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-3xl -z-10" />
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's build something meaningful.</h2>
              <p className="text-lg text-muted-foreground mb-8">
                I'm always interested in learning, building and collaborating on interesting technology projects.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={socialLinks.email} className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium">
                  Let's Connect
                </a>
              </div>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input type="text" placeholder="Name" className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary outline-none transition-colors" />
              </div>
              <div>
                <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary outline-none transition-colors" />
              </div>
              <div>
                <textarea placeholder="Message" rows={4} className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary outline-none transition-colors resize-none"></textarea>
              </div>
              <button className="w-full py-3 bg-secondary hover:bg-secondary/80 rounded-xl font-medium transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
