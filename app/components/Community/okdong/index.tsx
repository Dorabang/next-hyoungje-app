'use client';
import { Suspense } from 'react';
import Link from 'next/link';
import { HiOutlinePencilSquare } from 'react-icons/hi2';

import ContainerBox from '@/components/common/ContainerBox';
import { noto_serif_kr } from '@/components/common/NotoSerif';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import MainVisual from '@/components/Main/MainVisual';
import Maps from '@/components/common/Map';
import { useAdmin } from '@/hooks/queries/useAdmin';
import EditorReadOnly from '@/components/Editor/ReadOnly';
import { usePost } from '@/hooks/queries/usePosts';
import Loading from '@/components/common/Loading';

const OkdongPage = () => {
  const { data: user } = useAdmin();
  const { data } = usePost(1);

  return (
    <Suspense fallback={<Loading />}>
      <ContainerBox>
        <div className='flex justify-between'>
          <Breadcrumbs pathname='okdong' isCommunity />
          {user?.isAdmin && (
            <Link
              href='/community/okdong/edit/1'
              className='text-grayColor-500 hover:text-grayColor-800 flex items-center transition-colors'
            >
              <HiOutlinePencilSquare size={18} className='mr-1' />
              수정하기
            </Link>
          )}
        </div>
        <div className='border-t border-grayColor-200 mt-2 mb-10'></div>
        <div
          className={`flex flex-col gap-4
        w-full px-3 md:px-0 mx-auto
        leading-10
        ${noto_serif_kr.className}`}
        >
          <div className='pb-5'>
            <MainVisual />
          </div>
          <div className='w-full md:max-w-[500px] lg:max-w-[700px] mx-auto'>
            <p>{data?.post.title}</p>

            <br />

            {data && <EditorReadOnly contents={data.post.contents} />}
            <hr />

            <p className='pt-5'>{`<오시는길>`}</p>
            <Maps />
            <p>
              경상남도 진주시 금곡면 인담리 700.
              <br />
              <br /> 문의전화 : 010-8856-1195 (통화가능 시간: 10:00 ~ 18:00)
            </p>
          </div>
        </div>
      </ContainerBox>
    </Suspense>
  );
};

export default OkdongPage;
