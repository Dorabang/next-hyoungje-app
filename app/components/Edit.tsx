'use client';
import { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import ContainerBox from './ContainerBox';
import { useRouter } from 'next/navigation';
import { DocumentData } from 'firebase/firestore';
import { useRecoilState } from 'recoil';
import { ImageObjProps } from '@/(home)/edit/[id]/page';
import { editorState } from '@/recoil/atoms';

const Edit = ({ post }: { post: DocumentData }) => {
  const router = useRouter();

  const [title, setTitle] = useState(post.title);
  const [variant, setVariant] = useState(post.variant);
  const [phone, setPhone] = useState(post.phone);
  const [status, setStatus] = useState('sale');
  const [price, setPrice] = useState('');
  const [place, setPlace] = useState('');
  const [date, setDate] = useState('');
  const [height, setHeight] = useState(' cm');
  const [width, setWidth] = useState(' cm');
  const [amount, setAmount] = useState('');
  const [imageArr, setImageArr] = useState<ImageObjProps[] | null>(null);
  const [value, setValue] = useRecoilState(editorState);

  if (!post) return;

  return (
    <ContainerBox>
      <form>
        {/* title */}
        <div
          className='border-b border-neutral-500
          flex gap-4 justify-between items-center
          py-3'
        >
          <div className='p-2 cursor-pointer' onClick={() => router.back()}>
            <IoArrowBack size={18} />
          </div>

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='text-lg font-bold flex-grow'
          />
        </div>
      </form>
    </ContainerBox>
  );
};

export default Edit;
