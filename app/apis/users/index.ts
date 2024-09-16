import { get, post, put, upload, del } from '@/apis/fetchAPI';
import { User } from '@/recoil/atoms';

export interface CreateUserData {
  userId: string;
  password: string;
  displayName: string;
  phone: string;
  profile?: File;
}

export const createUser = async (createUserData: CreateUserData) => {
  return (await upload('/users', {
    method: 'POST',
    body: createUserData,
  })) as { result: 'SUCCESS' | 'ERROR' };
};

export const updateUser = async (updateUserData: Partial<CreateUserData>) => {
  return (await upload('/users', {
    method: 'PUT',
    body: updateUserData,
  })) as { result: 'SUCCESS' | 'ERROR' };
};

export const getUser = async () => {
  const response = (await get('/users/info')).data as User;
  return response;
};

export const checkPasswordValidation = async (password: string) => {
  return await post('/users/password', { password });
};

export const updatePassword = async (password: string) => {
  const response = await put('/users/password', { password });
  if (response.result === 'SUCCESS') {
    return true;
  }
  return false;
};

export const deleteUser = async () => {
  const response = (await del('/users')).result;

  if (response === 'SUCCESS') {
    return true;
  }
  return false;
};
