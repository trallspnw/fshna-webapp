'use client'

import { Text as MantineText } from '@mantine/core'
import { useLanguage } from "../hooks/useLanguage"
import { LocalizedText } from "../types/language"
import { getLocalizedValue } from '../lib/translation'

type TextProps = {
  text: LocalizedText
}

export function Text({ text }: TextProps) {
  const [language] = useLanguage()

  return (
    <MantineText>
      {getLocalizedValue(text, language)}
    </MantineText>
  )
}
