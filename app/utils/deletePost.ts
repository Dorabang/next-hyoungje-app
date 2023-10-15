import { dbService, storageService } from '@/firebase';
import { User } from 'firebase/auth';
import { DocumentData, deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

const DeletePost = async (
  post: DocumentData,
  user: User | null,
  pathname: string,
  id: string
) => {
  const imageArr = post.image;

  if (!user) return;
  if (imageArr && imageArr.length > 0) {
    imageArr.map(async (item: string) => {
      const imgRef = ref(
        storageService,
        `${pathname}/${user.uid}/post/${item}/image.jpg`
      );
      await deleteObject(imgRef);
    });
  }

  const postRef = doc(dbService, pathname, id);
  await deleteDoc(postRef);
};

export default DeletePost;
