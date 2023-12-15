'use client';
import { CssTextField } from '@/(home)/(auth)/login/styleComponents';
import { authService } from '@/firebase';
import { Button, Card, Stack, Typography } from '@mui/material';
import {
  AuthError,
  User,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

interface Inputs {
  email: string;
  password: string;
  password2: string;
  passwordCheck: string;
}

const ChangeUserInfo = ({ user }: { user: User }) => {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [showPw, setShowPw] = useState<boolean>(false);
  const [showPw2, setShowPw2] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async () => {
    if (getValues('passwordCheck') !== '') {
      if (!user.email) return;
      await signInWithEmailAndPassword(
        authService,
        user.email,
        getValues('passwordCheck')
      )
        .then((response) => {
          setIsEdit((prev) => !prev);
          console.log('response', response);
        })
        .catch((error: AuthError) => {
          const { code } = error as { code: string };

          switch (code) {
            case 'auth/wrong-password':
              setError('이메일 또는 비밀번호를 잘못 입력하였습니다.');
              break;
            case 'auth/user-not-found':
              setError('이메일 또는 비밀번호를 잘못 입력하였습니다.');
              break;
            case 'auth/too-many-requests':
              setError('요청이 너무 많아 잠시 후에 로그인을 시도해주세요.');
              break;
          }
        });
    }

    if (getValues('password') !== '' && isEdit) {
      await updatePassword(user, getValues('password')).then((response) => {
        console.log('response', response);
        // alert('성공적으로 비밀번호가 변경되었습니다.');
        // signOut(authService);
        // router.push('/login');
      });
    }
  };

  return (
    <Card variant='outlined' sx={{ padding: { md: '30px 50px' } }}>
      <Typography
        align='center'
        paddingBottom={4}
        variant='h5'
        component='h3'
        sx={{ fontWeight: 700, color: '#333' }}
      >
        계정
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
        {!isEdit && (
          <Controller
            name='passwordCheck'
            rules={{
              minLength: {
                message: '비밀번호는 6자리 이상이어야 합니다.',
                value: 6,
              },
            }}
            control={control}
            render={({ field }) => (
              <>
                <Typography
                  align='center'
                  variant='body1'
                  component='p'
                  sx={{ paddingBottom: 2 }}
                >
                  비밀번호를 인증해주세요.
                </Typography>
                <Stack spacing={1} sx={{ position: 'relative' }}>
                  <CssTextField
                    autoComplete={'new-password'}
                    label='비밀번호'
                    type={showPw ? 'text' : 'password'}
                    error={Boolean(errors.passwordCheck)}
                    helperText={errors.passwordCheck?.message}
                    {...field}
                  />
                  <div
                    className='absolute right-4 top-[2px] cursor-pointer text-grayColor-300 hover:text-grayColor-500 p-2'
                    onClick={() => setShowPw((prev) => !prev)}
                  >
                    {showPw ? <IoMdEyeOff size={18} /> : <IoMdEye size={18} />}
                  </div>
                </Stack>

                {error && (
                  <Typography
                    component={'p'}
                    variant='body1'
                    sx={{ color: '#ddd' }}
                  >
                    {error}
                  </Typography>
                )}
                <Button type='submit'>확인</Button>
              </>
            )}
          />
        )}
        {isEdit && (
          <>
            <Controller
              name='email'
              rules={{
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
                  disabled
                  label='이메일'
                  defaultValue={user && user.email ? user.email : ''}
                  {...field}
                  sx={{ flexGrow: 1 }}
                />
              )}
            />

            <Controller
              name='password'
              rules={{
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
                    label='새 비밀번호'
                    type={showPw ? 'text' : 'password'}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    {...field}
                  />
                  <div
                    className='absolute right-4 top-[2px] cursor-pointer text-grayColor-300 hover:text-grayColor-500 p-2'
                    onClick={() => setShowPw((prev) => !prev)}
                  >
                    {showPw ? <IoMdEyeOff size={18} /> : <IoMdEye size={18} />}
                  </div>
                </Stack>
              )}
            />
            <Controller
              name='password2'
              rules={{
                required: {
                  message: '비밀번호 확인을 입력해주세요.',
                  value: true,
                },
                minLength: {
                  message: '비밀번호가 일치하지 않습니다.',
                  value: 6,
                },
                validate: {
                  check: (value) => {
                    if (getValues('password') !== value) {
                      return '비밀번호가 일치하지 않습니다.';
                    }
                  },
                },
              }}
              control={control}
              render={({ field }) => (
                <Stack spacing={1} sx={{ position: 'relative' }}>
                  <CssTextField
                    autoComplete={'new-password'}
                    label='새 비밀번호 확인'
                    type={showPw2 ? 'text' : 'password'}
                    error={Boolean(errors.password2)}
                    helperText={errors.password2?.message}
                    {...field}
                  />
                  <div
                    className='absolute right-4 top-[2px] cursor-pointer text-grayColor-300 hover:text-grayColor-500 p-2'
                    onClick={() => setShowPw2((prev) => !prev)}
                  >
                    {showPw2 ? <IoMdEyeOff size={18} /> : <IoMdEye size={18} />}
                  </div>
                </Stack>
              )}
            />

            <Stack direction={'row'}>
              <Button type='submit' variant='contained' sx={{ width: '100%' }}>
                수정하기
              </Button>
            </Stack>
          </>
        )}
      </Stack>
    </Card>
  );
};

export default ChangeUserInfo;