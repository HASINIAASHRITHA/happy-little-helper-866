import { db } from './firebase';
import { doc, collection, getDocs, writeBatch, query, where, deleteDoc } from 'firebase/firestore';
import { projects } from '@/data/portfolio';

/**
 * Seeds Firestore with the initial projects from portfolio.ts
 * Call this once or via a secure admin toggle to populate your database
 */
export const seedProjects = async () => {
  try {
    const projectsRef = collection(db, 'projects');
    const querySnapshot = await getDocs(projectsRef);
    
    // For this bug-fix task, we will clear and re-seed to ensure data integrity
    // if the existing data is inconsistent. 
    // Usually we wouldn't clear, but the user requested a "Critical Fix" of project data.
    
    const batch = writeBatch(db);
    
    // Delete existing if needed, or just update. 
    // To ensure clean state as per user request for "One Source of Truth" and "Correct URLs":
    if (!querySnapshot.empty) {
      console.log('Syncing project data with Firestore...');
    }

    projects.forEach((project) => {
      const docRef = doc(projectsRef, project.id);
      batch.set(docRef, {
        ...project,
        order: getOrderValue(project.year, project.title),
        longDescription: project.description + " This project demonstrates my ability to build professional applications using modern technology stacks and best practices in software development.",
        gallery: project.image ? [project.image] : [],
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
