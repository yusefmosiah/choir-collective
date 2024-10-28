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
  },
  swcMinify: true,
  compress: true,
  productionBrowserSourceMaps: false
};

export default nextConfig;
