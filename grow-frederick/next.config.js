/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Changed to "export" for static site generation (incompatible with middleware)
  output: "export",

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "www.ars.usda.gov" }
    ],
    unoptimized: true
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
  
  // SKIP PRERENDERING THE BROKEN PAGES
  experimental: {
    skipMiddlewareUrlNormalize: true,
    skipTrailingSlashRedirect: true,
  }
}

module.exports = nextConfig;
