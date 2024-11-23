import { queryOptions } from '@tanstack/react-query';

import { Status } from '@/components/StatusOptions';
import { usePostsQueryKey } from '@/constant/queryKeys';
import { User } from '@/stores/useAuthStore';
import { getPost, getPosts } from '@/apis/posts';

export const postQueryOptions = {
  getPosts: (
    marketType: string,
    page: number,
    status: Status,
    user: User | null,
  ) =>
    queryOptions({
      queryKey: [usePostsQueryKey, marketType, page, status, user],
      queryFn: () => getPosts({ marketType, page, status }),
    }),
  getPost: (postId: number) =>
    queryOptions({
      queryKey: [usePostsQueryKey, postId],
      queryFn: () => getPost(postId),
      enabled: !!postId,
    }),
};
