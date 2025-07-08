import { Block } from "payload";
import { LocalizedTextField } from "@cms/fields/localizedTextField";

export const LinkButton: Block = {
  slug: 'linkButton',
  interfaceName: 'LinkButton',
  labels: {
    singular: 'Link Button',
    plural: 'Link Buttons',
  },
  fields: [
    LocalizedTextField('label', 'Link Labal', true),
    {
      name: 'url',
      type: 'text',
      label: 'Link URL',
      required: true,
      admin: {
        placeholder: '/about or https://example.com',
      },
    }
  ],
}
