import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import "./envConfig.ts";
const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: process.env.NEXT_PUBLIC_BACKEND_PORT,
        pathname: "/images/**"
      }
    ]
  }
};
export default withNextIntl(nextConfig);
