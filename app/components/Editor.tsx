'use client';
import { editorState } from '@/recoil/atoms';
import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRecoilState } from 'recoil';

const Editor = () => {
  const [value, setValue] = useRecoilState<string>(editorState);

  useEffect(() => {
    if (value === `<p><br></p>`) {
      setValue('');
    }
  });

  const modules = {
    toolbar: {
      container: [
        [{ header: '1' }, { header: '2' }, { header: '3' }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
        ['video'],
      ],
    },
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <ReactQuill
      theme='snow'
      modules={modules}
      value={value}
      onChange={(value) => setValue(value)}
      placeholder='내용을 입력해주세요.'
      style={{ height: '400px' }}
    />
  );
};

export default Editor;
