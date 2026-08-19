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
    // Firebase is initialized
    try {
      const q = query(collection(db, PROJECTS_COLLECTION), orderBy('year', 'desc'));
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (querySnapshot.empty) {
          console.warn("Firestore collection 'projects' is empty.");
          setProjects([]);
        } else {
          const projectsData: Project[] = [];
          querySnapshot.forEach((doc) => {
            projectsData.push({ id: doc.id, ...doc.data() } as Project);
          });
          setProjects(projectsData);
        }
        setLoading(false);
      }, (err) => {
        console.error("Error fetching projects from Firebase:", err);
        setError("Projects temporarily unavailable");
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Firebase Query Error:", err);
      setError("Database connection failed");
      setLoading(false);
    }
  }, []);

  return { projects, loading, error };
};
