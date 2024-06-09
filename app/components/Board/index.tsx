'use client';
import { createContext, useContext } from 'react';
import { DocumentData } from 'firebase/firestore';
import { BoardProps, PostContextType } from './types';
import { authState } from '@/recoil/atoms';
import { useRecoilValue } from 'recoil';
import { usePathname } from 'next/navigation';
import PostsLoading from '../Posts/PostsLoading';
import PostsNotFound from '../Posts/PostsNotFound';
import { deletePost } from '@/apis/posts';
import PostList from './PostList';

const defaultPostContext: PostContextType = {
  user: null,
  pathname: '/',
};

export const PostContext = createContext(defaultPostContext);

export const usePostContext = () => useContext(PostContext);

const Board = ({ children }: BoardProps) => {
  const pathname = usePathname();
  const user = useRecoilValue(authState);

  return (
    <PostContext.Provider value={{ user, pathname }}>
      <ul className='w-full border-b border-neutral-500'>{children}</ul>
    </PostContext.Provider>
  );
};

const Headers = ({ type = 'etc' }: { type?: 'community' | 'etc' }) => {
  return (
    <li className='border-b border-t border-neutral-500 flex text-center font-bold [&_>_div]:py-2 text-grayColor-400'>
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
  editPosts,
  isLoading,
  type = 'etc',
}: {
  posts: DocumentData[] | null;
  editPosts: (value: DocumentData[]) => void;
  isLoading: boolean;
  type?: 'etc' | 'community';
}) => {
  const { user, pathname } = useContext(PostContext);

  const handleDeletePost = (id: string) => {
    const post = posts?.find((item) => item.id === id);
    if (!post || !posts) return;

    const ok = window.confirm('이 게시물을 삭제하시겠습니까?');

    if (ok) {
      deletePost(post, user, pathname, id);
      const deletePosts = posts.filter((item) => item.id !== id);
      editPosts(deletePosts);
    }
  };
  return (
    <>
      {!isLoading ? (
        posts && posts?.length !== 0 ? (
          posts.map((post) => {
            return (
              <PostList
                key={post.id}
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
        )
      ) : (
        /* 게시물 데이터 로딩 중 */
        <PostsLoading />
      )}
    </>
  );
};

Board.Headers = Headers;
Board.Bodys = Bodys;

export default Board;
