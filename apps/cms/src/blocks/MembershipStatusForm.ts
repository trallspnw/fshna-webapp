import { Block } from 'payload'
import { LocalizedTextField } from '../fields/localizedTextField'

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
        LocalizedTextField('successMessage', 'Success Message', true),
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
