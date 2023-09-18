'use client';
import ContainerBox from '@/components/ContainerBox';
import { dbService } from '@/firebase';
import { authState } from '@/recoil/atoms';
import { fromNow } from '@/utils/dayjs';
import getPosts from '@/utils/getPosts';
import { User } from 'firebase/auth';
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import DateFormat from '@/utils/DateFormat';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { Pagination, Stack } from '@mui/material';

export interface postProps {
  id: string;
  data: {
    id: string;
    title: string;
    contents: string;
    attachmentUrl?: string;
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
  contents: string;
  attachmentUrl?: string;
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
  console.log('🚀 ~ file: page.tsx:52 ~ Living1Page ~ user:', user);
  const pathname = usePathname();

  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const limit = 10;
  const offset = (page - 1) * limit;

  const postsData = (posts) => {
    if (posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  useEffect(() => {
    /* setPosts(querySnapshot); */
    if (posts.length === 0) {
      getPosts(pathname).then((response) => setPosts(response));
    }
  }, [posts]);

  return (
    <ContainerBox>
      <div className='flex justify-end mt-[50px]'>
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
          <div className='w-[10%]'>작성자</div>
          <div className='w-[70%] text-left'>제목</div>
          <div className='w-[10%]'>등록 일자</div>
          <div className='w-[10%]'>조회수</div>
        </li>
        {posts.length !== 0 ? (
          posts.map((post: postProps) => {
            return (
              <li
                key={post.id}
                className='flex border-b border-neutral-300 text-center [&_div]:py-2 [&_div]:px-4'
              >
                <div className='w-[10%]'>{post.data.creatorName}</div>
                <div className='flex-grow flex justify-between w-[70%]'>
                  <Link href={`/wild-market1/${post.id}`}>
                    {post.data.title}
                  </Link>
                  {user && user.uid === post.data.creatorId && (
                    <div className='text-gray-300 flex gap-2 text-sm'>
                      <span>편집</span>
                      <span>삭제</span>
                    </div>
                  )}
                </div>
                <div className='w-[10%]'>{DateFormat(post.data.createdAt)}</div>
                <div className='w-[10%]'>{post.data.views}</div>
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
