'use client';
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useRecoilState } from 'recoil';
import { editorState } from '@/recoil/atoms';

const TinyEditor = () => {
  const editorRef = useRef(null);

  const [value, setValue] = useRecoilState<string>(editorState);

  const tinymcePlugin = [
    'advlist',
    'autolink',
    'lists',
    'link',
    'image',
    'charmap',
    'preview',
    'anchor',
    'searchreplace',
    'visualblocks',
    'code',
    'fullscreen',
    'insertdatetime',
    'media',
    'table',
    'code',
    'help',
    'wordcount',
  ];

  const tinymceToolbar =
    'undo redo | blocks | ' +
    'bold italic forecolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help ';

  const imageFileType = 'jpg,svg,webp';

  return (
    <>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        onEditorChange={(newValue, editor) => setValue(newValue)}
        init={{
          height: 500,
          menubar: false,
          plugins: tinymcePlugin,
          toolbar: tinymceToolbar,
          language: 'ko_KR',
        }}
      />
    </>
  );
};

export default TinyEditor;
