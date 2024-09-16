import { atom } from 'recoil';

export interface User {
  id: number;
  userId: string;
  email: string;
  profile: string;
  displayName: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  isAdmin: boolean;
}

export const authState = atom<boolean | null>({
  key: 'authState',
  default: null,
  // TypeError: Cannot freeze 방지
  dangerouslyAllowMutability: true,
});

export const editorState = atom<string>({
  key: 'editorState',
  default: '',
});

export const modalState = atom<boolean>({
  key: 'modalState',
  default: false,
});
