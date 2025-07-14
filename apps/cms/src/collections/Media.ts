import { CollectionConfig } from 'payload'
import { LANGUAGE_LABELS } from '@common/types/language'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Internal name of media'
      },
      required: true,
    },
    {
      name: 'media',
      type: 'group',
      label: 'Media',
      fields: Object.entries(LANGUAGE_LABELS).map(([language, label]) => ({
        name: language,
        type: 'upload',
        relationTo: 'mediaFiles',
        label,
      })),
    },
    {
      name: 'altText',
      type: 'group',
      label: 'Alt Text',
      fields: Object.entries(LANGUAGE_LABELS).map(([language, label]) => ({
        name: language,
        type: 'text',
        label,
      })),
    },
  ],
}
