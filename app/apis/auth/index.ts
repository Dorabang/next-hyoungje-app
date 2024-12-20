import { post } from '@/apis/fetchAPI';
import { BASE_API_URL } from '@/constant/api';
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

export const reissueAccessToken = async () => {
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const response = await fetch(`${BASE_API_URL}/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    headers: defaultHeaders,
  });

  return await response.json();
};

export const sendEmailVerifyCode = async (email: string) => {
  return await post('/auth/verify', { email });
};

export const confirmVerificationCode = async (
  email: string,
  verificationCode: string,
) => {
  return (await post('/auth/confirmcode', { email, verificationCode })) as {
    result: 'SUCCESS' | 'ERROR';
    message?: string;
  };
};
