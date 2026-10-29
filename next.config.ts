import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

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
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          ...(process.env.NODE_ENV === "production"
            ? [
                { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
                { key: "Content-Security-Policy", value: "upgrade-insecure-requests" },
              ]
            : []),
        ],
      },
      {
        source: "/search",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
      {
        source: "/login",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
      {
        source: "/sitemap.xml",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" }],
      },
      {
        source: "/robots.txt",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600" }],
      },
      {
        source: "/feed.xml",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" }],
      },
      {
        source: "/llms.txt",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" }],
      },
      {
        source: "/llms-full.txt",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, s-maxage=86400" }],
      },
      {
        source: "/favicon.ico",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, s-maxage=604800" }],
      },
      {
        source: "/apple-touch-icon.png",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, s-maxage=604800" }],
      },
      {
        source: "/favicon_io/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, s-maxage=604800" }],
      },
      {
        source: "/icons/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, s-maxage=604800" }],
      },
      {
        source: "/splash/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, s-maxage=604800" }],
      },
      {
        source: "/screenshots/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, s-maxage=604800" }],
      },
      {
        source: "/manifest.webmanifest",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
      {
        source: "/sw.js",
        headers: [
          { key: "Content-Type", value: "application/javascript; charset=utf-8" },
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
      {
        source: "/offline.html",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/browserconfig.xml",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
      ...privateWorkspacePaths.map((source) => ({
        source,
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      })),
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
        destination: "https://agrocyms.com",
        statusCode: 301,
      },
      {
        source: "/:path*",
        has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
        destination: "https://agrocyms.com/:path*",
        statusCode: 301,
      },
      {
        source: "/register",
        destination: "/get-started",
        statusCode: 301,
      },
      {
        source: "/landing/farmer.png",
        destination: "/landing/farmer.jpg",
        statusCode: 301,
      },
      {
        source: "/landing/field.png",
        destination: "/landing/field.jpg",
        statusCode: 301,
      },
      {
        source: "/landing/produce.png",
        destination: "/landing/produce.jpg",
        statusCode: 301,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/favicon.ico",
        destination: "/favicon_io/favicon.ico",
      },
      {
        source: "/apple-touch-icon.png",
        destination: "/icons/apple-touch-icon.png",
      },
      {
        source: "/apple-touch-icon-precomposed.png",
        destination: "/icons/apple-touch-icon.png",
      },
      {
        source: "/offline",
        destination: "/offline.html",
      },
      {
        source: "/api/:path*",
        destination: `${apiProxyTarget.replace(/\/$/, "")}/api/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
