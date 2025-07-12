'use client'

import { Button } from '@mantine/core'
import { LocalizedText } from '../types/language'
import { getLocalizedValue } from '../lib/translation'
import { useLanguage } from '../hooks/useLanguage'

export type LinkButtonProps = {
  label: LocalizedText
  href: string
}

export function LinkButton({ label, href }: LinkButtonProps) {
  const [language] = useLanguage()

  return (
    <Button
      component='a'
      href={href}
    >
      {getLocalizedValue(label, language)}
    </Button>
  )
}
