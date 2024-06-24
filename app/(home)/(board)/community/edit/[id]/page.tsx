'use client';

import React, { FormEvent, useState } from 'react';
import ContainerBox from '@/components/ContainerBox';
import useRedirect from '@/hooks/useRedirect';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState, editorState } from '@/recoil/atoms';
import { Button } from '@mui/material';
import { dbService } from '@/firebase';
import {
  DocumentData,
  addDoc,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';
import uuid from 'react-uuid';
import { useRouter } from 'next/navigation';
import uploadImage from '@/apis/uploadImage';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';
import Editor from '@/components/Editor';
import imageCompression from 'browser-image-compression';
import getPostsAmount from '@/apis/getPostsAmount';

export interface ImageObjProps {
  id: string;
  imageUrl: string;
}

const ModifyPostPage = ({ params: { id } }: { params: { id: string } }) => {
  useRedirect();

  const user = useRecoilValue(authState);

  const router = useRouter();

  const [title, setTitle] = useState('');
  const [value, setValue] = useRecoilState(editorState);

  /* 이미지 id, url 정보를 담은 배열 */
  const [selectedImage, setSelectedImage] = useState<ImageObjProps[] | null>(
    null,
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;

    /* 이미지 업로드 */
    selectedImage?.map(async (value) => {
      await uploadImage(
        `${id}/${user.uid}/post/${value.id}/image`,
        value.imageUrl,
      );
    });

    /* 이미지 ID 저장 */
    const imageIdArr = selectedImage && selectedImage.map((item) => item.id);

    const postAmount: DocumentData | undefined = await getPostsAmount(
      `postsAmount/${id}`,
    );

    const newPostObj = {
      title: title,
      image: imageIdArr,
      contents: value,
      like: [],
      views: 0,
      num: postAmount?.amount + 1,
      creatorName: user?.displayName,
      creatorId: user?.uid,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await addDoc(collection(dbService, `${id}`), newPostObj);

    const postsAmountRef = doc(dbService, `postsAmount/${id}`);

    updateDoc(postsAmountRef, { amount: postAmount?.amount + 1 });

    setTitle('');
    setValue('');
    router.back();
  };

  const inputWrapClass = 'flex items-start w-full border-b border-[#ddd] p-2';

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;

    if (files) {
      const fileList = Object.values(files).slice(0, 8);

      const options = {
        maxSizeMB: 0.2, // 이미지 최대 용량
        maxWidthOrHeight: 1920, // 최대 넓이(혹은 높이)
        useWebWorker: true,
      };

      fileList.map((file) => {
        imageCompression(file, options)
          .then((response) => {
            imageCompression.getDataUrlFromFile(response).then((result) => {
              const imageObj: ImageObjProps = { id: uuid(), imageUrl: result };

              setSelectedImage((prev) =>
                prev !== null ? [...prev, imageObj] : [imageObj],
              );
            });
          })
          .catch((error) => {
            // console.log('🚀 ~ onFileChange ~ error:', error);
          });
      });
    }
  };
  const handleDeleteImage = (id: string) => {
    if (selectedImage?.length === 0 || selectedImage === null) {
      return setSelectedImage(null);
    } else {
      const modifyImageArr = selectedImage.filter(
        (imageObj) => imageObj.id !== id,
      );

      return setSelectedImage(modifyImageArr);
    }
  };

  return (
    <ContainerBox>
      <div className='flex flex-col gap-4 justify-center mx-4 sm:mx-0 '>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className='mb-3 flex flex-col justify-center [&_label]:w-[90px] [&_label]:border-r [&_label]:border-grayColor-300'
        >
          <div className={`${inputWrapClass}`}>
            <label htmlFor='phone'>제목 *</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='제목을 입력해주세요.'
              className='outline-none pl-3'
              required
            />
          </div>

          <div className={`${inputWrapClass}`}>
            <p className='w-[90px] border-r border-grayColor-300 cursor-default flex flex-col gap-2'>
              파일 첨부
              <span className='text-grayColor-300 text-sm'>
                {'('}
                {selectedImage ? selectedImage.length : '0'}/8{')'}
              </span>
            </p>
            <div className='flex flex-grow flex-wrap pl-3'>
              <div className='flex gap-2 items-center'>
                <label
                  htmlFor='addFile'
                  className={`py-1 w-[100px_!important] text-center
                border border-[#ddd] transition-colors
                ${selectedImage && selectedImage.length >= 8 ? '' : ' cursor-pointer hover:border-[#333]'}
                `}
                >
                  파일 선택
                  <input
                    id='addFile'
                    name='addFile'
                    type='file'
                    multiple
                    disabled={
                      selectedImage && selectedImage.length >= 8 ? true : false
                    }
                    accept='image/*'
                    onChange={onFileChange}
                    className='outline-none w-full hidden group'
                  />
                </label>
                {selectedImage && (
                  <span
                    className='text-sm text-red-500 hover:text-red-800 active:text-red-800 cursor-pointer pl-2'
                    onClick={() => setSelectedImage(null)}
                  >
                    파일 전체 삭제
                  </span>
                )}
              </div>
              {selectedImage && (
                <ul className='w-full py-4 flex gap-2'>
                  {selectedImage.map((item) => (
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

          <div className='flex justify-center pt-[80px]'>
            <Button type='submit' size='large' variant='contained'>
              등록하기
            </Button>
          </div>
        </form>
      </div>
    </ContainerBox>
  );
};

export default ModifyPostPage;
