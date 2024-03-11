import { DocumentData } from 'firebase/firestore';
import React from 'react';
import statusOptions from '@/components/statusOptions';
import Link from 'next/link';
import { AiOutlineFileImage } from 'react-icons/ai';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import DateFormat from '@/utils/DateFormat';

interface PostListProps {
  type?: 'etc' | 'community';
  pathname: string;
  post: DocumentData;
  user: User | null;
  handleDeletePost: (id: string) => void;
  handleClickViewUp: (id: string) => void;
}

const PostList = ({
  type = 'etc',
  pathname,
  post,
  user,
  handleDeletePost,
  handleClickViewUp,
}: PostListProps) => {
  const router = useRouter();

  const {
    id,
    variant,
    status,
    title,
    creatorId,
    creatorName,
    date,
    createdAt,
    views,
    place,
    price,
    image,
    num,
  } = post;

  return (
    <li
      key={id}
      className='flex items-center border-b border-neutral-300 text-center text-gray-700 [&_>_div]:py-3'
    >
      {/* 문서 번호 */}
      <div className='w-[4%] hidden lg:block'>{num ? num : null}</div>

      {/* 종류 */}
      {type === 'etc' ? (
        <div className='w-[6%] hidden lg:block'>
          {variant?.length > 5 ? variant.substring(0, 5) + '...' : variant}
        </div>
      ) : null}

      {/* 분류 */}
      <div className='min-w-[90px] w-[10%] text-xs'>
        {statusOptions(status)}
      </div>

      {/* 제목 */}
      <div className='flex-grow flex justify-between items-center'>
        <Link
          href={`${pathname}/${id}`}
          className='flex items-center whitespace-nowrap'
          onClick={() => handleClickViewUp(id)}
        >
          {image && image?.length !== 0 && (
            <AiOutlineFileImage className='mr-2' />
          )}
          {title}{' '}
        </Link>
        {((user && user.uid === creatorId) ||
          (admin && admin.includes(user?.uid))) && (
          <div className='text-gray-400 text-xs flex [&_span]:px-1 ml-4'>
            <span
              className='hover:text-gray-700 cursor-pointer'
              onClick={() => router.push(`${pathname}/edit/${id}`)}
            >
              편집
            </span>
            <span>/</span>
            <span
              className='hover:text-gray-700 cursor-pointer'
              onClick={() => handleDeletePost(id)}
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
          <div className='w-[6%] hidden lg:block'>{DateFormat(date)}</div>
        </>
      ) : null}

      {/* 작성자 */}
      <div className='w-[10%] hidden md:block'>
        {creatorName?.length > 8
          ? creatorName.substring(0, 8) + '...'
          : creatorName}
      </div>
      <div className='w-[6%] hidden lg:block'>{DateFormat(createdAt)}</div>
      <div className='w-[6%] hidden lg:block'>{views.toLocaleString()}</div>
    </li>
  );
};

export default PostList;
