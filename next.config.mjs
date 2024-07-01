/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true,
    },
    assetPrefix: process.env.NODE_ENV === 'production' ? '/Game' : '',
    basePath: process.env.NODE_ENV === 'production' ? '/Game' : '',
    trailingSlash: true,
  };
  
  export default nextConfig;