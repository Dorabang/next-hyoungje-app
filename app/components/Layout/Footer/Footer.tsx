'use client';
import { Container } from '@mui/material';
import styled from 'styled-components';

import FImg from '@/assets/common/footer_logo.png';
import AutoHeightImageWrapper from '@/components/AutoHeightImageWrapper';

export const FooterStyle = styled.footer`
  border-top: 1px solid #ddd;
  width: 100%;
  padding: 80px 0;
  background: #333;
  text-align: center;
  font-size: 14px;

  address,
  p {
    color: #999;
    font-style: normal;
  }

  address br {
    display: none;
  }

  @media (max-width: 1100px) {
    address br:nth-child(1) {
      display: block;
    }
  }

  @media (max-width: 768px) {
    address br {
      display: block;
    }
  }
`;

const Footer = () => {
  return (
    <FooterStyle>
      <Container maxWidth='xl'>
        <div className='max-w-[120px] mx-auto pb-5'>
          <AutoHeightImageWrapper src={FImg.src} alt='옥동 로고 이미지' />
        </div>

        <address>
          대표 박기용 / (52842) 경상남도 진주시 금곡면 인담리 700 /
          <br />
          Tel. 010-8856-1195 / E-mail. cjs863@daum.net /
          <br />
          사업자등록번호 605-92-39533
        </address>
        <p>{'\u00A9'} (구)형제난원 all copyright.</p>
      </Container>
    </FooterStyle>
  );
};

export default Footer;
