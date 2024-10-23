'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, MenuItem, MenuList } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';

import { LightTooltip, mgnbBtnStyle } from './StyleComponents';
import { PagesRoutes } from '@/constant/PagesRoutes';
import UtilBtn from './UtilBtn';
import { useAuthStore } from '@/stores/useAuthStore';

interface MGNBProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
const MGNB = ({ isOpen, setIsOpen }: MGNBProps) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const [subMenu, setSubMenu] = useState<null | string>(null);

  return (
    <div
      className={`${isOpen ? 'fixed top-0 left-0 xl:hidden w-screen h-[100dvh] bg-black/30 z-50' : ''}`}
    >
      <div
        className={`absolute max-w-[500px] h-full transition-all delay-100 ease-in-out bg-white flex flex-col items-start justify-between p-4 ${isOpen ? 'left-0 w-4/5' : '-left-full w-0'}`}
      >
        <div className='w-full'>
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
            const handleClick = () => {
              if (item.depth.length === 0) {
                router.push(item.path);
                return setIsOpen(false);
              }
              setSubMenu((prev) => (prev === item.name ? null : item.name));
            };

            const renderMenuItems = () => (
              <MenuList sx={{ width: '100%', background: '#fafafa' }}>
                {item.depth.map((item2) => (
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
            );

            const renderButton = () => (
              <Button onClick={handleClick} sx={mgnbBtnStyle}>
                {item.name}
              </Button>
            );

            const renderTooltip = () => (
              <LightTooltip key={item.name} title={null}>
                <div>
                  {renderButton()}
                  {item.depth.length > 0 &&
                    subMenu === item.name &&
                    renderMenuItems()}
                </div>
              </LightTooltip>
            );

            if (!user) {
              return !item.members && renderTooltip();
            }

            return renderTooltip();
          })}
        </div>
        <div className='w-full flex justify-end'>
          <UtilBtn onClick={() => setIsOpen(false)} />
        </div>
      </div>
    </div>
  );
};

export default MGNB;
