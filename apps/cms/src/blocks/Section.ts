import { Block } from "payload";
import { LocalizedMediaField } from "@cms/fields/localizedMediaField";
import { LocalizedTextField } from "@cms/fields/localizedTextField";
import { Paragraph } from "./Paragraph";
import { LinkButton } from "./LinkButton";

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
        LinkButton
      ]
    },
    LocalizedMediaField('media', 'Section Image'),
  ]
}
