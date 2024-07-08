import React from 'react';
import ReactQuill from 'react-quill';

const EditorReadOnly = ({ contents }: { contents: string }) => {
  const modules = {
    toolbar: { container: [] },
  };
  return <ReactQuill defaultValue={contents} modules={modules} readOnly />;
};

export default EditorReadOnly;
