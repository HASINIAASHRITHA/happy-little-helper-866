import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useProjects } from '@/lib/projects';

const AnimatedNumber = ({ value }: { value: string }) => {
  const numericValue = parseInt(value);
  const isPlus = value.includes('+');
  const count = useMotionValue(0);
  const rounded = useSpring(count, { stiffness: 40, damping: 20 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    count.set(numericValue);
  }, [numericValue, count]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      setDisplay(Math.floor(latest).toString());
    });
  }, [rounded]);

  return (
    <span>
      {display}{isPlus ? '+' : ''}
    </span>
  );
};

export const Stats = () => {
  const { projects } = useProjects();
  
  const stats = [
    { label: 'Total Projects', value: `${projects.length || 0}+` },
    { label: 'Years of Growth', value: '3' },
    { label: 'AI / ML Focus', value: '5+' },
    { label: 'Web Applications', value: '10+' },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-background border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent -z-10" />
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="relative group text-center"
            >
              <div className="mb-2">
                <span className="text-5xl md:text-6xl font-black tracking-tighter text-foreground group-hover:text-primary transition-colors duration-500">
                  <AnimatedNumber value={stat.value} />
                </span>
              </div>
              <div className="h-px w-8 bg-primary/30 mx-auto mb-4 group-hover:w-16 transition-all duration-500" />
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
