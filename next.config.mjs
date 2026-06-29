/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Product photography is served from the Pexels CDN in this prototype.
    remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }],
  },
};

export default nextConfig;
