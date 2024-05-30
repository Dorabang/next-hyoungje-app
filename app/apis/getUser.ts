import { dbService } from '@/firebase';
import { DocumentData, getDoc, doc } from 'firebase/firestore';

const getUser = async (uid: string) => {
  let post: DocumentData;
  const docRef = doc(dbService, 'users', uid);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    post = docSnapshot.data();

    return post;
  }
};

export default getUser;
