'use client';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, MenuItem, MenuList } from '@mui/material';
import { AiOutlineClose } from 'react-icons/ai';

import { LightTooltip, mgnbBtnStyle } from './StyleComponents';
import { PagesRoutes } from '@/constant/PagesRoutes';
import UtilBtn from './UtilBtn';
import { useAuthStore } from '@/stores/useAuthStore';

interface MGNBProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const MGNB = ({ isOpen, setIsOpen }: MGNBProps) => {
  const { user } = useAuthStore();
  const router = useRouter();
  const [subMenu, setSubMenu] = useState<null | string>(null);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClose = (e: { target: any }) => {
      if (isOpen && ref.current && ref.current === e.target) setIsOpen(false);
    };
    document.addEventListener('click', handleOutsideClose);

    return () => document.removeEventListener('click', handleOutsideClose);
  }, [isOpen, setIsOpen]);

  return (
    <div
      ref={ref}
      className={`fixed top-0 left-0 xl:hidden w-full h-[100dvh] z-50
         transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      // className={`${isOpen ? 'fixed top-0 left-0 xl:hidden w-screen h-[100dvh] bg-black/30 z-50' : ''}`}
    >
      <div
        //  className={`absolute max-w-[500px] h-full
        //   transition-all delay-100 ease-in-out
        //   bg-white flex flex-col items-start justify-between p-4
        //   ${isOpen ? 'left-0 w-4/5' : '-left-full w-0'}`}
        className={`absolute max-w-[500px] h-full
          transition-transform duration-300 ease-in-out
          bg-white flex flex-col items-start justify-between p-4
           left-0 w-4/5
           shadow-xl
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
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
                setSubMenu(null);
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
                      setSubMenu(null);
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
