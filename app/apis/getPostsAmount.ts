import { dbService } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';

const getPostsAmount = async (path: string) => {
  const postsAmountRef = doc(dbService, `${path}`);

  const postsAmountSnap = await getDoc(postsAmountRef);

  const postsAmount = postsAmountSnap.data();

  return postsAmount;
};

export default getPostsAmount;
