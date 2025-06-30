import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  env: {
    APP_ENV: 'cms',
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
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
