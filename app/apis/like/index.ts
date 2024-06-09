import { dbService } from '@/firebase';
import { DocumentData, doc, getDoc, updateDoc } from 'firebase/firestore';

interface LikeProps {
  updateData: DocumentData;
  postId: string | null;
  pathname: string;
  userId?: string;
  updateBookmark: DocumentData;
}

export interface HasLikeProps {
  pathname: string;
  postId: string;
}

export const updatedLike = async (data: LikeProps) => {
  const { updateData, postId, pathname, userId, updateBookmark } = data;

  if (!postId || !userId) return;

  try {
    const postRef = doc(dbService, `${pathname}/${postId}`);
    const userRef = doc(dbService, `users/${userId}`);

    await updateDoc(postRef, { like: updateData });
    await updateDoc(userRef, { like: updateBookmark });
    return true;
  } catch (e) {
    console.log('🚀 ~ disabledLike ~ e:', e);
    return false;
  }
};

export const hasLike = async (data: HasLikeProps) => {
  const { pathname, postId } = data;
  let like;

  const likeRef = doc(dbService, `${pathname}/${postId}`);
  const likeSnapshot = await getDoc(likeRef);
  if (likeSnapshot.exists()) {
    like = likeSnapshot.data().like;

    return like;
  }
};
