import { CollectionConfig } from 'payload'
import { Hero } from '@cms/blocks/Hero'
import { LocalizedTextField } from '@cms/fields/localizedTextField'
import { DEFAULT_LANGUAGE } from '@common/types/language'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: [
      'title', 
      'slug', 
    ],
  },
  hooks: {
      beforeValidate: [
        ({ data }) => ({
          ...data,
          title: data?.localizedTitle?.[DEFAULT_LANGUAGE] || '[Missing Title]',
        }),
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
      admin: {
        hidden: true,
      },
    },
    LocalizedTextField('localizedTitle', 'Localized Title', true),
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
      name: 'blocks',
      type: 'blocks',
      label: 'Content Blocks',
      blocks: [
        Hero,
      ],
    },
  ],
}
