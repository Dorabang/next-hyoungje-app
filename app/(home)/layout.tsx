import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import Nav from '@/components/Layout/Nav';
import Footer from '@/components/Layout/Footer/Footer';
import './globals.css';
import RecoilRootWrapper from '@/components/RecoilRootWrapper';
import Script from 'next/script';
import QueryClientWrapper from '@/components/QueryClientWrapper';
import { URL } from 'url';

const noto_sans_kr = Noto_Sans_KR({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '옥동 || 한국춘란 산채품 직거래장터',
  description: '한국춘란 산채품 전문 직거래장터',
  metadataBase: new URL('https://www.hyoungje.kr'),
  openGraph: {
    title: '옥동',
    description: '한국춘란 산채품 전문 직거래장터',
    images: '../assets/common/open_graph.jpg',
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
    },
  },
  keywords: [
    '형제난원',
    '옥동',
    '산채품',
    '한국춘란',
    '난',
    '난초',
    '산채품 직거래',
    '난초 직거래',
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
          <RecoilRootWrapper>
            <Nav />
            {children}
            <Footer />
          </RecoilRootWrapper>
        </QueryClientWrapper>
        <Script
          type='text/javascript'
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false`}
        />
      </body>
    </html>
  );
}
