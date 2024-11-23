import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';

import './globals.css';
import Nav from '@/components/Layout/Nav';
import Footer from '@/components/Layout/Footer/Footer';
import QueryClientWrapper from '@/components/common/Wrapper/QueryClientWrapper';

const noto_sans_kr = Noto_Sans_KR({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '옥동 || 한국춘란 산채품 직거래장터',
  description: '한국춘란 산채품 전문 직거래장터',
  metadataBase: new URL('https://www.hyoungje.kr'),
  openGraph: {
    title: '춘란의 아름다움, 신뢰로 이어지는 산채품 거래 || 옥동',
    description: '한국춘란 산채품 전문 직거래장터',
    images: '/open_graph.jpg',
    siteName: '옥동',
  },
  verification: {
    google: 'OG0ONfzZACBZWY317gJ6_GMm01reig-14gXbiFcsjIA',
    other: {
      'naver-site-verification': '71bcd9c35e7924167e41233bbaeabff59be62208',
    },
  },
  keywords: [
    '옥동',
    '형제난원',
    '옥동난원',
    '난원',
    '직거래',
    '장터',
    '산채품',
    '산채',
    '춘란',
    '옥동 난원',
  ],
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
        <QueryClientWrapper>
          <div className='flex flex-col w-full h-[100dvh]'>
            <Nav />
            <div className='flex-grow'>{children}</div>
            <Footer />
          </div>
        </QueryClientWrapper>
        <Script
          type='text/javascript'
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false`}
        />
      </body>
      <GoogleAnalytics
        gaId={`${process.env.NEXT_PUBLIC_GOOGLE_ANALYTIC_KEY}`}
      />
    </html>
  );
}
