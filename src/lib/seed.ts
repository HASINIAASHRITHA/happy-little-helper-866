import { db } from './firebase';
import { doc, collection, getDocs, writeBatch } from 'firebase/firestore';
import { projects } from '@/data/portfolio';

export const seedProjects = async () => {
  try {
    const projectsRef = collection(db, 'projects');
    const querySnapshot = await getDocs(projectsRef);
    
    console.log('Syncing project data with Firestore...');
    const batch = writeBatch(db);
    
    projects.forEach((project) => {
      const docRef = doc(projectsRef, project.id);
      // Ensure the image field is correctly populated from the hardcoded data
      batch.set(docRef, {
        ...project,
        order: getOrderValue(project.year, project.title),
        updatedAt: new Date().toISOString()
      }, { merge: true });
    });

    await batch.commit();
    console.log('Successfully synced Firestore with verified project data.');
  } catch (error) {
    console.error('Error seeding projects:', error);
  }
};

const getOrderValue = (year: string, title: string) => {
  const yearWeight = year === '3rd Year' ? 3000 : year === '2nd Year' ? 2000 : 1000;
  return yearWeight + (title.charCodeAt(0) || 0);
};
