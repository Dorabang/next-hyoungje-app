import ContainerBox from '@/components/common/ContainerBox';
import { noto_serif_kr } from '@/components/common/NotoSerif';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import MainVisual from '@/components/Main/MainVisual';
import Maps from '@/components/common/Map';

const HyoungjePage = () => {
  return (
    <ContainerBox>
      <Breadcrumbs />
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
        <p>형제난원을 찾아주셔서 감사드립니다.</p>

        <p>
          20여년 넘게 오로지 취미 생활을 해오다 개인적인 사정으로 인해서 하던
          일을 접으면서 업이 되었네요.
          <br />
          소비자와 산채인을 위한 전문 직거래 장터를 개장하게 되었습니다.
          <br />
          이제 시작하는 장터이고, 많이 부족하지만 회원 여러분들의 도움
          부탁드리며 꾸준히 배우도록 하겠습니다.
          <br />
          끝으로 소비자와 판매자가 믿고 사고팔 수 있는 사이트가 되도록 최선을
          다하겠습니다.
          <br />
          회원 여러분들이 그런 사이트로 이끌어 주시길 부탁드립니다. 감사합니다.
        </p>

        <p className='text-right pb-5'>- 운영자 박 기룡</p>

        <hr />

        <p className='pt-5'>{`<오시는길>`}</p>
        <Maps />
        <p>
          경상남도 진주시 금곡면 인담리 700.
          <br />
          <br /> 문의전화 : 010-8856-1195 (통화가능 시간: 10:00 ~ 18:00)
        </p>
      </div>
    </ContainerBox>
  );
};

export default HyoungjePage;
