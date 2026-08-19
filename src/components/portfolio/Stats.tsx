import { motion } from 'framer-motion';
import { projects } from '@/data/portfolio';

export const Stats = () => {
  const stats = [
    { label: 'Projects', value: `${projects.length}+` },
    { label: 'Years of Growth', value: '3' },
    { label: 'AI / ML Projects', value: '5+' },
    { label: 'Web Applications', value: '10+' },
  ];

  return (
    <section className="py-20 bg-background/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
