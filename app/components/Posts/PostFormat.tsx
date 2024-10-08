'use client';
import React, { useEffect, useState } from 'react';
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
import { wildMarketData } from '@/constant/prevPosts';
import { prevPosts } from '@/apis/prevPost';
import { allRoutes } from '@/constant/Routes';

const PostFormat = ({ pathname }: { pathname: string }) => {
  const onClickButton = async () => {
    const data = wildMarketData.sort((a, b) => a.createdAt - b.createdAt);
    // console.log('🚀 ~ onClickButton ~ wildMarketData:', wildMarketData.length);

    // await prevPosts({
    //   marketType: pathname,
    //   displayName: data[0].displayName ?? 'anonymous',
    //   ...data[0],
    // });

    // data.forEach(async (item) => {
    //   await prevPosts({
    //     marketType: pathname,
    //     userId: 1,
    //     displayName: item.displayName ?? 'anonymous',
    //     ...item,
    //   });
    // });
  };

  const auth = useRecoilValue(authState);

  const [page, setPage] = useState(1);
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
      <button onClick={onClickButton}>옛날 데이터 업로드</button>
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

      <Board user={user} isLoading={isLoading} pathname={pathname}>
        <Board.Headers type={isCommunity ? 'community' : 'etc'} />
        <Board.Bodys
          type={isCommunity ? 'community' : 'etc'}
          isLoading={isLoading}
          posts={data.data}
          refetch={refetch}
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
