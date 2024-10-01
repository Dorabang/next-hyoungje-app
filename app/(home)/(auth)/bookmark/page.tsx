'use client';
import React, { Suspense } from 'react';
import { LiaHeart } from 'react-icons/lia';

import ContainerBox from '@/components/common/ContainerBox';
import Loading from '@/components/common/Loading';
import { useBookmark } from '@/hooks/queries/useBookmark';
import MyBookmark from '@/components/Bookmark/MyBookmark';

const BookmarkPage = () => {
  const { data, isSuccess } = useBookmark();

  if (!isSuccess) return <Loading />;

  return (
    <Suspense fallback={<Loading />}>
      <ContainerBox className='flex flex-wrap gap-5'>
        {data?.data.length > 0 ? (
          data?.data.map((postId) => {
            return (
              <div key={postId} className='w-full md:w-[calc((100%-60px)/3)]'>
                <MyBookmark postId={postId} />
              </div>
            );
          })
        ) : (
          <div className='text-center w-full py-[100px]'>
            <span className='flex flex-col gap-4 items-center justify-center text-grayColor-300'>
              <LiaHeart size={36} />
              즐겨찾기 되어 있는 게시물이 없습니다.
            </span>
          </div>
        )}
      </ContainerBox>
    </Suspense>
  );
};

export default BookmarkPage;
