'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { TfiArrowCircleRight } from 'react-icons/tfi';

import { noto_serif_kr } from '@/components/NotoSerif';
import { getChannelProfile } from '@/apis/youtube';
import { SpecialChannelData } from '../../type';
import VideoSlide from '../VideoSlide';
import Badge from '../../Badge';
import AutoHeightImageWrapper from '@/components/AutoHeightImageWrapper';

const SpecialChannel = ({ data }: { data: SpecialChannelData }) => {
  const [profile, setProfile] = useState<string | null>(null);

  useEffect(() => {
    if (profile === null && data) {
      (async () => {
        const profileURL = await getChannelProfile(data.profile);
        setProfile(profileURL);
      })();
    }
  }, [profile, data]);

  return (
    <div className='flex flex-col gap-8 md:gap-16 min-h-[600px] bg-white rounded-xl mt-[30px] mb-[90px] md:mt-[80px] md:mb-[120px] px-5 py-4 md:px-10 md:py-8'>
      <div className='flex justify-between items-center flex-col gap-5 md:gap-0 md:flex-row'>
        <div className='flex flex-col gap-4 items-center md:items-start'>
          <div className='flex flex-col items-center md:items-start'>
            <Badge variant='lime'>옥동 추천 채널</Badge>
            <h2
              className={`${noto_serif_kr.className} text-[32px] md:text-[64px] font-bold`}
            >
              {data.name}
            </h2>
          </div>
          <div className='text-grayColor-400 text-center md:text-left'>
            {data.summary.split('\n').map((strings) => (
              <p key={strings}>{strings}</p>
            ))}
          </div>
        </div>

        <Link
          href={data.url}
          target='_blank'
          className='flex items-center gap-8'
        >
          <div className='flex flex-row md:flex-col items-end gap-2 text-grayColor-400 font-medium'>
            채널 바로가기
            <TfiArrowCircleRight />
          </div>
          <div className='border border-grayColor-200 overflow-hidden rounded-full w-[72px] h-[72px] relative'>
            {profile !== null ? (
              <AutoHeightImageWrapper
                src={profile}
                alt={`${data.name} 채널 프로필 이미지`}
              />
            ) : (
              <div className='bg-grayColor-200 animate-pulse' />
            )}
          </div>
        </Link>
      </div>
      <div className='rounded-xl border border-grayColor-200 px-5 py-4 md:px-10 md:py-8'>
        <h4 className='font-medium'>최근 업로드된 영상</h4>
        <div className='flex flex-wrap gap-5 pt-3'>
          <VideoSlide id={data.id} />
        </div>
      </div>
    </div>
  );
};

export default SpecialChannel;
