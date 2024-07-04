import {
  DocumentData,
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { dbService, storageService } from '@/firebase';
import { getDownloadURL, ref } from 'firebase/storage';

import { fetchAPI } from '../fetchAPI';
import {
  VideoData,
  YoutubeChannelData,
  YoutubeChannelType,
  YoutubeType,
} from '@/components/Youtube/type';
import { OrderType } from '@/components/Youtube/GeneralChannelWrapper';

export const fetchYoutube = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: T,
  headers?: T,
) => {
  const base = `${process.env.NEXT_PUBLIC_YOUTUBE_API_URL}${url}`;

  return await fetchAPI(base, method, data, headers);
};

export const postYoutubeChannel = async (data: YoutubeChannelType) => {
  const youtubeChannelRef = collection(dbService, 'youtube');
  await addDoc(youtubeChannelRef, {
    ...data,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    channelId: data.channelId ?? null,
    ...(data.channelId && { playlistRefresh: Date.now() }),
    profile: `youtube/${data.name.replaceAll(' ', '')}/profile.jpg`,
  });
};

export const getGeneralChannel = async (order: OrderType) => {
  const generalChannel: YoutubeChannelData[] = [];
  const fieldPath = order === 'latest' ? 'createdAt' : 'name';

  try {
    const q = query(
      collection(dbService, 'youtube'),
      where('channelId', '==', null),
      orderBy('channelId'),
      orderBy(fieldPath),
    );

    const generalChannelSnap = await getDocs(q);
    generalChannelSnap.forEach((doc) => {
      generalChannel.push({
        id: doc.id,
        ...doc.data(),
      } as YoutubeChannelData);
    });
  } catch (err) {
    // console.log('🚀 ~ getGeneralChannel ~ err:', err);
  }
  return generalChannel;
};

export const getSpecialChannel = async () => {
  const specialChannel: DocumentData[] = [];

  try {
    const q = query(
      collection(dbService, 'youtube'),
      where('channelId', '!=', null),
    );

    const specialChannelSnap = await getDocs(q);
    specialChannelSnap.forEach((doc) => {
      specialChannel.push({
        id: doc.id,
        ...doc.data(),
      } as YoutubeChannelData);
    });
  } catch (err) {
    // console.log('🚀 ~ getGeneralChannel ~ err:', err);
  }
  return specialChannel;
};

export const postVideos = async (id: string, channelId: string) => {
  const youtubeChannelRef = collection(dbService, `youtube/${id}`, 'playlist');
  const playlist: YoutubeType = await getPlaylist(channelId);

  playlist.items.forEach(async (playlistItem) => {
    await addDoc(youtubeChannelRef, playlistItem);
  });
};

export const getVideos = async (id: string, channelId: string) => {
  const videos = [];
  const videosRef = collection(dbService, `youtube/${id}`, 'playlist');
  const videosSnapshot = await getDocs(videosRef);

  videosSnapshot.docs.forEach((doc) =>
    videos.push({ id: doc.id, ...doc.data() } as VideoData),
  );
};

export const getPlaylist = async (channelId: string) => {
  const url = `/part=snippet,contentDetails&playlistId=${channelId}&maxResults=10&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`;

  return await fetchYoutube(url);
};

export const putVideos = async (id: string) => {};

export const getChannelProfile = async (url: string) => {
  const profileRef = ref(storageService, url);
  const downloadURL = await getDownloadURL(profileRef);

  return downloadURL;
};
