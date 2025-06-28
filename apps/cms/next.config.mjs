import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

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
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
