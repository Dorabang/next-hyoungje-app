'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Controller, useForm } from 'react-hook-form';
import { Button, Stack, Typography } from '@mui/material';
import { CssTextField } from '@/(home)/(auth)/login/styleComponents';
import { sendPasswordEmail } from '@/apis/users';

interface Inputs {
  userId: string;
  email: string;
}

const InitPasswordPage = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    try {
      const res = await sendPasswordEmail(data);
      if (res.result === 'SUCCESS') {
        alert('비밀번호 재설정 링크가 메일로 전송되었습니다.');
      }
    } catch (error) {
      // console.log('🚀 ~ onSubmit ~ error:', error);
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
        비밀번호 찾기
      </Typography>
      <Typography component={'p'} variant='body2' sx={{ mb: 3, color: '#999' }}>
        회원가입 시 등록한 아이디와 이메일을 입력해주세요.
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
            required: {
              message: '아이디를 입력해주세요.',
              value: true,
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
          name='email'
          rules={{
            required: {
              message: '이메일을 입력해주세요.',
              value: true,
            },
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message:
                '유효한 이메일 주소를 입력해주세요. 예: email@example.com',
            },
          }}
          control={control}
          render={({ field }) => (
            <CssTextField
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              label='* 이메일'
              {...field}
            />
          )}
        />

        <Stack direction={'row'} spacing={1} paddingBottom={2}>
          <Button type='submit' variant='contained' sx={{ width: '100%' }}>
            비밀번호 재설정
          </Button>

          <Button
            type='reset'
            onClick={() => router.push('/id')}
            variant='contained'
            sx={{ width: '100%' }}
          >
            아이디 찾기
          </Button>
        </Stack>
        <hr />

        <Stack
          direction={'row'}
          justifyContent={'center'}
          spacing={1}
          paddingY={2}
        >
          <Link href='/login' className='text-grayColor-400 hover:underline'>
            로그인
          </Link>
          <span className='cursor-default text-grayColor-200'>|</span>
          <Link href='/account' className='text-grayColor-400 hover:underline'>
            회원가입
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default InitPasswordPage;
