import { authService, storageService } from '@/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

const uploadImage = async (path: string, url: string) => {
  const user = authService.currentUser;

  if (!user || !url) return;

  const photoRef = ref(storageService, `/${path}.jpg`);
  await uploadString(photoRef, url, 'data_url');

  const photoURL = await getDownloadURL(photoRef);
  return photoURL;
};

export default uploadImage;
