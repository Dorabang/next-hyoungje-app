import { HasLikeProps, hasLike } from '@/apis/like';
import { useHasLikesQueryKey } from '@/constant/queryKeys';
import { useQuery } from '@tanstack/react-query';

const useHasLikes = (data: HasLikeProps) => {
  return useQuery({
    queryKey: [useHasLikesQueryKey, data.pathname, data.postId],
    queryFn: () => hasLike(data),
    enabled: !!data.postId,
    staleTime: 0,
    refetchInterval: 1 + 60 * 1000,
  });
};

export default useHasLikes;
