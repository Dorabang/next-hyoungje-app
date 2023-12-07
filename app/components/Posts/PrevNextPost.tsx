import getPosts from '@/utils/getPosts';
import { DocumentData } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

interface PrevNextPostProps {
  pathname: string;
  post: DocumentData;
}

const PrevNextPost = ({ pathname, post }: PrevNextPostProps) => {
  const [posts, setPosts] = useState<DocumentData[] | null>(null);
  const [prevPost, setPrevPosts] = useState<DocumentData | null | undefined>(
    null
  );
  const [nextPost, setNextPosts] = useState<DocumentData | null | undefined>(
    null
  );

  useEffect(() => {
    if (posts === null) {
      getPosts(pathname).then((response) => setPosts(response));
    }
  }, [pathname, posts]);

  useEffect(() => {
    if (!post || posts === null) {
      const postIdx = posts && posts.findIndex((item) => item.id === post.id);

      if (!prevPost && postIdx !== 0 && postIdx !== null) {
        const prev = posts && posts.find((item, idx) => idx === postIdx - 1);
        setPrevPosts(prev);
      }

      if (
        !nextPost &&
        postIdx !== posts &&
        posts &&
        posts.length - 1 &&
        postIdx !== null
      ) {
        const next = posts.find((item, idx) => idx === postIdx + 1);
        setNextPosts(next);
      }
    }
    return;
  }, [post, posts, prevPost, nextPost]);

  return (
    <>
      {(prevPost || nextPost) && (
        <div className='mt-10 flex justify-between items-start border-t border-t-grayColor-400 pt-5'>
          <div>
            {prevPost && (
              <Link
                href={`/${pathname}/${prevPost.id}`}
                className='text-left flex flex-col justify-start items-start'
              >
                <AiOutlineLeft size={24} />
                <p className='mt-2 text-sm'>{prevPost.title}</p>
              </Link>
            )}
          </div>
          <div>
            {nextPost && (
              <Link
                href={`/${pathname}/${nextPost.id}`}
                className='text-right flex flex-col justify-end items-end'
              >
                <AiOutlineRight size={24} />
                <p className='mt-2 text-sm'>{nextPost.title}</p>
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PrevNextPost;
