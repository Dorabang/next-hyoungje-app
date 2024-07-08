'use server';

import { authService, storageService } from '@/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

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

export const uploadImage = async (path: string, url: string) => {
  const user = authService.currentUser;

  if (!user || !url) return;

  const photoRef = ref(storageService, `/${path}.jpg`);
  await uploadString(photoRef, url, 'data_url');

  const photoURL = await getDownloadURL(photoRef);
  return photoURL;
};
