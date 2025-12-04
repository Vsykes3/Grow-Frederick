/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Removed "output: export" - API routes (NextAuth, etc.) require a dynamic server
  // Use "standalone" for optimized server deployments or remove for standard Next.js server

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
    unoptimized: false
  },

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
}

module.exports = nextConfig;
