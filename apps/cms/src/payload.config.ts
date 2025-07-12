import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Admins } from './collections/Admins'
import { Events } from './collections/Events'
import { Pages } from './collections/Pages'
import { Hero } from './blocks/Hero'
import { Media } from './collections/Media'
import { Paragraph } from './blocks/Paragraph'
import { Section } from './blocks/Section'
import { FooterGlobal } from './globals/Footer'
import { GeneralGlobal } from './globals/General'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Admins.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Admins, 
    Pages, 
    Events,
    Media,
  ],
  globals: [
    FooterGlobal,
    GeneralGlobal,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, '../../../packages/common/src/types/payload-types.ts'),
    declare: false,
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: true,
  }),
  sharp,
  plugins: [],
  blocks: [
    Hero,
    Section,
    Paragraph,
  ],
})
