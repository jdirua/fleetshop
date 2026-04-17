
/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,

  // Required for Firebase Studio / Cloud Workstations preview
  allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
    '*.cloudworkstations.dev',
    '**.cloudworkstations.dev',
  ],

  images: {
    remotePatterns: [
      // Existing rules
      { protocol: 'https', hostname: '*.google.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      
      // THE FIX: Adding a rule to allow images from the local dev server
      { protocol: 'http', hostname: 'localhost' },
    ],
  }
};

module.exports = nextConfig;
