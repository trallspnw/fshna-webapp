import { GlobalConfig } from 'payload'
import { LocalizedTextField } from '../fields/localizedTextField'

export const GeneralGlobal: GlobalConfig = {
  slug: 'general',
  label: 'General',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'relationship',
      relationTo: 'media',
      label: 'Logo Image',
      required: true,
    },
    {
      type: 'group',
      name: 'eventLabels',
      label: 'Event Labels',
      fields: [
        LocalizedTextField('dateLabel', 'Date Label'),
        LocalizedTextField('timeLabel', 'Time Label'),
        LocalizedTextField('locationLabel', 'Location Label'),
      ],
    },
  ],
}
