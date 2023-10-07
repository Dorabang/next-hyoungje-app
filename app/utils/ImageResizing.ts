'use client';
import imageCompression from 'browser-image-compression';
import { useSetRecoilState } from 'recoil';
import { imageUploadState, uploadPreviewState } from '@/recoil/atoms';

const ImageResizing = (file: File) => {
  const setImageUpload = useSetRecoilState(imageUploadState);
  const setUploadPreview = useSetRecoilState(uploadPreviewState);

  const options = {
    maxSizeMB: 0.2, // 이미지 최대 용량
    maxWidthOrHeight: 1920, // 최대 넓이(혹은 높이)
    useWebWorker: true,
  };

  imageCompression(file, options)
    .then((response) => {
      setImageUpload(response);
      imageCompression.getDataUrlFromFile(response).then((result) => {
        setUploadPreview((prev) =>
          prev ? (!prev.includes(result) ? prev : [...prev, result]) : [result]
        );
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export default ImageResizing;
