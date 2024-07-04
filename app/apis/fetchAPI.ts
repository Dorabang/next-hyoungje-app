export const fetchAPI = async <T>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: T,
  headers?: T,
) => {
  const config = {
    method: method,
    ...(method === 'GET' ? {} : { body: JSON.stringify(data) }),
    ...(headers ? { headers: headers } : {}),
  };
  try {
    return await (await fetch(url, { ...config })).json();
  } catch (e) {
    console.log('🚀 ~ e:', e);
  }
};
