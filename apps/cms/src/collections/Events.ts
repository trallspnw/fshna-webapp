import { CollectionConfig } from 'payload'
import { LocalizedTextField } from '@cms/fields/localizedTextField'
import { LocalizedMediaField } from '../fields/localizedMediaField'
import { Paragraph } from '../blocks/Paragraph'
import { LinkButton } from '../blocks/LinkButton'

export const Events: CollectionConfig = {
  slug: 'events',
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
        description: 'Part of the URL which routes to this event'
      },
      required: true,
      unique: true,
    },
    {
      name: 'name',
      type: 'text',
      label: 'Internal Name',
      admin: {
        description: 'Used to identify this page in a list of events'
      },
      required: true,
      unique: true,
    },
    LocalizedTextField(
      'pageTitle',   // TODO - this is used for event title - this should be required and name/desc updated
      'Page Title', 
      true,
      'Shows up in the browser tab and search results',
    ),
    {
      name: 'dateTime',
      label: 'Date and Time',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
    },
    LocalizedTextField(
      'location', 
      'Location', 
      true,
    ),
    LocalizedMediaField(
      'media', 
      'Event Image',
      true,
    ),
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Section Content',
      blocks: [
        Paragraph,
        LinkButton
      ]
    },
  ],
}
