import { authService } from '@/firebase';
import { authState } from '@/recoil/atoms';
import { Box, Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { authBtnStyle } from './StyleComponents';
import { routes } from '../../../constant/Routes';

import defaultProfile from '@/assets/defaultProfile.jpg';

const UtilBtn = ({ onClick }: { onClick?: () => void }) => {
  const [user, setUser] = useRecoilState(authState);
  const router = useRouter();

  return useMemo(() => {
    const onLogOutClick = () => {
      signOut(authService);
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
              <div className='flex gap-[6px] items-center'>
                <div className='relative mt-[1px] w-6 h-6 rounded-full overflow-hidden'>
                  <Image
                    src={user.photoURL ? user.photoURL : defaultProfile}
                    alt={`${user.displayName} 업로드 이미지`}
                    fill
                    sizes='100%'
                  />
                </div>
                <p className='normal-case'>{user.displayName}</p>
              </div>
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
