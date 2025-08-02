import { EmailHeading } from "../blocks/EmailHeading";
import { EmailParagraph } from "../blocks/EmailParagraph";
import { EmailReceiptItems } from "../blocks/EmailReceiptItems";

/**
 * Email content requires specialized rendering. These blocks are supported for emails.
 */
export const emailBlocks = [
  EmailHeading,
  EmailParagraph,
  EmailReceiptItems,
]
