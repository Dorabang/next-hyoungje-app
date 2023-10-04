'use client';
import ContainerBox from '@/components/ContainerBox';
import { authState } from '@/recoil/atoms';
import getPosts from '@/utils/getPosts';
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import DateFormat from '@/utils/DateFormat';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import statusOptions from '@/components/StatusOptions';
import Breadcrumbs from '@/components/Breadcrumbs';

export interface postProps {
  id: string;
  data: {
    id: string;
    title: string;
    status: string;
    variant: string;
    phone: string;
    place: string;
    contents: string;
    date: string;
    price: string;
    height: string;
    width: string;
    amount: string;
    image?: string[];
    like: string[];
    comment: {
      creatorId: string;
      like: string[];
      recomment: { creatorId: string; contents: string }[];
    }[];
    views: number;
    creatorName: string;
    creatorId: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface postsProps {
  id: string;
  title: string;
  status: string;
  variant: string;
  phone: string;
  place: string;
  contents: string;
  date: string;
  price: string;
  height: string;
  width: string;
  amount: string;
  image?: string[];
  like: string[];
  comment: {
    creatorId: string;
    like: string[];
    recomment: { creatorId: string; contents: string }[];
  }[];
  views: number;
  creatorName: string;
  creatorId: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

const Living1Page = () => {
  const user = useRecoilValue(authState);

  const pathname = usePathname();

  const [posts, setPosts] = useState<postProps[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const postsData = (posts: postProps[]) => {
    if (posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  useEffect(() => {
    /* setPosts(querySnapshot); */
    if (posts.length === 0) {
      getPosts(pathname).then((response) => {
        response.sort(function (a: postProps, b: postProps) {
          return Number(a.data.createdAt) - Number(b.data.createdAt);
        });
        setPosts(response.reverse());
      });
    }
  }, [posts, pathname]);

  return (
    <ContainerBox>
      {/* <ul className='flex gap-2 py-2 text-gray-500 text-sm'>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>{'>'}</li>
        <li>
          <Link href='/wild-market1'>산채품장터1</Link>
        </li>
      </ul> */}
      <Breadcrumbs pathname={pathname} />

      <div className='flex justify-end mt-[40px]'>
        {user && (
          <Link
            href={`/edit/${pathname}`}
            className='text-neutral-500 hover:text-neutral-800 p-2 mb-3 flex items-center transition-colors'
          >
            <HiOutlinePencilSquare size={18} className='mr-1' />
            글쓰기
          </Link>
        )}
      </div>

      <ul className='w-full border-b border-neutral-500'>
        <li className='border-b border-t border-neutral-500 flex text-center font-bold [&_div]:py-2 [&_div]:px-4'>
          <div className='w-[8%]'>분류</div>
          <div className='w-[68%] text-left'>제목</div>
          <div className='w-[8%]'>작성자</div>
          <div className='w-[8%]'>등록 일자</div>
          <div className='w-[8%]'>조회수</div>
        </li>
        {posts.length !== 0 ? (
          posts.map((post: postProps) => {
            return (
              <li
                key={post.id}
                className='flex items-center border-b border-neutral-300 text-center text-gray-700 [&_div]:py-2 [&_div]:px-4'
              >
                <div className='w-[8%]'>
                  <span
                    className={`
                    px-3 py-[2px]
                    rounded-full
                    text-sm
                    border
                    cursor-default
                    ${
                      post.data.status === 'sale'
                        ? 'border-sky-500 text-sky-500'
                        : ''
                    }
                    ${
                      post.data.status === 'sold-out'
                        ? 'border-gray-500 text-gray-500'
                        : ''
                    }
                    ${
                      post.data.status === 'reservation'
                        ? 'border-rose-500 text-rose-500'
                        : ''
                    }
                    `}
                  >
                    {statusOptions(post.data.status)}
                  </span>
                </div>
                <div className='flex-grow flex justify-between items-center w-[68%]'>
                  <Link href={`/wild-market1/${post.id}`}>
                    {post.data.title}
                  </Link>
                  {user && user.uid === post.data.creatorId && (
                    <div className='text-gray-500 flex gap-2 text-sm [&_span]:cursor-pointer'>
                      <span>편집</span>
                      <span>삭제</span>
                    </div>
                  )}
                </div>
                <div className='w-[8%]'>{post.data.creatorName}</div>
                <div className='w-[8%]'>{DateFormat(post.data.createdAt)}</div>
                <div className='w-[8%]'>{post.data.views}</div>
              </li>
            );
          })
        ) : (
          <li className='py-3 h-52 flex justify-center items-center'>
            <p className='text-neutral-500'>현재 게시물이 없습니다.</p>
          </li>
        )}
      </ul>
    </ContainerBox>
  );
};

export default Living1Page;
