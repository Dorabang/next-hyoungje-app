import { getNextPost, getPrevPost } from '@/apis/posts';
import { DocumentData } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

interface PrevNextPostProps {
  pathname: string;
  post: DocumentData;
}

const PrevNextPost = ({ pathname, post }: PrevNextPostProps) => {
  const [prevPost, setPrevPosts] = useState<DocumentData | null | undefined>(
    null,
  );
  const [nextPost, setNextPosts] = useState<DocumentData | null | undefined>(
    null,
  );

  useEffect(() => {
    const getPrevNext = async () => {
      const prev = await getPrevPost(pathname, post.num);
      setPrevPosts(prev);
      const next = await getNextPost(pathname, post.num);
      setNextPosts(next);
    };
    getPrevNext();
  }, [pathname, post.num]);

  return (
    <>
      {(prevPost || nextPost) && (
        <div className='mt-10 flex justify-between items-start border-t border-t-grayColor-400 pt-5'>
          <div>
            {prevPost && (
              <Link
                href={`/${pathname}/${prevPost.id}`}
                className='text-left flex gap-1 justify-start items-center text-sm transition-colors text-grayColor-300 hover:text-grayColor-400 active:text-grayColor-400'
              >
                <AiOutlineLeft size={20} />
                <p>
                  이전 글 ・{' '}
                  {prevPost.title.length > 7
                    ? prevPost.title.substr(0, 7) + '...'
                    : prevPost.title}
                </p>
              </Link>
            )}
          </div>
          <div>
            {nextPost && (
              <Link
                href={`/${pathname}/${nextPost.id}`}
                className='text-right flex gap-1 justify-end items-center text-sm transition-colors text-grayColor-300 hover:text-grayColor-400 active:text-grayColor-400'
              >
                <p>
                  {nextPost.title.length > 7
                    ? nextPost.title.substr(0, 7) + '...'
                    : nextPost.title}{' '}
                  ・ 다음 글
                </p>
                <AiOutlineRight size={20} />
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PrevNextPost;
