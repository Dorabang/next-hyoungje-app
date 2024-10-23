import { create } from 'zustand';

export interface User {
  id: number;
  name: string;
  userId: string;
  email: string;
  profile: string;
  displayName: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
  isAdmin: boolean;
}

interface AuthState {
  user: boolean | null;
  setUser: (authState: boolean | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
