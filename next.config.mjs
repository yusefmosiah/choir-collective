/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@project/anchor': './anchor/src'  // Changed from '/anchor/src/index.ts'
    }
    return config
  }
};

export default nextConfig;
