'use client';
import { redirect } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { authState } from '@/recoil/atoms';

const useRedirect = () => {
  const user = useRecoilValue(authState);

  if (!user) return redirect('/not-found');
};

export default useRedirect;
