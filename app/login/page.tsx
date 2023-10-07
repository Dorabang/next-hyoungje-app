'use client';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { authService } from '@/firebase';
import { useRouter } from 'next/navigation';
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { CssTextField } from './styleComponents';

interface Inputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const { email, password } = data;
    // console.log(data);
    setPersistence(authService, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(authService, email, password).then(
          () => {
            alert('로그인에 성공했습니다.');
            router.push('/');
          }
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
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
        width={400}
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete='off'
      >
        <Controller
          name='email'
          rules={{
            required: { message: '이메일을 입력해주세요', value: true },
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
