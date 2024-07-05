import React from 'react';

import { noto_serif_kr } from '@/components/NotoSerif';
import ContainerBox from '@/components/ContainerBox';
import Badge from '@/components/Youtube/Badge';
import SpecialChannelWrapper from '@/components/Youtube/SpecialChannelWrapper';
import GeneralChannelWrapper from '@/components/Youtube/GeneralChannelWrapper';

const YoutubePage = () => {
  return (
    <div className='bg-grayColor-500 h-full'>
      <ContainerBox>
        <SpecialChannelWrapper />
        <div className='flex flex-col gap-3 items-center'>
          <Badge variant='primary'>옥동 선정</Badge>
          <h2
            className={`${noto_serif_kr.className} text-white font-bold text-[32px] pb-6`}
          >
            한국춘란 유튜브 채널
          </h2>
          <p className='text-grayColor-300 pb-[72px]'>
            한국춘란 유튜브 채널은 계속해서 업데이트될 예정입니다.
          </p>
        </div>
        <GeneralChannelWrapper />
      </ContainerBox>
    </div>
  );
};

export default YoutubePage;
