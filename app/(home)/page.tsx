import ContainerBox from '@/components/ContainerBox';
import Image from 'next/image';
import mvDesktop from '@/assets/main_visual_pc.jpg';
import mvTablet from '@/assets/main_visual_tablet.jpg';
import mvMobile from '@/assets/main_visual_mobile.jpg';
import MainSlide1 from '@/components/MainSlide1';

export default function Home() {
  return (
    <main>
      <div className='border-b border-grayColor-200'>
        <Image
          src={mvDesktop}
          alt='산채인을 위한 산채품 전문 직거래 장터, 형제 난원'
          className='hidden lg:block w-full'
          priority
        />
        <Image
          src={mvTablet}
          alt='산채인을 위한 산채품 전문 직거래 장터, 형제 난원'
          className='hidden sm:block lg:hidden w-full'
          priority
        />
        <Image
          src={mvMobile}
          alt='산채인을 위한 산채품 전문 직거래 장터, 형제 난원'
          className='block sm:hidden w-full'
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
