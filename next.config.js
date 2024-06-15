/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'default',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
};

module.exports = nextConfig;
