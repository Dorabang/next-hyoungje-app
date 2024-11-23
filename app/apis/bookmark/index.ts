import { del, get, post } from '../fetchAPI';

export interface MyBookmarkData {
  result: 'SUCCESS' | 'ERROR';
  data: number[];
}

export const getMyBookmark = async () => {
  return (await get(`/bookmarks`)) as MyBookmarkData;
};

export interface BookmarkByPost extends MyBookmarkData {
  isBookmarked?: boolean;
}

export const getBookmarkByPost = async (postId: number) => {
  return (await get(`/bookmarks/${postId}`)) as BookmarkByPost;
};

export const addBookmark = async (postId: number) => {
  return post(`/bookmarks/${postId}`);
};

export const removeBookmark = async (postId: number) => {
  return del(`/bookmarks/${postId}`);
};
