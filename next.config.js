/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true
  },
  // output: 'export',
  images: {
    domains: ['https://evercare-next.vercel.app'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://evercare-next.vercel.app",
        port: '',
        pathname: '/getting-started',
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  }
}

module.exports = nextConfig
