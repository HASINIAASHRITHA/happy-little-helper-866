import { db } from './firebase';
import { doc, collection, getDocs, writeBatch } from 'firebase/firestore';
import { projects } from '@/data/portfolio';

export const seedProjects = async (force = false) => {
  try {
    const projectsRef = collection(db, 'projects');
    const querySnapshot = await getDocs(projectsRef);
    
    // Check if we should seed (if empty or force is true)
    if (!force && !querySnapshot.empty) {
      console.log('Projects already exist in Firestore, skipping seed. Use force=true to override.');
      return;
    }

    console.log('Syncing verified project data with Firestore (force sync)...');
    const batch = writeBatch(db);
    
    // First, clear existing to ensure clean slate on force
    if (force && !querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
    }

    projects.forEach((project) => {
      // Use project.id as the document ID for stability
      const docRef = doc(projectsRef, project.id);
      batch.set(docRef, {
        ...project,
        order: getOrderValue(project.year, project.title),
        updatedAt: new Date().toISOString()
      });
    });

    await batch.commit();
    console.log(`Successfully synced ${projects.length} projects to Firestore.`);
  } catch (error) {
    console.error('Error seeding projects:', error);
  }
};

const getOrderValue = (year: string, title: string) => {
  const yearWeight = year === '3rd Year' ? 3000 : year === '2nd Year' ? 2000 : 1000;
  return yearWeight + (title.charCodeAt(0) || 0);
};
