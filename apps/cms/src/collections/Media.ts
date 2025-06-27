import { CollectionConfig } from 'payload'
import { LocalizedTextField } from '@cms/fields/localizedTextField'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    LocalizedTextField('alt', 'Alt Text', true),
  ],
}
