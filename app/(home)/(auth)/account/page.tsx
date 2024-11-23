'use client';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller, ControllerRenderProps } from 'react-hook-form';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Stack,
} from '@mui/material';
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

  const inputField = [
    { name: 'name', label: '* 성함', requiredMsg: '성함을 입력해주세요.' },
    {
      name: 'userId',
      label: '* 아이디',
      requiredMsg: '아이디를 6자 이상 입력해주세요.',
      minLength: 6,
      pattern: /^[A-Z0-9._%+-]/i,
      patternMsg: '잘못된 아이디 형식입니다.',
    },
    {
      name: 'password1',
      label: '* 비밀번호',
      requiredMsg: '비밀번호를 입력해주세요.',
      type: 'password',
      minLength: 6,
    },
    {
      name: 'password2',
      label: '* 비밀번호 확인',
      requiredMsg: '비밀번호 확인을 입력해주세요.',
      type: 'password',
      validate: (value: string | boolean) =>
        typeof value === 'string' && value === getValues('password1')
          ? true
          : '비밀번호가 일치하지 않습니다.',
    },
    {
      name: 'displayName',
      label: '* 닉네임',
      requiredMsg: '닉네임을 입력해주세요.',
    },
  ];

  const [image, setImage] = useState<{
    data: File | null;
    preview: string | null;
  }>({ data: null, preview: null });
  const [emailVerified, setEmailVerified] = useState(false);
  const [authCodeRequested, setAuthCodeRequested] = useState(false);

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

    if (email) {
      try {
        await sendEmailVerifyCode(email);
        setAuthCodeRequested(true);
      } catch {
        setError('email', {
          message: '이메일 전송에 실패했습니다. 다시 시도해주세요.',
        });
      }
    } else {
      setError('email', { message: '이메일을 입력해주세요.' });
    }
  };

  const handleChangeEmail = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: ControllerRenderProps<Inputs, 'email'>,
  ) => {
    field.onChange(e); // 기존 필드 변경 처리
    setAuthCodeRequested(false); // 이메일 변경 시 authCodeRequested를 false로 변경
  };

  const handleClickEmailVerified = async () => {
    const authCode = getValues('authCode');
    const email = getValues('email');

    if (authCode) {
      try {
        const res = await confirmVerificationCode(email, authCode);
        if (res.result === 'SUCCESS') {
          setEmailVerified(true);
          alert('이메일 인증이 완료되었습니다.');
        } else {
          setError('authCode', { message: res.message });
        }
      } catch {
        alert('이메일 인증 중 문제가 발생했습니다. 다시 시도해주세요.');
        setValue('authCode', '');
        setAuthCodeRequested(false);
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
        ...(image.data && { profile: image.data }),
      };

      const response = await createUser(userObj);
      if (response?.result === 'SUCCESS') {
        router.push('/');
      }
    } catch (error: any) {
      alert(
        error?.message ||
          '회원가입 중 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.',
      );
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) =>
        setImage({ data: file, preview: e.target?.result as string });
      reader.readAsDataURL(file);
    }
  };

  return (
    <Stack
      marginX='auto'
      width='100%'
      justifyContent='center'
      alignItems='center'
    >
      <Typography component='h2' variant='h4' sx={{ mb: 3, mt: 5 }}>
        회원가입
      </Typography>
      <Stack
        spacing={2}
        width={{ xs: '100%', md: 400 }}
        paddingX={{ xs: '12px' }}
        component='form'
        onSubmit={handleSubmit(onSubmit)}
        autoComplete='off'
      >
        <div className='flex flex-col gap-4 items-center'>
          <Typography className='text-grayColor-700'>프로필 이미지</Typography>
          <div className='h-40 w-40 rounded-full overflow-hidden relative'>
            <AutoHeightImageWrapper
              src={image.preview || defaultProfile}
              alt='프로필 이미지 미리보기'
            />
          </div>
          <label className='p-2 border border-grayColor-400 hover:bg-grayColor-400 rounded hover:text-white cursor-pointer'>
            파일 업로드하기
            <input
              type='file'
              accept='image/*'
              onChange={onFileChange}
              className='hidden'
            />
          </label>
        </div>

        {/* Input Fields */}
        {inputField.map(
          ({
            name,
            label,
            requiredMsg,
            type = 'text',
            minLength,
            pattern,
            patternMsg,
            validate,
          }) => (
            <Controller
              key={name}
              name={name as keyof Inputs}
              control={control}
              rules={{
                required: { value: true, message: requiredMsg },
                minLength: minLength && {
                  value: minLength,
                  message: `${label}는 ${minLength}자리 이상이어야 합니다.`,
                },
                pattern: pattern && { value: pattern, message: patternMsg },
                validate,
              }}
              render={({ field }) => (
                <CssTextField
                  label={label}
                  type={type}
                  {...field}
                  error={Boolean(errors[name as keyof Inputs])}
                  helperText={errors[name as keyof Inputs]?.message}
                />
              )}
            />
          ),
        )}

        {/* Email Verification */}
        <Stack direction='row' gap={2} justifyContent='space-between'>
          <Controller
            name='email'
            control={control}
            rules={{
              required: { value: true, message: '이메일을 입력해주세요.' },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message:
                  '유효한 이메일 주소를 입력해주세요. 예: email@example.com',
              },
            }}
            render={({ field }) => (
              <CssTextField
                label='* 이메일'
                {...field}
                onChange={(e) => handleChangeEmail(e, field)}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                fullWidth
              />
            )}
          />
          <Button
            type='button'
            disabled={emailVerified}
            onClick={handleSendMail}
          >
            전송
          </Button>
        </Stack>

        {authCodeRequested && (
          <Stack direction='row' gap={2} justifyContent='space-between'>
            <Controller
              name='authCode'
              control={control}
              rules={{
                required: { value: true, message: '인증코드를 입력해주세요.' },
              }}
              render={({ field }) => (
                <CssTextField
                  label='* 인증코드'
                  {...field}
                  error={Boolean(errors.authCode)}
                  helperText={errors.authCode?.message}
                  fullWidth
                />
              )}
            />
            <Button
              type='button'
              disabled={emailVerified}
              onClick={handleClickEmailVerified}
            >
              확인
            </Button>
          </Stack>
        )}

        {/* Join Terms */}
        <JoinTerms />
        <Controller
          name='agree'
          control={control}
          rules={{ required: { value: true, message: '약관에 동의해주세요.' } }}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox {...field} />}
              label='약관을 모두 읽었으며 동의합니다.'
            />
          )}
        />
        <ErrorMessage
          errors={errors}
          name='agree'
          render={({ message }) => (
            <Typography color='error'>{message}</Typography>
          )}
        />

        {/* Submit / Reset Buttons */}
        <Stack direction='row' spacing={1} pb={8}>
          <Button
            type='submit'
            disabled={!emailVerified && !getValues('agree')}
            variant='contained'
            fullWidth
          >
            회원가입
          </Button>
          <Button
            type='reset'
            variant='outlined'
            onClick={() => router.push('/')}
            fullWidth
          >
            회원가입 취소
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AccountPage;
