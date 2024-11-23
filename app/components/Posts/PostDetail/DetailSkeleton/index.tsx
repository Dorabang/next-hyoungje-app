import { Fragment } from 'react';

const DetailSkeleton = () => {
  return (
    <Fragment>
      <div
        className='border-b border-grayColor-400
    flex gap-2 md:gap-4 justify-between items-center py-3'
      >
        <div className='w-[34px] h-[34px] bg-grayColor-100 animate-pulse' />

        <div className='flex gap-2 items-center flex-grow min-w-[120px]'>
          <div className='rounded-full w-16 h-6 md:w-[72px] md:h-[26px] px-1 md:px-2 bg-grayColor-100 animate-pulse' />
          <div className='w-[160px] h-7 bg-grayColor-100 animate-pulse' />
        </div>
      </div>

      <ul className='flex gap-4 pt-2 pb-6 justify-end items-center text-sm text-gray-500'>
        <li className='flex flex-wrap gap-1 md:gap-2'>
          <span className='flex-grow lg:flex-grow-0 font-semibold'>작성자</span>
          <span className='w-10 h-5 bg-grayColor-100 animate-pulse' />
        </li>
        <li className='flex flex-wrap gap-1 md:gap-2'>
          <span className='flex-grow lg:flex-grow-0 font-semibold'>
            등록일자
          </span>
          <span className='w-10 h-5 bg-grayColor-100 animate-pulse' />
        </li>
        <li className='flex flex-wrap gap-1 md:gap-2'>
          <span className='flex-grow lg:flex-grow-0 font-semibold'>조회수</span>
          <span className='w-10 h-5 bg-grayColor-100 animate-pulse' />
        </li>
        <li />
      </ul>

      <div className='w-full px-5 md:px-0 md:max-w-[1016px] mx-auto'>
        <div className='w-full flex flex-wrap gap-4 justify-center'>
          <div className='w-full h-[160px] md:w-[500px] bg-grayColor-100 animate-pulse' />
          <div className='w-full h-[160px] md:w-[500px] bg-grayColor-100 animate-pulse' />
        </div>

        <div className='mt-20 w-full h-auto min-h-[480px] bg-grayColor-100 animate-pulse' />
      </div>
    </Fragment>
  );
};

export default DetailSkeleton;
