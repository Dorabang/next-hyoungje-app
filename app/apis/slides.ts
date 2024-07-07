import { dbService, storageService } from '@/firebase';
import {
  DocumentData,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

export const getSlidePosts = async (pathname: string) => {
  let post: DocumentData[] = [];
  const postRef = collection(dbService, `${pathname}`);

  const q = query(
    postRef,
    where('image', '!=', null).orderBy('num', 'desc'),
    orderBy('image', 'desc'),
    limit(5),
  );

  try {
    const docSnap = await getDocs(q);

    docSnap.forEach((doc) => {
      return post.push({ id: doc.id, ...doc.data() });
    });
  } catch (err) {
    console.log('🚀 ~ getSlidePosts ~ err1:', err);
  }

  const imgArr = await getImages(pathname, post);
  return imgArr;
};

const getSlideURL = (url: string) => {
  const photoRef = ref(storageService, `${url}.jpg`);
  try {
    const getUrl = async () => {
      return await getDownloadURL(photoRef);
    };
    const photoUrl = getUrl();
    return photoUrl;
  } catch (err) {
    // console.log('🚀 ~ GetSlideURL err:', err);
    return;
  }
};

export const getImages = async (pathname: string, data: DocumentData[]) => {
  return await Promise.all(
    data.map(async (post) => {
      const img = await getSlideURL(
        `${pathname}/${post.creatorId}/post/${post.image[0]}/image`,
      );
      return { ...post, image: img };
    }),
  );
};
