import type { NextConfig } from "next";

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://stats.g.doubleclick.net",
  "frame-src https://www.googletagmanager.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    const headers =
      process.env.NODE_ENV === "production"
        ? securityHeaders
        : securityHeaders.filter(
            (header) => header.key !== "Strict-Transport-Security",
          );

    return [
      {
        source: "/:path*",
        headers,
      },
      {
        source: "/",
        headers,
      },
    ];
  },
  async redirects() {
    return [
      // Legacy JPEG/PNG images were converted to WebP. Redirect old URLs
      // (still referenced by cached HTML, crawlers and image search).
      {
        source:
          "/images/:name(api|application|atelier|fintech|health|mobile|p1|p2|p3|p4|p5|saas|sapien|ui-ux|web|whyUs1|whyUs2|whyUs3|whyUs4|whyUs5|whyUs6).jpeg",
        destination: "/images/:name.webp",
        permanent: true,
      },
      {
        source: "/security",
        destination: "/about/security",
        permanent: true,
      },
      {
        source: "/images/logo-app.png",
        destination: "/images/logo-app.webp",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.clickmastersapplicationdevelopment.com",
          },
        ],
        destination: "https://clickmastersapplicationdevelopment.com/:path*",
        permanent: true,
      },
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "www.clickmastersapplicationdevelopment.com",
          },
        ],
        destination: "https://clickmastersapplicationdevelopment.com/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
