'use server';

export const getPlaylist = async (channelId: string) => {
  const url = `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}/playlistItems?part=snippet,contentDetails&playlistId=${channelId}&maxResults=10&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });

  return await response.json();
};
