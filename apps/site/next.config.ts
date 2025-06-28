import dotenvFlow from 'dotenv-flow'
import type { NextConfig } from "next";

dotenvFlow.config({ path: '../../' });

const nextConfig: NextConfig = {
  output: 'export',

  sassOptions: {
    implementation: 'sass-embedded',
    additionalData: `@use "@common/styles/mantine.scss" as mantine;`,
  },

  webpack(config) {
    config.cache = {
      type: 'memory',
    }
    return config
  }
  
};

export default nextConfig;
