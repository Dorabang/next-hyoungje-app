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
import { imageResize } from '@/utils/imageResize';
import { getPostImageURL, uploadImage } from '@/apis/images';
import Input from '../Edit/Input';
import LoadingPromise from '../LoadingPromise';

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
  const [popup, setPopup] = useState(post.popup);
  const [prevImages, setPrevImages] = useState<string[] | null>(null);
  const [newImages, setNewImages] = useState<ImageObjProps[] | null>(null);
  const [value, setValue] = useRecoilState(editorState);
  const [isLoading, setIsLoading] = useState(false);
  const contents = post.contents;

  const postImages = post && post?.image;

  useEffect(() => {
    if (postImages) {
      postImages.forEach(async (img: string) => {
        const url = await getPostImageURL(pathname, post.creatorId, img);
        setPrevImages((prev) =>
          prev ? (!prev?.includes(url) ? [...prev, url] : prev) : [url],
        );
      });
    }
  }, [postImages, pathname, post.creatorId]);

  useEffect(() => {
    setValue(contents);
  }, [setValue, contents]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading((prev) => !prev);

    if (!user) return;

    if (newImages) {
      await Promise.all(
        newImages?.map(async (value) => {
          await uploadImage(
            `${pathname}/${post.creatorId}/post/${value.id}/image`,
            value.imageUrl,
          );
        }),
      );
    }

    const newnewImages = newImages && newImages.map((item) => item.id);

    const prevImage = postImages?.filter((item: string) =>
      prevImages?.filter((items) => items.includes(item)),
    );

    const imageIdArr = postImages
      ? newnewImages
        ? [...newnewImages, ...prevImage]
        : [...prevImage]
      : newnewImages
        ? [...newnewImages]
        : null;

    const newPostObj = {
      title: title,
      contents: value,
      ...(imageIdArr !== null && { image: imageIdArr }),
      popup: popup,
      updatedAt: Date.now(),
    };

    const docRef = doc(dbService, `${pathname}/${post.id}`);

    await updateDoc(docRef, newPostObj);
    setTitle('');
    setValue('');
    setPopup(false);
    setIsLoading(false);
    router.back();
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;
    try {
      if (files) {
        const fileList = Object.values(files).slice(0, 8);

        fileList.map(async (file) => {
          const resizingImage = await imageResize(file);

          const imageObj: ImageObjProps = {
            id: uuid(),
            imageUrl: resizingImage,
          };

          setNewImages((prev) =>
            prev !== null ? [...prev, imageObj] : [imageObj],
          );
        });
      }
    } catch (err) {
      console.log('🚀 ~ onFileChange ~ err:', err);
    }
  };

  const handleDeleteImage = (id: string) => {
    if (newImages?.length === 0 || newImages === null) {
      return setNewImages(null);
    } else {
      const modifynewImages = newImages.filter(
        (imageObj) => imageObj.id !== id,
      );

      return setNewImages(modifynewImages);
    }
  };

  const handleDeleteImageAll = () => {
    setNewImages(null);

    prevImages?.forEach(async (image) => {
      await handleDBDeleteImage(image);
      setPrevImages(null);
    });
  };

  const handleDBDeleteImage = async (id: string) => {
    if (postImages.filter((item: string) => id.includes(item))) {
      if (prevImages?.length === 0 || prevImages === null) {
        return setPrevImages(null);
      } else {
        if (!user) return;

        const deleteImageRef = ref(
          storageService,
          `${pathname}/${post.creatorId}/post/${id}/image`,
        );

        await deleteObject(deleteImageRef);

        const deleteImages = prevImages.filter((image) => image !== id);
        return setPrevImages(deleteImages);
      }
    }
  };

  if (!post || !user) return;

  return (
    <ContainerBox>
      {isLoading && <LoadingPromise />}
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

          {pathname.includes('notice') && (
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
                  {newImages?.length || prevImages?.length
                    ? newImages?.length ??
                      0 + (prevImages ? prevImages.length : 0)
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
                {(newImages || prevImages) && (
                  <span
                    className='text-sm text-red-500 hover:text-red-800 active:text-red-800 cursor-pointer pl-2'
                    onClick={() => handleDeleteImageAll()}
                  >
                    파일 전체 삭제
                  </span>
                )}
              </div>
              {(prevImages || newImages) && (
                <ul className='w-full py-4 flex flex-wrap gap-2'>
                  {prevImages &&
                    prevImages.map((item) => (
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
                  {newImages &&
                    newImages.map((item) => (
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
