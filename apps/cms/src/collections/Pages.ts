import { CollectionConfig } from 'payload'
import { TextBlock } from '@cms/blocks/TextBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: [
      'title', 
      'slug', 
    ],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'text',
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [TextBlock],
    },
  ],
}
