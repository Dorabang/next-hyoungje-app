'use client';
import { authState } from '@/recoil/atoms';
import { useRecoilValue } from 'recoil';
import ContainerBox from '@/components/ContainerBox';
import { Stack } from '@mui/material';
import ChangeProfile from '@/components/Mypage/ChangeProfile';
import ChangeUserInfo from '@/components/Mypage/ChangeUserInfo';

const MyPage = () => {
  const user = useRecoilValue(authState);

  if (!user) return;

  return (
    <ContainerBox className='flex flex-col justify-center gap-5'>
      <ChangeProfile user={user} />

      <ChangeUserInfo user={user} />
    </ContainerBox>
  );
};

export default MyPage;
