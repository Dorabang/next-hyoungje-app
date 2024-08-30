import { Post } from '@/components/Board/types';
import { get, upload } from '../fetchAPI';
import { Status } from '@/components/StatusOptions';
import { PrevNextPostData } from '@/components/Posts/PrevNextPost';

export interface CreatePostsData {
  title: string;
  marketType: string;
  contents: string;
  image?: File[];
}

export interface CreateMarketPostsData extends CreatePostsData {
  height?: string;
  width?: string;
  amount: string;
  price: string;
  status: Status;
  variant: string;
  place: string;
  date: string;
}

export type MarketType =
  | 'wild-market1'
  | 'wild-market2'
  | 'general-market'
  | 'natural-herb'
  | 'single-leaf'
  | 'board'
  | 'boast'
  | 'notice'
  | 'okdong'
  | 'qna'
  | 'whild-catch';

export const createPost = async (
  createPostsData: CreatePostsData | CreateMarketPostsData,
) => {
  const reponse = await upload('/posts', {
    method: 'POST',
    body: createPostsData,
  });

  if (reponse.result === 'SUCCESS') {
    return true;
  }
  return false;
};

export interface PostsOptions {
  marketType: string;
  sort?: string;
  page?: number;
  status?: Status;
  size?: number;
  order?: 'asc' | 'desc';
}

export const getPosts = async ({
  marketType,
  sort = 'postId',
  page = 1,
  status = 'all',
  size = 15,
  order = 'desc',
}: PostsOptions) => {
  const url = `/posts?marketType=${marketType}&status=${status}&sort=${sort}&page=${page}&size=${size}&order=${order}`;
  const response = await get(url);

  return response as {
    result: 'SUCCESS' | 'ERROR';
    data: Post[];
    totalResult: number;
    currentPage: number;
    totalPages: number;
    isLast: boolean;
  };
};

export const getPost = async (postId: number) => {
  return (await get(`/posts/${postId}`)).data as {
    previous: PrevNextPostData | null;
    next: PrevNextPostData | null;
    post: Post;
  };
};

export interface UpdatePostData {
  title: string;
  contents: string;
  status?: Status;
  variant?: string;
  place?: string;
  price?: string;
  date?: string;
  amount?: string;
  phone?: string;
  height?: string;
  width?: string;
  image?: string[];
  prevImage?: string[];
  updateImage?: File[];
}
export const putPost = async (postId: number, updateData: UpdatePostData) => {
  return await upload(`/posts/${postId}`, {
    method: 'PUT',
    body: updateData,
  });
};
