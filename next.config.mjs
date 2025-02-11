/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // Optionally, you can restrict the matching path and/or port:
        // pathname: '/your-path/**',
      },
      {
        protocol: 'https',
        hostname: 'urban-adcheck-web.vercel.app',
      },
    ],
    
  },
};

export default nextConfig;
