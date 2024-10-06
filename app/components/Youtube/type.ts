export type ChannelType = 'special' | 'general';

export interface ChannelState {
  name: string;
  summary: string;
  url: string;
  profile: File | null;
}

export interface YoutubeChannelType {
  name: string;
  summary: string;
  url: string;
  profile: string | null;
  channelId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface YoutubeChannelDataType extends YoutubeChannelType {
  id: number;
}

export interface Playlist {
  id: number;
  channelId: number;
  title: string;
  thumbnail: string;
  description: string;
  videoId: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}
