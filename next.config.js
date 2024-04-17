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
        hostname: "evercare-next.vercel.app/",
        port: '',
        pathname: '/getting-started',
      },
    ],
  }
}

module.exports = nextConfig
