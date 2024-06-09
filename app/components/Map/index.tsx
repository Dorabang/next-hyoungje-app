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
  const location = { lat: 35.11928, lng: 128.1701 };
  return (
    <Map
      center={location}
      level={5}
      className='w-full h-[400px] rounded-lg overflow-hidden border border-gray-300'
    >
      <MapMarker position={location} />

      <CustomOverlayMap position={location} yAnchor={1}>
        <div className='customOverlay border border-grayColor-200 rounded-lg bg-white px-5 py-2 relative bottom-14'>
          <div className='w-[80px] mx-auto py-2'>
            <AutoHeightImageWrapper src={Logo.src} alt='옥동 로고 이미지' />
          </div>

          <div className='flex gap-3'>
            <Link
              href={`https://map.kakao.com/link/map/옥동,${location.lat},${location.lng}`}
              className='text-blue-500 hover:text-blue-700 active:text-blue-700 transition-colors'
              target='_blank'
              rel='noreferrer'
            >
              자세히 보기
            </Link>
            <Link
              href={`https://map.kakao.com/link/to/옥동,${location.lat},${location.lng}`}
              className='text-blue-500 hover:text-blue-700 active:text-blue-700 transition-colors'
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
