'use client';
import React, { FormEvent, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from '@mui/material';

import useRedirect from '@/hooks/useRedirect';
import ContainerBox from '@/components/common/ContainerBox';
import Editor from '@/components/Editor';
import Input from '@/components/Edit/Input';
import LoadingPromise from '@/components/common/LoadingPromise';
import { UpdateImage } from '@/components/Edit';
import { createPost } from '@/apis/posts';
import { useAuthStore } from '@/stores/useAuthStore';
import { useEditorStore } from '@/stores/useEditorStore';
import { EditPageParams } from '@/constant/type';
import AutoHeightImageWrapper from '@/components/common/Wrapper/AutoHeightImageWrapper';

const ModifyPostPage = ({ params }: { params: EditPageParams }) => {
  const { id } = React.use(params);
  useRedirect();

  const pathname = usePathname().replace('/edit', '');
  const { user } = useAuthStore();

  const router = useRouter();

  const [title, setTitle] = useState('');
  const { value, setValue } = useEditorStore();
  const [isLoading, setIsLoading] = useState(false);

  const [image, setImage] = useState<UpdateImage[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading((prev) => !prev);

    const imageData = image.map((item) => item.data);

    const newPostObj = {
      title: title,
      contents: value,
      image: imageData,
      marketType: id,
    };

    const response = await createPost(newPostObj);

    if (response) {
      setValue('');
      setIsLoading(false);
      router.push(pathname);
    } else {
      alert(
        '문제가 발생하여 게시물 업데이트가 실패하였습니다. 다시 시도해주세요. \n\r지속적으로 문제 발생 시 관리자에 문의 부탁드립니다.',
      );
      router.back();
    }
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;

    if (files) {
      const fileList = Object.values(files).slice(0, 8);

      fileList.map((file, idx) => {
        const id = image.length > 0 ? image.length + 1 : idx + 1;
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = (e.target as FileReader).result;
          const images = { id, data: file, preview: result as string };
          setImage((prev) => [...prev, images]);
          return (images.preview = result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDeleteImage = (id: string | number) => {
    const filteredImage = image.filter((item) => item.id !== id);
    return setImage(filteredImage);
  };

  const handleDeleteImageAll = () => {
    setImage([]);
  };

  if (!id || !user) {
    alert('접근 권한이 없는 사용자입니다. 로그인 후 이용해주세요.');
    router.back();
  }

  return (
    <>
      {isLoading && <LoadingPromise />}
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

            <Input>
              <Input.Label>
                <p>
                  파일 첨부
                  <br />
                  <span className='text-grayColor-300 text-sm'>
                    {'('}
                    {image.length}/8{')'}
                  </span>
                </p>
              </Input.Label>
              <div className='flex flex-grow flex-wrap pl-3'>
                <div className='flex gap-2 items-center'>
                  <Input.File onChange={onFileChange} multiple>
                    파일 선택
                  </Input.File>
                  {image.length > 0 && (
                    <span
                      className='text-sm text-red-500 hover:text-red-800 active:text-red-800 cursor-pointer pl-2'
                      onClick={handleDeleteImageAll}
                    >
                      파일 전체 삭제
                    </span>
                  )}
                </div>
                {image && (
                  <ul className='w-full py-4 flex gap-2'>
                    {image.map((item) => (
                      <li key={item.id}>
                        <div className='w-[100px] h-[100px] relative flex gap-4 overflow-hidden'>
                          <AutoHeightImageWrapper
                            src={item.preview}
                            alt={`${item} 이미지`}
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
    </>
  );
};

export default ModifyPostPage;
