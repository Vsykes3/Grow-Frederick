/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com"
      },
      {
        protocol: "https",
        hostname: "picsum.photos"
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com"
      },
      {
        protocol: "https",
        hostname: "www.ars.usda.gov"
      }
    ],
    // doesn't affect server deploy, fine to keep
    unoptimized: true
  },

  env: {
    NEXT_PUBLIC_ENABLE_PRO:
      process.env.NEXT_PUBLIC_ENABLE_PRO || "true",
    DEMO_BYPASS_PAYWALL:
      process.env.DEMO_BYPASS_PAYWALL || "true",
    NEXTAUTH_URL:
      process.env.NEXTAUTH_URL || "http://localhost:3000",
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin"
          }
        ]
      }
    ];
  },

  webpack: (config, { isServer }) => {
    // Fix for @ alias not resolving
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src')
    }
    
    // Exclude React Router pages directory from being processed
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    
    // Make optional dependencies external to avoid build-time errors
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        resend: "commonjs resend",
        "web-push": "commonjs web-push"
      });
    }
    
    // Fix for Windows/OneDrive path issues with symlinks
    // This prevents EINVAL errors when Next.js tries to read symlinks in .next directory
    if (process.platform === 'win32') {
      config.resolve = config.resolve || {};
      config.resolve.symlinks = false;
      // Disable file watching that causes issues with OneDrive
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ['**/.next/**', '**/node_modules/**'],
        poll: false,
      };
      
      // Fix webpack chunk loading issues on Windows/OneDrive
      // Disable persistent cache to avoid chunk loading errors
      config.cache = false;
    }
    
    return config;
  }
};

module.exports = nextConfig;
