import {
  DocumentData,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { dbService, storageService } from '@/firebase';

import { fetchAPI } from '../fetchAPI';
import {
  YoutubeChannelData,
  YoutubeChannelType,
  YoutubeType,
} from '@/components/Youtube/type';
import { getDownloadURL, ref } from 'firebase/storage';

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

export const getGeneralChannel = async () => {
  const generalChannel: YoutubeChannelData[] = [];
  const q = query(
    collection(dbService, 'youtube'),
    where('channelId', '==', null),
  );

  const generalChannelSnap = await getDocs(q);
  generalChannelSnap.forEach((doc) => {
    generalChannel.push({
      id: doc.id,
      ...doc.data(),
    } as YoutubeChannelData);
  });

  return generalChannel;
};

export const getSpecialChannel = async () => {
  const specialChannel: DocumentData[] = [];

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

  return specialChannel;
};

export const postPlaylist = async (id: string, channelId: string) => {
  const youtubeChannelRef = collection(dbService, 'youtube', id);
  const playlist: YoutubeType = await getPlaylist(channelId);

  playlist.items.forEach(async (playlistItem) => {
    await addDoc(youtubeChannelRef, playlistItem);
  });
};

export const getPlaylist = async (channelId: string) => {
  const url = `/part=snippet,contentDetails&playlistId=${channelId}&maxResults=10&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`;

  return await fetchYoutube(url);
};

export const putPlaylist = async (id: string) => {};

export const getChannelProfile = async (url: string) => {
  const profileRef = ref(storageService, url);
  const downloadURL = await getDownloadURL(profileRef);

  return downloadURL;
};
