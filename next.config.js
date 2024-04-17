/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true
  },
  // output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "https://evercare-next.vercel.app/",
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
