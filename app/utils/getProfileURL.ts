import { storageService } from '@/firebase';
import { User } from 'firebase/auth';
import { getDownloadURL, ref } from 'firebase/storage';

const GetProfileURL = async (
  user: User | null,
  changeProfile: (value: string) => void
) => {
  if (user) {
    const profileRef = ref(storageService, `/profile/${user.uid}/photo.png`);

    await getDownloadURL(profileRef)
      .then((url) => {
        return changeProfile(url + '.png');
      })
      .catch((error) => console.log('DownloadURL error: ' + error));
  }
};

export default GetProfileURL;
