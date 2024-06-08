import React from 'react';

const Loading = () => {
  return (
    <div className='w-full h-full flex flex-col items-center gap-3'>
      <div className='w-8 h-8 animate-spin border-4 border-grayColor-100 border-t-grayColor-500 rounded-full' />
      <p className='text-sm text-center text-grayColor-500'>loading...</p>
    </div>
  );
};

export default Loading;
