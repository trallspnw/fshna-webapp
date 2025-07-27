import { JSX } from "react"
import { EmailParagraph as EmailParagraphType } from '@common/types/payload-types' 
import { Language } from "../../../types/language"
import { getLocalizedValue } from "../../../lib/translation"

export function render(
  block: EmailParagraphType, 
  index: number, 
  language: Language,
  params: Record<string, string>,
): JSX.Element {

  return (
    <p key={index}>
      {getLocalizedValue(block.text, language)}
    </p>
  )
}
