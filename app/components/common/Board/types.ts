import { User } from '@/recoil/atoms';
import { ReactNode } from 'react';
import { Status } from '../../StatusOptions';

export interface BoardProps {
  user: User | null;
  children?: ReactNode;
  isLoading: boolean;
  pathname: string;
  isCommunity?: boolean;
}

export interface PostContextType {
  user: User | null;
  pathname: string;
  isCommunity?: boolean;
}

export interface Post {
  postId: number;
  userId: number;
  user: { displayName: string };
  displayName?: string;
  contents: string;
  variant: string;
  title: string;
  status?: Status;
  date?: string;
  place?: string;
  price?: string;
  phone?: string;
  height?: string;
  width?: string;
  amount?: string;
  image: string[];
  views: number;
  documentNumber: number;
  createdAt: number;
  updatedAt: number;
  marketType: string;
}
