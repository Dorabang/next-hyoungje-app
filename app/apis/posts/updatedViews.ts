import { dbService } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export const updatedViews = async (views: number, pathname: string) => {
  const docRef = doc(dbService, `${pathname}`);

  await updateDoc(docRef, { views: views + 1 });
};
