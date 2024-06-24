import Community from '@/components/Community';
import ContainerBox from '@/components/ContainerBox';
import MainCommunity from '@/components/Main/MainCommunity';
import MainSlide from '@/components/Main/MainSlide';
import MainVisual from '@/components/Main/MainVisual';
import { noto_serif_kr } from '@/components/NotoSerif';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <MainVisual />

      <ContainerBox className='flex flex-col gap-20 xl:gap-[150px] py-5 xl:py-20'>
        <MainSlide
          path='wild-market1'
          title='산채품 장터'
          subTitle='현재 판매 중인 산채품'
          variant='center'
        />
        <MainSlide
          path='general-market'
          title='일반 장터'
          subTitle='현재 판매 중인 집채품'
          variant='left'
        />
      </ContainerBox>
      <div className='border-t border-grayColor-200 mt-20 lg:mt-36 pt-10'>
        <ContainerBox className='flex flex-col gap-20 py-5 xl:py-20'>
          <div className='w-full text-center'>
            <p className='text-grayColor-400 text-lg'>산채품 정보 공유</p>
            <h3>
              <Link
                href='/community'
                className={`${noto_serif_kr.className} inline-block text-3xl font-semibold md:text-4xl md:tracking-tight mt-2 mb-5 hover:underline active:underline`}
              >
                커뮤니티
              </Link>
            </h3>
          </div>
          <div className='flex flex-col gap-20 xl:gap-[150px]'>
            <MainSlide
              path='wild-catch'
              title='산채기'
              subTitle='산채품 기록 커뮤니티'
              variant='center'
              community
            />
            <MainSlide
              path='boast'
              title='난자랑'
              subTitle='산채품·집채품 자랑 커뮤니티'
              variant='left'
              community
            />
          </div>
        </ContainerBox>
      </div>
    </main>
  );
}
