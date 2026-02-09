import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname, '../'),
  // Workaround for Windows file system issues
  experimental: {
    // Disable some optimizations that might cause file locking issues on Windows
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;
