/** @type {import('next').NextConfig} */
const nextConfig = {
  // Workaround for Windows file system issues
  experimental: {
    // Disable some optimizations that might cause file locking issues on Windows
    optimizePackageImports: ['framer-motion'],
  },

};

export default nextConfig;
