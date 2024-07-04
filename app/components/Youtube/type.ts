type ThumbnailsType = { url: string; width: number; height: number };

export interface YoutubeType {
  kind: string;
  etag: string;
  nextPageToken: string;
  items: {
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
  }[];
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
