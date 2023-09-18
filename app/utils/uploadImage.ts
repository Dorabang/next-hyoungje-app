import { authService, storageService } from '@/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

const uploadImage = async (url: string) => {
  const user = authService.currentUser;

  if (!user || !url) return;

  const profileRef = ref(storageService, `/profile/${user.uid}/photo.png`);
  await uploadString(profileRef, url);

  const photoURL = await getDownloadURL(profileRef);
  return photoURL;
};

export default uploadImage;
