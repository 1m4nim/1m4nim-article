// // next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // すべての設定を削除し、空のオブジェクトを返す
//   experimental: {},
// };

// module.exports = nextConfig;
// next.config.js


/** @type {import('next').NextConfig} */
const nextConfig = {
  // 厳格なモードを有効に
  reactStrictMode: true,

  // 静的エクスポートを有効にする設定
  // これにより、ビルド時にHTMLファイルが生成され、CDNなどでホスト可能になります。
  output: 'export',
  
  // (補足: 静的エクスポートでは、next/imageの機能が制限される場合があります)
  
  // (もしあれば) 画像の最適化に関する設定
  // images: {
  //   unoptimized: true, // 静的エクスポート時によく使用されます
  // },
};

module.exports = nextConfig;