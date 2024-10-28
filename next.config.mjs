/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Existing aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@project/anchor': './anchor/src'
    };

    // Add explicit module directories
    config.resolve.modules = [
      'node_modules',
      'src',
      ...config.resolve.modules || []
    ];

    return config;
  },
  experimental: {
    // Enable module resolution features
    esmExternals: true,
  },
  // Add this section for port configuration
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
    host: '0.0.0.0',
  }
};

export default nextConfig;
