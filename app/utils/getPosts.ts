import { dbService } from '@/firebase';
import { postsProps } from '@/wild-market1/page';
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';

const getPosts = async (pathname: string) => {
  let post: postsProps[] | any = [];
  const querySnapshot = await getDocs(collection(dbService, `${pathname}`));
  querySnapshot.forEach((doc) => {
    post.push({ id: doc.id, data: doc.data() });
  });

  return post;
};

export const getPostsTest = async (pathname: string) => {
  const unsub = onSnapshot(
    doc(dbService, `${pathname}`),
    { includeMetadataChanges: true },
    (doc) => {
      console.log('Current data: ', doc.data());
    }
  );

  return unsub;
};

export default getPosts;
