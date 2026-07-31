/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        fs: false,
        path: false,
        os: false,
        net: false,
        stream: false,
        tls: false,
        fsevents: false
      };
    }

    // FIX: Unconditional externals push for SSR compatibility
    config.externals.push(
      'pino-pretty', 
      '@react-native-async-storage/async-storage', 
      'lokijs', 
      'encoding'
    );

    return config;
  }
};

export default nextConfig;