import Link from 'next/link';
import { noto_serif_kr } from '../../NotoSerif';
import Slide from './Slide';

interface MainSlideProps {
  path: string;
  title: string;
  subTitle: string;
  variant?: 'left' | 'center';
  slidesPerView?: number;
  speed?: number;
}

const MainSlide = ({
  path,
  title,
  subTitle,
  variant = 'left',
  slidesPerView = 2,
  speed = 1200,
}: MainSlideProps) => {
  return (
    <div className='relative w-full flex justify-between flex-wrap'>
      <div
        className={`w-full text-center ${
          variant === 'left' ? 'xl:w-[25%] mx-3 xl:mx-0 xl:text-left' : 'pb-5'
        }`}
      >
        <p className='text-grayColor-400 text-lg'>{subTitle}</p>
        <h2
          className={`${noto_serif_kr.className} text-3xl font-semibold md:text-4xl md:tracking-tight pt-1 pb-5`}
        >
          {title}
        </h2>
      </div>

      <div
        className={`w-full mx-3 xl:mx-0 overflow-hidden ${
          variant === 'left' ? 'xl:w-[75%]' : 'text-center'
        }`}
      >
        <Slide pathname={path} slidesPerView={slidesPerView} speed={speed} />
      </div>

      <Link
        href={`/${path}`}
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
