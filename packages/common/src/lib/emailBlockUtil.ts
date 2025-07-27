import { EmailHeading, EmailParagraph, EmailReceiptItems } from "../types/payload-types";
import { render as renderEmailHeading } from '@common/handlers/blocks/email/emailHeading'
import { render as renderEmailParagraph } from '@common/handlers/blocks/email/emailParagraph'
import { render as renderEmailReceiptItems } from '@common/handlers/blocks/email/emailReceiptItems'
import { JSX } from "react";
import { Language } from "../types/language";

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

export type EmailBlockType = keyof typeof emailBlockRegistry

export type EmailBlockRegistry = typeof emailBlockRegistry

export type EmailBlockMap = {
  [K in EmailBlockType]: EmailBlockRegistry[K]['type'] & { blockType: K }
}

export type EmailBaseBlock = EmailBlockMap[EmailBlockType]

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
