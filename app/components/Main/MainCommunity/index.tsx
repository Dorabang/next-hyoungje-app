'use client';

import { getPosts } from '@/apis/posts';
import BoardForm from '@/components/Community/BoardForm';
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export interface communityState {
  boast: DocumentData[];
  'wild-catch': DocumentData[];
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
      const response = await getPosts(category);
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
