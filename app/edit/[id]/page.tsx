'use client';
import React, { useState } from 'react';
import ContainerBox from '@/components/ContainerBox';
import TinyEditor from '@/components/TinyEditor';
import useRedirect from '@/hooks/useRedirect';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState, editorState } from '@/recoil/atoms';
import { Button } from '@mui/material';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { dbService, storageService } from '@/firebase';
import { addDoc, collection } from 'firebase/firestore';
import uuid from 'react-uuid';
import { useRouter } from 'next/navigation';

const ModifyPostPage = ({ params: { id } }: { params: { id: string } }) => {
  useRedirect();
  const user = useRecoilValue(authState);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [value, setValue] = useRecoilState(editorState);

  const router = useRouter();
  const handleSubmit = async () => {
    let attachmentUrl = '';
    /* 
    if (image !== '') {
      const newPostImageRef = ref(
        storageService,
        `${id}/${user?.uid}_${uuid()}`
      );

      await uploadString(newPostImageRef, image, 'data_url');

      attachmentUrl = await getDownloadURL(
        ref(storageService, newPostImageRef)
      );
    }
 */
    const newPostObj = {
      id: uuid(),
      title: title,
      contents: value,
      attachmentUrl,
      like: [],
      comment: [],
      views: 0,
      creatorName: user?.displayName,
      creatorId: user?.uid,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await addDoc(collection(dbService, `${id}`), newPostObj);
    setTitle('');
    setImage('');
    setValue('');
    router.back();
  };
  return (
    <ContainerBox>
      <div className='flex flex-col gap-4 justify-center'>
        <form className='mb-3'>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='제목을 입력해주세요.'
            className='w-full outline-none border-b border-[#dddddd] px-2 py-4'
          />
        </form>
        <TinyEditor />

        <div className='flex justify-center pt-4'>
          <Button
            type='submit'
            size='large'
            variant='contained'
            onClick={handleSubmit}
          >
            등록하기
          </Button>
        </div>
      </div>
    </ContainerBox>
  );
};

export default ModifyPostPage;
