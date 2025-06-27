import { Block } from 'payload'
import { LocalizedTextField } from '@cms/fields/localizedTextField'
import { LocalizedMediaField } from '@cms/fields/localizedMediaField'

export const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero',
    plural: 'Heroes',
  },
  fields: [
    LocalizedTextField('heading', 'Primary Heading', true),
    LocalizedTextField('subheading', 'Subheading'),
    LocalizedMediaField('backgroundMedia', 'Background Image'),
    {
      name: 'ctas',
      type: 'array',
      label: 'CTA Buttons',
      maxRows: 2,
      fields: [
        LocalizedTextField('label', 'Button Label', true),
        {
          name: 'url',
          type: 'text',
          label: 'Link URL',
          required: true,
          admin: {
            placeholder: '/about or https://example.com',
          },
        },
      ],
    },
  ],
}
