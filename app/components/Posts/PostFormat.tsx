'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import Breadcrumbs from '@/components/Breadcrumbs';
import ContainerBox from '@/components/ContainerBox';
import StatusOptions from '@/components/StatusOptions';
import PostsNotFound from '@/components/Posts/PostsNotFound';
import PostsLoading from '@/components/Posts/PostsLoading';
import FilterOption from '@/components/FilterOption';
import PaginationComponets from '@/components/PaginationComponent';

import DateFormat from '@/utils/DateFormat';
import DeletePost from '@/utils/deletePost';

import { User } from 'firebase/auth';
import { DocumentData, doc, updateDoc } from 'firebase/firestore';

import { AiOutlineFileImage } from 'react-icons/ai';
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

const PostFormat = ({
  pathname,
  isLoading,
  posts,
  user,
  admin,
  handleUpdatePosts,
  selectedCategory,
  handleUpdateFilter,
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
    const ok = window.confirm('이 게시물을 삭제하시겠습니까?');

    const post = posts && posts.find((item) => item.id === id);
    if (!post) return;

    if (ok) {
      DeletePost(post, user, pathname, id);
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
          <Breadcrumbs pathname={pathname} />
        </div>

        <FilterOption
          selectedCategory={selectedCategory}
          handleUpdateFilter={handleUpdateFilter}
          pathname={pathname}
        />

        <ul className='w-full border-b border-neutral-500'>
          <li className='border-b border-t border-neutral-500 flex text-center font-bold [&_>_div]:py-2'>
            <div className='w-[4%] hidden lg:block'>번호</div>
            <div className='w-[6%] hidden lg:block'>종류</div>
            <div className='min-w-[90px] w-[10%]'>분류</div>
            <div className='flex-grow text-left'>제목</div>
            <div className='w-[6%] hidden md:block'>산지</div>
            <div className='w-[6%] hidden md:block'>가격</div>
            <div className='w-[10%] hidden md:block'>작성자</div>
            <div className='w-[6%] hidden lg:block'>등록 일자</div>
            <div className='w-[6%] hidden lg:block'>조회수</div>
          </li>
          {!isLoading ? (
            postsSlice && postsSlice.length !== 0 ? (
              postsSlice.map(
                ({
                  id,
                  variant,
                  status,
                  title,
                  creatorId,
                  creatorName,
                  createdAt,
                  views,
                  place,
                  price,
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

                      {/* 종류 */}
                      <div className='w-[6%] hidden lg:block'>
                        {variant?.length > 5
                          ? variant.substring(0, 5) + '...'
                          : variant}
                      </div>

                      {/* 분류 */}
                      <div className='min-w-[90px] w-[10%] text-xs'>
                        {StatusOptions(status)}
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

                      {/* 산지 */}
                      <div className='w-[6%] hidden md:block'>{place}</div>

                      {/* 가격 */}
                      <div className='w-[6%] hidden md:block'>{price}</div>

                      {/* 작성자 */}
                      <div className='w-[10%] hidden md:block'>
                        {creatorName?.length > 8
                          ? creatorName.substring(0, 8) + '...'
                          : creatorName}
                      </div>
                      <div className='w-[6%] hidden lg:block'>
                        {DateFormat(createdAt)}
                      </div>
                      <div className='w-[6%] hidden lg:block'>
                        {views.toLocaleString()}
                      </div>
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

        {posts && (
          <PaginationComponets
            totalPosts={posts.length}
            limit={limit}
            page={page}
            setPage={(value) => setPage(value)}
          />
        )}
      </div>
    </ContainerBox>
  );
};

export default PostFormat;
