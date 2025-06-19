import dotenvFlow from 'dotenv-flow'
import type { NextConfig } from "next";

dotenvFlow.config({ path: '../../' });

const nextConfig: NextConfig = {
  output: 'export',
};

export default nextConfig;
