import { getPost, getPosts } from '@/apis/posts';
import { useGetPostQueryKey, useGetPostsQueryKey } from '@/constant/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useGetPosts = (pathname: string) => {
  return useQuery({
    queryKey: [useGetPostsQueryKey],
    queryFn: () => getPosts(pathname),
    enabled: !!pathname,
    staleTime: 0,
    refetchInterval: 1 * 60 * 1000, // 1분
  });
};

export const useGetPost = (pathname: string, postId: string) => {
  return useQuery({
    queryKey: [useGetPostQueryKey, pathname, postId],
    queryFn: () => getPost(pathname, postId),
    enabled: !!pathname || !!postId,
    staleTime: 0,
    refetchInterval: 1 * 60 * 1000, // 1분
  });
};
