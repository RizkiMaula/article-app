/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.sellerpintar.com',
      },
      // Tambahkan host lain jika diperlukan
    ],
  },
};

export default nextConfig;
