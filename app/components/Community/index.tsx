'use client';

import getPosts from '@/utils/getPosts';
import { DocumentData } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import BoardForm from './BoardForm';

const Community = () => {
  const [board, setBoard] = useState<DocumentData[] | null>(null);
  const [notice, setNotice] = useState<DocumentData[] | null>(null);
  const [boast, setBoast] = useState<DocumentData[] | null>(null);
  const [qna, setQna] = useState<DocumentData[] | null>(null);

  useEffect(() => {
    getPosts('board').then((posts) => setBoard(posts));
  }, []);

  useEffect(() => {
    getPosts('notice').then((posts) => setNotice(posts));
  }, []);

  useEffect(() => {
    getPosts('boast').then((posts) => setBoast(posts));
  }, []);

  useEffect(() => {
    getPosts('qna').then((posts) => setQna(posts));
  }, []);

  return (
    <React.Fragment>
      <div className='flex gap-6'>
        <div className='w-1/2 border-r border-grayColor-200 pr-6'>
          {qna && (
            <BoardForm data={qna} title='문의사항' path='/community/qna' />
          )}
        </div>
        <div className='w-1/2'>
          {notice && (
            <BoardForm
              data={notice}
              title='공지사항'
              path='/community/notice'
            />
          )}
        </div>
      </div>

      <div className=''>
        {board && (
          <BoardForm data={board} title='자유게시판' path='/community/board' />
        )}
      </div>

      <div className=''>
        {boast && (
          <BoardForm data={boast} title='난자랑' path='/community/boast' />
        )}
      </div>
    </React.Fragment>
  );
};

export default Community;
