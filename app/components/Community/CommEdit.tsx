'use client';
import { useEffect, useState } from 'react';
import ContainerBox from '../ContainerBox';
import { useRouter } from 'next/navigation';
import { DocumentData, doc, updateDoc } from 'firebase/firestore';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ImageObjProps } from '@/(home)/edit/[id]/page';
import { authState, editorState } from '@/recoil/atoms';
import Image from 'next/image';
import imageCompression from 'browser-image-compression';
import uuid from 'react-uuid';
import { AiOutlineClose } from 'react-icons/ai';
import Editor from '../Editor';
import { Button } from '@mui/material';
import uploadImage from '@/apis/uploadImage';
import { dbService, storageService } from '@/firebase';
import GetImageURL from '@/apis/getImageURL';
import { deleteObject, ref } from 'firebase/storage';

const CommEdit = ({
  post,
  pathname,
}: {
  post: DocumentData;
  pathname: string;
}) => {
  const router = useRouter();

  const user = useRecoilValue(authState);

  const [title, setTitle] = useState(post.title);
  const [images, setImages] = useState<string[] | null>(null);
  const [imageArr, setImageArr] = useState<ImageObjProps[] | null>(null);
  const [value, setValue] = useRecoilState(editorState);

  const contents = post.contents;

  const postImages = post && post?.image;

  useEffect(() => {
    const getImage = (value: string) => {
      return setImages((prev) =>
        prev ? (!prev?.includes(value) ? [...prev, value] : prev) : [value],
      );
    };

    if (postImages && post.creatorId) {
      postImages.map((id: string) =>
        GetImageURL(`${pathname}/${post.creatorId}/post/${id}/image`, getImage),
      );
    }
  }, [postImages, post.creatorId, pathname]);

  useEffect(() => {
    setValue(contents);
  }, [setValue, contents]);

  const inputWrapperClass = 'flex w-full border-b border-grayColor-200 p-2';

  const handleSubmit = async () => {
    if (!user) return;

    imageArr?.map(async (value) => {
      await uploadImage(
        `${pathname}/${user.uid}/post/${value.id}/image`,
        value.imageUrl,
      );
    });

    const newImageArr = imageArr && imageArr.map((item) => item.id);

    const imageIdArr = postImages
      ? newImageArr
        ? [...newImageArr, ...postImages]
        : [...postImages]
      : newImageArr
        ? [...newImageArr]
        : null;

    const newPostObj = {
      title: title,
      contents: value,
      image: imageIdArr,
      like: [],
      views: 0,
      creatorName: user?.displayName,
      creatorId: user?.uid,
      updatedAt: Date.now(),
    };

    const docRef = doc(dbService, `${pathname}/${post.id}`);

    await updateDoc(docRef, newPostObj);
    setTitle('');
    setValue('');
    router.back();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;

    if (files) {
      const theFile = files[0];

      const options = {
        maxSizeMB: 0.2, // 이미지 최대 용량
        maxWidthOrHeight: 1920, // 최대 넓이(혹은 높이)
        useWebWorker: true,
      };

      imageCompression(theFile, options)
        .then((response) => {
          imageCompression.getDataUrlFromFile(response).then((result) => {
            const imageObj: ImageObjProps = { id: uuid(), imageUrl: result };

            setImageArr((prev) =>
              prev !== null ? [...prev, imageObj] : [imageObj],
            );
          });
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  };

  const handleDeleteImage = (id: string) => {
    if (imageArr?.length === 0 || imageArr === null) {
      return setImageArr(null);
    } else {
      const modifyImageArr = imageArr.filter((imageObj) => imageObj.id !== id);

      return setImageArr(modifyImageArr);
    }
  };

  const handleDBDeleteImage = async (id: string) => {
    if (postImages.filter((item: string) => id.includes(item))) {
      if (images?.length === 0 || images === null) {
        return setImages(null);
      } else {
        if (!user) return;

        const deleteImageRef = ref(
          storageService,
          `${pathname}/${user.uid}/post/${id}/image`,
        );

        await deleteObject(deleteImageRef);

        const deleteImages = images.filter((image) => image !== id);
        return setImages(deleteImages);
      }
    }
  };

  if (!post || !user) return;

  return (
    <ContainerBox>
      <div className='flex flex-col gap-4 justify-center mx-4 sm:mx-0 '>
        <form className='mb-3 flex flex-col justify-center [&_label]:w-[90px] [&_label]:border-r [&_label]:border-neutral-300'>
          <div className={`${inputWrapperClass}`}>
            <label htmlFor='title'>* 제목</label>
            <input
              type='text'
              value={title}
              name='title'
              onChange={(e) => setTitle(e.target.value)}
              placeholder='* 제목을 입력해주세요.'
              className='outline-none'
              required
            />
          </div>

          <div className={`${inputWrapperClass}`}>
            <p className='w-[90px] border-r border-neutral-300 cursor-default'>
              파일 첨부
            </p>
            <div className='flex flex-col pl-3'>
              <label
                htmlFor='addFile'
                className='py-1 w-[100px_!important] text-center cursor-pointer
                border border-grayColor-200 transition-colors
                hover:border-grayColor-500
                '
              >
                파일 선택
                <input
                  id='addFile'
                  name='addFile'
                  type='file'
                  accept='image/*'
                  onChange={onFileChange}
                  className='outline-none w-full hidden'
                  multiple
                />
              </label>
              {(images || imageArr) && (
                <ul className='w-full py-4 flex flex-wrap gap-2'>
                  {images &&
                    images.map((item) => (
                      <li key={item}>
                        <div className='w-[100px] h-[100px] relative flex gap-4 overflow-hidden'>
                          <Image
                            src={item}
                            alt={`${item} 이미지`}
                            fill
                            className='object-cover'
                          />
                          <div
                            className='absolute right-0 top-0 w-5 h-5
                        bg-black hover:bg-gray-900 transition-colors
                        flex justify-center items-center cursor-pointer'
                            onClick={() => handleDBDeleteImage(item)}
                          >
                            <AiOutlineClose className='text-white' />
                          </div>
                        </div>
                      </li>
                    ))}
                  {imageArr &&
                    imageArr.map((item) => (
                      <li key={item.id}>
                        <div className='w-[100px] h-[100px] relative flex gap-4 overflow-hidden'>
                          <Image
                            src={item.imageUrl}
                            alt={`${item} 이미지`}
                            fill
                            className='object-cover'
                          />
                          <div
                            className='absolute right-0 top-0 w-5 h-5
                          bg-black hover:bg-gray-900 transition-colors
                          flex justify-center items-center cursor-pointer'
                            onClick={() => handleDeleteImage(item.id)}
                          >
                            <AiOutlineClose className='text-white' />
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>

          <Editor />

          <div className='flex gap-2 justify-center pt-[80px]'>
            <Button
              type='reset'
              size='large'
              variant='contained'
              onClick={() => router.back()}
            >
              취소
            </Button>
            <Button
              type='submit'
              size='large'
              variant='contained'
              onClick={handleSubmit}
            >
              등록하기
            </Button>
          </div>
        </form>
      </div>
    </ContainerBox>
  );
};

export default CommEdit;
