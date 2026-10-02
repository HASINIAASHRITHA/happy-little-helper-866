import { skills } from '@/data/portfolio';
import programmingImage from '@/assets/skill-programming.jpg';
import dataImage from '@/assets/skill-data.jpg';
import webImage from '@/assets/skill-web.jpg';
import toolsImage from '@/assets/skill-tools.jpg';

const skillImages = [programmingImage, dataImage, webImage, toolsImage];

export const Skills = () => (
  <section id="skills" className="scroll-mt-20 border-y border-border py-24">
    <div className="container mx-auto px-6">
      <div className="mb-12 max-w-2xl">
        <p className="mb-4 text-xs font-semibold uppercase text-primary">Expertise</p>
        <h2 className="font-display text-4xl md:text-5xl">Tools I use to build.</h2>
      </div>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        {skills.map((group, groupIndex) => (
          <div
            key={group.category}
            className="min-w-0"
          >
            <div className="relative mb-6 aspect-[3/2] overflow-hidden border border-border bg-secondary">
              <img
                src={skillImages[groupIndex]}
                alt={`${group.category} in practice`}
                width={1200}
                height={800}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 motion-safe:hover:scale-105"
              />
            </div>
            <h3 className="mb-4 border-b border-border pb-4 text-lg font-semibold text-foreground">{group.category}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <li key={skill} className="border border-border bg-secondary px-3 py-2 text-xs font-medium text-muted-foreground">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
);