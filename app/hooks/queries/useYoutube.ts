'use client';
import { getChannels, getPlaylist } from '@/apis/youtube';
import { SortType } from '@/components/Youtube/GeneralChannelWrapper';
import {
  useGeneralChannelQueryKey,
  useSpecialChannelQueryKey,
} from '@/constant/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useGeneralChannel = (sort: SortType) => {
  return useQuery({
    queryKey: [useGeneralChannelQueryKey, sort],
    queryFn: () => getChannels('general', sort),
  });
};

export const useSpecialChannel = () => {
  return useQuery({
    queryKey: [useSpecialChannelQueryKey],
    queryFn: () => getChannels('special'),
  });
};

export const useVideos = (id: number) => {
  return useQuery({
    queryKey: [useSpecialChannelQueryKey, id],
    queryFn: () => getPlaylist(id),
    refetchInterval: 10 * 60 * 1000, // 10분
  });
};
