/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    AWS: "https://chatify-project.s3.eu-central-1.amazonaws.com/",
    API: "https://chatify-api-1m63.onrender.com",
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
