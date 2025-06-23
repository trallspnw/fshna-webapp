import { CollectionConfig } from 'payload'
import { TextBlock } from '@cms/blocks/TextBlock'

export const Events: CollectionConfig = {
  slug: 'events',
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
      name: 'dateTime',
      label: 'Date and Time',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
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
