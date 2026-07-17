/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Real Node.js core modules — only need browser fallbacks on the client bundle.
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

    // FIX: these are optional, runtime-only dependencies pulled in by
    // @metamask/sdk (React Native async storage) and pino (pretty-printer
    // for the WalletConnect logger). Neither exists in this project and
    // neither is ever actually invoked in a Next.js/browser context —
    // but webpack still tries to statically resolve them.
    //
    // Unlike resolve.fallback, config.externals applies to BOTH the
    // client and server compilation passes, which is required here since
    // Web3Provider.tsx (a 'use client' component) still gets pulled
    // through Next's server-side build for SSR. This is the fix
    // documented in Reown's own Next.js installation guide.
    config.externals.push('pino-pretty', '@react-native-async-storage/async-storage', 'lokijs', 'encoding');

    return config;
  }
};

export default nextConfig;