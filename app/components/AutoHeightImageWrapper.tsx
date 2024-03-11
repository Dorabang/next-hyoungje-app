import Image, { ImageProps } from 'next/image';

const AutoHeightImageWrapper = ({ src, alt, ...props }: ImageProps) => {
  return (
    <div className='w-full [&_img]:!h-auto relative [&_img]:!relative'>
      <Image fill src={src} alt={alt} sizes='100%' {...props} />
    </div>
  );
};

export default AutoHeightImageWrapper;
