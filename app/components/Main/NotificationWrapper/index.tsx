'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import './index.css';
import Notification, { NotificationData } from './Notification';
import { getNoticeModal } from '@/apis/notice';
import { getCookie, setCookie } from '@/utils/cookieStore';
import { Container } from '@mui/material';

const NotificationWrapper = () => {
  const [notice, setNotice] = useState<NotificationData[] | null>(null);
  const [view, setView] = useState(true);

  const handleClickBlockNotification = async () => {
    await setCookie('block_notification', 'true', {
      maxAge: 24 * 60 * 60,
    });
    setView(false);
  };

  // DB에 저장되어 있는 전체 공지 불러오기
  useEffect(() => {
    (async () => {
      const data = await getNoticeModal();
      setNotice(data);
    })();
  }, []);

  // 하루동안 보지 않기 기능
  useEffect(() => {
    (async () => {
      const view = await getCookie('block_notification');
      if (view) {
        setView(false);
      }
    })();
  }, []);

  if (notice === null)
    return <div className='bg-grayColor-500 w-full h-11 text-grayColor-300' />;

  if (notice.length === 0 || !view) return;

  return (
    <div className='noticeWrapper'>
      <Container
        maxWidth='xl'
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '4px 0',
          gap: '20px',
        }}
      >
        <Swiper
          direction={'vertical'}
          speed={1500}
          loop={notice === null || notice.length <= 1 ? false : true}
          autoplay={
            notice === null || notice.length <= 1
              ? false
              : {
                  delay: 3000,
                  disableOnInteraction: false,
                }
          }
          modules={[Autoplay]}
          className='h-full flex-grow'
        >
          {notice.map((notice) => {
            return (
              <SwiperSlide key={notice.id} className='flex items-center'>
                <Notification data={notice} />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className='flex items-center gap-2 text-sm'>
          <span
            onClick={handleClickBlockNotification}
            className='cursor-pointer p-2 hover:text-grayColor-200'
          >
            오늘 하루 보지 않기
          </span>
          <span
            onClick={() => setView(false)}
            className='cursor-pointer p-2 hover:text-grayColor-200'
          >
            닫기
          </span>
        </div>
      </Container>
    </div>
  );
};

export default NotificationWrapper;
