'use client';
import {
  getGeneralChannel,
  getSpecialChannel,
  getVideos,
} from '@/apis/youtube';
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
    refetchInterval: 10 * 60 * 1000, // 10분
  });
};

export const useSpecialChannel = () => {
  return useQuery({
    queryKey: [useSpecialChannelQueryKey],
    queryFn: () => getSpecialChannel(),
    refetchInterval: 10 * 60 * 1000, // 10분
  });
};

export const useVideos = (id: string) => {
  return useQuery({
    queryKey: [useSpecialChannelQueryKey, id],
    queryFn: () => getVideos(id),
    refetchInterval: 10 * 60 * 1000, // 10분
  });
};
