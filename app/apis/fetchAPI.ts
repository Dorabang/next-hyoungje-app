import { BASE_API_URL } from '@/constant/api';
import { reissueAccessToken } from './auth';

export interface FetchOptions extends RequestInit {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: HeadersInit;
  body?: BodyInit | null;
}

export const fetchData = async <T>(
  url: string,
  options: FetchOptions = { method: 'GET' },
  type: 'upload' | 'etc' = 'etc',
) => {
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const config: FetchOptions = {
    method: options.method,
    body: options.body,
    credentials: 'include',
    headers:
      type === 'upload'
        ? {}
        : {
            ...defaultHeaders,
            ...options.headers,
          },
  };

  try {
    const response = await fetch(`${BASE_API_URL}${url}`, config);
    const result = await response.json();
    console.log('🚀 ~ BASE_API_URL:', BASE_API_URL);

    // accessToken이 만료되어 401 에러가 발생할 경우
    if (
      response.status === 401 &&
      (result.code === 'T001' || result.code === 'T002')
    ) {
      // refreshToken으로 accessToken 재발급 시도
      const reissueToken = await reissueAccessToken();

      if (reissueToken.result === 'ERROR') {
        alert('로그인 정보가 만료되었습니다. 로그인 후 이용해주세요.');
        throw new Error(reissueToken.message);
      }
      // 재발급 후 데이터 패칭
      const res = await fetch(`${BASE_API_URL}${url}`, config);
      const result = await res.json();

      if (result.result === 'ERROR') {
        throw new Error(result.message);
      }
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return result as { result: 'SUCCESS' | 'ERROR'; data?: T };
    }

    if (result.result === 'ERROR') {
      throw new Error(result.message);
    }
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return result as { result: 'SUCCESS' | 'ERROR'; data?: T };
  } catch (error) {
    throw error;
  }
};

export async function upload<T>(
  url: string,
  options: { body: object; method: 'POST' | 'PUT' },
) {
  const formData = new FormData();
  Object.entries(options.body).forEach(([key, value]) => {
    if (value === '' || !value) return;
    if (key === 'profile' || key === 'image' || key === 'updateImage') {
      if (Array.isArray(value)) {
        return value.forEach((file: File) => {
          return formData.append(key, file); // 'updateImage'는 서버에서 기대하는 필드 이름
        });
      }
      return formData.append(key, value);
    }
    return formData.append(key, String(value));
  });

  return fetchData<T>(
    url,
    {
      method: options.method,
      body: formData,
    },
    'upload',
  );
}

export async function get<T>(url: string, options: FetchOptions = {}) {
  return fetchData<T>(url, { ...options, method: 'GET' });
}

export async function post<T>(
  url: string,
  body: any = {},
  options: FetchOptions = {},
) {
  return fetchData<T>(url, {
    ...options,
    method: 'POST',
    body: JSON.stringify({ ...body }), // JSON 문자열로 변환
  });
}

export async function put<T>(
  url: string,
  body: any,
  options: FetchOptions = {},
) {
  return fetchData<T>(url, {
    ...options,
    method: 'PUT',
    body: JSON.stringify({ ...body }), // JSON 문자열로 변환
  });
}

export async function del<T>(url: string, options: FetchOptions = {}) {
  return fetchData<T>(url, {
    ...options,
    method: 'DELETE',
  });
}
