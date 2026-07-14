/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "th.bing.com",
      },
    ],
  },

  turbopack: {
    root: "C:/Users/premk_vnesai/OneDrive/Desktop/nextjs",
  },
};

export default nextConfig;