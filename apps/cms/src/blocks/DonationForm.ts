import { Block } from 'payload'
import { LocalizedTextField } from '../fields/localizedTextField'

/**
 * Donation form block with localized text.
 */
export const DonationForm: Block = {
  slug: 'donationForm',
  interfaceName: 'DonationForm',
  labels: {
    singular: 'Donation Form',
    plural: 'Donation Forms',
  },
  fields: [
    LocalizedTextField('submitButtonText', 'Submit Button Text', true),
    LocalizedTextField('amountLabel', 'Amount Label'),
    LocalizedTextField('amountPlaceholder', 'Amount Placeholder'),
    LocalizedTextField('amountValidationError', 'Amount Input Error'),
    LocalizedTextField('itemName', 'Item Name'),
    LocalizedTextField('serverFailureMessage', 'Server Failure Message'),
  ],
}
