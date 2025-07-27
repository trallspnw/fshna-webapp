import { JSX } from "react"
import { EmailHeading as EmailHeadingType } from '@common/types/payload-types' 
import { Language } from "../../../types/language"
import { getLocalizedValue } from "../../../lib/translation"

export function render(
  block: EmailHeadingType, 
  index: number, 
  language: Language,
  params: Record<string, string>,
): JSX.Element {
  const order = parseInt(block.level) as 1 | 2 | 3 | 4 | 5 | 6
  const Tag = `h${order}` as keyof JSX.IntrinsicElements

  return (
    <Tag key={index}>
      {getLocalizedValue(block.text, language)}
    </Tag>
  )
}
