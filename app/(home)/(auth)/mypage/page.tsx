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
import { Button, Stack } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { CssTextField } from '../login/styleComponents';
import { useRouter } from 'next/navigation';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
interface Inputs {
  email: string;
  password: string;
  displayName: string;
  phoneNumber: string;
}

const MyPage = () => {
  const user = useRecoilValue(authState);
  const router = useRouter();

  const [image, setImage] = useState<string>('');
  const [showPw, setShowPw] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

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

  const onSubmit = (data: Inputs) => {
    const { email, password, displayName, phoneNumber } = data;
  };

  if (!user) return;

  return (
    <ContainerBox>
      <Stack
        marginX={'auto'}
        width={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
      >
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

          <Controller
            name='email'
            rules={{
              required: {
                message: '이메일을 입력해주세요. ex) example@email.com',
                value: true,
              },
              pattern: {
                message: '잘못된 이메일 주소입니다.',
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              },
            }}
            control={control}
            render={({ field }) => (
              <CssTextField
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                label='* 이메일'
                defaultValue={user && user.email ? user.email : ''}
                {...field}
                sx={{ flexGrow: 1 }}
              />
            )}
          />

          <Controller
            name='password'
            rules={{
              required: { message: '비밀번호를 입력해주세요.', value: true },
              minLength: {
                message: '비밀번호는 6자리 이상이어야 합니다.',
                value: 6,
              },
            }}
            control={control}
            render={({ field }) => (
              <Stack spacing={1} sx={{ position: 'relative' }}>
                <CssTextField
                  autoComplete={'new-password'}
                  label='* 비밀번호'
                  type={showPw ? 'text' : 'password'}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                  {...field}
                />
                <div
                  className='absolute right-4 top-[10px] cursor-pointer'
                  onClick={() => setShowPw((prev) => !prev)}
                >
                  {showPw ? <IoMdEyeOff size={18} /> : <IoMdEye size={18} />}
                </div>
              </Stack>
            )}
          />
          <Controller
            name='displayName'
            control={control}
            defaultValue={user && user.displayName ? user.displayName : ''}
            rules={{
              required: { message: '닉네임을 입력해주세요.', value: true },
            }}
            render={({ field }) => (
              <CssTextField
                label='* 닉네임'
                {...field}
                error={Boolean(errors.displayName)}
                helperText={errors.displayName?.message}
              />
            )}
          />
          <Stack direction={'row'} spacing={1}>
            <Button type='submit' variant='contained' sx={{ width: '100%' }}>
              수정하기
            </Button>
            <Button
              type='reset'
              variant='outlined'
              onClick={() => {
                router.push('/');
              }}
              sx={{ width: '100%' }}
            >
              취소
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </ContainerBox>
  );
};

export default MyPage;
