// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 1. 静的エクスポートを維持
  output: 'export', 
  
  // 2. 画像最適化APIを無効化
  images: {
    unoptimized: true, 
  },
};

module.exports = nextConfig;