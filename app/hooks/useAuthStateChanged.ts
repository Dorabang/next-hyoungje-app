'use client';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { authStateChanged } from '@/apis/auth';
import { authState } from '@/recoil/atoms';

const useAuthStateChanged = () => {
  const setAuth = useSetRecoilState(authState);

  useEffect(() => {
    (async () => {
      const authState = await authStateChanged();
      setAuth(authState);
    })();
  }, []);
};

export default useAuthStateChanged;
