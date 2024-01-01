/** @type {import('next'.NextConfig)} */
const withMDX = require('@next/mdx')();

module.exports = withMDX({
  output: 'export',
  images: { unoptimized: true },
  // Your other Next.js configurations go here
});
