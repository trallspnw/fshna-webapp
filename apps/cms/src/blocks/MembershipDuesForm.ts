import { Block } from 'payload'
import { LocalizedTextField } from '../fields/localizedTextField'

export const MembershipDuesForm: Block = {
  slug: 'membershipDuesForm',
  interfaceName: 'MembershipDuesForm',
  labels: {
    singular: 'Membership Dues Form',
    plural: 'Membership Dues Form',
  },
  fields: [
    LocalizedTextField('submitButtonText', 'Submit Button Text', true),
    LocalizedTextField('priceLabel', 'Price Label', true),
  ],
}
