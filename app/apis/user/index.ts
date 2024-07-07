'use server';
import { dbService } from '@/firebase';
import {
  DocumentData,
  getDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
  limit,
} from 'firebase/firestore';

export const getUser = async (uid?: string) => {
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

export const getAdmin = async (userId: string) => {
  let admin: DocumentData[] = [];
  const adminRef = collection(dbService, 'admin');

  const q = query(adminRef, where('user', '==', userId), limit(1));

  const adminSnap = await getDocs(q);
  adminSnap.forEach((doc) => {
    admin.push({ ...doc.data() });
  });

  if (admin.length !== 0) return true;
  return false;
};
