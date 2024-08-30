'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Stack, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

import { User, authState } from '@/recoil/atoms';
import {
  checkPasswordValidation,
  deleteUser,
  updatePassword,
} from '@/apis/users';
import { CssTextField } from '@/(home)/(auth)/login/styleComponents';
import { useSetRecoilState } from 'recoil';

interface Inputs {
  userId: string;
  password: string;
  password2: string;
  passwordCheck: string;
}

const ChangeUserInfo = ({ user }: { user: User }) => {
  const router = useRouter();

  const setUser = useSetRecoilState(authState);

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

  const onSubmit = async (data: Inputs) => {
    const { passwordCheck, password, password2 } = data;
    setError(null);

    /* 비밀번호 검증 전 */
    if (passwordCheck === '') {
      return setError('비밀번호를 입력해주세요.');
    }

    if (passwordCheck !== '' && !isEdit) {
      const response = await checkPasswordValidation(passwordCheck);
      if (!response.data) {
        return setError('비밀번호를 잘못 입력했습니다.');
      } else {
        return setIsEdit((prev) => !prev);
      }
    }

    /* 비밀번호 검증 후 */
    if (password !== '' && isEdit) {
      const response = await updatePassword(password);
      if (response) {
        alert(
          '비밀번호가 성공적으로 변경되었습니다. 다시 로그인 후 이용해주세요.',
        );
        router.push('/login');
      }
    }
  };

  const handleDeleteUser = async () => {
    const ok = confirm(
      `탈퇴하시겠습니까?\n(이 전에 작성한 게시물 및 댓글은 삭제되지 않습니다. 탈퇴 후에는 옥동의 서비스를 제한적으로 사용하실 수 있습니다.)`,
    );

    if (ok && user) {
      const result = await deleteUser();
      if (result) {
        setUser(false);
        router.push('/');
      }
    }
    return;
  };

  return (
    <Card
      variant='outlined'
      sx={{
        padding: '30px 50px',
        width: { sm: '100%', md: '500px' },
        marginX: 'auto',
      }}
    >
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
                  계정관련 수정을 원하실 경우,
                  <br />
                  비밀번호를 인증해주세요.
                </Typography>
                <Stack spacing={1} sx={{ position: 'relative' }}>
                  <CssTextField
                    autoComplete={'new-password'}
                    label='비밀번호'
                    type={showPw ? 'text' : 'password'}
                    error={error !== null}
                    helperText={error}
                    {...field}
                  />
                  <div
                    className='absolute right-4 top-[2px] cursor-pointer text-grayColor-300 hover:text-grayColor-500 p-2'
                    onClick={() => setShowPw((prev) => !prev)}
                  >
                    {showPw ? <IoMdEyeOff size={18} /> : <IoMdEye size={18} />}
                  </div>
                </Stack>
                <Button type='submit'>확인</Button>
              </>
            )}
          />
        )}
        {isEdit && (
          <>
            <Controller
              name='userId'
              rules={{
                pattern: {
                  message: '잘못된 아이디입니다.',
                  value: /^[A-Z0-9._%+-]/i,
                },
              }}
              control={control}
              render={({ field }) => (
                <CssTextField
                  error={Boolean(errors.userId)}
                  helperText={errors.userId?.message}
                  disabled
                  label='아이디'
                  defaultValue={user?.userId}
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
              <Button
                type='button'
                onClick={handleDeleteUser}
                variant='text'
                sx={{ width: '100%' }}
              >
                회원 탈퇴
              </Button>
            </Stack>

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
