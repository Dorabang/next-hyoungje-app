import { del, get, post, put } from '../fetchAPI';
import { Comment } from '@/components/Comment/Comments';

export const getComments = async (
  id: number,
  page: number = 1,
  size: number = 5,
  order: 'asc' | 'desc' = 'desc',
) => {
  const url = `/comments/${id}?page=${page}&size=${size}&order=${order}`;
  return (await get(url)) as {
    result: 'SUCCESS' | 'ERROR';
    data: Comment[];
    totalResult: number;
    currentPage: number;
    totalPages: number;
    isLast: boolean;
  };
};

export const createComment = async (postId: number, content: string) => {
  return await post(`/comments/${postId}`, { content });
};

export const updateComment = async (commentId: number, content: string) => {
  return await put(`/comments/${commentId}`, { content });
};

export const deleteComment = async (commentId: number) => {
  return await del(`/comments/${commentId}`);
};
