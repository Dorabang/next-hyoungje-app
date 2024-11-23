'use client';
import { Fragment, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5';
import DateFormat from '@/utils/DateFormat';

import BookmarkButton from '@/components/Bookmark/BookmarkButton';
import { getUser } from '@/apis/users';
import statusOptions from '@/components/StatusOptions';
import { useAuthStore, User } from '@/stores/useAuthStore';
import { deletePost } from '@/apis/posts';
import { DetailHeaderProps } from './types';

export const DetailHeader = ({ postId, data }: DetailHeaderProps) => {
  const router = useRouter();

  const path = usePathname().split('/');
  const pathname = path[3] ? path[2] : path[1];

  const { user } = useAuthStore();
  const [userInfo, setUserInfo] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      (async () => {
        const userInfo = await getUser();
        setUserInfo(userInfo ?? null);
      })();
    }
  }, [user]);

  const searchParams = useSearchParams();
  const page = searchParams.get('page');

  const handleBack = () => {
    const isCommunity = path[3] ? `/community/${pathname}` : `/${pathname}`;
    const pageParam = page ? `?page=${page}` : '';
    router.push(isCommunity + pageParam);
  };

  const handleDeletePost = async (id: number) => {
    const ok = window.confirm('이 게시물을 삭제하시겠습니까?');

    if (!data) return;

    if (ok) {
      const res = await deletePost(id);
      if (res.result === 'SUCCESS') {
        router.push(`/${pathname}`);
      }
    }
  };

  return (
    <Fragment>
      <div
        className='border-b border-grayColor-400
    flex gap-2 md:gap-4 justify-between items-center
    py-3'
      >
        <div className='p-2 cursor-pointer' onClick={handleBack}>
          <IoArrowBack size={18} />
        </div>

        <h2 className='flex gap-2 items-center text-lg font-bold flex-grow min-w-[120px] truncate'>
          <span className='px-1 md:px-2 text-sm md:text-base'>
            {statusOptions(data.post.status)}
          </span>
          <span className='inline-block truncate'>{data.post.title}</span>
        </h2>

        {(userInfo?.id === data.post.userId || userInfo?.isAdmin) && (
          <ul className='flex gap-2 text-gray-500 text-sm [&_li]:cursor-pointer'>
            <li
              onClick={() =>
                router.push(
                  path[3]
                    ? `/community/${path[2]}/edit/${postId}`
                    : `/${pathname}/edit/${postId}`,
                )
              }
              className='hover:text-gray-900'
            >
              편집
            </li>
            <li
              onClick={() => handleDeletePost(postId)}
              className='hover:text-gray-900'
            >
              삭제
            </li>
          </ul>
        )}
      </div>

      <ul className='flex gap-4 pt-2 pb-6 justify-end items-center text-sm text-gray-500'>
        <li className='flex flex-wrap gap-1 md:gap-2'>
          <span className='flex-grow lg:flex-grow-0 font-semibold'>작성자</span>
          <span>{data.post.displayName ?? data.post.user.displayName}</span>
        </li>
        <li className='flex flex-wrap gap-1 md:gap-2'>
          <span className='flex-grow lg:flex-grow-0 font-semibold'>
            등록일자
          </span>
          <span>{DateFormat(data.post.createdAt)}</span>
        </li>
        <li className='flex flex-wrap gap-1 md:gap-2'>
          <span className='flex-grow lg:flex-grow-0 font-semibold'>조회수</span>
          <span>{data.post.views}</span>
        </li>
        <li>
          <BookmarkButton postId={postId} />
        </li>
      </ul>
    </Fragment>
  );
};
