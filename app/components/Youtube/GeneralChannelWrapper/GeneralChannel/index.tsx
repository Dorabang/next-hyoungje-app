'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BsArrowUpRight } from 'react-icons/bs';

import { YoutubeChannelData } from '../../type';
import { getChannelProfile } from '@/apis/youtube';
import AutoHeightImageWrapper from '@/components/AutoHeightImageWrapper';

const GeneralChannel = ({ data }: { data: YoutubeChannelData }) => {
  const [profile, setProfile] = useState<string | null>(null);

  useEffect(() => {
    if (profile === null) {
      (async () => {
        const profileURL = await getChannelProfile(data.profile);
        setProfile(profileURL);
      })();
    }
  }, [profile, data.profile]);

  return (
    <Link
      target='_blank'
      href={data.url}
      className='min-h-[200px] flex flex-col gap-8 bg-white rounded-md px-5 py-4 w-[calc((100%-20px)/2)] md:w-[calc((100%-40px)/3)] xl:w-[calc((100%-80px)/5)]'
    >
      <div className='flex justify-between'>
        <div className='w-16 h-16 rounded-full overflow-hidden relative'>
          {profile !== null ? (
            <AutoHeightImageWrapper
              alt={`${data.name} 프로필 이미지`}
              src={profile}
            />
          ) : (
            <div className='w-full h-full bg-grayColor-200 animate-pulse' />
          )}
        </div>
        <div>
          <BsArrowUpRight className='text-grayColor-300 group-hover:text-grayColor-500 group-active:text-grayColor-500 transition-colors' />
        </div>
      </div>

      <div className='flex flex-col gap-3 cursor-default'>
        <h4 className=''>{data.name}</h4>
        <p className={`text-grayColor-400 text-xs`}>
          {data.summary.length > 45
            ? data.summary.slice(0, 45) + '...'
            : data.summary === ''
              ? '-'
              : data.summary}
        </p>
      </div>
    </Link>
  );
};

export default GeneralChannel;
