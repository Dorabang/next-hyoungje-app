'use client';
import { getPost, getPosts } from '@/apis/posts';
import { Status } from '@/components/StatusOptions';
import { usePostsQueryKey } from '@/constant/queryKeys';
import { User } from '@/recoil/atoms';
import { useQuery } from '@tanstack/react-query';

export const usePosts = (
  marketType: string,
  page: number,
  status: Status,
  user: User | null,
) => {
  return useQuery({
    queryKey: [usePostsQueryKey, marketType, page, status, user],
    queryFn: () => getPosts({ marketType, page, status }),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export const usePost = (postId: number) => {
  return useQuery({
    queryKey: [usePostsQueryKey, postId],
    queryFn: () => getPost(postId),
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
