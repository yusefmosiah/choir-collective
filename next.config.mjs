/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@project/anchor': './anchor/src'
    };
    return config;
  },
  experimental: {
    esmExternals: true,
  }
};

export default nextConfig;
