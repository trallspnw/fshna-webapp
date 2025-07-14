import { CollectionConfig } from 'payload'

export const MediaFiles: CollectionConfig = {
  slug: 'mediaFiles',
  upload: true,
  access: {
    read: () => true,
  },
  fields: [],
}
