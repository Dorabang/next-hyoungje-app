'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { allRoutes } from '@/constant/Routes';

const PostFormat = ({ pathname }: { pathname: string }) => {
  const auth = useRecoilValue(authState);
  const searchParams = useSearchParams();
  const initPage = searchParams.get('page') ? searchParams.get('page') : 1;
  console.log('🚀 ~ PostFormat ~ initPage:', initPage);
  const router = useRouter();

  const [page, setPage] = useState(Number(initPage) ?? 1);
  const [user, setUser] = useState<User | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Status>('all');

  const isCommunity =
    allRoutes
      .filter((r) => r.link.includes('community'))
      .filter((r) => r.link.includes(pathname)).length > 0;

  useEffect(() => {
    if (auth) {
      (async () => {
        const user = await getUser();
        setUser(user ?? null);
      })();
    }
  }, [auth]);

  const { data, refetch, isLoading, isSuccess } = usePosts(
    pathname,
    page,
    selectedCategory,
    user,
  );

  const handleUpdateFilter = (status: Status) => {
    setSelectedCategory(status);
  };

  const handlePageUpDown = (id: number) => {
    const url = isCommunity
      ? `/community/${pathname}?page=${id}`
      : `/${pathname}?page=${id}`;
    router.push(url);
  };

  if (!isSuccess) return <Loading />;

  return (
    <ContainerBox className='text-sm'>
      <div className='flex justify-between'>
        <Breadcrumbs pathname={pathname} isCommunity={isCommunity} />
      </div>

      <FilterOption
        user={user}
        selectedCategory={selectedCategory}
        handleUpdateFilter={handleUpdateFilter}
        pathname={pathname}
        type={isCommunity ? 'community' : 'etc'}
      />
      <div className='overflow-x-scroll scrollbar-none relative'>
        <Board
          user={user}
          isLoading={isLoading}
          isCommunity={isCommunity}
          pathname={pathname}
        >
          <Board.Headers />
          <Board.Bodys
            isLoading={isLoading}
            posts={data.data}
            refetch={refetch}
            page={page}
          />
        </Board>
      </div>

      {data.totalResult > 0 && (
        <PaginationComponets
          totalPages={data.totalPages}
          page={page}
          setPage={setPage}
          handlePageUpDown={handlePageUpDown}
        />
      )}
    </ContainerBox>
  );
};

export default PostFormat;
