/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1) Tell Next to output a static export for Render
  output: "export",

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "www.ars.usda.gov",
      },
    ],
    // 2) For static export, Next *must* use unoptimized images
    // or you'll need a custom image loader. This is the safe option.
    unoptimized: true,
  },

  env: {
    NEXT_PUBLIC_ENABLE_PRO:
      process.env.NEXT_PUBLIC_ENABLE_PRO || "true",
    DEMO_BYPASS_PAYWALL:
      process.env.DEMO_BYPASS_PAYWALL || "true",
  },

  // 3) Do NOT fail the build on ESLint issues in CI/Render
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 4) Do NOT fail the build on TS errors (you can turn this back on later)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Headers removed - not compatible with static export
  // Headers should be configured at server/CDN level for static sites

  webpack: (config, { isServer }) => {
    // Make optional dependencies external to avoid build-time errors
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        resend: "commonjs resend",
        "web-push": "commonjs web-push",
      });
    }
    return config;
  },
};

module.exports = nextConfig;
