'use client';
import { redirect } from 'next/navigation';

import { useAuthStore } from '@/stores/useAuthStore';

const useRedirect = () => {
  const { user } = useAuthStore();

  if (!user) return redirect('/not-found');
};

export default useRedirect;
