import { Block } from "payload";
import { LocalizedTextField } from "../fields/localizedTextField";

export const OrderSummary: Block = {
  slug: 'orderSummary',
  interfaceName: 'OrderSummary',
  labels: {
    singular: 'Order Summary',
    plural: 'Order Summaries',
  },
  fields: [
    LocalizedTextField('heading', 'Heading', true),
    LocalizedTextField('paidStatus', 'Paid Status', true),
    LocalizedTextField('unpaidStatus', 'Unpaid Status', true),
    LocalizedTextField('totalPaidLabel', 'Total Paid Label', true),
    LocalizedTextField('loadingText', 'Loading Text', true),
    LocalizedTextField('orderNotFoundText', 'Order Not Found Text', true),
    LocalizedTextField('returnButtonText', 'Return Button Text', true),
    LocalizedTextField('retryButtonText', 'Retry Button Text'),
  ],
}
