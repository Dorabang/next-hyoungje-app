import Image, { ImageProps } from 'next/image';

const AutoHeightImageWrapper = ({ src, alt, ...props }: ImageProps) => {
  return (
    <div className='w-full [&_img]:!h-auto [&_img]:!relative'>
      <Image layout='fill' src={src} alt={alt} {...props} />
    </div>
  );
};

export default AutoHeightImageWrapper;
