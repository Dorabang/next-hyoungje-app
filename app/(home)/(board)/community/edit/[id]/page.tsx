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
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';
import Editor from '@/components/Editor';
import getPostsAmount from '@/apis/posts/getPostsAmount';
import { imageResize } from '@/utils/imageResize';
import { uploadImage } from '@/apis/images';
import Input from '@/components/Edit/Input';

export interface ImageObjProps {
  id: string;
  imageUrl: string;
}

const ModifyPostPage = ({ params: { id } }: { params: { id: string } }) => {
  useRedirect();

  const user = useRecoilValue(authState);

  const router = useRouter();

  const [title, setTitle] = useState('');
  const [popup, setPopup] = useState(false);
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
      ...(imageIdArr !== null && { image: imageIdArr }),
      popup: popup,
      contents: value,
      like: [],
      views: 0,
      num: postAmount?.amount + 1,
      creatorId: user?.uid,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await addDoc(collection(dbService, `${id}`), newPostObj);

    const postsAmountRef = doc(dbService, `postsAmount/${id}`);

    updateDoc(postsAmountRef, { amount: postAmount?.amount + 1 });

    setTitle('');
    setValue('');
    setPopup(false);
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

        setSelectedImage((prev) =>
          prev !== null ? [...prev, imageObj] : [imageObj],
        );
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
      <div className='flex flex-col gap-4 justify-center mx-4 sm:mx-0'>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className='mb-3 flex flex-col justify-center'
        >
          <Input required>
            <Input.Label>제목</Input.Label>
            <Input.Text
              value={title}
              name='title'
              onChange={(e) => setTitle(e.target.value)}
              placeholder='제목을 입력해주세요.'
            />
          </Input>

          {id.includes('notice') && (
            <Input>
              <Input.Label>공지 등록</Input.Label>
              <Input.Radio
                checked={popup}
                name='popup'
                onChange={(e) => setPopup(e.target.checked)}
              >
                공지 등록하기
              </Input.Radio>
            </Input>
          )}

          <Input>
            <Input.Label>
              <p>
                파일 첨부
                <br />
                <span className='text-grayColor-300 text-sm'>
                  {'('}
                  {selectedImage ? selectedImage.length : '0'}/8{')'}
                </span>
              </p>
            </Input.Label>
            <div className='flex flex-grow flex-wrap pl-3'>
              <div className='flex gap-2 items-center'>
                <Input.File onChange={onFileChange}>파일 선택</Input.File>
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
          </Input>

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
