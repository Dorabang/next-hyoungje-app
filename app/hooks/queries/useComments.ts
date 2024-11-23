import { useQuery } from '@tanstack/react-query';

import { getComments } from '@/apis/comments';
import { useCommentsQueryKey } from '@/constant/queryKeys';

export const useComments = (id: number, page: number = 1) => {
  return useQuery({
    queryKey: [useCommentsQueryKey, id, page],
    queryFn: () => getComments(id, page),
    enabled: !!id,
  });
};
