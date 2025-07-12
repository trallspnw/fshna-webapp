import { GlobalConfig } from 'payload'
import { LocalizedTextField } from '../fields/localizedTextField'

export const FooterGlobal: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
  },
  fields: [
    LocalizedTextField(
      'description', 
      'Website description', 
      false, 
      'Shows below the logo',
    ),
    {
      name: 'linkGroups',
      type: 'array',
      fields: [
        LocalizedTextField(
          'groupName', 
          'Group Name', 
          true, 
          'Heading for link group',
        ),
        {
          name: 'links',
          type: 'array',
          fields: [
            { 
              name: 'href', 
              type: 'text', 
              required: true,
            },
            LocalizedTextField(
              'label', 
              'Link Label', 
              true, 
              'Clickable link text',
            ),
          ],
        },
      ],
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { 
          name: 'facebook', 
          type: 'text' 
        },
        { 
          name: 'instagram', 
          type: 'text' 
        },
        { 
          name: 'x', 
          type: 'text' 
        },
        { 
          name: 'youtube', 
          type: 'text' 
        },
        { 
          name: 'bluesky', 
          type: 'text' 
        },
      ],
    },
  ],
}
