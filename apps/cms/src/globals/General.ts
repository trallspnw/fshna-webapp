import { GlobalConfig } from 'payload'
import { LocalizedTextField } from '../fields/localizedTextField'

/**
 * General global configuration model.
 */
export const GeneralGlobal: GlobalConfig = {
  slug: 'general',
  label: 'General',
  access: {
    read: () => true,
  },
  fields: [
    LocalizedTextField('baseTitle', 'Base Title', true),
    {
      name: 'logo',
      type: 'relationship',
      relationTo: 'media',
      label: 'Logo Image',
      required: true,
    },
    {
      name: 'icon',
      type: 'relationship',
      relationTo: 'media',
      label: 'Icon',
    },
    {
      name: 'membershipPrice',
      type: 'number',
      label: 'Membership Price',
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
      name: 'name',
      label: 'Name Input',
      fields: [
        LocalizedTextField('nameLabel', 'Name Label'),
        LocalizedTextField('namePlaceholder', 'Name Placeholder'),
        LocalizedTextField('nameValidationError', 'Name Input Error'),
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
