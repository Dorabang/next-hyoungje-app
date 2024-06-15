'use client';

import { getCommunityPosts, getPosts } from '@/apis/posts';
import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import BoardForm from './BoardForm';

export interface communityState {
  board: DocumentData[];
  notice: DocumentData[];
  boast: DocumentData[];
  qna: DocumentData[];
  'wild-catch': DocumentData[];
}

export interface communityLoadingState {
  board: boolean;
  notice: boolean;
  boast: boolean;
  qna: boolean;
  'wild-catch': boolean;
}

const Community = () => {
  const [community, setCommunity] = useState<communityState>({
    board: [],
    notice: [],
    boast: [],
    qna: [],
    'wild-catch': [],
  });

  const [isLoading, setIsLoading] = useState<communityLoadingState>({
    board: true,
    notice: true,
    boast: true,
    qna: true,
    'wild-catch': true,
  });

  useEffect(() => {
    const communityList = ['board', 'notice', 'boast', 'qna', 'wild-catch'];

    communityList.forEach(async (category) => {
      const response = await getCommunityPosts(category);
      setCommunity((prev) => ({ ...prev, [category]: response }));
      setIsLoading((prev) => ({ ...prev, [category]: false }));
    });
  }, []);

  return (
    <React.Fragment>
      <div className='flex pt-10 flex-wrap justify-between'>
        <div className='lg:w-[calc((100%-24px)/2)] w-full border-r-none lg:border-r border-grayColor-200 pr-0 lg:pr-6'>
          <BoardForm
            data={community.qna}
            title='문의사항'
            path='/community/qna'
            isLoading={isLoading.qna}
          />
        </div>
        <div className='lg:w-[calc((100%-24px)/2)] w-full'>
          <BoardForm
            data={community.notice}
            title='공지사항'
            path='/community/notice'
            isLoading={isLoading.notice}
          />
        </div>
      </div>

      <div className='border-t-none lg:border-t border-grayColor-200 pt-10 flex flex-col gap-10'>
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

        <BoardForm
          data={community.board}
          title='자유게시판'
          path='/community/board'
          isLoading={isLoading.board}
        />
      </div>
    </React.Fragment>
  );
};

export default Community;
