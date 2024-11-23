'use client';
import { useQuery } from '@tanstack/react-query';

import { getBookmarkByPost, getMyBookmark } from '@/apis/bookmark';
import { useBookmarkKey, useBookmarkByPostKey } from '@/constant/queryKeys';

export const useBookmark = () => {
  return useQuery({
    queryKey: [useBookmarkKey],
    queryFn: () => getMyBookmark(),
  });
};

export const useBookmarkByPost = (postId: number) => {
  return useQuery({
    queryKey: [useBookmarkByPostKey, postId],
    queryFn: () => getBookmarkByPost(postId),
  });
};
