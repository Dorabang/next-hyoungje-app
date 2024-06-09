import { getComments } from '@/apis/comments';
import { useGetCommentsQueryKey } from '@/constant/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useGetComments = (pathname: string) => {
  return useQuery({
    queryKey: [useGetCommentsQueryKey, pathname],
    queryFn: () => getComments(pathname),
    enabled: !!pathname,
    staleTime: 0,
    refetchInterval: 1 * 60 * 1000, // 1분
  });
};
