'use client';
import { MdDoNotDisturbAlt } from 'react-icons/md';
import { Fragment, useState } from 'react';

import { useGeneralChannel } from '@/hooks/queries/useYoutube';
import GeneralChannel from './GeneralChannel';
import Skeleton from './Skeleton';
import Order from './Order';

export type OrderType = 'latest' | 'text';

const GeneralChannelWrapper = () => {
  const [order, setOrder] = useState<OrderType>('text');
  const { data, isLoading } = useGeneralChannel(order);

  if (isLoading)
    return (
      <div className='flex flex-wrap gap-5 py-10'>
        {Array.from(Array(8)).map((_, idx) => (
          <Skeleton key={idx} />
        ))}
      </div>
    );

  return (
    <Fragment>
      <Order order={order} setOrder={(value) => setOrder(value)} />
      <div className='flex flex-wrap gap-5'>
        {data && data.length > 0 ? (
          data.map((channel) => (
            <GeneralChannel data={channel} key={channel.id} />
          ))
        ) : (
          <div className='text-grayColor-200 flex justify-center gap-4 flex-col items-center w-full font-medium text-xl py-10'>
            <MdDoNotDisturbAlt size={48} className='text-primary' />
            <p className='text-center'>
              유튜브 채널을 찾을 수 없습니다.
              <br />
              다시 시도해주세요.
            </p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default GeneralChannelWrapper;
