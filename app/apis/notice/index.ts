import { dbService } from '@/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

import { NotificationData } from '@/components/Main/NotificationWrapper/Notification';

export const getNoticeModal = async (uid?: string) => {
  const notice: NotificationData[] = [];

  const noticeRef = collection(dbService, 'notice');

  const q = query(noticeRef, where('popup', '==', true));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const noticePost = { id: doc.id, ...doc.data() } as NotificationData;
    return notice.push(noticePost);
  });

  return notice;
};
