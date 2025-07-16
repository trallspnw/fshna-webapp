import { Block } from 'payload'
import { commonBlocks } from '../lib/commonBlocks'
import { LocalizedTextField } from '../fields/localizedTextField'

export const Accordion: Block = {
  slug: 'accordion',
  interfaceName: 'Accordion',
  labels: {
    singular: 'Accordion',
    plural: 'Accordions',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Accordion Items',
      required: true,
      fields: [
        LocalizedTextField('title', 'Title', true),
        {
          name: 'content',
          type: 'blocks',
          label: 'Content Blocks',
          blocks: commonBlocks,
        },
      ],
    },
  ],
}
