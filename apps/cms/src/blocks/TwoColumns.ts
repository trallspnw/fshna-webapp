import { Block } from 'payload'
import { commonBlocks } from '../lib/commonBlocks'
import { Align } from './Align'

export const TwoColumns: Block = {
  slug: 'twoColumns',
  labels: {
    singular: 'Two Columns',
    plural: 'Two Columns',
  },
  fields: [
    {
      name: 'columnRatio',
      type: 'select',
      label: 'Column Ratio',
      defaultValue: '60-40',
      options: [
        { label: '70 / 30', value: '70-30' },
        { label: '60 / 40', value: '60-40' },
        { label: '50 / 50', value: '50-50' },
        { label: '40 / 60', value: '40-60' },
        { label: '30 / 70', value: '30-70' },
      ],
    },
    {
      name: 'leftColumn',
      type: 'blocks',
      label: 'Left Column Blocks',
      blocks: [
        ...commonBlocks,
        Align,
      ]
    },
    {
      name: 'rightColumn',
      type: 'blocks',
      label: 'Right Column Blocks',
      blocks: [
        ...commonBlocks,
        Align,
      ]
    },
  ],
}
