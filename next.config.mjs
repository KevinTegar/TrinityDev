/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
  async redirects() {
    return [
      { source: "/favicon.ico", destination: "/favicon.svg", permanent: true },
      { source: "/services", destination: "/studio", permanent: true },
      { source: "/team", destination: "/studio", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:slug", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
