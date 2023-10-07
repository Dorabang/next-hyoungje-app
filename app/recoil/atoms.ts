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

export const imageState = atom<string>({
  key: 'imageState',
  default: '',
});

export const imageUploadState = atom<File | null>({
  key: 'imageUploadState',
  default: null,
});

export const uploadPreviewState = atom<string[]>({
  key: 'uploadPreviewState',
  default: [],
});
