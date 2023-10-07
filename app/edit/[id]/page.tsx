'use client';

import React, { useState } from 'react';
import ContainerBox from '@/components/ContainerBox';
import useRedirect from '@/hooks/useRedirect';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState, editorState, imageState } from '@/recoil/atoms';
import { Button } from '@mui/material';
import { dbService, storageService } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import uuid from 'react-uuid';
import { useRouter } from 'next/navigation';
import uploadImage from '@/utils/uploadImage';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';
import Editor from '@/components/Editor';

interface ImageObjProps {
  id: string;
  imageUrl: string;
}

const ModifyPostPage = ({ params: { id } }: { params: { id: string } }) => {
  useRedirect();

  const user = useRecoilValue(authState);

  const router = useRouter();

  const statusList = [
    { value: 'sale', desc: '판매 중' },
    { value: 'sold-out', desc: '판매 완료' },
    { value: 'reservation', desc: '예약 중' },
  ];

  const [title, setTitle] = useState('');
  const [variant, setVariant] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('sale');
  const [price, setPrice] = useState('');
  const [place, setPlace] = useState('');
  const [date, setDate] = useState('');
  const [height, setHeight] = useState(' cm');
  const [width, setWidth] = useState(' cm');
  const [amount, setAmount] = useState('');
  const [image, setImage] = useRecoilState(imageState);
  const [imageArr, setImageArr] = useState<ImageObjProps[] | null>(null);
  const [value, setValue] = useRecoilState(editorState);

  const handleSubmit = async () => {
    // const imageUrlArr = await uploadImage(id, image);
    let newArr: string[] = [];
    imageArr?.map(async (image) => {
      const imageUrl =
        user &&
        (await uploadImage(
          `${id}/${user.uid}/post/${image.id}/image`,
          image.imageUrl
        ));
      imageUrl && newArr.push(imageUrl);
    });

    const imageIdArr = imageArr && imageArr.map((item) => item.id);
    console.log(
      '🚀 ~ file: page.tsx:65 ~ handleSubmit ~ imageIdArr:',
      imageIdArr
    );

    const newPostObj = {
      title: title,
      status: status,
      variant: variant,
      phone: phone,
      place: place,
      contents: value,
      date: date,
      price: price,
      height: height,
      width: width,
      amount: amount,
      image: imageIdArr,
      like: [],
      comment: [],
      views: 0,
      creatorName: user?.displayName,
      creatorId: user?.uid,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await addDoc(collection(dbService, `${id}`), newPostObj);
    setTitle('');
    setImage('');
    setValue('');
    setDate('');
    setWidth(' cm');
    setHeight(' cm');
    setPlace('');
    setPrice('');
    setAmount('');
    setStatus('');
    router.back();
  };

  const inputWrapperClass = 'flex w-full border-b border-[#ddd] p-2';

  const onFileChange = async (e: any) => {
    const {
      target: { files },
    } = e;

    if (files) {
      const theFile = files[0];
      const reader = new FileReader();

      reader.onloadend = async (finishedEvent: any) => {
        const {
          currentTarget: { result },
        } = finishedEvent;
        console.log(
          '🚀 ~ file: page.tsx:115 ~ reader.onloadend= ~ finishedEvent:',
          finishedEvent
        );

        if (result) {
          setImage(result);

          const imageObj: ImageObjProps = { id: uuid(), imageUrl: result };

          setImageArr((prev) =>
            prev !== null ? [...prev, imageObj] : [imageObj]
          );
        }
      };
      reader.readAsDataURL(theFile);
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

  return (
    <ContainerBox>
      <div className='flex flex-col gap-4 justify-center mx-4 sm:mx-0 '>
        <form className='mb-3 flex flex-col justify-center [&_label]:w-[90px] [&_label]:border-r [&_label]:border-neutral-300'>
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
            <p className='w-[90px] border-r border-neutral-300 cursor-default'>
              파일 첨부
            </p>
            <div className='flex flex-wrap pl-3'>
              <label
                htmlFor='addFile'
                className='py-1 w-[100px_!important] text-center cursor-pointer
                border border-[#ddd] transition-colors
                hover:border-[#333]
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
                />
              </label>
              {imageArr && (
                <ul className='w-full py-4 flex gap-2'>
                  {imageArr.map((item) => (
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
        </form>

        <Editor />

        <div className='flex justify-center pt-[80px]'>
          <Button
            type='submit'
            size='large'
            variant='contained'
            onClick={handleSubmit}
          >
            등록하기
          </Button>
        </div>
      </div>
    </ContainerBox>
  );
};

export default ModifyPostPage;
