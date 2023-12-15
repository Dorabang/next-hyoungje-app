'use client';
import useOutsideClick from '@/hooks/useOutsideClick';
import { modalState } from '@/recoil/atoms';
import React, { useRef } from 'react';
import { useSetRecoilState } from 'recoil';

const ToastifyModal = ({
  children,
  setOk,
}: {
  children: React.ReactNode;
  setOk?: (value: boolean) => void;
}) => {
  const ref = useRef(null);
  const setIsOpen = useSetRecoilState(modalState);

  useOutsideClick(ref, () => setIsOpen(false));

  return (
    <div className='fixed z-20 w-full h-full left-1/2 bottom-0 -translate-x-1/2 bg-black/10'>
      <div
        ref={ref}
        className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2
        w-full max-w-[500px] h-[250px] mx-6 sm:mx-0
        shadow-[0_-10px_60px_rgba(0,0,0,0.15)]
        rounded-lg bg-white overflow-hidden
        flex flex-col items-center justify-between
      '
      >
        <div className='flex-grow h-full flex items-center'>{children}</div>
        <div
          className='w-full bg-grayColor-500 text-white flex justify-center py-3 cursor-pointer'
          onClick={() => {
            setIsOpen(false);
            setOk && setOk(true);
          }}
        >
          확인
        </div>
      </div>
    </div>
  );
};

export default ToastifyModal;
