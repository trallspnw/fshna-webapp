import { Block } from 'payload'
import { LocalizedTextField } from '../fields/localizedTextField'

export const EventCardGrid: Block = {
  slug: 'eventCardGrid',
  interfaceName: 'EventCardGrid',
  labels: {
    singular: 'Event Card Grid',
    plural: 'Event Card Grids',
  },
  fields: [
    LocalizedTextField(
      'heading', 
      'Heading Text', 
      false,
    ),
    {
      name: 'rowsToShow',
      type: 'number',
      label: 'Rows to Display',
      required: true,
      defaultValue: 2,
      min: 1,
    },
    {
      name: 'filter',
      type: 'radio',
      label: 'Which Events to Show',
      required: true,
      defaultValue: 'upcoming',
      options: [
        {
          label: 'Upcoming Events',
          value: 'upcoming',
        },
        {
          label: 'Past Events',
          value: 'past',
        },
      ],
    },
    LocalizedTextField(
      'showMoreLabel', 
      'Show More Label', 
      false,
      'Enables a "Show more" button'
    )
  ],
}
