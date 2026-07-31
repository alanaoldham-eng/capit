/** @type {import('next').NextType} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push(
      'pino-pretty',
      '@react-native-async-storage/async-storage',
      'lokijs',
      'encoding'
    )
    return config
  },
}

export default nextConfig