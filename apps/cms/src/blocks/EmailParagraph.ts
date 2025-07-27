import { Block } from "payload";
import { LocalizedTextField } from "@cms/fields/localizedTextField";

export const EmailParagraph: Block = {
  slug: 'emailParagraph',
  interfaceName: 'EmailParagraph',
  labels: {
    singular: 'Email Paragraph',
    plural: 'Email Paragraphs',
  },
  fields: [
    LocalizedTextField('text', 'Paragraph Text', true),
  ],
}
