'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import Breadcrumbs from '@/components/Breadcrumbs';
import ContainerBox from '@/components/ContainerBox';
import PostsNotFound from '@/components/Posts/PostsNotFound';
import PostsLoading from '@/components/Posts/PostsLoading';
import PaginationComponets from '@/components/PaginationComponent';

import DateFormat from '@/utils/DateFormat';
import { deletePost } from '@/apis/posts';

import { User } from 'firebase/auth';
import { DocumentData, doc, updateDoc } from 'firebase/firestore';

import { AiOutlineFileImage } from 'react-icons/ai';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { dbService } from '@/firebase';

interface PostFormatProps {
  pathname: string;
  isLoading: boolean;
  posts: DocumentData[] | null;
  user: User | null;
  admin: DocumentData | null;
  handleUpdatePosts: (data: DocumentData[]) => void;
  selectedCategory: string;
  handleUpdateFilter: (status: string) => void;
}

const CommFormat = ({
  pathname,
  isLoading,
  posts,
  user,
  admin,
  handleUpdatePosts,
}: PostFormatProps) => {
  const router = useRouter();

  const [postsSlice, setPageSlice] = useState<DocumentData[] | null>(null);
  const [page, setPage] = useState(1);
  const limit = 15;
  const offset = (page - 1) * limit;

  useEffect(() => {
    setPage(1);
  }, [posts]);

  useEffect(() => {
    if (posts) {
      let result = posts.slice(offset, offset + limit);
      setPageSlice(result);
    }
  }, [posts, offset]);

  const handleDeletePost = (id: string) => {
    const post = posts?.find((item) => item.id === id);
    if (!post || !posts) return;

    const ok = window.confirm('이 게시물을 삭제하시겠습니까?');

    if (ok) {
      deletePost(post, user, pathname, id);
      const deletePosts = posts.filter((item) => item.id !== id);
      handleUpdatePosts(deletePosts);
    }
  };

  const handleClickViewUp = async (id: string) => {
    const post = posts && posts.find((item) => item.id === id);

    if (post) {
      const newPostObj = { ...post, views: post.views + 1 };
      const docRef = doc(dbService, `${pathname}/${post.id}`);

      await updateDoc(docRef, newPostObj);
    }
  };

  return (
    <ContainerBox>
      <div className='text-sm'>
        <div className='flex justify-between'>
          <Breadcrumbs />
        </div>

        <div
          className='flex justify-end items-center pt-10 pb-5
      text-gray-500 text-sm'
        >
          {pathname === '/notice' && admin?.includes(user?.uid) && (
            <Link
              href={`/community/edit${pathname}`}
              className='text-neutral-500 hover:text-neutral-800 flex items-center transition-colors'
            >
              <HiOutlinePencilSquare size={18} className='mr-1' />
              글쓰기
            </Link>
          )}
          {pathname !== '/notice' && user && (
            <Link
              href={`/community/edit${pathname}`}
              className='text-neutral-500 hover:text-neutral-800 flex items-center transition-colors'
            >
              <HiOutlinePencilSquare size={18} className='mr-1' />
              글쓰기
            </Link>
          )}
        </div>

        <ul className='w-full border-b border-neutral-500'>
          <li className='border-b border-t border-neutral-500 flex text-center font-bold [&_>_div]:py-2'>
            <div className='w-[4%] hidden lg:block'>번호</div>
            <div className='flex-grow text-left'>제목</div>
            <div className='w-[10%] hidden md:block'>작성자</div>
            <div className='w-[6%] hidden lg:block'>등록 일자</div>
            <div className='w-[6%] hidden lg:block'>조회수</div>
          </li>
          {!isLoading ? (
            postsSlice && postsSlice.length !== 0 ? (
              postsSlice.map(
                ({
                  id,
                  title,
                  creatorId,
                  creatorName,
                  createdAt,
                  views,
                  image,
                  num,
                }: DocumentData) => {
                  return (
                    <li
                      key={id}
                      className='flex items-center border-b border-neutral-300 text-center text-gray-700 [&_>_div]:py-3'
                    >
                      {/* 문서 번호 */}
                      <div className='w-[4%] hidden lg:block'>
                        {num ? num : null}
                      </div>

                      {/* 제목 */}
                      <div className='flex-grow flex justify-between items-center'>
                        <Link
                          href={`/community${pathname}/${id}`}
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
                              onClick={() =>
                                router.push(`${pathname}/edit/${id}`)
                              }
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

                      {/* 작성자 */}
                      <div className='w-[10%] hidden md:block'>
                        {creatorName?.length > 8
                          ? creatorName.substring(0, 8) + '...'
                          : creatorName}
                      </div>
                      <div className='w-[6%] hidden lg:block'>
                        {DateFormat(createdAt)}
                      </div>
                      <div className='w-[6%] hidden lg:block'>{views}</div>
                    </li>
                  );
                },
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

        {posts && (
          <PaginationComponets
            totalPosts={posts.length === 0 ? posts.length + 10 : posts.length}
            limit={limit}
            page={page}
            setPage={(value) => setPage(value)}
          />
        )}
      </div>
    </ContainerBox>
  );
};

export default CommFormat;
