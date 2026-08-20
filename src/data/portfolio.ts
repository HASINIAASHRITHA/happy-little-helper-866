export type ProjectCategory = 'Web Foundations' | 'Advanced Projects' | 'AI & Real-World Systems';
export type ProjectYear = '1st Year' | '2nd Year' | '3rd Year';

export interface Project {
  id: string;
  title: string;
  year: ProjectYear;
  category: ProjectCategory;
  description: string;
  technologies: string[];
  image?: string | null | undefined;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  longDescription?: string;
  order?: number;
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  skills: string[];
  description: string;
  active?: boolean;
  order?: number;
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
    image: 'https://res.cloudinary.com/dopo6gjfq/image/upload/v1787200120/warehouse-copilot_1787200119.png',
    liveUrl: 'https://warehousecopilot.vercel.app',
    githubUrl: 'https://github.com/HASINIAASHRITHA',
    featured: true,
    longDescription: "Warehouse Copilot is a sophisticated AI-driven platform that optimizes logistics operations. It provides real-time insights into inventory flow and uses predictive modeling to prevent bottlenecks, significantly improving overall warehouse efficiency."
  },
  {
    id: 'factory-copilot',
    title: 'Factory Copilot',
    year: '3rd Year',
    category: 'AI & Real-World Systems',
    description: 'A smart manufacturing assistant leveraging AI and Machine Learning for industrial decision support.',
    technologies: ['AI', 'Machine Learning', 'Smart Manufacturing', 'Decision Support'],
    image: 'https://res.cloudinary.com/dopo6gjfq/image/upload/v1787200120/factory-copilot_1787200120.png',
    liveUrl: 'https://factory-copilot-1.vercel.app',
    githubUrl: 'https://github.com/HASINIAASHRITHA',
    featured: true,
    longDescription: "Factory Copilot serves as an intelligent manufacturing assistant, bridging the gap between raw industrial data and actionable decisions. It monitors production health and provides predictive maintenance alerts to minimize downtime."
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    year: '3rd Year',
    category: 'AI & Real-World Systems',
    description: '[IN PROGRESS] An AI-powered conversational application currently in development.',
    technologies: ['AI', 'NLP', 'React', 'In Development'],
    image: 'https://images.unsplash.com/photo-1675557009875-436f09789900?auto=format&fit=crop&q=80&w=800',
    liveUrl: 'https://ai-assistant-preview.vercel.app',
    githubUrl: 'https://github.com/HASINIAASHRITHA',
    featured: true,
    longDescription: "Status: Currently Working On. This AI-powered interface is currently under active development. Once complete, it will provide an intelligent environment for natural language interactions, trained to handle complex queries with context-aware responses."
  },
  {
    id: 'atomic-dreamscape',
    title: 'Atomic Dreamscape',
    year: '2nd Year',
    category: 'Advanced Projects',
    description: 'An immersive 3D Solar System experience built with modern web technologies.',
    technologies: ['Three.js', 'React', '3D Modeling', 'Animations'],
    image: 'https://res.cloudinary.com/dopo6gjfq/image/upload/v1787200122/atomic-dreamscape_1787200122.png',
    liveUrl: 'https://atomic-dreamscape.vercel.app',
    githubUrl: 'https://github.com/HASINIAASHRITHA',
    featured: true,
    longDescription: "Atomic Dreamscape pushes the boundaries of web-based 3D experiences. Using Three.js, it creates a reactive, atomic-themed simulation of the solar system, allowing users to explore celestial bodies with high-fidelity performance."
  },
  {
    id: 'elegance',
    title: 'Elegance',
    year: '2nd Year',
    category: 'Advanced Projects',
    description: 'A premium, high-end web application focusing on sophisticated UI and interactive elements.',
    technologies: ['React', 'Framer Motion', 'UI/UX Design'],
    image: 'https://res.cloudinary.com/dopo6gjfq/image/upload/v1787200498/elegance_fixed_1787200497.png',
    liveUrl: 'https://elegance-flame.vercel.app',
    githubUrl: 'https://github.com/HASINIAASHRITHA',
  },
  {
    id: 'hotel-portal',
    title: 'Hotel Portal',
    year: '2nd Year',
    category: 'Advanced Projects',
    description: 'A comprehensive hotel management and booking portal.',
    technologies: ['React', 'Authentication', 'State Management'],
    image: 'https://res.cloudinary.com/dopo6gjfq/image/upload/v1787200501/hotel-portal_fixed_1787200500.png',
    liveUrl: 'https://hotel-eta-five.vercel.app',
    githubUrl: 'https://github.com/HASINIAASHRITHA',
  },
  {
    id: 'funinchat',
    title: 'FunInChat',
    year: '2nd Year',
    category: 'Advanced Projects',
    description: 'A real-time interactive chat application with user authentication.',
    technologies: ['React', 'Authentication', 'Real-time Data'],
    image: 'https://res.cloudinary.com/dopo6gjfq/image/upload/v1787200138/funinchat_1787200137.png',
    liveUrl: 'https://funinchat.vercel.app',
    githubUrl: 'https://github.com/HASINIAASHRITHA',
  },
  {
    id: 'luxe-spa',
    title: 'Luxe Spa',
    year: '2nd Year',
    category: 'Advanced Projects',
    description: 'A luxury wellness and spa services platform with an elegant interface.',
    technologies: ['React', 'CSS Modules', 'Web Design'],
    image: 'https://res.cloudinary.com/dopo6gjfq/image/upload/v1787200504/luxe-spa_fixed_1787200503.png',
    liveUrl: 'https://spa-ten-ivory.vercel.app',
    githubUrl: 'https://github.com/HASINIAASHRITHA',
  },
  {
    id: 'swastik-health',
    title: 'Swastik Health',
    year: '1st Year',
    category: 'Web Foundations',
    description: 'Early project focused on health-related information and web fundamentals.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://res.cloudinary.com/dopo6gjfq/image/upload/v1787200146/swastik-health_1787200146.png',
    liveUrl: 'https://swastik-health.vercel.app',
    githubUrl: 'https://github.com/HASINIAASHRITHA',
  },
  {
    id: 'entertainment-pulse',
    title: 'Entertainment Pulse',
    year: '1st Year',
    category: 'Web Foundations',
    description: 'A media-focused project exploring responsive layouts and basic interactivity.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://res.cloudinary.com/dopo6gjfq/image/upload/v1787200139/entertainment-pulse_1787200139.png',
    liveUrl: 'https://entertainment-code.vercel.app',
    githubUrl: 'https://github.com/HASINIAASHRITHA',
  },
  {
    id: 'beautymaker',
    title: 'BeautyMaker',
    year: '1st Year',
    category: 'Web Foundations',
    description: 'A beauty-oriented website showcasing fundamental web development skills.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://res.cloudinary.com/dopo6gjfq/image/upload/v1787200143/beautymaker_1787200142.png',
    liveUrl: 'https://beautymaker.vercel.app',
    githubUrl: 'https://github.com/HASINIAASHRITHA',
  },
  {
    id: 'elite-homes',
    title: 'Elite Homes',
    year: '1st Year',
    category: 'Web Foundations',
    description: 'Real estate portfolio project demonstrating layout and styling capabilities.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://res.cloudinary.com/dopo6gjfq/image/upload/v1787200148/elite-homes_1787200147.png',
    liveUrl: 'https://elite-homes-virid.vercel.app',
    githubUrl: 'https://github.com/HASINIAASHRITHA',
  },
  {
    id: 'befit',
    title: 'BeFit',
    year: '1st Year',
    category: 'Web Foundations',
    description: 'Fitness tracker concept built during my first year of learning.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://res.cloudinary.com/dopo6gjfq/image/upload/v1787200142/befit_1787200141.png',
    liveUrl: 'https://befit-lilac.vercel.app',
    githubUrl: 'https://github.com/HASINIAASHRITHA',
  },
  {
    id: 'hunger-buster',
    title: 'Hunger Buster',
    year: '1st Year',
    category: 'Web Foundations',
    description: 'Food delivery landing page project.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://res.cloudinary.com/dopo6gjfq/image/upload/v1787200145/hunger-buster_1787200144.png',
    liveUrl: 'https://hungerbuster.vercel.app',
    githubUrl: 'https://github.com/HASINIAASHRITHA',
  },
  {
    id: 'creative-canvass',
    title: 'Creative Canvass',
    year: '1st Year',
    category: 'Web Foundations',
    description: 'An exploration into creative web design and canvases.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://res.cloudinary.com/dopo6gjfq/image/upload/v1787200140/creative-canvass_1787200140.png',
    liveUrl: 'https://creative-canvass.vercel.app',
    githubUrl: 'https://github.com/HASINIAASHRITHA',
  },
  {
    id: 'stellartech',
    title: 'StellarTech',
    year: '1st Year',
    category: 'Web Foundations',
    description: 'Technology-focused landing page showcasing early coding skills.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'https://res.cloudinary.com/dopo6gjfq/image/upload/v1787200144/stellartech_1787200143.png',
    liveUrl: 'https://stellartech-five.vercel.app',
    githubUrl: 'https://github.com/HASINIAASHRITHA',
  },
];

export const milestones: Milestone[] = [
  {
    id: 'year-1',
    year: '01 — FIRST YEAR',
    title: 'Learning the Web',
    skills: ['HTML', 'CSS', 'JavaScript'],
    description: 'Focus on fundamentals and early project foundations.',
    order: 1
  },
  {
    id: 'year-2',
    year: '02 — SECOND YEAR',
    title: 'Building Bigger Experiences',
    skills: ['React', 'Interactive Apps', 'Authentication'],
    description: 'Progressing into advanced interactive applications and modern UI.',
    order: 2
  },
  {
    id: 'year-3',
    year: '03 — THIRD YEAR',
    title: 'AI, IoT & Leadership',
    skills: ['AI', 'IoT (SmartCity Lab)', 'Team Leadership'],
    description: 'Leading technical teams and specializing in AI-driven IoT systems and smart manufacturing assistants.',
    active: true,
    order: 3
  },
];

export const skills = [

  {
    category: 'Programming',
    items: ['Python', 'JavaScript', 'HTML', 'CSS']
  },
  {
    category: 'AI / Data',
    items: ['Machine Learning', 'Data Science', 'Pandas', 'NumPy', 'Scikit-learn']
  },
  {
    category: 'Web',
    items: ['React', 'Vite', 'Tailwind CSS']
  },
  {
    category: 'Tools',
    items: ['Firebase', 'GitHub', 'Cloudinary', 'Vercel']
  }
];

export const resumeUrl = ''; // Empty string as requested for "coming soon"
export const socialLinks = {
  github: 'https://github.com/HASINIAASHRITHA',
  linkedin: 'https://www.linkedin.com/in/hasini-addanki-70b236322/',
  email: 'mailto:contact@hasini.addanki' // Placeholder email
};
