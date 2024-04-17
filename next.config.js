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
        hostname: "**",
        pathnames: ["**"],
      },
    ],
  }
}

module.exports = nextConfig
