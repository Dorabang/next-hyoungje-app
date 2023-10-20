import { dbService } from '@/firebase';
import { DocumentData, collection, getDocs } from 'firebase/firestore';

const getPosts = async (pathname: string) => {
  let post: DocumentData[] = [];
  const querySnapshot = await getDocs(collection(dbService, `${pathname}`));
  querySnapshot.forEach((doc) => {
    post.push({ id: doc.id, ...doc.data() });
  });

  post.sort(function (a: DocumentData, b: DocumentData) {
    return Number(a.createdAt) - Number(b.createdAt);
  });

  return post;
};

export default getPosts;
