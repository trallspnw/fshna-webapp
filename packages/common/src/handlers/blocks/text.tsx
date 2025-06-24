import { TextBlock } from "@common/types/payload-types"
import { Language } from "@common/types/language"
import { JSX } from "react"
import { Text } from '@common/components/blocks/Text'

export function textFromBlock(block: TextBlock): JSX.Element {
  return (
    <Text
      key={block.id}
      text={normalizeLocalizedText(block.text)}
    />
  )
}

function normalizeLocalizedText(
  input: Partial<Record<string, string | null>> | undefined
): Partial<Record<Language, string>> {
  if (!input) return {}
  const result: Partial<Record<Language, string>> = {}
  for (const [language, value] of Object.entries(input)) {
    if (value != null) {
      result[language as Language] = value
    }
  }
  return result
}
