import { User } from 'firebase/auth';
import { DocumentData } from 'firebase/firestore';
import { ReactNode } from 'react';

export interface BoardProps {
  children?: ReactNode;
  data: DocumentData[] | null;
  isLoading: boolean;
}

export interface PostContextType {
  posts: DocumentData[] | null;
  editPosts: (post: DocumentData[]) => void;
  user: User | null;
  admin: DocumentData | null;
  pathname: string;
}
