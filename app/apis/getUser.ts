import { dbService } from '@/firebase';
import {
  DocumentData,
  getDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
} from 'firebase/firestore';

const getUser = async (uid?: string) => {
  if (!uid) return;
  let post: DocumentData;
  const docRef = doc(dbService, 'users', uid);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    post = docSnapshot.data();

    return post;
  }
};

export const getNickname = async (uid: string) => {
  let nickname: string = '';
  const q = query(collection(dbService, 'users'), where('id', '==', uid));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    nickname = doc.data().displayName;
  });
  return nickname;
};

export default getUser;
