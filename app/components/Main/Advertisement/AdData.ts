import nannara from '@/assets/ad/nannara.jpg';
import nanhana from '@/assets/ad/nanhana.jpg';

export interface AdDataType {
  name: string;
  logo: string;
  link: string;
}

export const AdData: AdDataType[] = [
  { name: '난하나', logo: nanhana.src, link: 'http://www.nanhana.com/' },
  { name: '난나라', logo: nannara.src, link: 'http://www.nannara.com/' },
];
