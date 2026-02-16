/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Removed for Vercel deployment
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
