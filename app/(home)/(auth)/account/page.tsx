'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { Button, Checkbox, FormControlLabel, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ErrorMessage } from '@hookform/error-message';

import JoinTerms from '@/components/Auth/JoinTerms/JoinTerms';
import defaultProfile from '@/assets/common/defaultProfile.jpg';
import { CssTextField } from '@/(home)/(auth)/login/styleComponents';
import AutoHeightImageWrapper from '@/components/common/Wrapper/AutoHeightImageWrapper';
import { createUser, CreateUserData } from '@/apis/users';
import { confirmVerificationCode, sendEmailVerifyCode } from '@/apis/auth';

interface Inputs {
  userId: string;
  name: string;
  password1: string;
  password2: string;
  photoUrl: string;
  displayName: string;
  email: string;
  agree: boolean;
  authCode: string;
}

const AccountPage = () => {
  const router = useRouter();

  const [image, setImage] = useState<{
    data: File | null;
    preview: string | null;
  }>({ data: null, preview: null });
  const [emailVerify, setEmailVerify] = useState(false);
  const [getAuthCode, setGetAuthCode] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    setError,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const handleSendMail = async () => {
    const email = getValues('email');

    if (email !== '') {
      await sendEmailVerifyCode(email);
      setGetAuthCode(true);
    } else {
      setError('email', { message: '이메일을 입력해주세요.' });
    }
  };

  const handleClickEmailVerified = async () => {
    const authCode = getValues('authCode');
    const email = getValues('email');

    if (authCode !== '') {
      try {
        const res = await confirmVerificationCode(email, authCode);
        if (res.result === 'SUCCESS') {
          setEmailVerify(true);
          alert('이메일 인증이 완료되었습니다.');
        } else {
          setError('authCode', res);
        }
      } catch (error) {
        alert('이메일 인증 중 문제가 발생했습니다. 다시 시도해주세요.');
        setValue('authCode', '');
        setGetAuthCode(false);
        // console.log('🚀 ~ handleClickEmailVerified ~ error22:', error);
      }
    } else {
      setError('authCode', { message: '인증코드를 입력해주세요.' });
    }
  };

  const onSubmit = async (data: Inputs) => {
    const { userId, password2, displayName, email, name } = data;

    try {
      const userObj: CreateUserData = {
        userId,
        password: password2,
        displayName,
        email,
        name,
        ...(image?.data && { profile: image?.data }),
      };
      const response = await createUser(userObj);
      if (response?.result === 'SUCCESS') {
        router.push('/');
      }
    } catch (error) {
      if (error) {
        // console.log('🚀 ~ onSubmit ~ error:', error);
        const { message } = error as { message: string };
        alert(message);
      } else {
        alert(
          '회원가입 중 문제가 발생하였습니다.\n\r잠시 후 다시 시도해주세요.',
        );
      }
    }
  };

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
              src={image.preview ? image.preview : defaultProfile}
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
          name='name'
          rules={{
            required: {
              message: '성함을 입력해주세요.',
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
          name='userId'
          rules={{
            required: {
              message: '아이디를 6자 이상 입력해주세요. ex) example',
              value: true,
            },
            pattern: {
              message: '잘못된 아아디 형식입니다.',
              value: /^[A-Z0-9._%+-]/i,
            },
            minLength: {
              message: '아이디는 6자리 이상이어야 합니다.',
              value: 6,
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
          name='displayName'
          control={control}
          rules={{
            required: { message: '닉네임을 입력해주세요.', value: true },
          }}
          render={({ field }) => (
            <CssTextField
              label='* 닉네임'
              {...field}
              error={Boolean(errors.displayName)}
              helperText={errors.displayName?.message}
            />
          )}
        />

        <Stack
          flexDirection={'row'}
          gap={2}
          sx={{ justifyContent: 'space-between' }}
        >
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
                label='* 이메일'
                {...field}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                fullWidth
              />
            )}
          />

          <Button type='button' disabled={emailVerify} onClick={handleSendMail}>
            전송
          </Button>
        </Stack>
        {getAuthCode && (
          <Stack
            flexDirection={'row'}
            gap={2}
            sx={{ justifyContent: 'space-between' }}
          >
            <Controller
              name='authCode'
              rules={{
                required: {
                  message: '인증코드를 입력해주세요.',
                  value: true,
                },
              }}
              disabled={emailVerify}
              control={control}
              render={({ field }) => (
                <div className='w-full relative'>
                  <CssTextField
                    label='* 인증코드'
                    {...field}
                    error={Boolean(errors.authCode)}
                    helperText={errors.authCode?.message}
                    fullWidth
                  />
                  {getAuthCode && !emailVerify && (
                    <p className='text-sm text-grayColor-300 pl-1'>
                      이메일 인증 유효시간은 5분입니다.
                    </p>
                  )}
                </div>
              )}
            />

            <Button
              type='button'
              disabled={emailVerify}
              onClick={handleClickEmailVerified}
            >
              확인
            </Button>
          </Stack>
        )}

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
          <Button
            type='submit'
            disabled={!emailVerify}
            variant='contained'
            sx={{ width: '100%' }}
          >
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
