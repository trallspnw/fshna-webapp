'use client'

import { Text as MantineText } from '@mantine/core'
import { useLanguage } from "../hooks/useLanguage"
import { LocalizedText } from "../types/language"
import { getLocalizedValue } from '../lib/translation'

type ParagraphProps = {
  text: LocalizedText
}

export function Paragraph({ text }: ParagraphProps) {
  const [language] = useLanguage()

  return (
    <MantineText>
      {getLocalizedValue(text, language)}
    </MantineText>
  )
}
