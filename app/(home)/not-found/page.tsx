import { Button, Stack } from '@mui/material';
import Link from 'next/link';

const ErrorPage = () => {
  return (
    <div className='h-[600px] flex justify-center items-center'>
      <Stack direction={'column'} spacing={5} alignItems={'center'}>
        <p className='text-center'>
          잘못된 접근입니다.
          <br />
          로그인 후, 이용해주세요.
        </p>
        <Link
          href='/'
          className='text-white bg-[#333] border border-[#333] transition-colors
            hover:bg-white hover:text-black
            px-5 py-2'
        >
          홈으로 돌아가기
        </Link>
      </Stack>
    </div>
  );
};

export default ErrorPage;
