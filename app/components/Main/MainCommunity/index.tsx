'use client';
import { useEffect, useState } from 'react';

import BoardForm from '@/components/Community/BoardForm';
import { Post } from '@/components/Board/types';
import { getPosts } from '@/apis/posts';

export interface communityState {
  boast: Post[];
  'wild-catch': Post[];
}

export interface communityLoadingState {
  boast: boolean;
  'wild-catch': boolean;
}

const MainCommunity = () => {
  const [community, setCommunity] = useState<communityState>({
    boast: [],
    'wild-catch': [],
  });
  const [isLoading, setIsLoading] = useState<communityLoadingState>({
    boast: true,
    'wild-catch': true,
  });

  useEffect(() => {
    const communityList = ['boast', 'wild-catch'];

    communityList.forEach(async (category) => {
      const response = (await getPosts({ marketType: category })).data;
      setCommunity((prev) => ({ ...prev, [category]: [...response] }));
      setIsLoading((prev) => ({ ...prev, [category]: false }));
    });
  }, []);

  return (
    <>
      <BoardForm
        data={community['wild-catch']}
        title='산채기'
        path='/community/wild-catch'
        isLoading={isLoading['wild-catch']}
      />
      <BoardForm
        data={community.boast}
        title='난자랑'
        path='/community/boast'
        isLoading={isLoading.boast}
      />
    </>
  );
};

export default MainCommunity;
