import React from 'react';
import Link from 'next/link';

import { AdDataType } from './AdData';
import AutoHeightImageWrapper from '@/components/common/Wrapper/AutoHeightImageWrapper';

const AdItem = ({ data: { name, logo, link } }: { data: AdDataType }) => {
  return (
    <li className='w-[calc((100%-16px)/2)] md:w-[calc((100%-32px)/3)] lg:w-[calc((100%-48px)/4)] border border-grayColor-200 hover:border-grayColor-300 transition-colors'>
      <Link href={link}>
        <div className='w-full max-h-[96px] min-h-[60px] relative'>
          <AutoHeightImageWrapper src={logo} alt={`${name} 로고 이미지`} />
        </div>
      </Link>
    </li>
  );
};

export default AdItem;
