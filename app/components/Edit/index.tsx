'use client';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import Image from 'next/image';
import uuid from 'react-uuid';
import { dbService, storageService } from '@/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { DocumentData, doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from '@mui/material';

import { ImageObjProps } from '@/(home)/edit/[id]/page';
import statusList from '@/constant/StatusLists';
import { authState, editorState } from '@/recoil/atoms';
import { getPostImageURL, uploadImage } from '@/apis/images';
import { imageResize } from '@/utils/imageResize';
import ContainerBox from '../ContainerBox';
import Editor from '../Editor';
import Input from './Input';
import LoadingPromise from '../LoadingPromise';

interface PostDataState {
  title: string;
  variant: string;
  phone: string;
  status: 'sale' | 'sold-out' | 'reservation';
  price: string;
  date: string;
  height: string;
  width: string;
  amount: string;
  place: string;
}

type PrevImages = string[] | null;
type NewImages = ImageObjProps[] | null;

const Edit = ({ post, pathname }: { post: DocumentData; pathname: string }) => {
  const router = useRouter();

  const user = useRecoilValue(authState);

  const [postData, setPostData] = useState<PostDataState>({
    title: post.title,
    variant: post.variant,
    phone: post.phone,
    status: post.status,
    price: post.price,
    place: post.place,
    date: post.date,
    height: post.height,
    width: post.width,
    amount: post.width,
  });

  const [prevImages, setPrevImages] = useState<PrevImages>(null);
  const [newImages, setNewImages] = useState<NewImages>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    title,
    amount,
    date,
    height,
    phone,
    price,
    status,
    variant,
    width,
    place,
  } = postData;
  const [value, setValue] = useRecoilState(editorState);

  const contents = post.contents;

  const postImages = post && post.image;

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
        newImages.map(async ({ id, imageUrl }) => {
          await uploadImage(
            `${pathname}/${post.creatorId}/post/${id}/image`,
            imageUrl,
          );
        }),
      );
    }

    const newImagesId = newImages && newImages.map((item) => item.id);

    const prevImage = postImages?.filter((item: string) =>
      prevImages?.filter((items) => items.includes(item)),
    );

    const imageIdArr = prevImages
      ? newImagesId
        ? [...newImagesId, ...prevImage]
        : [...prevImage]
      : newImagesId
        ? [...newImagesId]
        : null;

    const newPostObj = {
      title: title,
      contents: value,
      status: status,
      variant: variant,
      place: place,
      date: date,
      price: price,
      amount: amount,
      updatedAt: Date.now(),
      ...(pathname.includes('market') && {
        phone: phone,
        height: height,
        width: width,
      }),
      ...(imageIdArr !== null && { image: imageIdArr }),
    };

    const docRef = doc(dbService, `${pathname}/${post.id}`);

    await updateDoc(docRef, newPostObj);
    setValue(contents);
    setPostData({
      title: post.title,
      variant: post.variant,
      phone: post.phone,
      status: post.status,
      price: post.price,
      date: post.date,
      height: post.height,
      width: post.width,
      amount: post.width,
      place: post.place,
    });
    setIsLoading(false);
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

        setNewImages((prev) =>
          prev !== null ? [...prev, imageObj] : [imageObj],
        );
      });
    }
  };

  const handleDeleteImage = (id: string) => {
    if (newImages?.length === 0 || newImages === null) {
      return setNewImages(null);
    } else {
      const modifyImageArr = newImages.filter((imageObj) => imageObj.id !== id);

      return setNewImages(modifyImageArr);
    }
  };

  const handleDBDeleteImage = async (id: string) => {
    const imageId = postImages.filter((item: string) => id.includes(item))[0];
    if (postImages.filter((item: string) => id.includes(item))) {
      if (prevImages?.length === 0 || prevImages === null) {
        return setPrevImages(null);
      } else {
        if (!user) return;

        const deleteImageRef = ref(
          storageService,
          `${pathname}/${post.creatorId}/post/${imageId}/image.jpg`,
        );

        await deleteObject(deleteImageRef);

        const docRef = doc(dbService, `${pathname}/${post.id}`);
        const updateImage = postImages.filter(
          (item: string) => !id.includes(item),
        );
        await updateDoc(docRef, { image: updateImage });

        const deleteImages = prevImages.filter((image) => image !== id);
        return setPrevImages(deleteImages);
      }
    }
  };

  const handleDeleteImageAll = () => {
    setNewImages(null);

    prevImages?.forEach(async (image) => {
      await handleDBDeleteImage(image);
      setPrevImages(null);
    });
  };

  const handleChangeValue = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const {
      target: { name, value },
    } = e;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  if (!post || !user) return;

  return (
    <ContainerBox>
      {isLoading && <LoadingPromise />}
      <div className='flex flex-col gap-4 justify-center mx-4 sm:mx-0 '>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className='mb-3 flex flex-col justify-center'
        >
          <Input required>
            <Input.Label>
              <div className='pr-4'>
                <select
                  id='status'
                  name='status'
                  className='outline-none cursor-pointer'
                  onChange={(e) => handleChangeValue(e)}
                  value={status}
                >
                  {statusList.map((option) => (
                    <option value={option.value} key={option.value}>
                      {option.desc}
                    </option>
                  ))}
                </select>
              </div>
            </Input.Label>
            <Input.Text
              value={title}
              name='title'
              onChange={(e) => handleChangeValue(e)}
              placeholder='* 제목을 입력해주세요.'
            />
          </Input>

          <Input required>
            <Input.Label>종류</Input.Label>
            <Input.Text
              name='variant'
              value={variant}
              onChange={(e) => handleChangeValue(e)}
            />
          </Input>

          {pathname.includes('market') && (
            <Input required>
              <Input.Label>연락처</Input.Label>
              <Input.Text
                name='phone'
                value={phone}
                onChange={(e) => handleChangeValue(e)}
              />
            </Input>
          )}

          <Input required>
            <Input.Label>산지</Input.Label>
            <Input.Text
              name='place'
              value={place}
              onChange={(e) => handleChangeValue(e)}
            />
          </Input>

          <Input required>
            <Input.Label>산채일</Input.Label>
            <Input.Date
              name='date'
              value={date}
              onChange={(e) => handleChangeValue(e)}
            />
          </Input>

          <Input required>
            <Input.Label>가격</Input.Label>
            <Input.Text
              name='price'
              value={price.toLocaleString()}
              onChange={(e) => handleChangeValue(e)}
            />
          </Input>

          {pathname.includes('market') && (
            <>
              <Input required>
                <Input.Label>키</Input.Label>
                <Input.Text
                  name='height'
                  value={height}
                  onChange={(e) => handleChangeValue(e)}
                />
              </Input>

              <Input required>
                <Input.Label>폭</Input.Label>
                <Input.Text
                  name='width'
                  value={width}
                  onChange={(e) => handleChangeValue(e)}
                />
              </Input>
            </>
          )}

          <Input required>
            <Input.Label>촉수</Input.Label>
            <Input.Text
              name='amount'
              value={amount}
              onChange={(e) => handleChangeValue(e)}
            />
          </Input>

          <Input disabled={newImages && newImages.length >= 8 ? true : false}>
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
            <div className='pl-2'>
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

export default Edit;
