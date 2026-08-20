import { db } from './firebase';
import { doc, collection, getDocs, writeBatch, setDoc, getDoc } from 'firebase/firestore';
import { projects, milestones } from '@/data/portfolio';

export const seedProjects = async (force = false) => {
  try {
    const projectsRef = collection(db, 'projects');
    const milestonesRef = collection(db, 'milestones');
    const projectsSnapshot = await getDocs(projectsRef);
    const milestonesSnapshot = await getDocs(milestonesRef);
    
    // Check if we should seed (if empty or force is true)
    if (!force && !projectsSnapshot.empty) {
      console.log('Projects already exist in Firestore, skipping seed.');
    } else {
      console.log('Syncing projects with Firestore...');
      const batch = writeBatch(db);
      if (force && !projectsSnapshot.empty) {
        projectsSnapshot.forEach((doc) => batch.delete(doc.ref));
      }
      projects.forEach((project) => {
        const docRef = doc(projectsRef, project.id);
        batch.set(docRef, {
          ...project,
          order: getProjectOrderValue(project.year, project.title),
          updatedAt: new Date().toISOString()
        });
      });
      await batch.commit();
    }

    if (!force && !milestonesSnapshot.empty) {
       console.log('Milestones already exist, skipping seed.');
    } else {
      console.log('Syncing milestones with Firestore...');
      const batch = writeBatch(db);
      if (force && !milestonesSnapshot.empty) {
        milestonesSnapshot.forEach((doc) => batch.delete(doc.ref));
      }
      milestones.forEach((m) => {
        const docRef = doc(milestonesRef, m.id);
        batch.set(docRef, {
          ...m,
          updatedAt: new Date().toISOString()
        });
      });
      await batch.commit();
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

export const seedAdminUser = async (uid: string) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        role: 'admin',
        email: 'admin@example.com',
        createdAt: new Date().toISOString()
      });
      console.log('Admin user role seeded successfully.');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
};

const getProjectOrderValue = (year: string, title: string) => {
  const yearWeight = year === '3rd Year' ? 3000 : year === '2nd Year' ? 2000 : 1000;
  return yearWeight + (title.charCodeAt(0) || 0);
};

