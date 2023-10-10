'use client';

import { useEffect, useState } from 'react';

/* mui */
import {
  AppBar,
  Box,
  Button,
  Container,
  MenuItem,
  MenuList,
  Stack,
  Toolbar,
} from '@mui/material';
import { MUIStyledCommonProps } from '@mui/system';
import { LightTooltip, authBtnStyle, btnStyle } from './StyleComponents';

/* next */
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/* firebase */
import { User, signOut } from 'firebase/auth';
import { authService } from '@/firebase';

/* recoil */
import { useRecoilState } from 'recoil';
import { authState } from '@/recoil/atoms';

/* constants */
import { routes } from './Constants';

/* utils */
import useAuthStateChanged from '@/hooks/useAuthStateChanged';
import GetImageURL from '@/utils/getImageURL';

/* image */
import logoImg from '@/assets/common/logo.png';
import defaultProfile from '@/assets/defaultProfile.jpg';

const {
  livingVegetable,
  generalMarketplace,
  naturalHerbs,
  singleLeaf,
  community,
} = routes;

interface pagesType {
  name: string;
  path: string;
  members?: boolean;
  depth: { name?: string; path?: string }[];
}
[];

interface pagesTypes extends Array<pagesType> {}

const pages: pagesTypes = [
  {
    name: livingVegetable.name,
    path: livingVegetable.path,
    depth: livingVegetable.depth1,
  },
  { name: generalMarketplace.name, path: generalMarketplace.path, depth: [] },
  { name: naturalHerbs.name, path: naturalHerbs.path, depth: [] },
  {
    name: singleLeaf.name,
    path: singleLeaf.path,
    members: singleLeaf.members,
    depth: [],
  },
  { name: community.name, path: community.path, depth: community.depth1 },
];

const LogoButton = (props: MUIStyledCommonProps) => {
  return (
    <Box {...props}>
      <Link href='/'>
        <Stack
          sx={{
            width: 150,
            mr: 2,
            minWidth: 140,
            height: 64,
            position: 'relative',
          }}
        >
          <Image
            src={logoImg}
            alt='형제난원'
            fill
            sizes='100%'
            style={{ objectFit: 'cover' }}
          />
        </Stack>
      </Link>
    </Box>
  );
};

const Nav = () => {
  useAuthStateChanged();
  const [user, setUser] = useRecoilState<User | null>(authState);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const [profile, setProfile] = useState<string>();

  const router = useRouter();

  const onLogOutClick = () => {
    signOut(authService);
    setUser(null);
    router.refresh();
  };

  useEffect(() => {
    const changeProfile = (value: string) => {
      setProfile(value);
    };
    /* proflie */
    user && GetImageURL(`profile/${user.uid}/image`, changeProfile);

    /* scroll event */
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [user]);

  return (
    <>
      <AppBar
        position={isScrolled ? 'fixed' : 'static'}
        sx={{
          background: 'rgba(255,255,255,0.95)',
          padding: '10px 0',
          borderBottom: '1px solid #ddd',
          boxShadow: 'none',
        }}
        color='transparent'
        style={{ backdropFilter: isScrolled ? 'blur(80%)' : 'none' }}
      >
        <Container maxWidth='xl'>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: { xs: 'end', lg: 'space-between' },
              position: 'relative',
            }}
          >
            <LogoButton
              sx={{
                display: { xs: 'none', md: 'flex' },
                transform: { xs: 'translateX(-50%)', lg: 'translateX(0)' },
                position: { xs: 'absolute', lg: 'static' },
                left: '50%',
              }}
            />
            {/* 네이게이션 */}
            <Box
              component={'nav'}
              sx={{
                flexGrow: 1,
                display: { xs: 'none', lg: 'flex' },
                justifyContent: 'center',
              }}
            >
              {pages.map((item) => {
                return !user ? (
                  !item.members && (
                    <LightTooltip
                      key={item.name}
                      title={
                        item.depth.length === 0 ? (
                          ''
                        ) : (
                          <MenuList>
                            {item.depth?.map((item2) => (
                              <MenuItem
                                key={item2.name}
                                onClick={() => router.push(`${item2.path}`)}
                              >
                                {item2.name}
                              </MenuItem>
                            ))}
                          </MenuList>
                        )
                      }
                    >
                      <Button
                        onClick={() => router.push(item.path)}
                        sx={btnStyle}
                      >
                        {item.name}
                      </Button>
                    </LightTooltip>
                  )
                ) : (
                  <LightTooltip
                    key={item.name}
                    title={
                      item.depth.length === 0 ? (
                        ''
                      ) : (
                        <MenuList>
                          {item.depth?.map((item2) => (
                            <MenuItem
                              key={item2.name}
                              onClick={() => router.push(`${item2.path}`)}
                            >
                              {item2.name}
                            </MenuItem>
                          ))}
                        </MenuList>
                      )
                    }
                  >
                    <Button
                      onClick={() => router.push(item.path)}
                      sx={btnStyle}
                    >
                      {item.name}
                    </Button>
                  </LightTooltip>
                );
              })}
            </Box>
            <LogoButton
              sx={{
                display: { xs: 'flex', md: 'none' },
                mr: 1,
                flexGrow: 1,
                justifyContent: 'center',
              }}
            />
            {/* 로고옆 메뉴들 */}

            {/* 오른쪽 */}
            <Box sx={{ flexGrow: 0 }}>
              {user ? (
                <>
                  <Button
                    onClick={() => router.push(routes.myPage.path)}
                    sx={authBtnStyle}
                  >
                    <div className='flex gap-[6px] items-center'>
                      <div className='relative mt-[1px] w-6 h-6 rounded-full overflow-hidden'>
                        <Image
                          src={profile ? profile : defaultProfile}
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
                    onClick={() => router.push(routes.login.path)}
                    sx={authBtnStyle}
                  >
                    {routes.login.name}
                  </Button>
                  <Button
                    onClick={() => router.push(routes.join.path)}
                    sx={authBtnStyle}
                  >
                    {routes.join.name}
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Nav;
