'use client';
import { useSpecialChannel } from '@/hooks/queries/useYoutube';
import React from 'react';
import SpecialChannel from './SpecialChannel';
import Skeleton from './Skeleton';

const SpecialChannelWrapper = () => {
  const { data, isLoading } = useSpecialChannel();

  if (isLoading) return <Skeleton />;

  return (
    <div>
      {data && data.length > 0
        ? data?.map((channel) => (
            <SpecialChannel key={channel.id} data={channel} />
          ))
        : null}
    </div>
  );
};

export default SpecialChannelWrapper;
