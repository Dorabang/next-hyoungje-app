import AutoHeightImageWrapper from '@/components/AutoHeightImageWrapper';
import mvDesktop from '@/assets/main_visual_pc.jpg';
import mvTablet from '@/assets/main_visual_tablet.jpg';
import mvMobile from '@/assets/main_visual_mobile.jpg';

const MainVisual = () => {
  return (
    <div className='border-b border-grayColor-200'>
      <AutoHeightImageWrapper
        src={mvDesktop}
        alt='산채인을 위한 산채품 전문 직거래 장터, 형제 난원'
        className='hidden xl:block'
        priority
      />

      <AutoHeightImageWrapper
        src={mvTablet}
        alt='산채인을 위한 산채품 전문 직거래 장터, 형제 난원'
        className='hidden md:block xl:hidden'
        priority
      />

      <AutoHeightImageWrapper
        src={mvMobile}
        alt='산채인을 위한 산채품 전문 직거래 장터, 형제 난원'
        className='block md:hidden'
        priority
      />
    </div>
  );
};

export default MainVisual;
