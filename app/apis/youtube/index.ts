// 'use server';
// import {
//   addDoc,
//   collection,
//   getDocs,
//   orderBy,
//   query,
//   where,
// } from 'firebase/firestore';
// import { dbService, storageService } from '@/firebase';
// import { getDownloadURL, ref } from 'firebase/storage';

// import {
//   SpecialChannelData,
//   VideoData,
//   YoutubeChannelData,
//   YoutubeChannelType,
//   YoutubeType,
// } from '@/components/Youtube/type';
// import { OrderType } from '@/components/Youtube/GeneralChannelWrapper';
// import { getPlaylist } from './playlistItems';

// export const postYoutubeChannel = async (data: YoutubeChannelType) => {
//   const youtubeChannelRef = collection(dbService, 'youtube');
//   await addDoc(youtubeChannelRef, {
//     ...data,
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//     channelId: data.channelId ?? null,
//     ...(data.channelId && { playlistRefresh: Date.now() }),
//     profile: `youtube/${data.name.replaceAll(' ', '')}/profile.jpg`,
//   });
// };

// export const getGeneralChannel = async (order: OrderType) => {
//   const channel: YoutubeChannelData[] = [];
//   const fieldPath = order === 'latest' ? 'createdAt' : 'name';

//   try {
//     const q = query(
//       collection(dbService, 'youtube'),
//       where('channelId', '==', null),
//       orderBy('channelId'),
//       orderBy(fieldPath),
//     );

//     const generalChannelSnap = await getDocs(q);
//     generalChannelSnap.forEach((doc) => {
//       channel.push({
//         id: doc.id,
//         ...doc.data(),
//       } as YoutubeChannelData);
//     });
//   } catch (err) {
//     // console.log('🚀 ~ getGeneralChannel ~ err:', err);
//   }

//   const transformChannelData = await Promise.all(
//     channel.map(async (data) => {
//       const profile = await getChannelProfile(data.profile);
//       return { ...data, profile: profile };
//     }),
//   );
//   return transformChannelData;
// };

// export const getSpecialChannel = async () => {
//   const channel: SpecialChannelData[] = [];

//   try {
//     const q = query(
//       collection(dbService, 'youtube'),
//       where('channelId', '!=', null),
//     );

//     const specialChannelSnap = await getDocs(q);
//     specialChannelSnap.forEach((doc) => {
//       channel.push({
//         id: doc.id,
//         ...doc.data(),
//       } as SpecialChannelData);
//     });
//   } catch (err) {
//     // console.log('🚀 ~ getGeneralChannel ~ err:', err);
//   }

//   const transformChannelData = await Promise.all(
//     channel.map(async (data) => {
//       const profile = await getChannelProfile(data.profile);
//       return { ...data, profile: profile };
//     }),
//   );

//   return transformChannelData;
// };

// export const postVideos = async (id: string, channelId: string) => {
//   const youtubeChannelRef = collection(dbService, `youtube/${id}`, 'playlist');
//   const playlist: YoutubeType = await getPlaylist(channelId);

//   playlist.items.forEach(async (playlistItem) => {
//     await addDoc(youtubeChannelRef, playlistItem);
//   });
// };

// export const getVideos = async (id: string) => {
//   const videos: VideoData[] = [];
//   const videosRef = collection(dbService, `youtube/${id}`, 'playlist');
//   const videosSnapshot = await getDocs(videosRef);

//   videosSnapshot.docs.forEach((doc) =>
//     videos.push({ id: doc.id, ...doc.data() } as VideoData),
//   );

//   return videos;
// };

// export const putVideos = async (id: string) => {};

// export const getChannelProfile = async (url: string) => {
//   const profileRef = ref(storageService, url);
//   const downloadURL = await getDownloadURL(profileRef);

//   return downloadURL;
// };
