import AutoHeightImageWrapper from '@/components/AutoHeightImageWrapper';
import youtubeBannerPC from '@/assets/banner/youtube/banner_youtube_pc.jpg';
import youtubeBannerTablet from '@/assets/banner/youtube/banner_youtube_tablet.jpg';
import youtubeBannerMobile from '@/assets/banner/youtube/banner_youtube_mobile.jpg';
import ContainerBox from '../ContainerBox';
import Link from 'next/link';

const YoutubeBanner = () => {
  return (
    <ContainerBox>
      <Link href='/youtube'>
        <AutoHeightImageWrapper
          src={youtubeBannerPC.src}
          alt='한국춘란 유튜브 채널 모아보기'
          className='hidden xl:block'
          priority
        />

        <AutoHeightImageWrapper
          src={youtubeBannerTablet.src}
          alt='한국춘란 유튜브 채널 모아보기'
          className='hidden md:block xl:hidden'
          priority
        />

        <AutoHeightImageWrapper
          src={youtubeBannerMobile.src}
          alt='한국춘란 유튜브 채널 모아보기'
          className='block md:hidden'
          priority
        />
      </Link>
    </ContainerBox>
  );
};

export default YoutubeBanner;
