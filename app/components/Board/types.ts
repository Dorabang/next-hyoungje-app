import { User } from 'firebase/auth';
import { DocumentData } from 'firebase/firestore';
import { ReactNode } from 'react';

export interface BoardProps {
  children?: ReactNode;
  isLoading: boolean;
}

export interface PostContextType {
  user: User | null;
  pathname: string;
}
