import ContainerBox from '@/components/ContainerBox';
import mvDesktop from '@/assets/main_visual_pc.jpg';
import mvTablet from '@/assets/main_visual_tablet.jpg';
import mvMobile from '@/assets/main_visual_mobile.jpg';
import MainSlide1 from '@/components/MainSlide1';
import AutoHeightImageWrapper from '@/components/AutoHeightImageWrapper';

export default function Home() {
  return (
    <main>
      <div className='border-b border-grayColor-200'>
        <AutoHeightImageWrapper
          src={mvDesktop}
          alt='산채인을 위한 산채품 전문 직거래 장터, 형제 난원'
          className='hidden lg:block'
          priority
        />

        <AutoHeightImageWrapper
          src={mvTablet}
          alt='산채인을 위한 산채품 전문 직거래 장터, 형제 난원'
          className='hidden sm:block lg:hidden'
          priority
        />

        <AutoHeightImageWrapper
          src={mvMobile}
          alt='산채인을 위한 산채품 전문 직거래 장터, 형제 난원'
          className='block sm:hidden'
          priority
        />
      </div>
      <ContainerBox>
        <MainSlide1 />
      </ContainerBox>
      <ContainerBox>Slider 2</ContainerBox>
      <ContainerBox>Slider 3</ContainerBox>
    </main>
  );
}
