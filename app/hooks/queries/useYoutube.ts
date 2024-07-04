'use client';
import { getGeneralChannel } from '@/apis/youtube';
import { OrderType } from '@/components/Youtube/GeneralChannelWrapper';
import { useGeneralChannelQueryKey } from '@/constant/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useGeneralChannel = (order: OrderType) => {
  return useQuery({
    queryKey: [useGeneralChannelQueryKey, order],
    queryFn: () => getGeneralChannel(order),
    staleTime: 0,
    refetchInterval: 1 * 60 * 1000, // 1분
  });
};
