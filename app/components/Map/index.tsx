'use client';

import Link from 'next/link';
import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import './style.css';
import Logo from '@/assets/common/logo.png';
import AutoHeightImageWrapper from '../AutoHeightImageWrapper';

declare global {
  interface Window {
    kakao: any;
  }
}

const Maps = () => {
  return (
    <Map
      center={{ lat: 35.11928, lng: 128.1701 }}
      level={5}
      className='w-full h-[400px] rounded-lg overflow-hidden border border-gray-300'
    >
      <MapMarker position={{ lat: 35.11928, lng: 128.1701 }} />

      <CustomOverlayMap position={{ lat: 35.11928, lng: 128.1701 }} yAnchor={1}>
        <div className='customOverlay border border-grayColor-200 rounded-lg bg-white px-3 py-2 relative bottom-14'>
          <div className='px-6 py-2'>
            <AutoHeightImageWrapper src={Logo.src} alt='옥동 로고 이미지' />
          </div>
          <div className='flex gap-3'>
            <Link
              href='https://map.kakao.com/link/map/옥동,35.11928,128.1701'
              className='text-blue-500'
              target='_blank'
              rel='noreferrer'
            >
              자세히 보기
            </Link>
            <Link
              href='https://map.kakao.com/link/to/옥동,35.11928,128.1701'
              className='text-blue-500'
              target='_blank'
              rel='noreferrer'
            >
              길찾기
            </Link>
          </div>
        </div>
      </CustomOverlayMap>
    </Map>
  );
};

export default Maps;
