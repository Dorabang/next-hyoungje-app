import { PostData } from '@/apis/posts';
import AutoHeightImageWrapper from '@/components/common/Wrapper/AutoHeightImageWrapper';

export const DetailImage = ({ data }: { data: PostData }) => {
  return (
    <div className='pt-8 w-full'>
      {data.post.image
        ? data.post.image?.map((imageURL: string, idx: number) => (
            <div
              key={imageURL}
              className='relative w-full md:max-w-[500px] lg:max-w-[700px] min-h-[350px] mx-auto'
            >
              <AutoHeightImageWrapper
                src={imageURL}
                alt={`${data.post.user.displayName + idx} 업로드 이미지`}
                priority
              />
            </div>
          ))
        : null}
    </div>
  );
};
