'use client';
import Link from 'next/link';

import Badge from '@/components/Youtube/Badge';

export interface NotificationData {
  id: string;
  title: string;
  contents: string;
  image?: string;
  creatorId: string;
  createdAt: string;
}

const Notification = ({ data }: { data: NotificationData }) => {
  const { id, title, createdAt } = data;

  return (
    <Link href={`/community/notice/${id}`} className='inline-block w-full'>
      <h3>
        <Badge variant='primary'>전체 공지</Badge>{' '}
        <span className='pl-2 pr-5'>{title}</span>
        <span className='text-sm text-grayColor-300'>
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </h3>
    </Link>
  );
};

export default Notification;
