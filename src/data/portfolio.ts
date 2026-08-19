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
  longDescription?: string;
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
    image: 'warehouse-copilot-og', // Cloudinary public ID or full URL
    liveUrl: 'https://warehousecopilot.vercel.app',
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
    image: 'factory-copilot-og',
    liveUrl: 'https://factory-copilot-1.vercel.app/dashboard',
    featured: true,
    longDescription: "Factory Copilot serves as an intelligent manufacturing assistant, bridging the gap between raw industrial data and actionable decisions. It monitors production health and provides predictive maintenance alerts to minimize downtime."
  },
  {
    id: 'ai-assistant',
    title: 'AI Assistant',
    year: '3rd Year',
    category: 'AI & Real-World Systems',
    description: 'An AI-powered conversational application designed to interact with users and provide intelligent responses.',
    technologies: ['AI', 'NLP', 'React', 'API Integration'],
    image: 'ai-assistant-preview',
    featured: true,
    longDescription: "An AI-powered interface that simplifies complex information retrieval. This assistant is trained to handle natural language queries, providing users with accurate, context-aware information in a clean, interactive environment."
  },
  // 2nd Year
  {
    id: 'atomic-dreamscape',
    title: 'Atomic Dreamscape',
    year: '2nd Year',
    category: 'Advanced Projects',
    description: 'An immersive 3D Solar System experience built with modern web technologies.',
    technologies: ['Three.js', 'React', '3D Modeling', 'Animations'],
    image: 'atomic-dreamscape-og',
    liveUrl: 'https://atomic-dreamscape.vercel.app',
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
    image: 'elegance-og',
    liveUrl: 'https://elegance-flame.vercel.app',
  },
  {
    id: 'hotel-portal',
    title: 'Hotel Portal',
    year: '2nd Year',
    category: 'Advanced Projects',
    description: 'A comprehensive hotel management and booking portal.',
    technologies: ['React', 'Authentication', 'State Management'],
    image: 'hotel-portal-og',
    liveUrl: 'https://hotel-eta-five.vercel.app',
  },
  {
    id: 'funinchat',
    title: 'FunInChat',
    year: '2nd Year',
    category: 'Advanced Projects',
    description: 'A real-time interactive chat application with user authentication.',
    technologies: ['React', 'Authentication', 'Real-time Data'],
    image: 'funinchat-og',
    liveUrl: 'https://funinchat.vercel.app/auth',
  },
  {
    id: 'luxe-spa',
    title: 'Luxe Spa',
    year: '2nd Year',
    category: 'Advanced Projects',
    description: 'A luxury wellness and spa services platform with an elegant interface.',
    technologies: ['React', 'CSS Modules', 'Web Design'],
    image: 'luxe-spa-og',
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
    image: 'swastik-health-og',
    liveUrl: 'https://swastik-health.vercel.app/',
  },
  {
    id: 'entertainment-pulse',
    title: 'Entertainment Pulse',
    year: '1st Year',
    category: 'Web Foundations',
    description: 'A media-focused project exploring responsive layouts and basic interactivity.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'entertainment-pulse-og',
    liveUrl: 'https://entertainment-code.vercel.app/',
  },
  {
    id: 'beautymaker',
    title: 'BeautyMaker',
    year: '1st Year',
    category: 'Web Foundations',
    description: 'A beauty-oriented website showcasing fundamental web development skills.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'beautymaker-og',
    liveUrl: 'https://beautymaker.vercel.app/',
  },
  {
    id: 'elite-homes',
    title: 'Elite Homes',
    year: '1st Year',
    category: 'Web Foundations',
    description: 'Real estate portfolio project demonstrating layout and styling capabilities.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'elite-homes-og',
    liveUrl: 'https://elite-homes-virid.vercel.app/',
  },
  {
    id: 'befit',
    title: 'BeFit',
    year: '1st Year',
    category: 'Web Foundations',
    description: 'Fitness tracker concept built during my first year of learning.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'befit-og',
    liveUrl: 'https://befit-lilac.vercel.app/',
  },
  {
    id: 'hunger-buster',
    title: 'Hunger Buster',
    year: '1st Year',
    category: 'Web Foundations',
    description: 'Food delivery landing page project.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'hunger-buster-og',
    liveUrl: 'https://hungerbuster.vercel.app/',
  },
  {
    id: 'creative-canvass',
    title: 'Creative Canvass',
    year: '1st Year',
    category: 'Web Foundations',
    description: 'An exploration into creative web design and canvases.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'creative-canvass-og',
    liveUrl: 'https://creative-canvass.vercel.app/',
  },
  {
    id: 'stellartech',
    title: 'StellarTech',
    year: '1st Year',
    category: 'Web Foundations',
    description: 'Technology-focused landing page showcasing early coding skills.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    image: 'stellartech-og',
    liveUrl: 'https://stellartech-five.vercel.app/',
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
