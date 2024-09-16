'use client';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { CssTextField } from './styleComponents';

import { login } from '@/apis/auth';
import { authState } from '@/recoil/atoms';

interface Inputs {
  userId: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const setUser = useSetRecoilState(authState);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const { userId, password } = data;
    setError('');

    try {
      const res = await login({ userId, password });
      if (res) {
        setUser(true);
        alert('로그인에 성공하였습니다.');
        router.push('/');
      }
    } catch (error) {
      const { message } = error as { message: string };
      setError(message);
    }
  };

  return (
    <Stack
      marginX={'auto'}
      width={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
      paddingY={20}
    >
      <Typography component={'h2'} variant='h4' sx={{ mb: 3 }}>
        로그인
      </Typography>
      <Stack
        spacing={2}
        width={{ xs: '100%', md: 400 }}
        paddingX={{ xs: '12px' }}
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete='off'
      >
        <Controller
          name='userId'
          rules={{
            required: { message: '아이디를 입력해주세요', value: true },
            pattern: {
              message: '잘못된 아이디 형식입니다.',
              value: /^[A-Z0-9._%+-]/i,
            },
          }}
          control={control}
          render={({ field }) => (
            <CssTextField
              error={Boolean(errors.userId)}
              helperText={errors.userId?.message}
              label='* 아이디'
              {...field}
            />
          )}
        />
        <Controller
          name='password'
          rules={{
            required: { message: '비밀번호를 입력해주세요', value: true },
            minLength: {
              message: '비밀번호는 6자리 이상이어야 합니다.',
              value: 6,
            },
          }}
          control={control}
          render={({ field }) => (
            <CssTextField
              autoComplete={'password'}
              label='* 비밀번호'
              type='password'
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              {...field}
            />
          )}
        />
        {error.length !== 0 && (
          <p className='text-center text-sm text-rose-500'>{error}</p>
        )}

        <Stack direction={'row'} spacing={1}>
          <Button type='submit' variant='contained' sx={{ width: '100%' }}>
            로그인
          </Button>
          <Button
            type='reset'
            variant='outlined'
            onClick={() => {
              router.push('/account');
            }}
            sx={{ width: '100%' }}
          >
            회원가입
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
