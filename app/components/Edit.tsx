'use client';
import { FormEvent, MouseEvent, useEffect, useState } from 'react';
import ContainerBox from './ContainerBox';
import { useRouter } from 'next/navigation';
import { DocumentData, doc, updateDoc } from 'firebase/firestore';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ImageObjProps } from '@/(home)/edit/[id]/page';
import statusList from '@/constant/StatusLists';
import { authState, editorState } from '@/recoil/atoms';
import Image from 'next/image';
import imageCompression from 'browser-image-compression';
import uuid from 'react-uuid';
import { AiOutlineClose } from 'react-icons/ai';
import Editor from './Editor';
import { Button } from '@mui/material';
import uploadImage from '@/apis/uploadImage';
import { dbService, storageService } from '@/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { getImageURL } from '@/apis/images';

const Edit = ({ post, pathname }: { post: DocumentData; pathname: string }) => {
  const router = useRouter();

  const user = useRecoilValue(authState);

  const [title, setTitle] = useState(post.title);
  const [variant, setVariant] = useState(post.variant);
  const [phone, setPhone] = useState(post.phone);
  const [status, setStatus] = useState(post.status);
  const [price, setPrice] = useState(post.price);
  const [place, setPlace] = useState(post.place);
  const [date, setDate] = useState(post.date);
  const [height, setHeight] = useState(post.height);
  const [width, setWidth] = useState(post.width);
  const [amount, setAmount] = useState(post.amount);
  const [images, setImages] = useState<string[] | null>(null);
  const [imageArr, setImageArr] = useState<ImageObjProps[] | null>(null);
  const [value, setValue] = useRecoilState(editorState);

  const contents = post.contents;

  const postImages = post && post.image;

  useEffect(() => {
    if (postImages) {
      postImages.forEach(async (img: string) => {
        const url = await getImageURL(pathname, post.creatorId, img);
        setImages((prev) =>
          prev ? (!prev?.includes(url) ? [...prev, url] : prev) : [url],
        );
      });
    }
  }, [postImages, pathname, post.creatorId]);

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
        `${pathname}/${user.uid}/post/${value.id}/image`,
        value.imageUrl,
      );
    });

    const newImageArr = imageArr && imageArr.map((item) => item.id);

    const prevImage = postImages?.filter((item: string) =>
      images?.filter((items) => items.includes(item)),
    );

    const imageIdArr = images
      ? newImageArr
        ? [...newImageArr, ...prevImage]
        : [...prevImage]
      : newImageArr
        ? [...newImageArr]
        : null;

    const newPostObj = {
      title: title,
      contents: value,
      status: status,
      variant: variant,
      place: place,
      date: date,
      price: price,
      ...(pathname.includes('market') && {
        phone: phone,
        height: height,
        width: width,
      }),
      amount: amount,
      image: imageIdArr,
      updatedAt: Date.now(),
    };
    const docRef = doc(dbService, `${pathname}/${post.id}`);

    await updateDoc(docRef, newPostObj);
    setTitle(post.title);
    setValue(contents);
    setDate(post.date);
    setWidth(post.width);
    setHeight(post.height);
    setPlace(post.place);
    setPrice(post.price);
    setAmount(post.amount);
    setStatus(post.status);
    router.back();
  };

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

              setImageArr((prev) =>
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
    if (imageArr?.length === 0 || imageArr === null) {
      return setImageArr(null);
    } else {
      const modifyImageArr = imageArr.filter((imageObj) => imageObj.id !== id);

      return setImageArr(modifyImageArr);
    }
  };

  const handleDBDeleteImage = async (id: string) => {
    const imageId = postImages.filter((item: string) => id.includes(item))[0];
    if (postImages.filter((item: string) => id.includes(item))) {
      if (images?.length === 0 || images === null) {
        return setImages(null);
      } else {
        if (!user) return;

        const deleteImageRef = ref(
          storageService,
          `${pathname}/${user.uid}/post/${imageId}/image.jpg`,
        );

        await deleteObject(deleteImageRef);

        const docRef = doc(dbService, `${pathname}/${post.id}`);
        const updateImage = postImages.filter(
          (item: string) => !id.includes(item),
        );
        await updateDoc(docRef, { image: updateImage });

        const deleteImages = images.filter((image) => image !== id);
        return setImages(deleteImages);
      }
    }
  };

  const handleDeleteImageAll = () => {
    setImageArr(null);

    images?.forEach(async (image) => {
      await handleDBDeleteImage(image);
      setImages(null);
    });
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
            <div className='pr-4'>
              <select
                id='status'
                className='outline-none cursor-pointer'
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                {statusList.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.desc}
                  </option>
                ))}
              </select>
            </div>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='* 제목을 입력해주세요.'
              className='outline-none'
              required
            />
          </div>

          <div className={`${inputWrapperClass}`}>
            <label htmlFor='variant'>* 종류</label>
            <input
              name='variant'
              type='text'
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              className='outline-none pl-3'
              required
            />
          </div>

          {pathname.includes('market') && (
            <div className={`${inputWrapperClass}`}>
              <label htmlFor='phone'>* 연락처</label>
              <input
                name='phone'
                type='text'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className='outline-none pl-3'
                required
              />
            </div>
          )}

          <div className={`${inputWrapperClass}`}>
            <label htmlFor='place'>* 산지</label>
            <input
              name='place'
              type='text'
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className='outline-none pl-3'
              required
            />
          </div>

          <div className={`${inputWrapperClass}`}>
            <label htmlFor='date'>* 산채일</label>
            <input
              name='date'
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className='outline-none pl-3'
              required
            />
          </div>

          <div className={`${inputWrapperClass}`}>
            <label htmlFor='price'>* 가격</label>
            <input
              name='price'
              type='text'
              value={price.toLocaleString()}
              onChange={(e) => setPrice(e.target.value)}
              className='outline-none pl-3'
              required
            />
          </div>

          {pathname.includes('market') && (
            <>
              <div className={`${inputWrapperClass}`}>
                <label htmlFor='height'>* 키</label>
                <input
                  name='height'
                  type='text'
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className='outline-none pl-3'
                  required
                />
              </div>

              <div className={`${inputWrapperClass}`}>
                <label htmlFor='width'>* 폭</label>
                <input
                  name='width'
                  type='text'
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  className='outline-none pl-3'
                  required
                />
              </div>
            </>
          )}

          <div className={`${inputWrapperClass}`}>
            <label htmlFor='amount'>촉수</label>
            <input
              name='amount'
              type='text'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className='outline-none pl-3'
            />
          </div>

          <div className={`${inputWrapperClass}`}>
            <p className='w-[90px] border-r border-grayColor-300 cursor-default flex flex-col gap-2'>
              파일 첨부
              <span className='text-grayColor-300 text-sm'>
                {'('}
                {imageArr?.length || images?.length
                  ? imageArr?.length ?? 0 + (images ? images.length : 0)
                  : 0}
                /8
                {')'}
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
                    disabled={imageArr && imageArr.length >= 8 ? true : false}
                    onChange={onFileChange}
                    multiple
                    className='outline-none w-full hidden group'
                  />
                </label>
                {(imageArr || images) && (
                  <span
                    className='text-sm text-red-500 hover:text-red-800 active:text-red-800 cursor-pointer pl-2'
                    onClick={() => handleDeleteImageAll()}
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

export default Edit;
