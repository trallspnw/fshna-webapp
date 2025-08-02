import { Block } from 'payload'

/**
 * A media (image) block mapping to he media collection.
 */
export const Media: Block = {
  slug: 'media',
  interfaceName: 'MediaBlock',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  fields: [
    {
      name: 'media',
      type: 'relationship',
      label: 'Media',
      relationTo: 'media',
      required: true,
    },
  ],
}
