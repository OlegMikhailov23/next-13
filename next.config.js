/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: false,
  openAnalyzer: false,
});
const nextConfig = withBundleAnalyzer({
  experimental: {
    appDir: true,
  },
});

module.exports = nextConfig
