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

  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_API_PROD_URL
      : process.env.NEXT_PUBLIC_API_DEV_URL;

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
    const response = await fetch(`${baseUrl}${url}`, config);
    const result = await response.json();
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
      return formData.append(key, value);
    }
    return formData.append(key, String(value));
  });

  return fetchData<T>(
    url,
    {
      method: options.method,
      body: formData, // JSON 문자열로 변환
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
