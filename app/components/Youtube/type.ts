type ThumbnailsType = { url: string; width: number; height: number };

export interface PlaylistItems {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: ThumbnailsType;
      medium: ThumbnailsType;
      high: ThumbnailsType;
      standard: ThumbnailsType;
      maxres: ThumbnailsType;
    };
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: { kind: string; videoId: string };
    videoOwnerChannelTitle: string;
    videoOwnerChannelId: string;
  };
  contentDetails: { videoId: string; videoPublishedAt: string };
}

export interface YoutubeType {
  kind: string;
  etag: string;
  nextPageToken: string;
  items: PlaylistItems[];
}

export interface VideoData extends PlaylistItems {
  id: string;
}

export interface YoutubeChannelType {
  name: string;
  summary: string;
  url: string;
  channelId: string | null;
}

export interface YoutubeChannelData extends YoutubeChannelType {
  profile: string;
  id: string;
  createdAt: number;
  updatedAt: number;
}

export interface SpecialChannelData extends YoutubeChannelType {
  profile: string;
  id: string;
  createdAt: number;
  updatedAt: number;
  videos: VideoData;
}
