import { GlobalConfig } from 'payload'
import { LocalizedMediaField } from '../fields/localizedMediaField'

export const GeneralGlobal: GlobalConfig = {
  slug: 'general',
  label: 'General',
  access: {
    read: () => true,
  },
  fields: [
    LocalizedMediaField('logo', 'Logo Image'),
  ],
}
