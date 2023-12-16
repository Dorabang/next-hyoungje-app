import Link from 'next/link';
import { noto_serif_kr } from '../../NotoSerif';
import Slide from './Slide';

const MainSlide = () => {
  return (
    <div className='relative flex justify-between flex-wrap pt-5 xl:pt-[50px]'>
      <div className='w-full xl:w-[25%] mx-3 xl:mx-0'>
        <p className='text-grayColor-400 text-lg'>현재 판매 중인 산채품</p>
        <h2
          className={`${noto_serif_kr.className} text-3xl font-semibold md:text-4xl md:tracking-tight pt-1 pb-5`}
        >
          산채품 장터
        </h2>
      </div>

      <div className='w-full mx-3 xl:mx-0 xl:w-[75%] overflow-hidden'>
        <Slide pathname='wild-market1' />
      </div>

      <Link
        href={'/wild-market1'}
        className='inline-block px-10 py-[10px]
          border border-grayColor-500
          hover:text-white
          hover:bg-grayColor-500
          active:bg-grayColor-400 active:border-grayColor-400 active:text-white
          transition-colors
          static xl:absolute xl:left-0 xl:top-[250px]
          mt-[50px] mx-auto xl:m-0
          '
      >
        더보기
      </Link>
    </div>
  );
};

export default MainSlide;
