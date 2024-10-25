'use client';
import React, { Fragment, useEffect } from 'react';

import ContainerBox from '@/components/common/ContainerBox';
import CommDetailPage from '@/components/Community/CommDetail';
import { usePost } from '@/hooks/queries/usePosts';
import { PageParams } from '@/constant/type';

const CommunityDetailPage = ({ params }: { params: PageParams }) => {
  const { id } = React.use(params);
  const { data, refetch } = usePost(Number(id));

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <Fragment>
      {!data ? (
        <ContainerBox className='py-20'>
          <p>삭제된 게시물이거나 찾을 수 없는 게시물입니다.</p>
        </ContainerBox>
      ) : (
        <CommDetailPage postId={Number(id)} data={data} />
      )}
    </Fragment>
  );
};

export default CommunityDetailPage;
