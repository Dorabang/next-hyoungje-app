'use client';
import { createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';

import { BoardProps, Post, PostContextType } from './types';
import PostsLoading from '../../Posts/PostsLoading';
import PostsNotFound from '../../Posts/PostsNotFound';
import PostList from './PostList';

const defaultPostContext: PostContextType = {
  user: null,
  pathname: '/',
};

export const PostContext = createContext(defaultPostContext);

export const usePostContext = () => useContext(PostContext);

const Board = ({ user, children }: BoardProps) => {
  const path = usePathname().split('/');
  const pathname = path[2] ? path[2] : path[1];

  return (
    <PostContext.Provider value={{ user, pathname }}>
      <ul className='w-full border-b border-grayColor-500'>{children}</ul>
    </PostContext.Provider>
  );
};

const Headers = ({ type = 'etc' }: { type?: 'community' | 'etc' }) => {
  return (
    <li className='border-b border-t border-grayColor-500 flex text-center font-bold [&_>_div]:py-2 text-grayColor-400 [&_div]:truncate'>
      <div className='w-[4%] hidden lg:block'>번호</div>
      {type === 'etc' ? (
        <>
          <div className='w-[6%] hidden lg:block'>종류</div>
          <div className='min-w-[90px] w-[10%]'>분류</div>
        </>
      ) : null}
      <div className='flex-grow text-left'>제목</div>
      {type === 'etc' ? (
        <>
          <div className='w-[6%] hidden md:block'>산지</div>
          <div className='w-[6%] hidden md:block'>가격</div>
          <div className='w-[6%] hidden lg:block'>산채일</div>
        </>
      ) : null}
      <div className='w-[10%] hidden md:block'>작성자</div>
      <div className='w-[6%] hidden lg:block'>등록일</div>
      <div className='w-[6%] hidden lg:block'>조회수</div>
    </li>
  );
};

export const Bodys = ({
  posts,
  refetch,
  isLoading,
  type = 'etc',
}: {
  posts: Post[] | null;
  refetch: () => void;
  isLoading: boolean;
  type?: 'etc' | 'community';
}) => {
  const { user, pathname } = useContext(PostContext);

  const handleDeletePost = (id: number) => {
    const ok = window.confirm('이 게시물을 삭제하시겠습니까?');

    if (ok) {
      refetch();
    }
  };

  if (isLoading) return <PostsLoading />;

  return (
    <>
      {posts && posts?.length !== 0 ? (
        posts.map((post) => {
          return (
            <PostList
              key={post.postId}
              type={type}
              pathname={pathname}
              post={post}
              user={user}
              handleDeletePost={handleDeletePost}
            />
          );
        })
      ) : (
        /* 게시물 데이터가 없을 때 */
        <PostsNotFound />
      )}
    </>
  );
};

Board.Headers = Headers;
Board.Bodys = Bodys;

export default Board;
