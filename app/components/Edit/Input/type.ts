import { ChangeEvent, ReactNode } from 'react';

export interface LabelProps {
  children?: ReactNode;
}

export interface TextProps {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  placeholder?: string;
}

export interface RadioProps {
  children?: ReactNode;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  checked: boolean;
}

export interface FileProps {
  children?: ReactNode;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
}

export interface DateProps {
  children?: ReactNode;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
}
