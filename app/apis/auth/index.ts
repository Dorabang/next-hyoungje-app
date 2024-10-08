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

export const reissueAccessToken = async () => {
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_API_PROD_URL
      : process.env.NEXT_PUBLIC_API_DEV_URL;

  const response = await fetch(`${baseUrl}/auth/refresh`, {
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
