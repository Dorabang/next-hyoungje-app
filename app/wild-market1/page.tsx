'use client';
import ContainerBox from '@/components/ContainerBox';
import { authState } from '@/recoil/atoms';
import getPosts from '@/utils/getPosts';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import DateFormat from '@/utils/DateFormat';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import StatusOptions from '@/components/StatusOptions';
import Breadcrumbs from '@/components/Breadcrumbs';
import DeletePost from '@/utils/deletePost';
import PostsLoading from '@/components/PostsLoading';
import PostsNotFound from '@/components/PostsNotFound';

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

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [page, setPage] = useState(1);
  const limit = 15;
  const offset = (page - 1) * limit;

  const postsData = (posts: postProps[]) => {
    if (posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  const handleDeletePost = (id: string) => {
    const ok = window.confirm('이 게시물을 삭제하시겠습니까?');

    const post = posts.find((item) => item.id === id);
    if (!post) return;

    if (ok) {
      DeletePost(post, user, pathname, id);
      const deletePosts = posts.filter((item) => item.id !== id);
      setPosts(deletePosts);
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
        setIsLoading(false);
      });
    }
  }, [posts, pathname]);

  return (
    <ContainerBox>
      <div className='text-sm'>
        <div className='flex justify-between'>
          <Breadcrumbs pathname={pathname} />
        </div>

        <ul
          className='flex justify-end items-center gap-2 pt-10 pb-5
        text-gray-500 text-sm
       '
        >
          {user && (
            <>
              <li>
                <Link
                  href={`/edit/${pathname}`}
                  className='text-neutral-500 hover:text-neutral-800 flex items-center transition-colors'
                >
                  <HiOutlinePencilSquare size={18} className='mr-1' />
                  글쓰기
                </Link>
              </li>

              <li className='cursor-default'>|</li>
            </>
          )}
          <li className='cursor-pointer hover:text-gray-700'>전체</li>
          <li className='cursor-default'>|</li>
          <li className='cursor-pointer hover:text-gray-700'>판매 중</li>
          <li className='cursor-default'>|</li>
          <li className='cursor-pointer hover:text-gray-700'>판매 완료</li>
          <li className='cursor-default'>|</li>
          <li className='cursor-pointer hover:text-gray-700'>예약 중</li>
        </ul>

        <ul className='w-full border-b border-neutral-500'>
          <li className='border-b border-t border-neutral-500 flex text-center font-bold [&_>_div]:py-2'>
            <div className='w-[6%]'>종류</div>
            <div className='w-[10%]'>분류</div>
            <div className='flex-grow text-left'>제목</div>
            <div className='w-[6%]'>산지</div>
            <div className='w-[6%]'>가격</div>
            <div className='w-[10%]'>작성자</div>
            <div className='w-[6%]'>등록 일자</div>
            <div className='w-[6%]'>조회수</div>
          </li>
          {!isLoading ? (
            posts.length !== 0 ? (
              posts.map(
                ({
                  id,
                  data: {
                    variant,
                    status,
                    title,
                    creatorId,
                    creatorName,
                    createdAt,
                    views,
                    place,
                    price,
                  },
                }: postProps) => {
                  return (
                    <li
                      key={id}
                      className='flex items-center border-b border-neutral-300 text-center text-gray-700 [&_>_div]:py-3'
                    >
                      <div className='w-[6%]'>
                        {variant.length > 5 ? variant.substring(0, 5) : variant}
                      </div>
                      <div className='w-[10%]'>{StatusOptions(status)}</div>
                      <div className='flex-grow flex items-center'>
                        <Link href={`/wild-market1/${id}`}>{title}</Link>
                        {user && user.uid === creatorId && (
                          <div className='text-gray-400 text-xs flex [&_span]:px-1 ml-4'>
                            <span className='hover:text-gray-700 cursor-pointer'>
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
                      <div className='w-[6%]'>{place}</div>
                      <div className='w-[6%]'>{price}</div>
                      <div className='w-[10%]'>
                        {creatorName.length > 8
                          ? creatorName.substring(0, 8) + '...'
                          : creatorName}
                      </div>
                      <div className='w-[6%]'>{DateFormat(createdAt)}</div>
                      <div className='w-[6%]'>{views}</div>
                    </li>
                  );
                }
              )
            ) : (
              /* 게시물 데이터가 없을 때 */
              <PostsNotFound />
            )
          ) : (
            /* 게시물 데이터 로딩 중 */
            <PostsLoading />
          )}
        </ul>
      </div>
    </ContainerBox>
  );
};

export default Living1Page;
