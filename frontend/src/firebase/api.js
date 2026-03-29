import { collection, addDoc, getDoc, doc } from 'firebase/firestore';
import { db } from './config';

export const saveRoadmapToFirebase = async (roadmapData, originalParams) => {
  try {
    const docRef = await addDoc(collection(db, "roadmaps"), {
      roadmapData,
      originalParams,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const getRoadmapFromFirebase = async (id) => {
  try {
    const docRef = doc(db, "roadmaps", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (e) {
    console.error("Error getting document: ", e);
    throw e;
  }
};
