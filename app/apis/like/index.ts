import { dbService } from '@/firebase';
import {
  DocumentData,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

interface LikeProps {
  updateData: DocumentData;
  postId: DocumentData | null;
  pathname: string;
}

interface HasLikeProps {
  pathname: string;
  userId?: string;
  postId: string;
}

export const updatedLike = async (data: LikeProps) => {
  const { updateData, postId, pathname } = data;

  if (!postId) return;

  try {
    const postRef = doc(dbService, `${pathname}/${postId}`);

    await updateDoc(postRef, { like: updateData });
    return true;
  } catch (e) {
    console.log('🚀 ~ disabledLike ~ e:', e);
    return false;
  }
};

export const hasLike = async (data: HasLikeProps) => {
  const { userId, pathname, postId } = data;

  if (!userId) return false;

  let like: DocumentData[] = [];
  const likeRef = collection(dbService, `${pathname}`);

  const q = query(likeRef, where('like', '==', userId));

  try {
    const likeSnap = await getDocs(q);
    likeSnap.forEach((doc) => {
      like.push({ ...doc.data() });
    });

    if (like.length !== 0) return true;
    return false;
  } catch (err) {
    console.log('🚀 ~ getAdmin ~ err:', err);
    return false;
  }
};
