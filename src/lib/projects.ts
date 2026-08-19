import { db } from './firebase';
import { collection, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Project } from '@/data/portfolio';

export const PROJECTS_COLLECTION = 'projects';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, PROJECTS_COLLECTION), orderBy('year', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const projectsData: Project[] = [];
      querySnapshot.forEach((doc) => {
        projectsData.push({ id: doc.id, ...doc.data() } as Project);
      });
      setProjects(projectsData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching projects from Firebase:", err);
      setError("Projects temporarily unavailable");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { projects, loading, error };
};
