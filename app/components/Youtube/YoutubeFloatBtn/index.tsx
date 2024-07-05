import React from 'react';
import Link from 'next/link';
import { AiFillYoutube } from 'react-icons/ai';

import Tooltip from '@/components/Youtube/YoutubeFloatBtn/Tooltip';
import './index.css';

const YoutubeFloatBtn = () => {
  return (
    <>
      <Link href='/youtube' className='youtubeFloatBtn group'>
        <Tooltip desc='한국춘란 채널'>
          <AiFillYoutube
            size={28}
            className='inline-block text-center text-sm text-white group-hover:text-primary group-active:text-primary'
          />
        </Tooltip>
      </Link>
    </>
  );
};

export default YoutubeFloatBtn;
