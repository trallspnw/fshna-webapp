import { Block } from "payload";
import { LocalizedMediaField } from "@cms/fields/localizedMediaField";
import { LocalizedTextField } from "@cms/fields/localizedTextField";
import { Paragraph } from "./Paragraph";

export const Section: Block = {
  slug: 'section',
  labels: {
    singular: 'Section',
    plural: 'Sections',
  },
  fields: [
    LocalizedTextField('heading', 'Section Heading', true),
    {
      name: 'blocks',
      type: 'blocks',
      label: 'Section Content',
      blocks: [
        Paragraph,
      ]
    },
    LocalizedMediaField('media', 'Section Image'),
  ]
}
