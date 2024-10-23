import { create } from 'zustand';

interface EditorState {
  value: string;
  setValue: (value: string) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  value: '',
  setValue: (value) => set({ value }),
}));
