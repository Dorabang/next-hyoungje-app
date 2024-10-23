'use client';
import {
  ButtonHTMLAttributes,
  ChangeEvent,
  FormEvent,
  ReactNode,
  useState,
} from 'react';

import { refreshPlaylist } from '@/apis/youtube';
import { useAdmin } from '@/hooks/queries/useAdmin';
import { ChannelState } from '../type';
import AutoHeightImageWrapper from '@/components/common/Wrapper/AutoHeightImageWrapper';
import defaultProfile from '@/assets/common/defaultProfile.jpg';

const AdminYoutube = () => {
  const { data: user } = useAdmin();
  const [isOpen, setIsOpen] = useState(false);
  const [channel, setChannel] = useState<ChannelState>({
    name: '',
    summary: '',
    profile: null,
    url: '',
  });

  const [image, setImage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleReset = () => {
    const resetChannel = { name: '', summary: '', profile: null, url: '' };
    setChannel(resetChannel);
    setIsOpen(false);
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    setChannel((prev) => ({ ...prev, [name]: value }));
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = e;

    if (files) {
      const theFile = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = (e.target as FileReader).result as string;
        setImage(result);
      };
      reader.readAsDataURL(theFile);
      setChannel((prev) => ({ ...prev, profile: theFile }));
    }
  };

  const refresh = async () => {
    await refreshPlaylist();
  };

  if (!user?.isAdmin) return;

  return (
    <div className='pt-20'>
      <div className='flex gap-3 w-full items-center justify-center'>
        <YoutubeButton onClick={refresh} className='text-white'>
          플레이 리스트 새로고침
        </YoutubeButton>
        <YoutubeButton onClick={() => setIsOpen((prev) => !prev)}>
          {!isOpen ? '채널 추가하기' : '숨기기'}
        </YoutubeButton>
      </div>
      {isOpen && (
        <form
          onSubmit={(e) => handleSubmit(e)}
          className='py-5 flex items-center flex-col gap-5 bg-white/10
          border-grayColor-300 rounded-md mt-10 border text-white [&_input]:text-black'
        >
          <div className='flex flex-col gap-4 items-center'>
            <p>프로필 추가</p>
            <label className='hover:opacity-80 cursor-pointer'>
              <div className='h-20 w-20 rounded-full overflow-hidden relative'>
                <AutoHeightImageWrapper
                  src={image ? image : defaultProfile}
                  alt='프로필 이미지 미리보기'
                />
              </div>
              <input
                type='file'
                accept='image/*'
                onChange={onFileChange}
                className='hidden'
              />
            </label>
          </div>

          <label>
            채널명{' '}
            <input
              type='text'
              name='name'
              value={channel.name}
              onChange={(e) => handleChangeValue(e)}
            />
          </label>

          <label>
            설명글{' '}
            <input
              type='text'
              name='summary'
              value={channel.summary}
              onChange={(e) => handleChangeValue(e)}
            />
          </label>

          <label>
            링크{' '}
            <input
              type='text'
              name='url'
              value={channel.url}
              onChange={(e) => handleChangeValue(e)}
            />
          </label>

          <div className='flex gap-3'>
            <button type='submit' className='px-3 py-2'>
              추가하기
            </button>
            <button type='reset' onClick={handleReset} className='px-3 py-2'>
              취소
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

const YoutubeButton = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children?: ReactNode }) => {
  return (
    <button
      {...props}
      className='text-white px-3 py-2 rounded-md bg-white/50 hover:bg-white hover:text-black transition-all'
    >
      {children}
    </button>
  );
};

export default AdminYoutube;
