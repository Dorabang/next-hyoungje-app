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

interface NewCommentsProps {
  userId: string;
  comment: string;
}

interface CommentsProps extends NewCommentsProps {
  id: string;
  createdAt: number;
  nickname: string;
  updatedAt?: number;
}

export const addComments = async (pathname: string, data: NewCommentsProps) => {
  const commentsRef = collection(dbService, pathname, 'comments');
  await addDoc(commentsRef, {
    ...data,
    createdAt: Date.now(),
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

  const transformComments = await Promise.all(
    commentsArr.map(async (comment) => {
      const nickname = await getNickname(comment.userId);
      return { ...comment, nickname: nickname };
    }),
  );
  return transformComments as CommentsProps[];
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
