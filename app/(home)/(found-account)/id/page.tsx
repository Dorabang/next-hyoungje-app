'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { MdInfo } from 'react-icons/md';

import { Button, Stack, Typography } from '@mui/material';
import { CssTextField } from '@/(home)/(auth)/login/styleComponents';
import IconCheck from '@/assets/icon_welecome_check.svg';
import { findUserId } from '@/apis/users';
import { User } from '@/stores/useAuthStore';

interface Inputs {
  name: string;
  email: string;
}

const IdPage = () => {
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ name: string; userId: string } | null>(
    null,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const res = await findUserId(data);
    if (res.result === 'ERROR') {
      setError(res.message ?? null);
    } else {
      setResult(res?.data ?? null);
    }
  };

  return (
    <Stack
      marginX={'auto'}
      width={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
      paddingTop={10}
      paddingBottom={12}
    >
      <Typography component={'h2'} variant='h4' sx={{ mb: 3 }}>
        아이디 찾기
      </Typography>

      {!result ? (
        <>
          <Typography
            component={'p'}
            variant='body2'
            sx={{ mb: 3, color: '#999' }}
          >
            회원가입 시 등록한 성함과 이메일을 입력해주세요.
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
              name='name'
              rules={{
                required: {
                  message: '이메일을 입력해주세요.',
                  value: true,
                },
              }}
              control={control}
              render={({ field }) => (
                <CssTextField
                  error={Boolean(errors.name)}
                  helperText={errors.name?.message}
                  label='* 성함'
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
            {error && <p>{error}</p>}
            <Stack direction={'row'} spacing={1} paddingBottom={2}>
              <Button type='submit' variant='contained' sx={{ width: '100%' }}>
                아이디 찾기
              </Button>
              <Button
                type='reset'
                onClick={() => router.push('/password')}
                variant='contained'
                sx={{ width: '100%' }}
              >
                비밀번호 찾기
              </Button>
            </Stack>
            <hr />

            <Stack
              direction={'row'}
              justifyContent={'center'}
              spacing={1}
              paddingY={2}
            >
              <Link
                href='/login'
                className='text-grayColor-400 hover:underline'
              >
                로그인
              </Link>
              <span className='cursor-default text-grayColor-200'>|</span>
              <Link
                href='/account'
                className='text-grayColor-400 hover:underline'
              >
                회원가입
              </Link>
            </Stack>
          </Stack>
        </>
      ) : (
        <Stack
          direction={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          spacing={1}
          paddingY={2}
        >
          <IconCheck />
          <p className='text-lg pt-2 pb-5'>
            <span className='text-grayColor-500 text-xl'>{result.name}</span>
            님의 아이디는{' '}
            <span className='text-grayColor-500 font-semibold text-xl px-2 bg-primary/10'>
              {result.userId}
            </span>
            입니다.
          </p>
          <p className='text-sm text-grayColor-400 flex items-center gap-2 p-3 bg-grayColor-100 w-full rounded-md'>
            <MdInfo /> 정보 보호를 위해 아이디의 일부만 보여집니다.
          </p>

          <Stack
            direction={'row'}
            justifyContent={'center'}
            spacing={1}
            paddingTop={4}
          >
            <Link href='/login' className='text-grayColor-400 hover:underline'>
              로그인 하기
            </Link>
            <span className='cursor-default text-grayColor-200'>|</span>
            <Link
              href='/password'
              className='text-grayColor-400 hover:underline'
            >
              비밀번호 찾기
            </Link>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default IdPage;
