import { db } from './firebase';
import { collection, getDocs, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Project, projects as localProjects } from '@/data/portfolio';

export const PROJECTS_COLLECTION = 'projects';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    
    const fetchProjects = async () => {
      try {
        const projectsRef = collection(db, PROJECTS_COLLECTION);
        const q = query(projectsRef, orderBy('year', 'desc'));
        
        // Initial attempt to use Firestore
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          if (querySnapshot.empty) {
            console.warn("Firestore collection is empty, using fallback data.");
            setProjects(localProjects);
            setUsingFallback(true);
          } else {
            const projectsData: Project[] = [];
            querySnapshot.forEach((doc) => {
              projectsData.push({ id: doc.id, ...doc.data() } as Project);
            });
            setProjects(projectsData);
            setUsingFallback(false);
          }
          setLoading(false);
          setError(null);
        }, (err) => {
          console.error("Firestore error, using fallback data:", err);
          setProjects(localProjects);
          setUsingFallback(true);
          setLoading(false);
          // Only show error in console, don't break the UI since we have fallbacks
          setError(null);
        });
      } catch (err) {
        console.error("Firebase initialization/query error, using fallback data:", err);
        setError("Database initialization failed");
        setProjects(localProjects);
        setUsingFallback(true);
        setLoading(false);
      }
    };

    fetchProjects();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { projects, loading, error, usingFallback };
};
