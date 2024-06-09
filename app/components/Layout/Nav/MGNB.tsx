'use client';
import React, { Fragment, useState } from 'react';
import { LightTooltip, mgnbBtnStyle } from './StyleComponents';
import { useRecoilValue } from 'recoil';
import { authState } from '@/recoil/atoms';
import { User } from 'firebase/auth';
import { Box, Button, MenuItem, MenuList } from '@mui/material';
import { useRouter } from 'next/navigation';
import { AiOutlineClose } from 'react-icons/ai';
import { PagesRoutes } from '@/constant/PagesRoutes';
import UtilBtn from './UtilBtn';

interface MGNBProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
const MGNB = ({ isOpen, setIsOpen }: MGNBProps) => {
  const user = useRecoilValue<User | null>(authState);
  const router = useRouter();
  const [subMenu, setSubMenu] = useState<null | string>(null);

  return (
    <div
      className={`${isOpen ? 'fixed top-0 left-0 lg:hidden w-screen h-screen bg-black/30 z-50' : ''}`}
    >
      <div
        className={`absolute h-full transition-all delay-100 ease-in-out bg-white flex flex-col items-start justify-between p-4 ${isOpen ? 'left-0 w-4/5' : '-left-full w-0'}`}
      >
        <div>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              width: '100%',
            }}
          >
            <Box
              sx={{ padding: '8px', width: 'auto', cursor: 'pointer' }}
              onClick={() => setIsOpen(false)}
            >
              <AiOutlineClose size={24} />
            </Box>
          </Box>

          {PagesRoutes.map((item) => {
            return !user ? (
              !item.members && (
                <LightTooltip key={item.name} title={''}>
                  <Fragment>
                    <Button
                      onClick={() => {
                        if (item.depth.length === 0) {
                          router.push(item.path);
                          return setIsOpen(false);
                        }
                        setSubMenu((prev) =>
                          prev === item.name ? null : item.name,
                        );
                      }}
                      sx={mgnbBtnStyle}
                    >
                      {item.name}
                    </Button>
                    {item.depth.length === 0
                      ? null
                      : subMenu !== null &&
                        subMenu === item.name && (
                          <MenuList
                            sx={{ width: '100%', background: '#fafafa' }}
                          >
                            {subMenu === item.name &&
                              item.depth?.map((item2) => (
                                <MenuItem
                                  key={item2.name}
                                  onClick={() => {
                                    router.push(`${item2.path}`);
                                    setIsOpen(false);
                                  }}
                                >
                                  {item2.name}
                                </MenuItem>
                              ))}
                          </MenuList>
                        )}
                  </Fragment>
                </LightTooltip>
              )
            ) : (
              <LightTooltip key={item.name} title={''}>
                <Fragment>
                  <Button
                    onClick={() => {
                      if (item.depth.length === 0) {
                        router.push(item.path);
                        return setIsOpen(false);
                      }

                      setSubMenu((prev) =>
                        prev === item.name ? null : item.name,
                      );
                    }}
                    sx={mgnbBtnStyle}
                  >
                    {item.name}
                  </Button>
                  {item.depth.length === 0
                    ? null
                    : subMenu !== null &&
                      subMenu === item.name && (
                        <MenuList sx={{ width: '100%', background: '#fafafa' }}>
                          {subMenu === item.name &&
                            item.depth?.map((item2) => (
                              <MenuItem
                                key={item2.name}
                                onClick={() => {
                                  router.push(`${item2.path}`);
                                  setIsOpen(false);
                                }}
                              >
                                {item2.name}
                              </MenuItem>
                            ))}
                        </MenuList>
                      )}
                </Fragment>
              </LightTooltip>
            );
          })}
        </div>
        <div className='w-full flex justify-end'>
          <UtilBtn />
        </div>
      </div>
    </div>
  );
};

export default MGNB;
