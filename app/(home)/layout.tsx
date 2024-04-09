import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import Nav from '@/components/Layout/Nav';
import Footer from '@/components/Layout/Footer/Footer';
import './globals.css';
import RecoilRootWrapper from '@/components/RecoilRootWrapper';
import Script from 'next/script';

const noto_sans_kr = Noto_Sans_KR({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '형/제/난/원 || 한국춘란 산채품 직거래장터',
  description: '한국춘란 산채품 전문 직거래장터',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body
        className={`${noto_sans_kr.className} scrollbar scrollbar-thumb-grayColor-300 scrollbar-track-grayColor-100`}
      >
        <RecoilRootWrapper>
          <Nav />
          {children}
          <Footer />
        </RecoilRootWrapper>
        <Script
          type='text/javascript'
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false`}
        />
      </body>
    </html>
  );
}
