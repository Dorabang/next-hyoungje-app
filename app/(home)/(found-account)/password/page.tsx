'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Controller, useForm } from 'react-hook-form';
import { Button, Stack, Typography } from '@mui/material';
import { CssTextField } from '@/(home)/(auth)/login/styleComponents';

interface Inputs {
  password1: string;
  password2: string;
}

const InitPasswordPage = () => {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get('code');
  const email = params.get('email');

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {};

  return (
    <Stack
      marginX={'auto'}
      width={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
      paddingY={20}
    >
      <Typography component={'h2'} variant='h4' sx={{ mb: 3 }}>
        비밀번호 재설정
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
          name='password1'
          rules={{
            required: { message: '비밀번호를 입력해주세요.', value: true },
            minLength: {
              message: '비밀번호는 6자리 이상이어야 합니다.',
              value: 6,
            },
          }}
          control={control}
          render={({ field }) => (
            <CssTextField
              autoComplete={'new-password'}
              label='* 비밀번호'
              type='password'
              error={Boolean(errors.password1)}
              helperText={errors.password1?.message}
              {...field}
            />
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
                if (getValues('password1') !== value) {
                  return '비밀번호가 일치하지 않습니다.';
                }
              },
            },
          }}
          control={control}
          render={({ field }) => (
            <CssTextField
              autoComplete={'new-password'}
              label='* 비밀번호 확인'
              type='password'
              error={Boolean(errors.password2)}
              helperText={errors.password2?.message}
              {...field}
            />
          )}
        />

        <Button type='submit' variant='contained' sx={{ width: '100%' }}>
          비밀번호 변경
        </Button>
      </Stack>
    </Stack>
  );
};

export default InitPasswordPage;
