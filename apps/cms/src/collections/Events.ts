import { CollectionConfig } from 'payload'
import { Hero } from '@cms/blocks/Hero'
import { LocalizedTextField } from '@cms/fields/localizedTextField'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'name',
    defaultColumns: [
      'name', 
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
      label: 'Slug',
      admin: {
        description: 'Part of the URL which routes to this event'
      },
      required: true,
      unique: true,
    },
    {
      name: 'name',
      type: 'text',
      label: 'Internal Name',
      admin: {
        description: 'Used to identify this page in a list of events'
      },
      required: true,
      unique: true,
    },
    LocalizedTextField(
      'pageTitle', 
      'Page Title', 
      true, 
      'Shows up in the browser tab and search results',
    ),
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
