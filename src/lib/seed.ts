import { db } from './firebase';
import { doc, setDoc, collection, getDocs, writeBatch } from 'firebase/firestore';
import { projects } from '@/data/portfolio';

/**
 * Seeds Firestore with the initial projects from portfolio.ts
 * Call this once or via a secure admin toggle to populate your database
 */
export const seedProjects = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'projects'));
    if (!querySnapshot.empty) {
      console.log('Projects collection already seeded.');
      return;
    }

    const batch = writeBatch(db);
    
    projects.forEach((project) => {
      const docRef = doc(collection(db, 'projects'), project.id);
      batch.set(docRef, {
        ...project,
        order: getOrderValue(project.year, project.title),
        // Adding placeholders for new requirements
        longDescription: project.description + " This project involved extensive research and implementation using modern standards to ensure high performance and user satisfaction.",
        gallery: [project.image || ''],
        updatedAt: new Date().toISOString()
      });
    });

    await batch.commit();
    console.log('Successfully seeded Firestore with projects.');
  } catch (error) {
    console.error('Error seeding projects:', error);
  }
};

const getOrderValue = (year: string, title: string) => {
  const yearWeight = year === '3rd Year' ? 3000 : year === '2nd Year' ? 2000 : 1000;
  // A simple way to create a sortable order based on year and alphabetically by title
  return yearWeight + (title.charCodeAt(0) || 0);
};
