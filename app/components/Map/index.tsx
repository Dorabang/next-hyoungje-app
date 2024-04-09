'use client';

import { Map, MapMarker } from 'react-kakao-maps-sdk';

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
      <MapMarker position={{ lat: 35.11928, lng: 128.1701 }}></MapMarker>
    </Map>
  );
};

export default Maps;
