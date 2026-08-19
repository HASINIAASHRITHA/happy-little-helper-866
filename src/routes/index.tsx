import { createFileRoute } from '@tanstack/react-router';
import { CustomCursor } from '@/components/portfolio/CustomCursor';
import { Navbar } from '@/components/portfolio/Navbar';
import { Hero } from '@/components/portfolio/Hero';
import { Stats } from '@/components/portfolio/Stats';
import { About } from '@/components/portfolio/About';
import { Skills } from '@/components/portfolio/Skills';
import { Journey } from '@/components/portfolio/Journey';
import { FeaturedProjects } from '@/components/portfolio/FeaturedProjects';
import { Projects } from '@/components/portfolio/Projects';
import { Contact } from '@/components/portfolio/Contact';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: "Hasini Addanki | AI & Data Science Developer" },
      { name: "description", content: "AI & Data Science student building intelligent systems, data-driven applications and modern web experiences." },
      { property: "og:title", content: "Hasini Addanki | AI & Data Science Developer" },
      { property: "og:description", content: "Portfolio of Hasini Addanki, focused on AI, ML, and Data Science." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioIndex,
});

function PortfolioIndex() {
  return (
    <main className="bg-background text-foreground dark min-h-screen selection:bg-primary/30 selection:text-white font-sans antialiased">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(var(--primary),0.05),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(var(--accent),0.05),transparent_50%)] pointer-events-none" />
      <CustomCursor />
      <Navbar />
      
      <Hero />
      <Stats />
      <About />
      <Journey />
      <Skills />
      <FeaturedProjects />
      <Projects />
      <Contact />
      </div>
    </main>
  );
}
