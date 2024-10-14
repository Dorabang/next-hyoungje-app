'use client';
import { createContext, useContext } from 'react';

import { BoardProps, Post, PostContextType } from './types';
import PostsLoading from '../../Posts/PostsLoading';
import PostsNotFound from '../../Posts/PostsNotFound';
import PostList from './PostList';
import { deletePost } from '@/apis/posts';
import { QueryObserverResult } from '@tanstack/react-query';

const defaultPostContext: PostContextType = {
  user: null,
  pathname: '/',
  isCommunity: false,
};

export const PostContext = createContext(defaultPostContext);
export const usePostContext = () => useContext(PostContext);

const Board = ({ pathname, user, isCommunity, children }: BoardProps) => {
  return (
    <PostContext.Provider value={{ user, pathname, isCommunity }}>
      <ul
        className={`border-b border-grayColor-500 ${isCommunity ? '' : 'min-w-[500px]'}`}
      >
        {children}
      </ul>
    </PostContext.Provider>
  );
};

const Headers = () => {
  const { isCommunity } = usePostContext();

  return (
    <li className='text-xs md:text-sm border-b border-t border-grayColor-500 flex text-center font-bold [&_>_div]:py-2 text-grayColor-400'>
      <div className='w-[10%] md:w-[6%] block'>번호</div>
      {!isCommunity ? (
        <>
          <div className='w-[15%] md:w-[6%] block'>종류</div>
          <div className='min-w-[68px] w-[10%]'>분류</div>
        </>
      ) : null}
      <div
        className={`${isCommunity ? 'flex-grow' : 'w-[40%] md:flex-grow'} text-left pl-2`}
      >
        제목
      </div>
      {!isCommunity ? (
        <>
          <div className='w-[6%] hidden lg:block'>산지</div>
          <div className='w-[10%] md:w-[6%] block'>가격</div>
          <div className='w-[6%] hidden lg:block'>산채일</div>
        </>
      ) : null}
      <div className='w-[20%] md:w-[6%] block'>작성자</div>
      <div className='w-[6%] hidden lg:block'>등록일</div>
      <div className='w-[10%] md:w-[6%] lg:block'>조회수</div>
    </li>
  );
};

export const Bodys = ({
  posts,
  refetch,
  isLoading,
  page,
}: {
  posts: Post[] | null;
  refetch: () => Promise<QueryObserverResult<any, any>>;
  isLoading: boolean;
  page: number;
}) => {
  const { user, pathname } = usePostContext();

  const handleDeletePost = async (id: number) => {
    const ok = window.confirm('이 게시물을 삭제하시겠습니까?');

    if (ok) {
      const res = await deletePost(id);
      if (res.result === 'SUCCESS') {
        refetch();
      }
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
              pathname={pathname}
              post={post}
              user={user}
              handleDeletePost={handleDeletePost}
              page={page}
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
