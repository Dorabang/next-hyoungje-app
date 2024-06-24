import ContainerBox from '@/components/ContainerBox';
import MainSlide from '@/components/Main/MainSlide';
import MainVisual from '@/components/Main/MainVisual';
import YoutubeBanner from '@/components/Main/YoutubeBanner';

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
      <YoutubeBanner />
      <ContainerBox className='flex flex-col gap-20 py-5'>
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
    </main>
  );
}
