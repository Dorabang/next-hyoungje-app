import Link from 'next/link';
import { noto_serif_kr } from '../../common/NotoSerif';
import Slide from './Slide';

interface MainSlideProps {
  path: string;
  title: string;
  subTitle: string;
  variant?: 'left' | 'center';
  slidesPerView?: number;
  speed?: number;
  community?: boolean;
}

const MainSlide = ({
  path,
  title,
  subTitle,
  variant = 'left',
  slidesPerView = 2,
  speed = 1200,
  community = false,
}: MainSlideProps) => {
  return (
    <div className='relative w-full flex justify-between flex-wrap'>
      <div
        className={`w-full text-center ${
          variant === 'left' ? 'xl:w-[25%] mx-3 xl:mx-0 xl:text-left' : ''
        }
        ${variant === 'center' ? 'xl:pb-5' : ''}
        `}
      >
        <p className='text-grayColor-400 text-lg'>{subTitle}</p>
        <h3>
          <Link
            href={community ? `/community/${path}` : `/${path}`}
            className={`${noto_serif_kr.className} inline-block text-3xl font-semibold md:text-4xl md:tracking-tight mt-2 mb-5 hover:underline active:underline`}
          >
            {title}
          </Link>
        </h3>
      </div>

      <div
        className={`w-full mx-3 xl:mx-0 overflow-hidden
          ${variant === 'left' ? 'xl:w-[75%]' : ''}
          ${variant === 'center' ? 'text-center' : ''}
        `}
      >
        <Slide
          pathname={path}
          slidesPerView={slidesPerView}
          speed={speed}
          community={community}
        />
      </div>

      <Link
        href={community ? `/community/${path}` : `/${path}`}
        className={`inline-block px-10 py-[10px] mx-auto mt-10
          border border-grayColor-500
          hover:text-white
          hover:bg-grayColor-500
          active:bg-grayColor-400 active:border-grayColor-400 active:text-white
          transition-colors
          ${
            variant === 'left'
              ? 'static xl:absolute xl:left-0 xl:top-[200px] mx-auto xl:m-0'
              : ''
          }
          `}
      >
        더보기
      </Link>
    </div>
  );
};

export default MainSlide;
