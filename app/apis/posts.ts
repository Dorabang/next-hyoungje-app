import { dbService, storageService } from '@/firebase';
import { User } from 'firebase/auth';
import {
  DocumentData,
  collection,
  getDocs,
  orderBy,
  query,
  getDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

export const getPosts = async (pathname: string) => {
  let post: DocumentData[] = [];
  const postRef = collection(dbService, `${pathname}`);

  const q = query(postRef, orderBy('createdAt', 'desc'));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    return post.push({ id: doc.id, ...doc.data() });
  });

  return post;
};

export const getPost = async (pathname: string, postId: string) => {
  let post: DocumentData[] = [];
  const docRef = doc(dbService, pathname, postId);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    post.push(docSnapshot.data());
  }

  return post;
};

export const deletePost = async (
  post: DocumentData,
  user: User | null,
  pathname: string,
  id: string,
) => {
  const imageArr = post.image;

  if (!user) return;
  if (imageArr && imageArr.length > 0) {
    imageArr.map(async (item: string) => {
      const imgRef = ref(
        storageService,
        `${pathname}/${user.uid}/post/${item}/image.jpg`,
      );
      await deleteObject(imgRef);
    });
  }

  const postRef = doc(dbService, pathname, id);
  await deleteDoc(postRef);
};
