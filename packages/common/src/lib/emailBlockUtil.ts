import { EmailHeading, EmailParagraph, EmailReceiptItems } from "../types/payload-types";
import { render as renderEmailHeading } from '@common/handlers/blocks/email/emailHeading'
import { render as renderEmailParagraph } from '@common/handlers/blocks/email/emailParagraph'
import { render as renderEmailReceiptItems } from '@common/handlers/blocks/email/emailReceiptItems'
import { JSX } from "react";
import { Language } from "../types/language";

/**
 * Maps payload email blocks to a renderer and type.
 */
export const emailBlockRegistry = {
  emailHeading: {
    render: renderEmailHeading,
    type: {} as EmailHeading,
  },
  emailParagraph: {
    render: renderEmailParagraph,
    type: {} as EmailParagraph,
  },
  emailReceiptItems: {
    render: renderEmailReceiptItems,
    type: {} as EmailReceiptItems,
  }
}

/**
 * Type from block config keys.
 */
export type EmailBlockType = keyof typeof emailBlockRegistry

/**
 * Type of block config.
 */
export type EmailBlockRegistry = typeof emailBlockRegistry

/**
 * A mapping of type (string from payload) to the generated payload type.
 */
export type EmailBlockMap = {
  [K in EmailBlockType]: EmailBlockRegistry[K]['type'] & { blockType: K }
}

/**
 * A generalized block type with a render function.
 */
export type EmailBaseBlock = EmailBlockMap[EmailBlockType]

/**
 * Renders email blocks to JSX.
 * @param blocks The blocks to render
 * @param language The language to use
 * @param params Key-value pairs used in blocks
 * @returns 
 */
export function renderEmailBlocks(blocks: EmailBaseBlock[], language: Language, params: Record<string, string>) : JSX.Element[] {
  return (
    blocks?.map((block, index) => {
      const blockType = block.blockType

      const render = emailBlockRegistry[blockType].render as (
        block: Extract<EmailBaseBlock, { blockType: typeof blockType }>,
        index: number,
        language: Language,
        params: Record<string, string>,
      ) => JSX.Element

      return render(block, index, language, params)
    })?.filter(Boolean) ?? []
  )
}
