import { dbService } from '@/firebase';
import { DocumentData, getDoc, doc } from 'firebase/firestore';

const getPost = async (pathname: string, postId: string) => {
  let post: DocumentData[] = [];
  const docRef = doc(dbService, pathname, postId);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    post.push(docSnapshot.data());
  }

  return post;
};

export default getPost;
