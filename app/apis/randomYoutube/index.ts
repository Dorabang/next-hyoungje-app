import { dbService } from '@/firebase';
import {
  DocumentData,
  OrderByDirection,
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
} from 'firebase/firestore';

interface YoutubeData {
  name: string;
  url: string;
  summary: string;
  id?: string;
}

export const createRandomYoutubeFields = async (data: YoutubeData) => {
  const youtubeRef = collection(dbService, 'youtube');

  const randomField = {
    randomA: Math.floor(Math.random() * 10000),
    randomB: Math.floor(Math.random() * 10000),
    randomC: Math.floor(Math.random() * 10000),
    randomD: Math.floor(Math.random() * 10000),
  };

  await addDoc(youtubeRef, {
    createdAt: Date.now(),
    updatedAt: Date.now(),
    ...data,
    ...randomField,
  });
};

export const getRandomYoutubeField = async (
  pageSize: number,
  lastViewRef = 1000000,
) => {
  const randomIndex = Math.floor(Math.random() * 4);
  const randomField = ['A', 'B', 'C', 'D'];
  const selectedField = randomField[randomIndex];

  const sortIndex = Math.floor(Math.random() * 2);
  const sortField = ['asc', 'desc'];
  const selectedSortField = sortField[sortIndex] as OrderByDirection;

  const youtubeRef = collection(dbService, 'youtube');

  const q = lastViewRef
    ? query(
        youtubeRef,
        orderBy(`random${selectedField}`, `${selectedSortField}`),
        startAt(lastViewRef),
        limit(pageSize),
      )
    : query(
        youtubeRef,
        orderBy(`random${selectedField}`, `${selectedSortField}`),
        startAt(1000000),
        limit(pageSize),
      );

  const querySnapshot = await getDocs(q);

  const results = [];

  await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const data: DocumentData = doc.data();

      const result: DocumentData = { id: doc.id, ...data };
      return results.push(result);
    }),
  );
};
