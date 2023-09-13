import { User } from 'firebase/auth';
import { atom } from 'recoil';

export const authState = atom<User | null>({
  key: 'authState',
  default: null,
  // TypeError: Cannot freeze 방지
  dangerouslyAllowMutability: true,
});
