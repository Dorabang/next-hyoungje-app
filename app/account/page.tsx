'use client';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { authService } from '@/firebase';
import { ErrorMessage } from '@hookform/error-message';
import { useRouter } from 'next/navigation';
import JoinTerms from '../components/JoinTerms/JoinTerms';
import {
  updateProfile,
  createUserWithEmailAndPassword,
  updatePhoneNumber,
} from 'firebase/auth';
import uploadImage from '@/utils/uploadImage';
import { ChangeEvent, useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import defaultProfile from '@/assets/defaultProfile.jpg';

interface Inputs {
  email: string;
  password1: string;
  password2: string;
  photoUrl: string;
  // userName: string;
  nickName: string;
  phoneNumber: string;
  agree: boolean;
}

const AccountPage = () => {
  const router = useRouter();

  const [image, setImage] = useState<string>('');

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const { email, password2, nickName, phoneNumber } = data;

    try {
      await createUserWithEmailAndPassword(authService, email, password2);
      const user = authService.currentUser;
      const photo =
        user && (await uploadImage(`/profile/${user.uid}/photo`, image));

      user &&
        (await updateProfile(user, {
          displayName: nickName,
          photoURL: photo,
        }));

      alert('회원가입에 성공 했습니다.');
      router.push('/');

      if (authService.currentUser) {
        // await updatePhoneNumber(authService.currentUser, phoneNumber);
      }
    } catch (error) {
      if (error) {
        const { code } = error as { code: string };
        switch (code) {
          case 'auth/weak-password':
            alert('비밀번호는 6자리 이상이어야 합니다.');
            break;
          case 'auth/invalid-email':
            alert('잘못된 이메일 주소입니다.');
            break;
          case 'auth/email-already-in-use':
            alert('이미 가입되어 있는 계정입니다.');
            break;
          default:
        }
      } else {
        alert('회원가입 실패');
      }
    }
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;

    if (files) {
      const theFile = files[0];
      const reader = new FileReader();

      reader.onloadend = (finishedEvent: any) => {
        const {
          currentTarget: { result },
        } = finishedEvent;

        setImage(result);
      };
      reader.readAsDataURL(theFile);
    }
  };

  return (
    <Stack
      marginX={'auto'}
      width={'100%'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Typography component={'h2'} variant='h4' sx={{ mb: 3, mt: 5 }}>
        회원가입
      </Typography>
      <Stack
        spacing={2}
        width={400}
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete='off'
      >
        <div className='flex flex-col gap-4 items-center'>
          <p className='text-neutral-700'>프로필 이미지</p>
          <div className='h-40 w-40 rounded-full overflow-hidden relative'>
            <Image
              src={image !== '' ? image : defaultProfile}
              alt='프로필 이미지 미리보기'
              fill
              className='object-cover'
            />
          </div>
          <label className='p-2 border border-neutral-400 transition-colors hover:bg-neutral-400 rounded hover:text-white cursor-pointer'>
            파일 업로드하기
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
            <TextField
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              label='* 이메일'
              {...field}
            />
          )}
        />
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
            <TextField
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
            required: { message: '비밀번호 확인을 입력해주세요.', value: true },
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
            <TextField
              autoComplete={'new-password'}
              label='* 비밀번호 확인'
              type='password'
              error={Boolean(errors.password2)}
              helperText={errors.password2?.message}
              {...field}
            />
          )}
        />

        {/* <Controller
          name='userName'
          control={control}
          render={({ field }) => (
            <TextField autoComplete={'off'} label='이름' {...field} />
          )}
        /> */}

        <Controller
          name='nickName'
          control={control}
          rules={{
            required: { message: '닉네임을 입력해주세요.', value: true },
          }}
          render={({ field }) => (
            <TextField
              label='* 닉네임'
              {...field}
              error={Boolean(errors.nickName)}
              helperText={errors.nickName?.message}
            />
          )}
        />
        <Controller
          name='phoneNumber'
          rules={{
            required: {
              message: "연락처를 입력해주세요. '-' 제외",
              value: true,
            },
          }}
          control={control}
          render={({ field }) => (
            <TextField
              label='* 연락처'
              {...field}
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber?.message}
            />
          )}
        />

        <JoinTerms />
        <Controller
          name='agree'
          control={control}
          rules={{
            required: { message: '약관에 동의해주세요.', value: true },
          }}
          render={({ field }) => (
            <FormControlLabel
              sx={{ justifyContent: 'end' }}
              control={<Checkbox {...field} />}
              label='약관을 모두 읽었으며 동의합니다.'
            />
          )}
        />
        <Stack alignItems={'end'}>
          <ErrorMessage
            errors={errors}
            name='agree'
            render={({ message }) => (
              <Typography color='error'>{message}</Typography>
            )}
          />
        </Stack>
        <Stack direction={'row'} spacing={1}>
          <Button type='submit' variant='contained' sx={{ width: '100%' }}>
            회원가입
          </Button>
          <Button
            type='reset'
            variant='outlined'
            onClick={() => {
              router.push('/');
            }}
            sx={{ width: '100%' }}
          >
            회원가입 취소
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AccountPage;
