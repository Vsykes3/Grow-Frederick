/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Standard Next.js server mode (required for API routes)

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

  env: {
    NEXT_PUBLIC_ENABLE_PRO:
      process.env.NEXT_PUBLIC_ENABLE_PRO || "true",
    DEMO_BYPASS_PAYWALL:
      process.env.DEMO_BYPASS_PAYWALL || "true",
    NEXTAUTH_URL:
      process.env.NEXTAUTH_URL || "http://localhost:3000",
  },

  webpack: (config, { isServer }) => {
    // Fix for @ alias not resolving
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src')
    };
    
    // Fix for Windows/OneDrive path issues with symlinks
    // This prevents EINVAL errors when Next.js tries to read symlinks in .next directory
    if (process.platform === 'win32') {
      config.resolve.symlinks = false;
      // Disable file watching that causes issues with OneDrive
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ['**/.next/**', '**/node_modules/**'],
        poll: false,
      };
    }
    
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
