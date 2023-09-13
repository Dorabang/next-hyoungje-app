import { Button, Stack } from '@mui/material';

const ErrorPage = () => {
  return (
    <div className='h-[600px] flex justify-center items-center'>
      <Stack direction={'col'} spacing={8}>
        <p>잘못된 접근입니다. 로그인 후, 이용해주세요.</p>
        <div className='mx-auto'>
          <Button variant='contained' href='/' size='medium'>
            홈으로 돌아가기
          </Button>
        </div>
      </Stack>
    </div>
  );
};

export default ErrorPage;
