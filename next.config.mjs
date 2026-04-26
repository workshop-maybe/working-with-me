/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  serverExternalPackages: ['@meshsdk/core', '@meshsdk/react'],
};

export default nextConfig;
