'use client';
import React, { Fragment, useEffect, useState } from 'react';
import { LightTooltip, mgnbBtnStyle } from './StyleComponents';
import { useRecoilValue } from 'recoil';
import { authState } from '@/recoil/atoms';
import { pages } from './index';
import { User } from 'firebase/auth';
import { Box, Button, MenuItem, MenuList } from '@mui/material';
import { useRouter } from 'next/navigation';
import { btnStyle } from './StyleComponents';
import { AiOutlineClose } from 'react-icons/ai';

interface MGNBProps {
  setIsOpen: (value: boolean) => void;
}
const MGNB = ({ setIsOpen }: MGNBProps) => {
  const user = useRecoilValue<User | null>(authState);
  const router = useRouter();
  const [subMenu, setSubMenu] = useState<null | string>(null);

  return (
    <div className='fixed top-0 left-0 md:hidden w-screen h-screen bg-black/30 z-50'>
      <div className='absolute right-0 h-full w-4/5 bg-white flex flex-col items-start p-4'>
        <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
          <Box
            sx={{ padding: '8px', width: 'auto', cursor: 'pointer' }}
            onClick={() => setIsOpen(false)}
          >
            <AiOutlineClose size={24} />
          </Box>
        </Box>

        {pages.map((item) => {
          return !user ? (
            !item.members && (
              <LightTooltip key={item.name} title={''}>
                <Fragment>
                  <Button
                    onClick={() =>
                      item.depth.length === 0
                        ? router.push(item.path)
                        : setSubMenu((prev) =>
                            prev === item.name ? null : item.name
                          )
                    }
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
            )
          ) : (
            <LightTooltip key={item.name} title={item.name}>
              <Button sx={btnStyle}>{item.name}</Button>
            </LightTooltip>
          );
        })}
      </div>
    </div>
  );
};

export default MGNB;
