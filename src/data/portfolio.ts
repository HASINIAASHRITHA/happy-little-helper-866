export type ProjectCategory = 'Web Foundations' | 'Advanced Projects' | 'AI & Real-World Systems';
export type ProjectYear = '1st Year' | '2nd Year' | '3rd Year';

export interface Project {
  id: string;
  title: string;
  year: ProjectYear;
  category: ProjectCategory;
  description: string;
  technologies: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  // 3rd Year - Featured
  {
    id: 'warehouse-copilot',
    title: 'Warehouse Copilot',
    year: '3rd Year',
    category: 'AI & Real-World Systems',
    description: 'An AI-powered intelligent operations platform for warehouse management and decision support.',
    technologies: ['AI', 'Warehouse Management', 'Decision Support', 'Data Analysis'],
    image: 'https://warehousecopilot.vercel.app/og-image.png',
    liveUrl: 'https://warehousecopilot.vercel.app',
    featured: true,
  },
  {
    id: 'factory-copilot',
    title: 'Factory Copilot',
    year: '3rd Year',
    category: 'AI & Real-World Systems',
    description: 'A smart manufacturing assistant leveraging AI and Machine Learning for industrial decision support.',
    technologies: ['AI', 'Machine Learning', 'Smart Manufacturing', 'Decision Support'],
    image: 'https://factory-copilot-1.vercel.app/og-image.png',
    liveUrl: 'https://factory-copilot-1.vercel.app/dashboard',
    featured: true,
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    year: '3rd Year',
    category: 'AI & Real-World Systems',
    description: 'An AI-powered conversational application designed to interact with users and provide intelligent responses.',
    technologies: ['AI', 'NLP', 'React', 'API Integration'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    featured: true,
  },
  // 2nd Year
  {
    id: 'atomic-dreamscape',
    title: 'Atomic Dreamscape',
    year: '2nd Year',
    category: 'Advanced Projects',
    description: 'An immersive 3D Solar System experience built with modern web technologies.',
    technologies: ['Three.js', 'React', '3D Modeling', 'Animations'],
    image: 'https://atomic-dreamscape.vercel.app/og-image.png',
    liveUrl: 'https://atomic-dreamscape.vercel.app',
    featured: true,
  },
  {
    id: 'elegance',
    title: 'Elegance',
    year: '2nd Year',
    category: 'Advanced Projects',
    description: 'A premium, high-end web application focusing on sophisticated UI and interactive elements.',
    technologies: ['React', 'Framer Motion', 'UI/UX Design'],
    image: 'https://elegance-flame.vercel.app/preview.png',
    liveUrl: 'https://elegance-flame.vercel.app',
  },
  {
    id: 'hotel-portal',
    title: 'Hotel Portal',
    year: '2nd Year',
    category: 'Advanced Projects',
    description: 'A comprehensive hotel management and booking portal.',
    technologies: ['React', 'Authentication', 'State Management'],
    image: 'https://hotel-eta-five.vercel.app/hero.png',
    liveUrl: 'https://hotel-eta-five.vercel.app',
  },
  {
    id: 'funinchat',
    title: 'FunInChat',
    year: '2nd Year',
    category: 'Advanced Projects',
    description: 'A real-time interactive chat application with user authentication.',
    technologies: ['React', 'Authentication', 'Real-time Data'],
    image: 'https://funinchat.vercel.app/app-preview.png',
    liveUrl: 'https://funinchat.vercel.app',
  },
  {
    id: 'luxe-spa',
    title: 'Luxe Spa',
    year: '2nd Year',
    category: 'Advanced Projects',
    description: 'A luxury wellness and spa services platform with an elegant interface.',
    technologies: ['React', 'CSS Modules', 'Web Design'],
    image: 'https://spa-ten-ivory.vercel.app/main.png',
    liveUrl: 'https://spa-ten-ivory.vercel.app',
  },
  // 1st Year
  {
    id: 'swastik-health',
    title: 'Swastik Health',
    year: '1st Year',
    category: 'Web Foundations',
    description: 'Early project focused on health-related information and web fundamentals.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://swastik-health.vercel.app/og-image.png',
    liveUrl: 'https://swastik-health.vercel.app',
  },
  {
    id: 'entertainment-pulse',
    title: 'Entertainment Pulse',
    year: '1st Year',
    category: 'Web Foundations',
    description: 'A media-focused project exploring responsive layouts and basic interactivity.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://entertainment-code.vercel.app/og-image.png',
    liveUrl: 'https://entertainment-code.vercel.app',
  },
  {
    id: 'beautymaker',
    title: 'BeautyMaker',
    year: '1st Year',
    category: 'Web Foundations',
    description: 'A beauty-oriented website showcasing fundamental web development skills.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://beautymaker.vercel.app/og-image.png',
    liveUrl: 'https://beautymaker.vercel.app',
  },
  {
    id: 'elite-homes',
    title: 'Elite Homes',
    year: '1st Year',
    category: 'Web Foundations',
    description: 'Real estate portfolio project demonstrating layout and styling capabilities.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://elite-homes-virid.vercel.app/og-image.png',
    liveUrl: 'https://elite-homes-virid.vercel.app',
  },
  {
    id: 'befit',
    title: 'BeFit',
    year: '1st Year',
    category: 'Web Foundations',
    description: 'Fitness tracker concept built during my first year of learning.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://befit-lilac.vercel.app/og-image.png',
    liveUrl: 'https://befit-lilac.vercel.app',
  },
  {
    id: 'hunger-buster',
    title: 'Hunger Buster',
    year: '1st Year',
    category: 'Web Foundations',
    description: 'Food delivery landing page project.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://hungerbuster.vercel.app/og-image.png',
    liveUrl: 'https://hungerbuster.vercel.app',
  },
  {
    id: 'creative-canvass',
    title: 'Creative Canvass',
    year: '1st Year',
    category: 'Web Foundations',
    description: 'An exploration into creative web design and canvases.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://creative-canvass.vercel.app/og-image.png',
    liveUrl: 'https://creative-canvass.vercel.app',
  },
  {
    id: 'stellartech',
    title: 'StellarTech',
    year: '1st Year',
    category: 'Web Foundations',
    description: 'Technology-focused landing page showcasing early coding skills.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://stellartech-five.vercel.app/og-image.png',
    liveUrl: 'https://stellartech-five.vercel.app',
  },
];

export const skills = [
  {
    category: 'Programming',
    items: ['Python', 'JavaScript', 'HTML', 'CSS']
  },
  {
    category: 'Data / AI / IoT',
    items: ['Machine Learning', 'Data Science', 'IoT', 'Sensors & Actuators', 'Team Leadership']
  },
  {
    category: 'Web',
    items: ['React', 'Vite', 'Tailwind CSS']
  },
  {
    category: 'Tools / Platforms',
    items: ['GitHub', 'Firebase', 'Vercel']
  }
];

export const resumeUrl = '#'; // Placeholder, easy to replace
export const socialLinks = {
  github: 'https://github.com/HASINIAASHRITHA',
  linkedin: 'https://www.linkedin.com/in/hasini-addanki-70b236322/',
  email: 'mailto:contact@example.com'
};