import { SortType } from '@/components/Youtube/GeneralChannelWrapper';
import { get, post, upload } from '../fetchAPI';
import {
  ChannelState,
  ChannelType,
  Playlist,
  YoutubeChannelDataType,
  YoutubeChannelType,
} from '@/components/Youtube/type';

export const getChannels = async (type: ChannelType, sort?: SortType) => {
  const sortType = sort ? '&sort=' + sort : '';
  const url = `/youtube/channels?type=${type}${sortType}`;
  return (await get(url)).data as YoutubeChannelDataType[];
};

export const getPlaylist = async (id: number) => {
  const url = `/youtube/playlist/${id}`;
  return (await get(url)).data as Playlist[];
};

export const refreshPlaylist = async () => {
  const url = `/youtube/refresh`;
  return (await get(url)).data as YoutubeChannelDataType[];
};

export const createChannel = async (channel: ChannelState) => {
  const url = `/youtube/channels`;
  return await upload(url, { method: 'POST', body: channel });
};
interface Channel {
  name: string;
  summary: string;
  url: string;
  channelId?: string;
  profile?: string;
}

export const prevChannel = async (channel: Channel) => {
  const url = `/youtube/channels`;
  return await post(url, channel);
};

export const updateChannel = async (
  id: number,
  channel: YoutubeChannelType,
) => {
  const url = `/youtube/channels/${id}`;
  return await post(url, channel);
};
