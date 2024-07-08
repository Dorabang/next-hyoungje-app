import imageCompression from 'browser-image-compression';

export const imageResize = async (file: File) => {
  const options = {
    maxSizeMB: 0.2, // 이미지 최대 용량
    maxWidthOrHeight: 840, // 최대 넓이(혹은 높이)
    useWebWorker: true,
  };

  const response = await imageCompression(file, options);
  const result = await imageCompression.getDataUrlFromFile(response);

  return result;
};
