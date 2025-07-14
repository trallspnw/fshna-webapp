import { CollectionConfig } from 'payload'
import { LocalizedTextField } from '@cms/fields/localizedTextField'
import { allBlocks } from '../lib/allBlocks'
import { DEFAULT_LANGUAGE } from '@/packages/common/src/types/language'

const hideFromNav = ['home', 'not-found']

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'titleText',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      admin: {
        description: 'Part of the URL which routes to this page'
      },
      required: true,
      unique: true,
    },
    {
      name: 'titleText',
      type: 'text',
      admin: {
        readOnly: true,
        hidden: true,
      },
      hooks: {
        beforeValidate: [
          ({ siblingData }) => {
            return siblingData?.title?.[DEFAULT_LANGUAGE] ?? ''
          },
        ],
      },
    },
    LocalizedTextField(
      'title', 
      'Page Title', 
      true,
    ),
    {
      name: 'showInNav',
      type: 'checkbox',
      label: 'Show Page in Primary Navigation',
      admin: {
        condition: (_, siblingData) => {
          return !(hideFromNav.includes(siblingData?.slug))
        },
      },
    },
    {
      name: 'navigationOptions',
      type: 'group',
      label: 'Navigation Options',
      admin: {
        condition: (_, siblingData) => {
          return siblingData?.showInNav === true;
        },
        description: 'Pages with lower values will be listed first'
      },
      fields: [
        {
          name: 'navOrder',
          type: 'number',
          label: 'Navigation Order',
        },
        LocalizedTextField(
          'navLabel', 
          'Navigation Label',
          true,
        )
      ]
    },
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Page Content',
      blocks: allBlocks,
    },
  ],
}
