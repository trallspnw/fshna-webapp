import { Block } from "payload";
import { LocalizedTextField } from "@cms/fields/localizedTextField";

/**
 * A paragraph block used in emails.
 */
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
