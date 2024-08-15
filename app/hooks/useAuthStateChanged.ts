'use client';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { reissueAccessToken } from '@/apis/auth';
import { authStateChanged } from '@/apis/auth';
import { authState } from '@/recoil/atoms';
import { getCookie } from '@/utils/cookieStore';

const useAuthStateChanged = () => {
  const [user, setUser] = useRecoilState(authState);

  useEffect(() => {
    (async () => {
      const authState = await authStateChanged();
      setUser(authState);
    })();
  });

  useEffect(() => {
    if (user) {
      (async () => {
        const access = await getCookie('access_token');
        const refresh = await getCookie('refresh_token');
        if (!access && refresh) {
          await reissueAccessToken();
        }
      })();
    }
  }, [user]);
};

export default useAuthStateChanged;
