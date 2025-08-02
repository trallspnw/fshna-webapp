import { Block } from 'payload'
import { LocalizedTextField } from '../fields/localizedTextField'

/**
 * A form block for looking up membership status. Includes localized text.
 */
export const MembershipStatusForm: Block = {
  slug: 'membershipStatusForm',
  interfaceName: 'MembershipStatusForm',
  labels: {
    singular: 'Membership Status Form',
    plural: 'Membership Status Forms',
  },
  fields: [
    LocalizedTextField('submitButtonText', 'Submit Button Text', true),
    {
      type: 'row',
      fields: [
        LocalizedTextField('successHeading', 'Success Heading', true),
        LocalizedTextField('membershipStatus', 'Membership Status', true),
        LocalizedTextField('active', 'Active', true),
        LocalizedTextField('inactive', 'Inactive', true),
        LocalizedTextField('expires', 'Expires', true),
      ],
    },
    {
      type: 'row',
      fields: [
        LocalizedTextField('failureHeading', 'Failure Heading', true),
        LocalizedTextField('failureMessage', 'Failure Message', true),
      ],
    },
  ],
}
