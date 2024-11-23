'use client';
import { Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };
  return (
    <div className='h-[400px] flex justify-center items-center'>
      <Stack direction={'column'} spacing={5} alignItems={'center'}>
        <p className='text-center'>게시물이 삭제되었거나 찾을 수 없습니다.</p>
        <button
          onClick={handleClick}
          className='text-white bg-[#333] border border-[#333] transition-colors
            hover:bg-white hover:text-black
            px-5 py-2'
        >
          이전 페이지로 돌아가기
        </button>
      </Stack>
    </div>
  );
};

export default NotFoundPage;
