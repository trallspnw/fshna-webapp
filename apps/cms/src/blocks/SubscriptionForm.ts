import { Block } from 'payload'
import { LocalizedTextField } from '../fields/localizedTextField'

export const SubscriptionForm: Block = {
  slug: 'subscriptionForm',
  interfaceName: 'SubscriptionForm',
  labels: {
    singular: 'Subscription Form',
    plural: 'Subscription Forms',
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
