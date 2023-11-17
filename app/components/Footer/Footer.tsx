'use client';
import FImg from '@/assets/common/footer_logo.png';
import styled from 'styled-components';
import Image from 'next/image';
import { Container } from '@mui/material';

export const FooterStyle = styled.footer`
  margin-top: 80px;
  width: 100%;
  padding: 80px 0 50px;
  background: #333;
  text-align: center;

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

export const FooterLogo = styled.div`
  width: 14.534%;
  min-width: 180px;
  margin: 0 auto;
  padding-bottom: 30px;
  transform: translateX(-15px);
  position: relative;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Footer = () => {
  return (
    <FooterStyle>
      <Container maxWidth='xl'>
        <FooterLogo>
          <Image src={FImg} alt='형제난원' />
        </FooterLogo>

        <address>
          대표 박기용 / (52842) 경상남도 진주시 금곡면 인담리 700 /
          <br /> Tel. 010-8856-1195 / E-mail. cjs863@daum.net /
          <br /> 사업자등록번호 605-92-39533
        </address>
        <p>{'\u00A9'} 형제난원 all copyright.</p>
      </Container>
    </FooterStyle>
  );
};

export default Footer;
