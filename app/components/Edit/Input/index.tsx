'use client';
import React, { createContext, ReactNode } from 'react';
import './index.css';
import useInputContext from '@/hooks/context/useInputContext';
import { DateProps, FileProps, LabelProps, TextProps } from './type';

interface InputContextProps {
  required?: boolean;
  disabled?: boolean;
}

const defaultInputContext: InputContextProps = {
  required: false,
  disabled: false,
};

export const InputContext = createContext(defaultInputContext);

interface InputProps extends InputContextProps {
  children?: ReactNode;
}

const Input = ({ children, ...props }: InputProps) => {
  return (
    <InputContext.Provider value={{ ...props }}>
      <div className='inputWrapper'>{children}</div>
    </InputContext.Provider>
  );
};

const Label = ({ children }: LabelProps) => {
  const { required, disabled } = useInputContext();

  return (
    <div
      className={`inputLabel min-w-[100px] ${disabled ? 'text-grayColor-300 bg-grayColor-100' : ''}`}
    >
      {required ? <span className='text-error'>*</span> : null}
      {children}
    </div>
  );
};

const Text = ({ ...props }: TextProps) => {
  const { required, disabled } = useInputContext();

  return (
    <input
      type='text'
      className='inputText'
      required={required}
      disabled={disabled}
      {...props}
    />
  );
};

const File = ({ children, ...props }: FileProps) => {
  const { disabled } = useInputContext();

  return (
    <label className='w-full inputFile has-[:disabled]:cursor-pointer has-[:disabled]:border-transparent hover:border-[#333]'>
      {children}
      <input type='file' className='w-full' disabled={disabled} {...props} />
    </label>
  );
};

const Date = ({ children, ...props }: DateProps) => {
  const { disabled } = useInputContext();

  return (
    <label className='flex-grow'>
      {children}
      <input type='date' className='w-full' disabled={disabled} {...props} />
    </label>
  );
};

Input.Label = Label;
Input.Text = Text;
Input.File = File;
Input.Date = Date;

export default Input;
