'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Stack, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import AutoHeightImageWrapper from '../common/Wrapper/AutoHeightImageWrapper';
import { CssTextField } from '@/(home)/(auth)/login/styleComponents';
import defaultProfile from '@/assets/common/defaultProfile.jpg';
import { CreateUserData, getUser, updateUser } from '@/apis/users';
import { confirmVerificationCode, sendEmailVerifyCode } from '@/apis/auth';
import { User } from '@/stores/useAuthStore';

interface Inputs {
  name: string;
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

  const [editMyData, setEditMyData] = useState<boolean>(false);

  const [sendEmail, setSendEmail] = useState(false);
  const [emailVerifyError, setEmailVerifyError] = useState<string | null>(null);

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
        setValue('name', user.name);
      })();
    }
  }, [user, setValue]);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editMyData) return;

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
    setSendEmail(true);

    setTimeout(
      () => {
        setSendEmail(false);
      },
      5 * 60 * 1000,
    );
    const res = await sendEmailVerifyCode(email);
    if (res.result === 'SUCCESS') {
      return setSendEmail(true);
    }
  };

  const handleConfirmVerificationCode = async () => {
    const authCode = getValues('verifyCode');
    const email = getValues('email');

    if (!authCode || authCode === '' || authCode.length > 6) {
      return setError('verifyCode', {
        message: '6자의 인증 코드를 입력해주세요.',
      });
    }

    try {
      await confirmVerificationCode(email, authCode);
      setSendEmail(false);
      alert('이메일 인증이 완료되었습니다.');
    } catch (error) {
      setEmailVerifyError(error as string);
    }
  };

  const onSubmit = async (data: Inputs) => {
    const { displayName, email } = data;
    if (emailVerifyError) {
      setError('verifyCode', { message: '이메일 인증을 마쳐주세요.' });
      const ok = confirm('이메일 변경을 취소하시겠습니까?');
      if (ok) {
        setSendEmail(false);
        setEmailVerifyError(null);
        return setValue('email', user.email);
      }
    }

    if (!user) return;

    try {
      const userObj: Partial<CreateUserData> = {
        displayName,
        ...(user.email !== email && !emailVerifyError && { email }),
        ...(image?.data && { profile: image?.data }),
      };

      const response = await updateUser(userObj);
      if (response?.result === 'SUCCESS') {
        alert('수정이 완료되었습니다.');
        setEditMyData(false);
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
          <label className={`${editMyData ? 'cursor-pointer' : ''}`}>
            <div
              className={`h-32 w-32 flex justify-center items-center border border-grayColor-100
              rounded-full overflow-hidden ${editMyData ? 'hover:opacity-70 transition-opacity' : ''}
          `}
            >
              <AutoHeightImageWrapper
                src={imageMemo}
                alt='프로필 이미지 미리보기'
              />
            </div>
            {editMyData && (
              <input
                type='file'
                accept='image/*'
                onChange={onFileChange}
                className='hidden'
              />
            )}
          </label>
        </div>

        <Controller
          name='name'
          control={control}
          defaultValue={user && user.name ? user.name : ''}
          render={({ field }) => (
            <CssTextField
              label='성함'
              {...field}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />
          )}
        />

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

        <div className='relative'>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <CssTextField
                label='이메일'
                {...field}
                disabled={!editMyData}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                fullWidth
              />
            )}
          />
          {editMyData && (
            <div className='flex justify-between items-center gap-3 pt-3'>
              <Button
                onClick={handleIssuanceAuthCode}
                variant='contained'
                sx={{ width: '100%' }}
                disabled={sendEmail}
              >
                이메일 인증하기
              </Button>
            </div>
          )}
        </div>

        {sendEmail && (
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Controller
              name='verifyCode'
              control={control}
              render={({ field }) => (
                <CssTextField
                  label='인증 코드'
                  {...field}
                  error={Boolean(emailVerifyError)}
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

        <Stack direction={'row'} gap={2}>
          {!editMyData ? (
            <Button
              type='button'
              variant='contained'
              sx={{ width: '100%' }}
              onClick={() => setEditMyData(true)}
            >
              수정하기
            </Button>
          ) : (
            <>
              <Button
                type='reset'
                onClick={() => setEditMyData(false)}
                variant='contained'
                sx={{ width: '100%' }}
              >
                취소
              </Button>
              <Button type='submit' variant='contained' sx={{ width: '100%' }}>
                수정하기
              </Button>
            </>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

export default ChangeProfile;
