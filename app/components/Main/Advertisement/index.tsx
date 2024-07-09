import React from 'react';
import { AdData } from './AdData';
import AdItem from './AdItem';

const Advertisement = () => {
  return (
    <ul className='flex justify-center items-center gap-4'>
      {AdData.map((ad) => (
        <AdItem key={ad.name} data={ad} />
      ))}
    </ul>
  );
};

export default Advertisement;
