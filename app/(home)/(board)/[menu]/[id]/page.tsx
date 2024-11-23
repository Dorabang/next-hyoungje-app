'use client';
import React, { Fragment, Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';

import ContainerBox from '@/components/common/ContainerBox';
import PostDetail from '@/components/Posts/PostDetail';
// import { usePost } from '@/hooks/queries/usePosts';
import { PageParams } from '@/constant/type';
import { postQueryOptions } from '@/constant/queryOptions/postQueryOptions';
import Loading from '@/components/common/Loading';

const DetailPage = ({ params }: { params: PageParams }) => {
  const { id } = React.use(params);

  return (
    <Fragment>
      <Suspense
        fallback={
          <ContainerBox className='py-20'>
            <Loading />
          </ContainerBox>
        }
      >
        <PostDetail postId={Number(id)} />
      </Suspense>
    </Fragment>
  );
};

export default DetailPage;
