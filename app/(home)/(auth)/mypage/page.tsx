'use client';
import { useEffect, useState } from 'react';

import { getUser } from '@/apis/users';
import ContainerBox from '@/components/common/ContainerBox';
import ChangeProfile from '@/components/Mypage/ChangeProfile';
import ChangeUserInfo from '@/components/Mypage/ChangeUserInfo';
import { User } from '@/stores/useAuthStore';

const MyPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!user) {
      (async () => {
        const user = await getUser();
        setUser(user ?? null);
      })();
    }
  }, [user]);

  if (!user) return;

  return (
    <ContainerBox className='flex flex-col justify-center gap-5'>
      <ChangeProfile user={user} />

      <ChangeUserInfo user={user} />
    </ContainerBox>
  );
};

export default MyPage;
