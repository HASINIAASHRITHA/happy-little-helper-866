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
    <main className="bg-background text-foreground dark min-h-screen">
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
      
      <footer className="py-12 border-t border-border/50 text-center text-muted-foreground text-sm">
        <div className="container mx-auto px-6">
          <p>© {new Date().getFullYear()} Hasini Addanki. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
