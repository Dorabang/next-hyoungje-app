import React, { useEffect, useMemo, useState } from 'react';
import Board from '../Board';
import { DocumentData } from 'firebase/firestore';
import { usePathname, useRouter } from 'next/navigation';
import ContainerBox from '../ContainerBox';
import FilterOption from '../FilterOption';
import getPosts from '@/utils/getPosts';
import Breadcrumbs from '../Breadcrumbs';
import PaginationComponets from '../PaginationComponent';

const PostFormat = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<DocumentData[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleUpdateFilter = (status: string) => {
    setSelectedCategory(status);
  };

  const path = usePathname().split('/');
  const pathname = path[2] ? path[2] : path[1];

  useEffect(() => {
    /* setPosts(querySnapshot); */
    if (selectedCategory === 'all') {
      getPosts(pathname).then((response) => {
        response && setPosts(response);

        setIsLoading(false);
      });
    }

    if (selectedCategory !== 'all') {
      getPosts(pathname).then((response) => {
        if (!response) return;
        const filter = response.filter(
          (item) => item.status === selectedCategory,
        );
        setPosts(filter);

        setIsLoading(false);
      });
    }
  }, [pathname, selectedCategory]);

  const [postsSlice, setPageSlice] = useState<DocumentData[]>([]);

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
    if (posts) {
      let result = posts.slice(offset, offset + limit);
      setPageSlice(result);
    }
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
      />

      <Board data={postsSlice} isLoading={isLoading}>
        <Board.Headers />
        <Board.Bodys isLoading={isLoading} />
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
