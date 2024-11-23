'use client';
import { useMemo } from 'react';
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

import { authBtnStyle } from './StyleComponents';
import { routes } from '../../../constant/Routes';
import { logout } from '@/apis/auth';
import { useAuthStore } from '@/stores/useAuthStore';

const UtilBtn = ({ onClick }: { onClick?: () => void }) => {
  const { user, setUser } = useAuthStore();
  const router = useRouter();

  return useMemo(() => {
    const onLogOutClick = async () => {
      await logout();
      setUser(null);
      onClick && onClick();
      router.push('/');
    };

    return (
      <Box sx={{ flexGrow: 0, gap: '4px' }}>
        {user ? (
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
  }, [user, setUser, router, onClick]);
};

export default UtilBtn;
