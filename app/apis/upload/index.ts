import { fetchData, post } from '@/apis/fetchAPI';

export const uploadImage = async (image: File) => {
  const data = new FormData();
  data.append('file', image);
  return (await fetchData('/upload/image', {
    method: 'POST',
    body: data, // JSON 문자열로 변환
    headers: { 'Content-Type': 'multipart/form-data' },
  })) as string;
};

export const uploadImages = async (images: any[]) => {
  const data = new FormData();
  Object.entries(images).forEach(([_, value]) => {
    if (value === '' || !value) return;
    data.append('files', value);
  });
  return await post('/upload/images', data);
};
