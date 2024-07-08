'use client';
import { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import uuid from 'react-uuid';
import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { DocumentData, doc, updateDoc } from 'firebase/firestore';
import { useRecoilState, useRecoilValue } from 'recoil';
import { dbService, storageService } from '@/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { Button } from '@mui/material';

import ContainerBox from '../ContainerBox';
import { ImageObjProps } from '@/(home)/edit/[id]/page';
import { authState, editorState } from '@/recoil/atoms';
import Editor from '../Editor';
import uploadImage from '@/apis/images/uploadImage';
import GetImageURL from '@/apis/images/getImageURL';
import { imageResize } from '@/utils/imageResize';

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

  const inputWrapperClass =
    'flex items-start w-full border-b border-grayColor-200 p-2';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    imageArr?.map(async (value) => {
      await uploadImage(
        `${pathname}/${post.creatorId}/post/${value.id}/image`,
        value.imageUrl,
      );
    });

    const newImageArr = imageArr && imageArr.map((item) => item.id);

    const prevImage = postImages?.filter((item: string) =>
      images?.filter((items) => items.includes(item)),
    );

    const imageIdArr = postImages
      ? newImageArr
        ? [...newImageArr, ...prevImage]
        : [...prevImage]
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
      const fileList = Object.values(files).slice(0, 8);

      fileList.map(async (file) => {
        const resizingImage = await imageResize(file);

        const imageObj: ImageObjProps = { id: uuid(), imageUrl: resizingImage };

        setImageArr((prev) =>
          prev !== null ? [...prev, imageObj] : [imageObj],
        );
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
        <form
          onSubmit={(e) => handleSubmit(e)}
          className='mb-3 flex flex-col justify-center [&_label]:w-[90px] [&_label]:border-r [&_label]:border-grayColor-300'
        >
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
            <p className='w-[90px] border-r border-grayColor-300 cursor-default flex flex-col gap-2'>
              파일 첨부
              <span className='text-grayColor-300 text-sm'>
                {'('}
                {imageArr ? imageArr.length : '0'}
                /8{')'}
              </span>
            </p>
            <div className='flex flex-col pl-3'>
              <div className='flex gap-2 items-center'>
                <label
                  htmlFor='addFile'
                  className={`py-1 w-[100px_!important] text-center
                border border-[#ddd] transition-colors
                ${imageArr && imageArr.length >= 8 ? '' : ' cursor-pointer hover:border-[#333]'}
                `}
                >
                  파일 선택
                  <input
                    id='addFile'
                    name='addFile'
                    type='file'
                    accept='image/*'
                    multiple
                    disabled={imageArr && imageArr.length >= 8 ? true : false}
                    onChange={onFileChange}
                    className='outline-none w-full hidden group'
                  />
                </label>
                {imageArr && (
                  <span
                    className='text-sm text-red-500 hover:text-red-800 active:text-red-800 cursor-pointer pl-2'
                    onClick={() => setImageArr(null)}
                  >
                    파일 전체 삭제
                  </span>
                )}
              </div>
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
            <Button type='submit' size='large' variant='contained'>
              등록하기
            </Button>
          </div>
        </form>
      </div>
    </ContainerBox>
  );
};

export default CommEdit;
