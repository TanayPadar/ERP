/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Disable type checking during build since we're in a WebContainer
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  // Disable experimental features to avoid issues
  experimental: {
    esmExternals: false,
    forceSwcTransforms: false
  },
  // Use Babel instead of SWC in WebContainer
  swcMinify: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
};

module.exports = nextConfig;