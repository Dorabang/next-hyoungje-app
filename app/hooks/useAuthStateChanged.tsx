'use client';
import { authService } from '@/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { authState } from '@/recoil/atoms';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

const useAuthStateChanged = () => {
  const setUser = useSetRecoilState(authState);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  });
};

export default useAuthStateChanged;
