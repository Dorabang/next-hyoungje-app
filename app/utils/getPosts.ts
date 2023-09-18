import { dbService } from '@/firebase';
import { postsProps } from '@/wild-market1/page';
import { collection, getDocs } from 'firebase/firestore';

const getPosts = async (pathname: string) => {
  let post: postsProps[] | any = [];
  const querySnapshot = await getDocs(collection(dbService, `${pathname}`));
  querySnapshot.forEach((doc) => {
    post.push({ id: doc.id, data: doc.data() });
  });

  return post;
};

export default getPosts;
