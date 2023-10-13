import { storageService } from '@/firebase';
import { getDownloadURL, ref } from 'firebase/storage';

const GetImageURL = async (url: string, changeImg: (value: string) => void) => {
  const photoRef = ref(storageService, `${url}.jpg`);

  await getDownloadURL(photoRef)
    .then((url) => {
      return changeImg(url);
    })
    .catch((error) => console.log('DownloadURL error: ' + error));
};

export default GetImageURL;
