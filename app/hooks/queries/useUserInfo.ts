import { getAdmin, getUser } from '@/apis/user';
import { useUserInfoQueryKey } from '@/constant/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useUserInfo = (userId?: string) => {
  return useQuery({
    queryKey: [useUserInfoQueryKey],
    queryFn: () => getUser(userId),
    enabled: !!userId,
    staleTime: 0,
    refetchInterval: 1 * 60 * 1000, // 1분
  });
};

export const useAdmin = (userId?: string) => {
  return useQuery({
    queryKey: [useUserInfoQueryKey],
    queryFn: () => getAdmin(userId),
    enabled: !!userId,
    staleTime: 0,
    refetchInterval: 1 * 60 * 1000, // 1분
  });
};
