'use client';
import React from 'react';

import { useSpecialChannel } from '@/hooks/queries/useYoutube';
import SpecialChannel from './SpecialChannel';
import Skeleton from './Skeleton';
import { YoutubeChannelDataType } from '../type';

const SpecialChannelWrapper = () => {
  const { data, isLoading } = useSpecialChannel();

  if (isLoading) return <Skeleton />;

  return (
    <div>
      {data && data.length > 0
        ? data?.map((channel: YoutubeChannelDataType) => (
            <SpecialChannel key={channel.id} data={channel} />
          ))
        : null}
    </div>
  );
};

export default SpecialChannelWrapper;
