/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 不使用 standalone 模式，避免沙箱路径问题
  // output: 'standalone', 
};
module.exports = nextConfig;
