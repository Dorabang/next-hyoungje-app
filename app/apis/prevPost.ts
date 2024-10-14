import { Status } from '@/components/StatusOptions';
import { post } from './fetchAPI';
import { MarketType } from './posts';

export interface PrevPost {
  status?: Status;
  title: string;
  createdAt: number;
  displayName?: string;
  views: string;
  variant?: string;
  place?: string;
  price?: string;
  date?: string;
  width?: string;
  height?: string;
  phone?: string;
  amount?: string;
  image: string[];
  contents: string;
  marketType?: MarketType;
  userId?: number;
}

export const prevPosts = async (posts: PrevPost) => {
  const url = `/posts/prevPosts`;

  await post(url, posts);
};
