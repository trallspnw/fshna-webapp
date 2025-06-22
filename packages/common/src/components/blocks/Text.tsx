'use client'

import { useLanguage } from '@common/hooks/useLanguage'
import { Language } from '@common/types/language'

type TextProps = {
  text: Partial<Record<Language, string>>
}

export function Text({ text }: TextProps) {
  const [language] = useLanguage()
  return <>{text[language]}</>
}
