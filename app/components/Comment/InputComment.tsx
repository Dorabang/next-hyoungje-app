import React from 'react';

interface InputCommentProps {
  onSubmit: () => void;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  rows?: number;
  cols?: number;
  maxLength?: number;
  disabled?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  autoCapitalize?: string;
  autoCorrect?: string;
  autoSave?: string;
  spellCheck?: boolean;
  required?: boolean;
  form?: string;
  formAction?: string;
  formEncType?: string;
  formMethod?: string;
  formNoValidate?: boolean;
  formTarget?: string;
  list?: string;
  minLength?: number;
  pattern?: string;
  readOnly?: boolean;
  step?: number;
  type?: string;
}

const InputComment = ({ onSubmit, ...props }: InputCommentProps) => {
  return (
    <div className='flex gap-3 pt-10'>
      <textarea
        {...props}
        className={`border border-grayColor-100 rounded-lg active:border-grayColor-200 focus:border-grayColor-200
        transition-colors text-grayColor-500 focus:outline-none
        h-24 w-full px-3 py-2 resize-none
         ${props.className ?? ''}`}
      />
      <button
        onClick={onSubmit}
        className='w-32 border border-grayColor-500 rounded-lg bg-grayColor-500 text-white hover:text-grayColor-500 hover:bg-white transition-colors px-3 py-2'
      >
        등록
      </button>
    </div>
  );
};

export default InputComment;
