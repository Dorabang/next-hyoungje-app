import { User } from 'firebase/auth';
import { atom } from 'recoil';

export const authState = atom<User | null>({
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
