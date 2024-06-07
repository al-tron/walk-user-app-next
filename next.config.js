// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'content-service.walk.test',
      },
      {
        protocol: 'https',
        hostname: 'cdn.walk.industries',
      },
    ],
  },
}

export default nextConfig
