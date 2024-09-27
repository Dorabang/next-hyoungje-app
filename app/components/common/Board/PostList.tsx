import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AiOutlineFileImage } from 'react-icons/ai';

import statusOptions from '@/components/StatusOptions';
import DateFormat from '@/utils/DateFormat';
import { User } from '@/recoil/atoms';
import { Post } from './types';

interface PostListProps {
  type?: 'etc' | 'community';
  pathname: string;
  post: Post;
  user: User | null;
  handleDeletePost: (id: number) => void;
}

const PostList = ({
  type = 'etc',
  pathname,
  post,
  user,
  handleDeletePost,
}: PostListProps) => {
  const router = useRouter();

  const {
    postId,
    variant,
    status,
    title,
    userId,
    user: userInfo,
    date,
    createdAt,
    views,
    place,
    price,
    image,
    documentNumber,
  } = post;

  return (
    <li
      key={postId}
      className='flex items-center border-b border-grayColor-300 text-center text-gray-700 [&_>_div]:py-3 [&_>_div]:truncate'
    >
      {/* 문서 번호 */}
      <div className='w-[4%] hidden lg:block'>{documentNumber}</div>

      {/* 종류 */}
      {type === 'etc' ? (
        <>
          <div className='w-[6%] hidden lg:block'>
            {variant?.length > 5 ? variant.substring(0, 5) + '...' : variant}
          </div>
          {/* 분류 */}
          <div className='min-w-[90px] w-[10%] text-xs'>
            {statusOptions(status)}
          </div>
        </>
      ) : null}

      {/* 제목 */}
      <div className='flex-grow h-full flex justify-between items-center'>
        <Link
          href={`${pathname}/${postId}`}
          className='flex w-full h-full items-center whitespace-nowrap hover:underline active:underline'
        >
          {image && image?.length !== 0 && (
            <AiOutlineFileImage className='mr-2' />
          )}
          <div className='flex-grow block h-full text-left min-h-[16px]'>
            {title}
          </div>
        </Link>
        {(user?.id === userId || user?.isAdmin) && (
          <div className='text-gray-400 text-xs flex [&_span]:px-1 ml-4'>
            <span
              className='hover:text-gray-700 cursor-pointer'
              onClick={() => router.push(`${pathname}/edit/${postId}`)}
            >
              편집
            </span>
            <span>/</span>
            <span
              className='hover:text-gray-700 cursor-pointer'
              onClick={() => handleDeletePost(postId)}
            >
              삭제
            </span>
          </div>
        )}
      </div>

      {type === 'etc' ? (
        <>
          {/* 산지 */}
          <div className='w-[6%] hidden md:block'>{place}</div>

          {/* 가격 */}
          <div className='w-[6%] hidden md:block'>{price}</div>

          {/* 산채일 */}
          {date ? (
            <div className='w-[6%] hidden lg:block'>{DateFormat(date)}</div>
          ) : null}
        </>
      ) : null}

      {/* 작성자 */}
      <div className='w-[10%] hidden md:block'>
        {userInfo.displayName?.length > 8
          ? userInfo.displayName.substring(0, 8) + '...'
          : userInfo.displayName}
      </div>
      <div className='w-[6%] hidden lg:block'>{DateFormat(createdAt)}</div>
      <div className='w-[6%] hidden lg:block'>{views.toLocaleString()}</div>
    </li>
  );
};

export default PostList;
