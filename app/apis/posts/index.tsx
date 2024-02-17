import { dbService, storageService } from '@/firebase';
import { User } from 'firebase/auth';
import {
  DocumentData,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  getDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref } from 'firebase/storage';

export const getSlidePosts = async (pathname: string) => {
  let post: DocumentData[] = [];
  const postRef = collection(dbService, `${pathname}`);

  const q = query(
    postRef,
    where('image', '!=', false),
    orderBy('image', 'asc'),
    orderBy('createdAt', 'desc'),
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
    console.log('🚀 ~ GetSlideURL err:', err);
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

export const getPosts = async (pathname: string) => {
  let post: DocumentData[] = [];
  const postRef = collection(dbService, `${pathname}`);

  const q = query(postRef, orderBy('createdAt', 'desc'));

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    return post.push({ id: doc.id, ...doc.data() });
  });

  return post;
};

export const getPost = async (pathname: string, postId: string) => {
  let post: DocumentData[] = [];
  const docRef = doc(dbService, pathname, postId);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    post.push(docSnapshot.data());
  }

  return post;
};

export const deletePost = async (
  post: DocumentData,
  user: User | null,
  pathname: string,
  id: string,
) => {
  const imageArr = post.image;

  if (!user) return;
  if (imageArr && imageArr.length > 0) {
    imageArr.map(async (item: string) => {
      const imgRef = ref(
        storageService,
        `${pathname}/${user.uid}/post/${item}/image.jpg`,
      );
      await deleteObject(imgRef);
    });
  }

  const postRef = doc(dbService, pathname, id);
  await deleteDoc(postRef);
};
