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
    <ContainerBox>
      <Stack
        marginX={'auto'}
        width={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
        paddingY={4}
      >
        <Stack spacing={4}>
          <ChangeProfile user={user} />

          <ChangeUserInfo user={user} />
        </Stack>
      </Stack>
    </ContainerBox>
  );
};

export default MyPage;
