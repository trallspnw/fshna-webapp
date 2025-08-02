import { Block } from 'payload'
import { commonBlocks } from '../lib/commonBlocks'

/**
 * Layout block used for aligning children. Contains other common blocks.
 */
export const Align: Block = {
  slug: 'align',
  interfaceName: 'Align',
  labels: {
    singular: 'Align',
    plural: 'Alignments',
  },
  fields: [
    {
      name: 'align',
      label: 'Horizontal Alignment',
      type: 'radio',
      defaultValue: 'left',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      required: true,
    },
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Content',
      blocks: commonBlocks,
    },
  ],
}
