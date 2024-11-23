import Image, { ImageProps } from 'next/image';
import { toBase64, shimmer } from '@/components/common/ImagePlaceholder';

const AutoHeightImageWrapper = ({ src, alt, ...props }: ImageProps) => {
  return (
    <div className='w-full [&_img]:!h-auto relative [&_img]:!relative'>
      <Image
        fill
        src={src}
        alt={alt}
        sizes='100%'
        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(800, 400))}`}
        {...props}
      />
    </div>
  );
};

export default AutoHeightImageWrapper;
