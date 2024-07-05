'use client';
import React, { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { LiaHeart } from 'react-icons/lia';

import ContainerBox from '@/components/ContainerBox';
import Loading from '@/components/Loading';
import { useUserInfo } from '@/hooks/queries/useUserInfo';
import { authState } from '@/recoil/atoms';
import Bookmark from '@/components/Likes/Bookmark';

const BookmarkPage = () => {
  const user = useRecoilValue(authState);
  const { data, isLoading } = useUserInfo(user?.uid);

  if (isLoading) return <Loading />;

  return (
    <Suspense fallback={<Loading />}>
      <ContainerBox className='flex flex-wrap gap-5'>
        {data?.like.length > 0 ? (
          data?.like.map((path: string) => {
            const pathname = path.split('/')[0];
            const postId = path.split('/')[1];
            return (
              <div key={path} className='w-full md:w-[calc((100%-60px)/3)]'>
                <Bookmark pathname={pathname} postId={postId} />
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
