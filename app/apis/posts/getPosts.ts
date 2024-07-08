import { dbService } from '@/firebase';
import {
  DocumentData,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

const getPosts = async (pathname: string) => {
  let post: DocumentData[] = [];
  const postRef = collection(dbService, `${pathname}`);

  const q = query(
    postRef,
    where('image', '!=', false),
    orderBy('image', 'asc'),
    orderBy('createdAt', 'desc'),
    limit(5),
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    return post.push({ id: doc.id, ...doc.data() });
  });

  return post;
};

export default getPosts;
