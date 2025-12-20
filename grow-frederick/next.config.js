/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'via.placeholder.com',
      'firebasestorage.googleapis.com',
    ],
  },
  env: {
    NEXT_PUBLIC_ENABLE_PRO: process.env.NEXT_PUBLIC_ENABLE_PRO || 'true',
    DEMO_BYPASS_PAYWALL: process.env.DEMO_BYPASS_PAYWALL || 'true',
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Fix for @ alias not resolving
    const path = require('path');
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      // Stub react-router-dom for legacy files that shouldn't use it in Next.js
      'react-router-dom': path.resolve(__dirname, 'src/lib/react-router-stub.js'),
    };
    
    // Use NormalModuleReplacementPlugin to handle case-insensitive button imports
    // This replaces '@/components/ui/button' imports with '@/components/ui/Button.tsx'
    const webpack = require('webpack');
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /^@\/components\/ui\/button$/,
        path.resolve(__dirname, 'src/components/ui/Button.tsx')
      )
    );
    
    // Also handle with .tsx extension
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /^@\/components\/ui\/button\.tsx$/,
        path.resolve(__dirname, 'src/components/ui/Button.tsx')
      )
    );
    
    // Make optional dependencies external to avoid build-time errors
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push({
        'resend': 'commonjs resend',
        'web-push': 'commonjs web-push',
      });
    }
    
    return config;
  },
};

module.exports = nextConfig;
