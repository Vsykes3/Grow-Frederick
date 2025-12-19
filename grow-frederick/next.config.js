/** @type {import('next').NextConfig} */
const nextConfig = {
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
