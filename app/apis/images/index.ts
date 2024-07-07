'use server';

import { storageService } from '@/firebase';
import { getDownloadURL, ref } from 'firebase/storage';

export const getImageURL = async (url: string) => {
  const photoRef = ref(storageService, `${url}.jpg`);

  const photoURL = await getDownloadURL(photoRef);

  return photoURL;
};

export const getPostImageURL = async (
  pathname: string,
  userId: string,
  imageId: string,
) => {
  const photoRef = ref(
    storageService,
    `${pathname}/${userId}/post/${imageId}/image.jpg`,
  );

  const downloadURL = await getDownloadURL(photoRef);

  return downloadURL;
};
