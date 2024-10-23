import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AiOutlineFileImage } from 'react-icons/ai';

import statusOptions from '@/components/StatusOptions';
import DateFormat from '@/utils/DateFormat';
import { Post } from './types';
import { PostContext } from '.';
import { User } from '@/stores/useAuthStore';

interface PostListProps {
  pathname: string;
  post: Post;
  user: User | null;
  handleDeletePost: (id: number) => void;
  page: number;
}

const PostList = ({
  pathname,
  post,
  user,
  handleDeletePost,
  page,
}: PostListProps) => {
  const router = useRouter();
  const { isCommunity } = useContext(PostContext);

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
    displayName,
  } = post;

  const pageParam = page ? `?page=${page}` : '';
  const communityUrl = isCommunity
    ? `/community/${pathname}/${postId}`
    : `/${pathname}/${postId}`;

  return (
    <li
      key={postId}
      className='flex items-center w-full border-b border-grayColor-300 text-center text-gray-700 [&_>_div]:py-3 [&_div]:truncate'
    >
      {/* 문서 번호 */}
      <div className='w-[10%] md:w-[6%] lg:w-[8%] block'>{documentNumber}</div>

      {!isCommunity ? (
        <>
          {/* 종류 */}
          <div className='w-[15%] md:w-[6%] block'>
            {variant?.length > 5 ? variant.substring(0, 5) + '...' : variant}
          </div>
          {/* 분류 */}
          <div className='min-w-[68px] w-[10%] text-xs'>
            {statusOptions(status)}
          </div>
        </>
      ) : null}

      {/* 제목 */}
      <div
        className={`${isCommunity ? 'flex-grow' : 'w-[40%] md:flex-grow'} h-full flex justify-between items-center pl-2`}
      >
        <Link
          href={communityUrl + pageParam}
          className='flex flex-grow h-full items-center whitespace-nowrap hover:underline active:underline'
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

      {!isCommunity ? (
        <>
          {/* 산지 */}
          <div className='w-[6%] hidden lg:block'>{place}</div>

          {/* 가격 */}
          <div className='w-[10%] md:w-[6%] block'>{price}</div>

          {/* 산채일 */}
          {date ? (
            <div className='w-[6%] hidden lg:block'>{DateFormat(date)}</div>
          ) : null}
        </>
      ) : null}

      {/* 작성자 */}
      <div className='w-[20%] md:w-[6%] block'>
        {displayName
          ? displayName
          : userInfo.displayName?.length > 8
            ? userInfo.displayName.substring(0, 8) + '...'
            : userInfo.displayName}
      </div>
      <div className='w-[6%] hidden lg:block'>{DateFormat(createdAt)}</div>
      <div className='w-[10%] md:w-[6%] lg:block'>{views.toLocaleString()}</div>
    </li>
  );
};

export default PostList;
