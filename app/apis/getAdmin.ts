import { dbService } from '@/firebase';
import {
  DocumentData,
  collection,
  getDocs,
  limit,
  query,
  where,
} from 'firebase/firestore';

const getAdmin = async (userId: string) => {
  let admin: DocumentData[] = [];
  const adminRef = collection(dbService, 'admin');

  const q = query(adminRef, where('user', '==', userId), limit(1));

  try {
    const adminSnap = await getDocs(q);
    adminSnap.forEach((doc) => {
      admin.push({ ...doc.data() });
    });

    if (admin.length !== 0) return true;
    return false;
  } catch (err) {
    // console.log('🚀 ~ getAdmin ~ err:', err);
  }
};

export default getAdmin;
