import Community from '@/components/Community';
import ContainerBox from '@/components/ContainerBox';
import MainSlide from '@/components/Main/MainSlide';
import MainVisual from '@/components/Main/MainVisual';

export default function Home() {
  return (
    <main>
      <MainVisual />

      <ContainerBox>
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

        <div className='border-t border-grayColor-200 mt-20 lg:mt-36'>
          <Community />
        </div>
      </ContainerBox>
    </main>
  );
}
