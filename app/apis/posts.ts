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
  limit,
  where,
} from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

export interface PostProps {
  image: string[] | null;
  creatorId: string;
  creatorName: string;
  createdAt: number;
  updatedAt: number;
  title: string;
  amount: number;
  date: string;
  height: string;
  id: string;
  like: string[];
  num: number;
  phone: string;
  place: string;
  price: string;
  status: 'sale' | 'sold-out' | 'reservation';
  variant: string;
  views: number;
  width: string;
  contents: string;
}

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
  const docRef = doc(dbService, `${pathname}/${postId}`);
  const docSnapshot = await getDoc(docRef);

  const res = docSnapshot.data();
  if (res) {
    return { id: docSnapshot.id, ...res } as PostProps;
  }
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

export const getPrevPost = async (pathname: string, postNum: number) => {
  let prevPost: DocumentData = {};
  const collectionRef = collection(dbService, pathname);

  const q = query(
    collectionRef,
    where('num', '<', postNum),
    orderBy('num', 'desc'),
    limit(1),
  );

  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length === 0) return null;

  querySnapshot.forEach((doc) => {
    return (prevPost = { id: doc.id, ...doc.data() });
  });

  return prevPost;
};
export const getNextPost = async (pathname: string, postNum: number) => {
  let nextPost: DocumentData | null = null;
  const collectionRef = collection(dbService, pathname);

  const q = query(
    collectionRef,
    where('num', '>', postNum),
    orderBy('num', 'asc'),
    limit(1),
  );

  const querySnapshot = await getDocs(q);
  if (querySnapshot.docs.length === 0) return null;
  querySnapshot.forEach((doc) => {
    return (nextPost = { id: doc.id, ...doc.data() });
  });

  return nextPost;
};
