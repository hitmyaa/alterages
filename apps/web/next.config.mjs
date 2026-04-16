/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@alterages/shared'],
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
