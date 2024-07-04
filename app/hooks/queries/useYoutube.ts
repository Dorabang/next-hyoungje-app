'use client';
import { getGeneralChannel, getSpecialChannel } from '@/apis/youtube';
import { OrderType } from '@/components/Youtube/GeneralChannelWrapper';
import {
  useGeneralChannelQueryKey,
  useSpecialChannelQueryKey,
} from '@/constant/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useGeneralChannel = (order: OrderType) => {
  return useQuery({
    queryKey: [useGeneralChannelQueryKey, order],
    queryFn: () => getGeneralChannel(order),
    refetchInterval: 1 * 60 * 1000, // 1분
  });
};

export const useSpecialChannel = () => {
  return useQuery({
    queryKey: [useSpecialChannelQueryKey],
    queryFn: () => getSpecialChannel(),
    refetchInterval: 1 * 60 * 1000, // 1분
  });
};
