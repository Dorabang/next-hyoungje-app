type ThumbnailsType = { url: string; width: number; height: number };

export interface youtubeType {
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
