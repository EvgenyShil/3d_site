/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: { bodySizeLimit: '10mb' }
  }
};
export default nextConfig;

// sync: 2025-10-21
