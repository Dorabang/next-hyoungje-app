export const BASE_API_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_PROD_URL
    : process.env.NEXT_PUBLIC_API_DEV_URL;

export const BASE_FRONT_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_FRONT_URL
    : 'http://localhost:3000';
