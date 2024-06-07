/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AWS: "https://chatify-project.s3.eu-central-1.amazonaws.com/",
    API: "https://chtify-full-production.up.railway.app",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "chatify-project.s3.eu-central-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
