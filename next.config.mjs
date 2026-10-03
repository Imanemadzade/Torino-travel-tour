const baseUrl = new URL(
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:6500"
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: baseUrl.protocol.replace(":", ""),
        hostname: baseUrl.hostname,
        ...(baseUrl.port && { port: baseUrl.port }),
        pathname: "/static/images/**",
      },
    ],
  },
};

export default nextConfig;
