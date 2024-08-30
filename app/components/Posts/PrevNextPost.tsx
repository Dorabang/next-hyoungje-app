import Link from 'next/link';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import { allRoutes } from '@/constant/Routes';

export interface PrevNextPostData {
  title: string;
  postId: number;
}

interface PrevNextPostProps {
  pathname: string;
  prev: PrevNextPostData | null;
  next: PrevNextPostData | null;
}

const PrevNextPost = ({ pathname, prev, next }: PrevNextPostProps) => {
  const includesCommunity = allRoutes
    .filter((r) => r.link.includes('community'))
    .filter((r) => r.link.includes(pathname));

  return (
    <>
      {(prev || next) && (
        <div className='mt-10 flex justify-between items-start border-t border-t-grayColor-400 pt-5'>
          <div>
            {prev && (
              <Link
                href={
                  includesCommunity.length > 0
                    ? `/community/${pathname}/${prev.postId}`
                    : `/${pathname}/${prev.postId}`
                }
                className='text-left flex gap-1 justify-start items-center text-sm transition-colors text-grayColor-300 hover:text-grayColor-400 active:text-grayColor-400'
              >
                <AiOutlineLeft size={20} />
                <p>
                  이전 글 ・{' '}
                  {prev?.title.length > 7
                    ? prev?.title.substr(0, 7) + '...'
                    : prev.title}
                </p>
              </Link>
            )}
          </div>
          <div>
            {next && (
              <Link
                href={
                  includesCommunity.length > 0
                    ? `/community/${pathname}/${next.postId}`
                    : `/${pathname}/${next.postId}`
                }
                className='text-right flex gap-1 justify-end items-center text-sm transition-colors text-grayColor-300 hover:text-grayColor-400 active:text-grayColor-400'
              >
                <p>
                  {next.title.length > 7
                    ? next.title.substr(0, 7) + '...'
                    : next.title}{' '}
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
