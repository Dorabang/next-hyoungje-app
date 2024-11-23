'use client';
import { FormEvent, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

import ContainerBox from '../common/ContainerBox';
import Editor from '../Editor';
import Input from '../Edit/Input';
import LoadingPromise from '../common/LoadingPromise';
import { UpdateImage } from '../Edit';
import { putPost } from '@/apis/posts';
import { Post } from '../common/Board/types';
import { useAuthStore } from '@/stores/useAuthStore';
import { useEditorStore } from '@/stores/useEditorStore';
import AutoHeightImageWrapper from '../common/Wrapper/AutoHeightImageWrapper';

const CommEdit = ({ post }: { post: Post }) => {
  const router = useRouter();

  const { user } = useAuthStore();

  const [title, setTitle] = useState(post.title);
  const [prevImage, setPrevImage] = useState<string[]>(post.image ?? []);
  const [updateImage, setUpdateImage] = useState<UpdateImage[]>([]);
  const { value, setValue } = useEditorStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setValue(post.contents);
  }, [setValue, post.contents]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading((prev) => !prev);

    const updateImageData = updateImage.map((item) => item.data);

    const newPostObj = {
      title: title,
      contents: value,
      ...(prevImage && { prevImage }),
      updateImage: updateImageData,
    };

    const response = await putPost(post.postId, newPostObj);

    if (response.result === 'SUCCESS') {
      setValue('');
      setIsLoading(false);
      router.back();
    } else {
      alert(
        '문제가 발생하여 게시물 업데이트에 실패하였습니다. 다시 시도해주세요. \n\r지속적으로 문제 발생 시 관리자에 문의 부탁드립니다.',
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
        const id = updateImage.length > 0 ? updateImage.length + 1 : idx + 1;
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = (e.target as FileReader).result;
          const updateImages = { id, data: file, preview: result as string };
          setUpdateImage((prev) => [...prev, updateImages]);
          return (updateImages.preview = result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDeleteImage = (
    type: 'prevImage' | 'updateImage',
    id: string | number,
  ) => {
    if (type === 'prevImage') {
      const filteredImage = prevImage.filter((item) => item !== id);
      return setPrevImage(filteredImage);
    }

    const filteredImage = updateImage.filter((item) => item.id !== +id);
    return setUpdateImage(filteredImage);
  };

  const handleDeleteImageAll = () => {
    setUpdateImage([]);
    setPrevImage([]);
  };

  if (!post || !user) {
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
                placeholder='* 제목을 입력해주세요.'
              />
            </Input>

            <Input>
              <Input.Label>
                <p>
                  파일 첨부
                  <br />
                  <span className='text-grayColor-300 text-sm'>
                    {'('}
                    {updateImage?.length || prevImage?.length
                      ? (updateImage?.length ??
                        0 + (prevImage ? prevImage.length : 0))
                      : 0}
                    /8
                    {')'}
                  </span>
                </p>
              </Input.Label>
              <div className='flex flex-col pl-3'>
                <div className='flex gap-2 items-center'>
                  <Input.File onChange={onFileChange} multiple>
                    파일 선택
                  </Input.File>
                  {(updateImage || prevImage) && (
                    <span
                      className='text-sm text-red-500 hover:text-red-800 active:text-red-800 cursor-pointer pl-2'
                      onClick={() => handleDeleteImageAll()}
                    >
                      파일 전체 삭제
                    </span>
                  )}
                </div>
                {(prevImage || updateImage) && (
                  <ul className='w-full py-4 flex flex-wrap gap-2'>
                    {prevImage &&
                      prevImage.map((item) => (
                        <li key={item}>
                          <div className='w-[100px] h-[100px] relative flex gap-4 overflow-hidden'>
                            <AutoHeightImageWrapper
                              src={item}
                              alt={`${item} 이미지`}
                            />
                            <div
                              className='absolute right-0 top-0 w-5 h-5
                        bg-black hover:bg-gray-900 transition-colors
                        flex justify-center items-center cursor-pointer'
                              onClick={() =>
                                handleDeleteImage('prevImage', item)
                              }
                            >
                              <AiOutlineClose className='text-white' />
                            </div>
                          </div>
                        </li>
                      ))}
                    {updateImage &&
                      updateImage.map((item) => (
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
                              onClick={() =>
                                handleDeleteImage('updateImage', item.id)
                              }
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

export default CommEdit;
