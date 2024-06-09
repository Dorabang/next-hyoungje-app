'use client';

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
import { LightTooltip, btnStyle } from './StyleComponents';

/* next */
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';

/* firebase */
import { User } from 'firebase/auth';

/* recoil */
import { useRecoilValue } from 'recoil';
import { authState } from '@/recoil/atoms';

/* utils */
import { noto_serif_kr } from '@/components/NotoSerif';
import useAuthStateChanged from '@/hooks/useAuthStateChanged';
import UtilBtn from './UtilBtn';
import MGNB from './MGNB';
import { AiOutlineMenu } from 'react-icons/ai';
import { PagesRoutes } from '@/constant/PagesRoutes';

/* image */
import logoImg from '@/assets/common/logo.png';

const LogoButton = (props: MUIStyledCommonProps) => {
  return (
    <Box {...props}>
      <Stack
        sx={{
          width: 100,
          minWidth: 70,
          height: 64,
          position: 'relative',
        }}
      >
        <Link href='/'>
          <Image
            src={logoImg}
            alt='형제난원'
            fill
            sizes='100%'
            className='object-contain'
          />
        </Link>
      </Stack>
    </Box>
  );
};

const Nav = () => {
  useAuthStateChanged();
  const user = useRecoilValue<User | null>(authState);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    /* scroll event */
    const handleScroll = () => {
      if (window.scrollY > 100) {
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <Fragment>
      <AppBar
        position={isScrolled ? 'fixed' : 'static'}
        sx={{
          background: 'rgba(255,255,255,0.85)',
          padding: '10px 0',
          borderBottom: '1px solid #ddd',
          boxShadow: 'none',
          zIndex: '30',
        }}
        color='transparent'
        style={{ backdropFilter: isScrolled ? 'blur(10px)' : 'none' }}
      >
        <Container maxWidth='xl'>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', lg: 'space-between' },
              position: 'relative',
              padding: { xs: '0', md: '0 16px' },
            }}
          >
            <LogoButton
              sx={{
                display: { xs: 'none', lg: 'flex' },
              }}
            />

            {/* 네이게이션 */}
            <Box
              component={'nav'}
              sx={{
                flexGrow: 1,
                display: { xs: 'none', lg: 'flex' },
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                {PagesRoutes.map((item) => {
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
                                  className={`${noto_serif_kr.className}`}
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
                          className={`${noto_serif_kr.className}`}
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
                                className={`${noto_serif_kr.className}`}
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
                        className={`${noto_serif_kr.className}`}
                      >
                        {item.name}
                      </Button>
                    </LightTooltip>
                  );
                })}
              </Box>
              {/* utilBtn */}
              <UtilBtn />
            </Box>

            {/* mgnb */}
            <Box
              sx={{
                width: '100%',
                display: { xs: 'flex', lg: 'none' },
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <LogoButton
                sx={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              />

              <Box
                onClick={() => setIsOpen(true)}
                sx={{ cursor: 'pointer', padding: '8px' }}
              >
                <AiOutlineMenu size={24} />
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <MGNB isOpen={isOpen} setIsOpen={(value) => setIsOpen(value)} />
    </Fragment>
  );
};

export default Nav;