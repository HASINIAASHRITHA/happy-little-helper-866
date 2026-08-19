import { motion } from 'framer-motion';

export const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            From building websites to building intelligent systems.
          </motion.h2>
          
          <div className="space-y-8 text-lg text-muted-foreground">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              First Year: I started by learning the fundamentals of web development and created projects using HTML, CSS and JavaScript.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Second Year: I progressed into more advanced websites and applications involving richer UI, authentication, interactive experiences and more complex project ideas.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              Third Year: I started working on AI-oriented and real-world systems such as Warehouse Copilot and Factory Copilot, while continuing to build websites and applications. I am still actively building new projects.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};
