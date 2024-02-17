'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import { BoardProps, PostContextType } from './types';
import { authState } from '@/recoil/atoms';
import { useRecoilValue } from 'recoil';
import { usePathname } from 'next/navigation';
import getAdmin from '@/utils/getAdmin';
import { Bodys } from './Bodys';

const defaultPostContext: PostContextType = {
  posts: [],
  editPosts: () => {},
  user: null,
  admin: null,
  pathname: '/',
};

export const PostContext = createContext(defaultPostContext);

export const usePostContext = () => useContext(PostContext);

const Board = ({ children, data }: BoardProps) => {
  const [posts, setPosts] = useState<DocumentData[] | null>(data);
  const [admin, setAdmin] = useState<DocumentData | null>(null);

  const pathname = usePathname();
  const user = useRecoilValue(authState);

  const editPosts = (newPosts: DocumentData[]) => {
    setPosts(newPosts);
  };

  useEffect(() => {
    if (!admin) {
      const getAdminData = async () => {
        const response = await getAdmin();
        setAdmin(response);
      };
      getAdminData();
    }
  }, [admin]);

  return (
    <PostContext.Provider value={{ posts, editPosts, user, pathname, admin }}>
      <ul className='w-full border-b border-neutral-500'>{children}</ul>
    </PostContext.Provider>
  );
};

const Headers = ({ type = 'etc' }: { type?: 'community' | 'etc' }) => {
  return (
    <li className='border-b border-t border-neutral-500 flex text-center font-bold [&_>_div]:py-2 text-grayColor-400'>
      <div className='w-[4%] hidden lg:block'>번호</div>
      {type === 'etc' ? (
        <div className='w-[6%] hidden lg:block'>종류</div>
      ) : null}
      <div className='min-w-[90px] w-[10%]'>분류</div>
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

Board.Headers = Headers;
Board.Bodys = Bodys;

export default Board;
