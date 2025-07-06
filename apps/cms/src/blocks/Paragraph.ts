import { Block } from "payload";
import { LocalizedTextField } from "@cms/fields/localizedTextField";

export const Paragraph: Block = {
  slug: 'paragraph',
  interfaceName: 'Paragraph',
  labels: {
    singular: 'Paragraph',
    plural: 'Paragraphs',
  },
  fields: [
    LocalizedTextField('text', 'Paragraph Text', true),
  ],
}
