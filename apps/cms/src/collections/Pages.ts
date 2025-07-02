import { CollectionConfig } from 'payload'
import { Hero } from '@cms/blocks/Hero'
import { LocalizedTextField } from '@cms/fields/localizedTextField'

const hideFromNav = ['home', 'not-found']

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'name',
    defaultColumns: [
      'name', 
      'slug', 
    ],
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
      name: 'name',
      type: 'text',
      label: 'Internal Name',
      admin: {
        description: 'Used to identify this page in a list of pages'
      },
      required: true,
      unique: true,
    },
    LocalizedTextField(
      'pageTitle', 
      'Page Title', 
      true, 
      'Shows up in the browser tab and search results',
    ),
    {
      name: 'showInNav',
      type: 'checkbox',
      label: 'Show Page in Primary Navigation',
      admin: {
        condition: (data, siblingData) => {
          return !(hideFromNav.includes(siblingData?.slug))
        },
      },
    },
    {
      name: 'navigationOptions',
      type: 'group',
      label: 'Navigation Options',
      admin: {
        condition: (data, siblingData) => {
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
          'Navigation link label'
        )
      ]
    },
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Content Blocks',
      blocks: [
        Hero,
      ],
    },
  ],
}
