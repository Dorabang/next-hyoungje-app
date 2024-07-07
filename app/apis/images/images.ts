import { storageService } from '@/firebase';
import { getDownloadURL, ref } from 'firebase/storage';

export const getImageURL = async (
  pathname: string,
  userId: string,
  id: string,
) => {
  const photoRef = ref(
    storageService,
    `${pathname}/${userId}/post/${id}/image.jpg`,
  );

  const downloadURL = await getDownloadURL(photoRef);

  return downloadURL;
};
