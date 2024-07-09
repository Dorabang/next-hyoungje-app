'use server';
import { dbService } from '@/firebase';
import {
  DocumentData,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from 'firebase/firestore';
import { getImageURL } from './images';

export const getSlidePosts = async (pathname: string) => {
  let post: DocumentData[] = [];
  const postRef = collection(dbService, `${pathname}`);

  const q = query(
    postRef,
    orderBy('num', 'desc'),
    orderBy('image', 'desc'),
    limit(5),
  );

  try {
    const docSnap = await getDocs(q);

    docSnap.forEach((doc) => {
      return post.push({ id: doc.id, ...doc.data() });
    });
  } catch (err) {
    // console.log('🚀 ~ getSlidePosts ~ err1:', err);
  }

  const transformPost = await transformPosts(pathname, post);

  return transformPost;
};

export const transformPosts = async (
  pathname: string,
  data: DocumentData[],
) => {
  return await Promise.all(
    data.map(async (post) => {
      const img = await getImageURL(
        `${pathname}/${post.creatorId}/post/${post.image[0]}/image`,
      );
      return { ...post, image: img };
    }),
  );
};
