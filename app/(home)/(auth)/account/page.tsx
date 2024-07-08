'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { doc, setDoc } from 'firebase/firestore';
import { authService, dbService } from '@/firebase';
import { updateProfile, createUserWithEmailAndPassword } from 'firebase/auth';
import { Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ErrorMessage } from '@hookform/error-message';

import JoinTerms from '@/components/JoinTerms/JoinTerms';
import uploadImage from '@/apis/images/uploadImage';
import defaultProfile from '@/assets/defaultProfile.jpg';
import { CssTextField } from '@/(home)/(auth)/login/styleComponents';
import AutoHeightImageWrapper from '@/components/AutoHeightImageWrapper';
import { imageResize } from '@/utils/imageResize';

interface Inputs {
  email: string;
  password1: string;
  password2: string;
  photoUrl: string;
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
      await createUserWithEmailAndPassword(
        authService,
        `${email}@hyoungje.kr`,
        password2,
      );
      const user = authService.currentUser;

      if (user) {
        const photo = await uploadImage(`/profile/${user.uid}/photo`, image);

        await updateProfile(user, {
          displayName: nickName,
          photoURL: photo,
        });

        const userObj = {
          id: user.uid,
          displayName: nickName,
          phoneNumber: phoneNumber,
          like: [],
        };

        await setDoc(doc(dbService, 'users', user.uid), userObj);
        alert('회원가입에 성공 했습니다.');
        router.push('/');
      }

      // userObj && (await addDoc(collection(dbService, 'users'), userObj));
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

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;

    if (files) {
      const theFile = files[0];

      const resizingImage = await imageResize(theFile);
      setImage(resizingImage);
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
        width={{ xs: '100%', md: 400 }}
        paddingX={{ xs: '12px' }}
        component={'form'}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete='off'
      >
        <div className='flex flex-col gap-4 items-center'>
          <p className='text-grayColor-700'>프로필 이미지</p>
          <div className='h-40 w-40 rounded-full overflow-hidden relative'>
            <AutoHeightImageWrapper
              src={image !== '' ? image : defaultProfile}
              alt='프로필 이미지 미리보기'
            />
          </div>
          <label className='p-2 border border-grayColor-400 transition-colors hover:bg-grayColor-400 rounded hover:text-white cursor-pointer'>
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
              message: '아이디를 입력해주세요. ex) example',
              value: true,
            },
            pattern: {
              message: '잘못된 아아디 형식입니다.',
              value: /^[A-Z0-9._%+-]/i,
            },
          }}
          control={control}
          render={({ field }) => (
            <CssTextField
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              label='* 아이디'
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

        <Controller
          name='nickName'
          control={control}
          rules={{
            required: { message: '닉네임을 입력해주세요.', value: true },
          }}
          render={({ field }) => (
            <CssTextField
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
            <CssTextField
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
              className='checkbox'
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
        <Stack direction={'row'} spacing={1} paddingBottom={'100px'}>
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
