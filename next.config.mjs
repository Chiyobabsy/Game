/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true,
    },
    assetPrefix: '/Game/',
    basePath: '/Game',
    trailingSlash: true,
};

export default nextConfig;
