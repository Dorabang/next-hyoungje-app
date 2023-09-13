import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer/Footer';
import './globals.css';
import RecoilRootWrapper from '@/components/RecoilRootWrapper';

const noto_sans_kr = Noto_Sans_KR({
  weight: ['100', '300', '400', '500', '700', '900'],
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
      <body className={noto_sans_kr.className}>
        <RecoilRootWrapper>
          <Nav />
          {children}
          <Footer />
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
