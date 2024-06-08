import { addComments, deleteComments, updateComments } from '@/apis/comments';
import { User } from 'firebase/auth';
import { useState, Fragment } from 'react';
import InputComment from './InputComment';
import { useGetComments } from '@/hooks/queries/useComments';
import Loading from '../Loading';

export interface CommentsType {
  id: string;
  comment: string;
  createdAt: string;
  userId: string;
  nickname: string;
  updatedAt?: string;
}

const Comments = ({
  user,
  pathname,
}: {
  user: User | null;
  pathname: string;
}) => {
  const [addComment, setAddComment] = useState('');
  const [isModify, setIsModify] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const { data, isLoading, refetch } = useGetComments(pathname);

  const handleAddComment = async () => {
    if (!user) return window.alert('로그인 후 사용 가능한 기능입니다.');
    await addComments(`${pathname}`, {
      userId: user.uid,
      comment: addComment,
    });
    setAddComment('');
    refetch();
  };

  const hadleUpdateComment = async (id: string) => {
    const updateData = { comment: editValue, updatedAt: Date.now() };
    await updateComments(pathname, updateData, id);
    setIsModify(null);
    refetch();
  };

  const handleDeleteComment = async (id: string) => {
    const ok = window.confirm('댓글을 삭제하시겠습니까?');

    if (ok) {
      await deleteComments(pathname, id);
      refetch();
    }
  };

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
        {isLoading ? (
          <Loading />
        ) : (
          data?.map(
            ({ id, comment, createdAt, updatedAt, nickname, userId }) => (
              <li
                key={id}
                className='w-full border-b border-grayColor-100 px-5 py-3'
              >
                <div className='text-grayColor-400 flex flex-col gap-1'>
                  <div className='flex justify-between '>
                    <p className='text-sm'>
                      {nickname}
                      <span className='pl-2 text-grayColor-300'>
                        - {new Date(createdAt).toLocaleDateString()}
                      </span>
                    </p>
                    {userId === user?.uid && (
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
                      {comment}
                      {updatedAt && (
                        <span className='text-grayColor-300 pl-1 text-sm'>
                          {'(편집됨)'}
                        </span>
                      )}
                    </p>
                  ) : (
                    <textarea
                      value={editValue !== '' ? editValue : comment}
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
          )
        )}
      </ul>
    </Fragment>
  );
};

export default Comments;
