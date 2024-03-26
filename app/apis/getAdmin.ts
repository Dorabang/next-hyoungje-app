import { dbService } from '@/firebase';
import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

const getAdmin = async (userId: string) => {
  let post: DocumentData[] = [];
  const adminRef = collection(dbService, 'admin');

  const q = query(adminRef, where('user', '!=', userId));

  try {
    const docSnap = await getDocs(q);
  } catch (err) {}

  let admin: DocumentData[] = [];
  const querySnapshot = await getDocs(collection(dbService, 'admin'));
  querySnapshot.forEach((doc) => {
    admin.push({ ...doc.data() });
  });

  return admin[0].user;
};

export default getAdmin;
