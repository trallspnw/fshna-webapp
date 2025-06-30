import dotenvFlow from 'dotenv-flow'
import type { NextConfig } from "next";

dotenvFlow.config({ path: '../../' });

const nextConfig: NextConfig = {
  output: 'export',

  env: {
    APP_ENV: 'site',
  },

  sassOptions: {
    implementation: 'sass-embedded',
    additionalData: `
      @use "@common/styles/mantine.scss" as *;
      @use "@common/styles/variables.scss" as *;
    `,
  },

  webpack(config) {
    config.cache = {
      type: 'memory',
    }
    return config
  }
  
};

export default nextConfig;
