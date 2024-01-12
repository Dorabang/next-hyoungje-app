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
import { LightTooltip, btnStyle } from './StyleComponents';

/* next */
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

/* firebase */
import { User } from 'firebase/auth';

/* recoil */
import { useRecoilValue } from 'recoil';
import { authState } from '@/recoil/atoms';

/* constants */
import { routes } from './Constants';

/* utils */
import useAuthStateChanged from '@/hooks/useAuthStateChanged';

/* image */
import logoImg from '@/assets/common/logo.png';
import UtilBtn from './UtilBtn';
import MGNB from './MGNB';
import { AiOutlineMenu } from 'react-icons/ai';
import ContainerBox from '../ContainerBox';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

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

export const pages: pagesTypes = [
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
  const user = useRecoilValue<User | null>(authState);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { lockScroll, openScroll } = useBodyScrollLock();

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
    <>
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
              {/* utilBtn */}
              <UtilBtn />
            </Box>

            {/* mgnb */}
            <Box
              sx={{
                width: '100%',
                display: { xs: 'flex', md: 'none' },
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <LogoButton
                sx={{
                  flexGrow: 1,
                  display: 'flex',
                  justifyContent: 'center',
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

      {isOpen ? <MGNB setIsOpen={(value) => setIsOpen(value)} /> : null}
    </>
  );
};

export default Nav;
