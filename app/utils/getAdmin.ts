import { dbService } from '@/firebase';
import { DocumentData, collection, getDocs } from 'firebase/firestore';

const getAdmin = async () => {
  let admin: DocumentData[] = [];
  const querySnapshot = await getDocs(collection(dbService, 'admin'));
  querySnapshot.forEach((doc) => {
    admin.push({ ...doc.data() });
  });

  return admin[0].user;
};

export default getAdmin;
