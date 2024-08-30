'use client';
import { useState, Fragment, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

// import { addComments, deleteComments, updateComments } from '@/apis/comments';
import { useComments } from '@/hooks/queries/useComments';
import { getUser } from '@/apis/users';
import InputComment from './InputComment';
import Loading from '../Loading';
import { User, authState } from '@/recoil/atoms';
import PaginationComponets from '../PaginationComponent';
import { createComment, deleteComment, updateComment } from '@/apis/comments';

export interface Comment {
  id: number;
  userId: number;
  content: string;
  postId: number;
  createdAt: string;
  updatedAt: string;
  user: {
    displayName: string;
  };
}

const Comments = ({ postId }: { postId: number }) => {
  const [addComment, setAddComment] = useState('');
  const [isModify, setIsModify] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [page, setPage] = useState(1);

  const auth = useRecoilValue(authState);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (auth) {
      (async () => {
        const user = await getUser();
        setUser(user ?? null);
      })();
    }
  }, [auth]);

  const { data, isSuccess, refetch } = useComments(postId, page);

  const handleAddComment = async () => {
    if (!user) return window.alert('로그인 후 사용 가능한 기능입니다.');

    const res = await createComment(postId, addComment);
    if (res.result === 'SUCCESS') {
      setAddComment('');
      refetch();
    } else {
      alert(
        '문제가 발생하여 댓글 생성이 실패하였습니다. 다시 시도해주세요. \n\r지속적으로 문제 발생 시 관리자에 문의 부탁드립니다.',
      );
    }
  };

  const hadleUpdateComment = async (commentId: number) => {
    await updateComment(commentId, editValue);
    setIsModify(null);
    refetch();
  };

  const handleDeleteComment = async (commentId: number) => {
    const ok = window.confirm('댓글을 삭제하시겠습니까?');

    if (ok) {
      const res = await deleteComment(commentId);

      res.result === 'SUCCESS' && refetch();
    }
  };

  if (!isSuccess) return <Loading />;

  return (
    <Fragment>
      {user && (
        <InputComment
          placeholder='댓글을 입력해주세요'
          onSubmit={handleAddComment}
          value={addComment}
          onChange={(e) => setAddComment(e.target.value)}
        />
      )}
      <ul className='w-full pt-5'>
        {data.data?.map(
          ({ id, content, createdAt, updatedAt, user: author, userId }) => (
            <li
              key={id}
              className='w-full border-b border-grayColor-100 px-5 py-3'
            >
              <div className='text-grayColor-400 flex flex-col gap-1'>
                <div className='flex justify-between '>
                  <p className='text-sm'>
                    {author.displayName}
                    <span className='pl-2 text-grayColor-300'>
                      - {new Date(createdAt).toLocaleDateString()}
                    </span>
                  </p>
                  {(userId === user?.id || user?.isAdmin) && (
                    <div className='flex gap-1 text-sm'>
                      {isModify === id ? (
                        <span
                          onClick={() => hadleUpdateComment(id)}
                          className='cursor-pointer hover:text-grayColor-500'
                        >
                          수정하기
                        </span>
                      ) : (
                        <span
                          onClick={() => setIsModify(id)}
                          className='cursor-pointer hover:text-grayColor-500'
                        >
                          수정
                        </span>
                      )}
                      <span>/</span>
                      <span
                        onClick={() => handleDeleteComment(id)}
                        className='cursor-pointer hover:text-grayColor-500'
                      >
                        삭제
                      </span>
                    </div>
                  )}
                </div>
                {isModify !== id ? (
                  <p>
                    {content}
                    {createdAt.substring(0, 19) !==
                      updatedAt.substring(0, 19) && (
                      <span className='text-grayColor-300 pl-1 text-sm'>
                        {'(편집됨)'}
                      </span>
                    )}
                  </p>
                ) : (
                  <textarea
                    value={editValue !== '' ? editValue : content}
                    onChange={(e) => setEditValue(e.target.value)}
                    className={`border border-grayColor-100 rounded-lg active:border-grayColor-200 focus:border-grayColor-200
        transition-colors text-grayColor-500 focus:outline-none
        h-24 w-full px-3 py-2 resize-none
         `}
                  />
                )}
              </div>
            </li>
          ),
        )}
      </ul>
      {data.totalResult > 0 && (
        <PaginationComponets
          page={page}
          setPage={(page) => setPage(page)}
          totalPages={data.totalPages}
        />
      )}
    </Fragment>
  );
};

export default Comments;
