import { CollectionConfig } from 'payload'

/**
 * Raw media files without localization features.
 */
export const MediaFiles: CollectionConfig = {
  slug: 'mediaFiles',
  upload: true,
  access: {
    read: () => true,
  },
  fields: [],
}
