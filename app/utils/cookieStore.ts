'use server';

import { cookies } from 'next/headers';

export const getCookie = async (name: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
};

export const setCookie = async (
  name: string,
  value: string,
  options?: { maxAge: number },
) => {
  const cookieStore = await cookies();
  cookieStore.set(name, value, { ...options });
};
