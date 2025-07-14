import { Block } from 'payload'

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
