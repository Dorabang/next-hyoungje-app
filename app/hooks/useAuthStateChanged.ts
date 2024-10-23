'use client';
import { useEffect } from 'react';

import { authStateChanged } from '@/apis/auth';
import { useAuthStore } from '@/stores/useAuthStore';

const useAuthStateChanged = () => {
  const { setUser } = useAuthStore();

  useEffect(() => {
    (async () => {
      const authState = await authStateChanged();
      setUser(authState);
    })();
  }, [setUser]);
};

export default useAuthStateChanged;
