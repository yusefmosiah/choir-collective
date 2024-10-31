/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@': '/app/src',
        '@project/anchor': '/app/anchor/src'
      },
      modules: [
        '/app/node_modules',
        '/app/src',
        ...(config.resolve.modules || [])
      ]
    };
    return config;
  },
  experimental: {
    esmExternals: true
  },
  compress: true,
  productionBrowserSourceMaps: false
};

export default nextConfig;
