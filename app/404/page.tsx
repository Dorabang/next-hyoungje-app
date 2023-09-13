import { Button } from '@mui/material';

const ErrorPage = () => {
  return (
    <div className='h-[600px] flex justify-center items-center'>
      <div className='flex flex-col gap-2 justify-center'>
        <p>잘못된 접근입니다. 로그인 후, 이용해주세요.</p>
        <Button variant='contained' href='/'>
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
