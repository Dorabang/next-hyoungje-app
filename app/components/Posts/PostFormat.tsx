'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Board from '../Board';
import { DocumentData } from 'firebase/firestore';
import { usePathname } from 'next/navigation';
import ContainerBox from '../ContainerBox';
import FilterOption from '../FilterOption';
import { getPosts } from '@/apis/posts/posts';
import Breadcrumbs from '../Breadcrumbs';
import PaginationComponets from '../PaginationComponent';

const PostFormat = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<DocumentData[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleUpdateFilter = (status: string) => {
    setSelectedCategory(status);
  };

  const path = usePathname().split('/');
  const pathname = path[2] ? path[2] : path[1];

  useEffect(() => {
    /* setPosts(querySnapshot); */
    const sortedPosts = async () => {
      if (selectedCategory === 'all') {
        const response = await getPosts(pathname);
        setPosts(response);

        return setIsLoading(false);
      } else {
        const response = await getPosts(pathname);

        const filter = response.filter(
          (item) => item.status === selectedCategory,
        );
        setPosts(filter);

        return setIsLoading(false);
      }
    };
    sortedPosts();
  }, [pathname, selectedCategory]);

  /* Pagination */
  const [postsSlice, setPostsSlice] = useState<DocumentData[]>([]);
  const [page, setPage] = useState(1);
  const limit = 15;
  const offset = (page - 1) * limit;
  const totalPosts = useMemo(() => {
    return posts ? posts.length : limit;
  }, [posts]);

  useEffect(() => {
    setPage(1);
  }, [posts]);

  useEffect(() => {
    const result = posts?.slice(offset, offset + limit);
    result && setPostsSlice(result);
  }, [posts, offset]);

  return (
    <ContainerBox className='text-sm'>
      <div className='flex justify-between'>
        <Breadcrumbs />
      </div>

      <FilterOption
        selectedCategory={selectedCategory}
        handleUpdateFilter={handleUpdateFilter}
        pathname={pathname}
        type={path.includes('community') ? 'community' : 'etc'}
      />

      <Board isLoading={isLoading}>
        <Board.Headers
          type={path.includes('community') ? 'community' : 'etc'}
        />
        <Board.Bodys
          type={path.includes('community') ? 'community' : 'etc'}
          isLoading={isLoading}
          posts={postsSlice}
          editPosts={(value) => setPosts(value)}
        />
      </Board>

      <PaginationComponets
        totalPosts={totalPosts}
        limit={limit}
        page={page}
        setPage={(value) => setPage(value)}
      />
    </ContainerBox>
  );
};

export default PostFormat;
