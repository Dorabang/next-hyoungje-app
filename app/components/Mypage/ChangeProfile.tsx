'use client';
import { Button, Card, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AutoHeightImageWrapper from '../AutoHeightImageWrapper';
import { Controller, useForm } from 'react-hook-form';
import { CssTextField } from '@/(home)/(auth)/login/styleComponents';
import { useRecoilValue } from 'recoil';
import { authState } from '@/recoil/atoms';
import { dbService } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { User, updateProfile } from 'firebase/auth';
import uploadImage from '@/apis/uploadImage';
import imageCompression from 'browser-image-compression';
import defaultProfile from '@/assets/defaultProfile.jpg';
import getUser from '@/apis/getUser';

interface Inputs {
  displayName: string;
  phone: string;
}

const ChangeProfile = ({ user }: { user: User }) => {
  const [image, setImage] = useState<string>('');

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (user) {
      getUser(user.uid).then(
        (response) => response && setValue('phone', response?.phoneNumber),
      );
    }
  }, [user, setValue]);

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
          imageCompression.getDataUrlFromFile(response).then((result) => {
            setImage(result);
          });
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  };

  const onSubmit = async (data: Inputs) => {
    const { displayName, phone } = data;

    if (!user) return;

    if (image !== '') {
      const photo =
        user && (await uploadImage(`/profile/${user.uid}/photo`, image));

      user && (await updateProfile(user, { photoURL: photo }));
    }

    if (phone !== '') {
      const phoneRef = doc(dbService, 'users', user?.uid);

      await setDoc(
        phoneRef,
        {
          phoneNumber: phone,
        },
        { merge: true },
      ).then(() => alert('수정이 완료되었습니다.'));
    }

    if (displayName !== '' && displayName !== user.displayName) {
      const displayNameRef = doc(dbService, 'users', user?.uid);

      await updateProfile(user, { displayName: displayName }).then(
        async (err) => {
          // console.log(err);
          await setDoc(
            displayNameRef,
            { displayName: displayName },
            { merge: true },
          );
          alert('수정이 완료되었습니다.');
        },
      );
    }
  };

  if (!user) return;

  return (
    <Card
      variant='outlined'
      sx={{
        padding: '30px 50px',
        width: { sm: '100%', md: '500px' },
        marginX: 'auto',
      }}
    >
      <Typography
        align='center'
        paddingBottom={4}
        variant='h5'
        component='h3'
        sx={{ fontWeight: 700, color: '#333' }}
      >
        내 정보
      </Typography>

      <Stack
        spacing={2}
        width={{ xs: '100%', md: 400 }}
        paddingX={{ xs: '12px' }}
        marginX={'auto'}
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete='off'
      >
        <div className='flex flex-col gap-4 items-center pb-10'>
          <p className='text-neutral-700'>프로필 이미지</p>
          <label className='cursor-pointer'>
            <div
              className='h-32 w-32 flex justify-center items-center border border-grayColor-100
              rounded-full overflow-hidden
          hover:opacity-70 transition-opacity
          '
            >
              <AutoHeightImageWrapper
                src={
                  user.photoURL
                    ? image !== ''
                      ? image
                      : user.photoURL
                    : defaultProfile
                }
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

        <Controller
          name='displayName'
          control={control}
          defaultValue={user && user.displayName ? user.displayName : ''}
          render={({ field }) => (
            <CssTextField
              label='닉네임'
              {...field}
              error={Boolean(errors.displayName)}
              helperText={errors.displayName?.message}
            />
          )}
        />

        <Controller
          name='phone'
          control={control}
          render={({ field }) => (
            <CssTextField
              label='연락처'
              {...field}
              error={Boolean(errors.phone)}
              helperText={errors.phone?.message}
            />
          )}
        />

        <Stack direction={'row'}>
          <Button type='submit' variant='contained' sx={{ width: '100%' }}>
            수정하기
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ChangeProfile;
