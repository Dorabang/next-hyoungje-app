import { dbService } from '@/firebase';
import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { getNickname } from '../user';

interface CommentsProps {
  userId: string;
  comment: string;
}

export const addComments = async (pathname: string, data: CommentsProps) => {
  const commentsRef = collection(dbService, pathname, 'comments');
  const nickname = await getNickname(data.userId);
  await addDoc(commentsRef, {
    createdAt: Date.now(),
    nickname,
    ...data,
  });
};

export const getComments = async (pathname: string) => {
  const commentsArr: DocumentData[] = [];

  const commentsRef = collection(dbService, pathname, 'comments');
  const commentsSnapshot = await getDocs(commentsRef);

  commentsSnapshot.docs
    .sort((a, b) => a.data().createdAt - b.data().createdAt)
    .forEach((doc) => {
      return commentsArr.push({
        id: doc.id,
        ...doc.data(),
      });
    });

  return commentsArr;
};

export const updateComments = async (
  pathname: string,
  data: { comment: string; updatedAt: number },
  id: string,
) => {
  const commentsRef = doc(dbService, pathname, 'comments', id);
  await updateDoc(commentsRef, {
    comment: data.comment,
    updatedAt: data.updatedAt,
  });
};

export const deleteComments = async (pathname: string, id: string) => {
  const commentsRef = doc(dbService, pathname, 'comments', id);
  await deleteDoc(commentsRef);
};
