import { Block } from 'payload'
import { LocalizedTextField } from '../fields/localizedTextField'

/**
 * Membership form block with localized text.
 */
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
    LocalizedTextField('itemName', 'Item Name'),
    LocalizedTextField('existingMembershipMessage', 'Existing Membership Message'),
    LocalizedTextField('serverFailureMessage', 'Server Failure Message'),
  ],
}
