'use client';
import { useQuery } from '@tanstack/react-query';

import { getBookmarkByPost, getMyBookmark } from '@/apis/bookmark';
import { useBookmarkKey, useBookmarkByPostKey } from '@/constant/queryKeys';

export const useBookmark = () => {
  return useQuery({
    queryKey: [useBookmarkKey],
    queryFn: () => getMyBookmark(),
    staleTime: 0,
    refetchInterval: 10 + 60 * 1000,
  });
};

export const useBookmarkByPost = (postId: number) => {
  return useQuery({
    queryKey: [useBookmarkByPostKey, postId],
    queryFn: () => getBookmarkByPost(postId),
    staleTime: 0,
    refetchInterval: 10 + 60 * 1000,
  });
};
