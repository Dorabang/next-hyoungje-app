'use client';
import { useQuery } from '@tanstack/react-query';

import { getPost, getPosts } from '@/apis/posts';
import { Status } from '@/components/StatusOptions';
import { usePostsQueryKey } from '@/constant/queryKeys';
import { User } from '@/stores/useAuthStore';

export const usePosts = (
  marketType: string,
  page: number,
  status: Status,
  user: User | null,
) => {
  return useQuery({
    queryKey: [usePostsQueryKey, marketType, page, status, user],
    queryFn: () => getPosts({ marketType, page, status }),
  });
};

export const usePost = (postId: number) => {
  return useQuery({
    queryKey: [usePostsQueryKey, postId],
    queryFn: () => getPost(postId),
  });
};
