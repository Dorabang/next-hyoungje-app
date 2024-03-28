import { dbService } from '@/firebase';
import { DocumentData, doc, updateDoc } from 'firebase/firestore';

export const updatedViews = async (post: DocumentData, pathname: string) => {
  const newPostObj = { ...post, views: post.views + 1 };
  const docRef = doc(dbService, `${pathname}/${post.id}`);

  await updateDoc(docRef, newPostObj);
};
