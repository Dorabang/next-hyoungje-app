'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRecoilValue } from 'recoil';

import { User, authState } from '@/recoil/atoms';
import Board from '../common/Board';
import ContainerBox from '../common/ContainerBox';
import FilterOption from '../FilterOption';
import Breadcrumbs from '../common/Breadcrumbs';
import PaginationComponets from '../common/PaginationComponent';
import { usePosts } from '@/hooks/queries/usePosts';
import { Status } from '../StatusOptions';
import Loading from '../common/Loading';
import { getUser } from '@/apis/users';

const PostFormat = () => {
  const path = usePathname().split('/');
  const pathname = path[2] ? path[2] : path[1];
  const auth = useRecoilValue(authState);

  const [page, setPage] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Status>('all');

  useEffect(() => {
    if (auth) {
      (async () => {
        const user = await getUser();
        setUser(user ?? null);
      })();
    }
  }, [auth]);

  useEffect(() => {
    setPage(1);
  }, []);

  const { data, refetch, isLoading, isSuccess } = usePosts(
    pathname,
    page,
    selectedCategory,
    user,
  );

  const handleUpdateFilter = (status: Status) => {
    setSelectedCategory(status);
  };

  if (!isSuccess) return <Loading />;

  return (
    <ContainerBox className='text-sm'>
      <div className='flex justify-between'>
        <Breadcrumbs />
      </div>

      <FilterOption
        user={user}
        selectedCategory={selectedCategory}
        handleUpdateFilter={handleUpdateFilter}
        pathname={pathname}
        type={path.includes('community') ? 'community' : 'etc'}
      />

      <Board user={user} isLoading={isLoading}>
        <Board.Headers
          type={path.includes('community') ? 'community' : 'etc'}
        />
        <Board.Bodys
          type={path.includes('community') ? 'community' : 'etc'}
          isLoading={isLoading}
          posts={data.data}
          refetch={() => {
            refetch();
          }}
        />
      </Board>

      {data.totalResult > 0 && (
        <PaginationComponets
          totalPages={data.totalPages}
          page={page}
          setPage={(value) => setPage(value)}
        />
      )}
    </ContainerBox>
  );
};

export default PostFormat;
