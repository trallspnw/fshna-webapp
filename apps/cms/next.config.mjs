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
  },

  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.FRONT_END_URL || '',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,POST,PUT,DELETE,OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ]
  },

}

export default withPayload(nextConfig, { devBundleServerPackages: false })
