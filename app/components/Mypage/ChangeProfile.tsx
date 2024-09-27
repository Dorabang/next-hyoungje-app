'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Stack, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import AutoHeightImageWrapper from '../common/Wrapper/AutoHeightImageWrapper';
import { CssTextField } from '@/(home)/(auth)/login/styleComponents';
import defaultProfile from '@/assets/defaultProfile.jpg';
import { User } from '@/recoil/atoms';
import { CreateUserData, getUser, updateUser } from '@/apis/users';
import { confirmVerificationCode, sendCode } from '@/apis/auth';

interface Inputs {
  displayName: string;
  email: string;
  verifyCode: string;
}

interface ImageState {
  data: File | null;
  preview: string | null;
}

const ChangeProfile = ({ user }: { user: User }) => {
  const [image, setImage] = useState<ImageState>({ data: null, preview: null });

  const [checkVerify, setCheckVerify] = useState(false);
  const [emailVerify, setEmailVerify] = useState<string | null>(null);

  const imageMemo = useMemo(() => {
    if (image.preview) return image.preview;
    if (user.profile) return user.profile;
    return defaultProfile.src;
  }, [image.preview, user.profile]);

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (user) {
      (async () => {
        const user = await getUser();
        setValue('displayName', user.displayName);
        setValue('email', user.email);
      })();
    }
  }, [user, setValue]);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;

    if (files) {
      const theFile = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = (e.target as FileReader).result;
        setImage((prev) => ({ ...prev, preview: result as string }));
      };
      reader.readAsDataURL(theFile);
      setImage((prev) => ({ ...prev, data: theFile }));
    }
  };

  const handleIssuanceAuthCode = async () => {
    const email = getValues('email');

    if (!email || email === '' || !email.includes('@')) {
      return setError('email', {
        message: '유효한 이메일 주소를 입력해주세요. 예: example@domain.com',
      });
    }
    setCheckVerify(true);

    setTimeout(() => {
      setCheckVerify(false);
    }, 5000);
    const res = await sendCode();
    if (res.result === 'SUCCESS') {
      return setCheckVerify(true);
    }
  };

  const handleConfirmVerificationCode = async () => {
    const authCode = getValues('verifyCode');

    if (!authCode || authCode === '' || authCode.length > 6) {
      return setError('verifyCode', {
        message: '6자의 인증 코드를 입력해주세요.',
      });
    }

    try {
      await confirmVerificationCode(authCode);
      alert('이메일 인증이 완료되었습니다.');
    } catch (error) {
      setEmailVerify(error as string);
    }
  };

  const onSubmit = async (data: Inputs) => {
    const { displayName, email } = data;

    if (!user) return;

    try {
      const userObj: Partial<CreateUserData> = {
        displayName,
        email,
        ...(image?.data && { profile: image?.data }),
      };

      const response = await updateUser(userObj);
      if (response?.result === 'SUCCESS') {
        alert('수정이 완료되었습니다.');
      }
    } catch (err) {
      // console.log('🚀 ~ onSubmit ~ err:', err);
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
          <p className='text-grayColor-700'>프로필 이미지</p>
          <label className='cursor-pointer'>
            <div
              className='h-32 w-32 flex justify-center items-center border border-grayColor-100
              rounded-full overflow-hidden
          hover:opacity-70 transition-opacity
          '
            >
              <AutoHeightImageWrapper
                src={imageMemo}
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
          name='email'
          control={control}
          render={({ field }) => (
            <CssTextField
              label='이메일'
              {...field}
              disabled={user.isVerified}
              error={Boolean(errors.email) || !user.isVerified}
              helperText={
                Boolean(errors.email)
                  ? errors.email?.message
                  : !user.isVerified
                    ? '이메일 인증이 완료되지 않았습니다.'
                    : '이메일 인증이 완료되었습니다.'
              }
              fullWidth
            />
          )}
        />
        {!user.isVerified && (
          <Button
            onClick={handleIssuanceAuthCode}
            variant='contained'
            disabled={user.isVerified || checkVerify}
          >
            이메일 인증하기
          </Button>
        )}

        {checkVerify && (
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Controller
              name='verifyCode'
              control={control}
              render={({ field }) => (
                <CssTextField
                  label='인증 코드'
                  {...field}
                  error={Boolean(emailVerify)}
                  helperText={errors.verifyCode?.message}
                  fullWidth
                />
              )}
            />
            <Button
              onClick={handleConfirmVerificationCode}
              variant='contained'
              sx={{ minWidth: '120px' }}
            >
              확인
            </Button>
          </Stack>
        )}

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
