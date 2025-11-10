/** @type {import('next').NextConfig} */
const nextConfig = {
  // Don't use 'export' mode, use standard Next.js server for dev
  images: {
    unoptimized: true,
  },
  // Disable SWC minification to avoid issues with Electron
  swcMinify: true,
}

module.exports = nextConfig
