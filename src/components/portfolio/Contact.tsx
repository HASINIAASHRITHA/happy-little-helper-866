import { motion } from 'framer-motion';
import { useState } from 'react';
import { socialLinks, resumeUrl } from '@/data/portfolio';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'sonner';


const GithubIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const LinkedinIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'contacts'), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (

    <section id="contact" className="py-24 scroll-mt-20">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto glass p-8 md:p-20 rounded-[3rem] relative overflow-hidden border border-white/5"
        >
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -20, 0]
            }}
            transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
            className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 blur-[100px] -z-10" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -30, 0],
              y: [0, 30, 0]
            }}
            transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 blur-[100px] -z-10" 
          />
          
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-sm font-bold text-primary uppercase tracking-[0.3em] mb-6">LET'S CONNECT</h2>
              <h3 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-[1.1] relative">
                Have an idea? <br/>Let's <span className="text-primary italic">build it.</span>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.15 }}
                  className="absolute -top-20 -left-20 w-40 h-40 pointer-events-none"
                >
                  <img 
                    src="https://res.cloudinary.com/dopo6gjfq/image/upload/v1787203407/ai-contact-abstract.png" 
                    alt="" 
                    className="w-full h-full object-contain"
                  />
                </motion.div>
              </h3>
              <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                I'm always interested in learning, experimenting and building interesting technology projects.
              </p>
              
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-6">
                  <a 
                    href={socialLinks.email} 
                    className="px-10 py-4 bg-primary text-primary-foreground rounded-full font-bold shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    Let's Connect
                  </a>
                  {resumeUrl ? (
                    <a 
                      href={resumeUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-foreground font-bold border-b-2 border-primary/30 hover:border-primary transition-all py-1"
                    >
                      Download CV
                    </a>
                  ) : (
                    <span className="text-muted-foreground/30 font-bold border-b-2 border-transparent py-1 italic cursor-help" title="Resume coming soon">
                      CV coming soon
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-8 mt-4">
                  <a href={socialLinks.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"><GithubIcon size={32} /></a>
                  <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"><LinkedinIcon size={32} /></a>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Name</label>
                    <input 
                      type="text" 
                      placeholder="Your name" 
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-all placeholder:opacity-30" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Email</label>
                    <input 
                      type="email" 
                      placeholder="Your email" 
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-all placeholder:opacity-30" 
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-2">Message</label>
                  <textarea 
                    placeholder="Your message" 
                    rows={5} 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-primary outline-none transition-all resize-none placeholder:opacity-30"
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-white/10 hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-bold uppercase tracking-widest text-sm transition-all border border-white/10 hover:border-white/20 active:scale-[0.98]"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

          </div>
        </motion.div>
        
        <div className="mt-24 text-center border-t border-white/5 pt-12">
          <p className="text-muted-foreground text-xs uppercase tracking-[0.5em] opacity-30">
            Hasini Addanki &copy; {new Date().getFullYear()} &bull; Built with Intelligence
          </p>
        </div>
      </div>
    </section>
  );
};
