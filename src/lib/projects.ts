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
    let unsubscribe: (() => void) | undefined;
    
    const fetchProjects = async () => {
      try {
        const projectsRef = collection(db, PROJECTS_COLLECTION);
        const q = query(projectsRef, orderBy('year', 'desc'));
        
        // Initial get to confirm table exists/has data
        const initialSnap = await getDocs(q);
        if (initialSnap.empty) {
          console.warn("Initial check: Projects collection is empty.");
        }

        unsubscribe = onSnapshot(q, (querySnapshot) => {
          if (querySnapshot.empty) {
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
          console.error("onSnapshot error:", err);
          setError("Connection to project database failed");
          setLoading(false);
        });
      } catch (err) {
        console.error("fetchProjects error:", err);
        setError("Database unavailable");
        setLoading(false);
      }
    };

    fetchProjects();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { projects, loading, error };
};
