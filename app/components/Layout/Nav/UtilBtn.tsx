'use client';
import { useMemo } from 'react';
import { authState } from '@/recoil/atoms';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

import { authBtnStyle } from './StyleComponents';
import { routes } from '../../../constant/Routes';
import { logout } from '@/apis/auth';

const UtilBtn = ({ onClick }: { onClick?: () => void }) => {
  const [auth, setAuth] = useRecoilState(authState);
  const router = useRouter();

  return useMemo(() => {
    const onLogOutClick = async () => {
      await logout();
      setAuth(null);
      onClick && onClick();
      router.push('/');
    };

    return (
      <Box sx={{ flexGrow: 0, gap: '4px' }}>
        {auth ? (
          <>
            <Button
              onClick={() => {
                onClick && onClick();
                router.push(routes.bookmark.path);
              }}
              sx={authBtnStyle}
            >
              {routes.bookmark.name}
            </Button>
            <Button
              onClick={() => {
                onClick && onClick();
                router.push(routes.myPage.path);
              }}
              sx={authBtnStyle}
            >
              마이페이지
            </Button>
            <Button onClick={onLogOutClick} sx={authBtnStyle}>
              로그아웃
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => {
                onClick && onClick();
                router.push(routes.login.path);
              }}
              sx={authBtnStyle}
            >
              {routes.login.name}
            </Button>
            <Button
              onClick={() => {
                onClick && onClick();
                router.push(routes.join.path);
              }}
              sx={authBtnStyle}
            >
              {routes.join.name}
            </Button>
          </>
        )}
      </Box>
    );
  }, [auth, setAuth, router, onClick]);
};

export default UtilBtn;
