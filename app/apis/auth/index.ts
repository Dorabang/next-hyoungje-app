import { post } from '@/apis/fetchAPI';
import { getCookie } from '@/utils/cookieStore';

export const login = async (loginData: {
  userId: string;
  password: string;
}) => {
  return await post('/auth/login', loginData);
};

export const authStateChanged = async () => {
  const refreshToken = await getCookie('refresh_token');
  if (refreshToken) {
    return true;
  }
  return false;
};

export const logout = async () => {
  const refreshToken = getCookie('refresh_token');
  await post('/auth/logout', { refresh_token: refreshToken });
  sessionStorage.removeItem('authUser');
};
