import React from 'react';
import Link from 'next/link';

import ContainerBox from '@/components/ContainerBox';
import IconWelcomeCheck from '@/assets/icon_welecome_check.svg';

const WelcomePage = () => {
  return (
    <ContainerBox className='flex flex-col py-14 justify-center items-center text-center'>
      <IconWelcomeCheck />
      <h3 className='text-lg pt-5 pb-3 font-bold'>
        회원가입이 완료되었습니다.
      </h3>

      <div className='flex gap-2'>
        <Link
          href='/'
          className={`mt-14 border border-grayColor-500 bg-white text-grayColor-500 px-3 py-2
      hover:bg-grayColor-500 hover:text-white transition-colors`}
        >
          홈으로 가기
        </Link>
      </div>
    </ContainerBox>
  );
};

export default WelcomePage;
