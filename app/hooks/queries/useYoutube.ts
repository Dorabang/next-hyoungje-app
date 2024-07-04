'use client';
import { getGeneralChannel } from '@/apis/youtube';
import { useGeneralChannelQueryKey } from '@/constant/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useGeneralChannel = () => {
  return useQuery({
    queryKey: [useGeneralChannelQueryKey],
    queryFn: () => getGeneralChannel(),
    staleTime: 0,
    refetchInterval: 1 * 60 * 1000, // 1분
  });
};
