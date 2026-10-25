import type { NextConfig } from "next";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiProxyTarget = process.env.API_PROXY_TARGET;

if (!apiBaseUrl) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not set. Add it to your .env file.");
}

if (!apiProxyTarget) {
  throw new Error("API_PROXY_TARGET is not set. Add it to your .env file.");
}

const privateWorkspacePaths = [
  "/birds",
  "/eggs",
  "/feed",
  "/medicine",
  "/reports",
  "/statistics",
  "/users",
  "/profile",
  "/farm",
  "/cattle",
  "/pigs",
  "/ruminants",
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      ...privateWorkspacePaths.map((source) => ({
        source,
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      })),
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiProxyTarget.replace(/\/$/, "")}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
