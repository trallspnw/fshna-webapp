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
    {
      type: 'group',
      name: 'email',
      label: 'Email Input',
      fields: [
        LocalizedTextField('emailLabel', 'Email Label'),
        LocalizedTextField('emailPlaceholder', 'Email Placeholder'),
        LocalizedTextField('emailValidationError', 'Email Input Error'),
      ],
    },
    {
      type: 'group',
      name: 'phone',
      label: 'Phone Input',
      fields: [
        LocalizedTextField('phoneLabel', 'Phone Label'),
        LocalizedTextField('phonePlaceholder', 'Phone Placeholder'),
        LocalizedTextField('phoneValidationError', 'Phone Input Error'),
      ],
    },
    {
      type: 'group',
      name: 'address',
      label: 'Address Input',
      fields: [
        LocalizedTextField('addressLabel', 'Address Label'),
        LocalizedTextField('addressPlaceholder', 'Address Placeholder'),
        LocalizedTextField('addressValidationError', 'Address Input Error'),
      ],
    },
  ],
}
