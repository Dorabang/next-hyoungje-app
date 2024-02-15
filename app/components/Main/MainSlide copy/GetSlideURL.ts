import { storageService } from '@/firebase';
import { getDownloadURL, ref } from 'firebase/storage';

const GetSlideURL = async (
  url: string,
  id: string,
  changeImg: (id: string, value: string) => void
) => {
  const photoRef = ref(storageService, `${url}.jpg`);

  await getDownloadURL(photoRef)
    .then((url) => {
      changeImg(id, url);
    })
    .catch((error) => {
      // console.log('DownloadURL error: ' + error)
    });
};

export default GetSlideURL;
