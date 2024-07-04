'use client';
import { useRecoilValue } from 'recoil';

import { authState } from '@/recoil/atoms';
import ContainerBox from '@/components/ContainerBox';
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
