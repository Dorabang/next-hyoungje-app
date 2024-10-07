'use client';
import { useQuery } from '@tanstack/react-query';

import { useAdminKey } from '@/constant/queryKeys';
import { getUser } from '@/apis/users';

export const useAdmin = () => {
  return useQuery({
    queryKey: [useAdminKey],
    queryFn: () => getUser(),
    refetchInterval: 10 * 60 * 1000, // 10분
  });
};
