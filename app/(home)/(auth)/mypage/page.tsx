'use client';
import React, { useEffect, useState } from 'react';
import { authState } from '@/recoil/atoms';
import { useRecoilValue } from 'recoil';
import { updateProfile } from 'firebase/auth';
import ContainerBox from '@/components/ContainerBox';
import defaultProfile from '@/assets/defaultProfile.jpg';
import imageCompression from 'browser-image-compression';
import uploadImage from '@/utils/uploadImage';
import AutoHeightImageWrapper from '@/components/AutoHeightImageWrapper';

const MyPage = () => {
  const user = useRecoilValue(authState);

  const [image, setImage] = useState<string>('');

  useEffect(() => {
    if (user) {
      user.photoURL && setImage(user.photoURL);
    }
  }, [user]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          imageCompression.getDataUrlFromFile(response).then(async (result) => {
            const photo =
              user && (await uploadImage(`/profile/${user.uid}/photo`, result));

            user && (await updateProfile(user, { photoURL: photo }));

            setImage(result);
          });
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  if (!user) return;

  return (
    <ContainerBox>
      <form className='py-5' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 items-center'>
          <p className='text-neutral-700'>프로필 이미지</p>
          <label className='cursor-pointer'>
            <div
              className='h-40 w-40 rounded-full overflow-hidden relative
              hover:opacity-70 transition-opacity
            '
            >
              <AutoHeightImageWrapper
                src={image !== '' ? image : defaultProfile}
                alt='프로필 이미지 미리보기'
              />
            </div>
            <input
              type='file'
              accept='image/*'
              onChange={onFileChange}
              className='hidden'
            />
          </label>
        </div>
      </form>
    </ContainerBox>
  );
};

export default MyPage;
